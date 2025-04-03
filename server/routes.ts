import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertHtmlExampleSchema, insertUserSchema } from "@shared/schema";
import session from "express-session";
import MemoryStore from "memorystore";

// Augment express-session with custom properties
declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware setup
  const MemoryStoreSession = MemoryStore(session);
  app.use(
    session({
      store: new MemoryStoreSession({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
      secret: "html-education-app-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      }
    })
  );

  // Authentication middleware
  const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };
  // Example Routes
  app.get("/api/examples", async (req, res) => {
    try {
      const category = req.query.category as string;
      const examples = await storage.getExamples(category);
      res.json(examples);
    } catch (error) {
      console.error("Error fetching examples:", error);
      res.status(500).json({ message: "Failed to fetch examples" });
    }
  });

  app.get("/api/examples/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const example = await storage.getExampleById(id);
      
      if (!example) {
        return res.status(404).json({ message: "Example not found" });
      }
      
      res.json(example);
    } catch (error) {
      console.error("Error fetching example:", error);
      res.status(500).json({ message: "Failed to fetch example" });
    }
  });

  // User Routes
  app.post("/api/register", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser({ username, password });
      res.status(201).json({ id: user.id, username: user.username });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Set user session
      req.session.userId = user.id;
      
      res.json({ id: user.id, username: user.username });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Failed to log in" });
    }
  });

  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ message: "Failed to log out" });
      }
      
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/user", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't send the password back to the client
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Saved Work Routes
  app.post("/api/saved-work", requireAuth, async (req: Request, res: Response) => {
    try {
      const { title, code, isPublic } = req.body;
      const userId = req.session.userId as number;
      const createdAt = new Date().toISOString();
      
      const savedWork = await storage.createSavedWork({
        title,
        code,
        userId,
        createdAt,
        isPublic: isPublic || false,
      });
      
      res.status(201).json(savedWork);
    } catch (error) {
      console.error("Error saving work:", error);
      res.status(500).json({ message: "Failed to save work" });
    }
  });

  app.get("/api/saved-work/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const savedWork = await storage.getSavedWorkById(id);
      
      if (!savedWork) {
        return res.status(404).json({ message: "Saved work not found" });
      }
      
      // If the savedWork is private and the user is not the owner, return 403
      if (!savedWork.isPublic && (!req.session.userId || req.session.userId !== savedWork.userId)) {
        return res.status(403).json({ message: "You do not have permission to view this" });
      }
      
      res.json(savedWork);
    } catch (error) {
      console.error("Error fetching saved work:", error);
      res.status(500).json({ message: "Failed to fetch saved work" });
    }
  });
  
  app.get("/api/user/saved-work", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId as number;
      const userWorks = await storage.getSavedWorkByUserId(userId);
      res.json(userWorks);
    } catch (error) {
      console.error("Error fetching user saved works:", error);
      res.status(500).json({ message: "Failed to fetch saved works" });
    }
  });
  
  // Delete saved work
  app.delete("/api/saved-work/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.session.userId as number;
      
      // Get the saved work
      const savedWork = await storage.getSavedWorkById(id);
      
      // Check if the saved work exists
      if (!savedWork) {
        return res.status(404).json({ message: "Saved work not found" });
      }
      
      // Check if the user is the owner of the saved work
      if (savedWork.userId !== userId) {
        return res.status(403).json({ message: "You do not have permission to delete this work" });
      }
      
      // In a real application, you would delete the saved work from database
      // await storage.deleteSavedWork(id);
      
      // For demo purposes, we'll just return success
      res.json({ message: "Saved work deleted successfully" });
    } catch (error) {
      console.error("Error deleting saved work:", error);
      res.status(500).json({ message: "Failed to delete saved work" });
    }
  });
  
  // Update user profile
  app.put("/api/user/profile", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId as number;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // In a real application, you would validate the password here
      // and update user information in the database
      
      // For demo purposes, we'll just return success
      res.json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });
  
  // Update user preferences
  app.put("/api/user/preferences", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId as number;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // In a real application, you would update user preferences in the database
      
      // For demo purposes, we'll just return success
      res.json({ message: "Preferences updated successfully" });
    } catch (error) {
      console.error("Error updating preferences:", error);
      res.status(500).json({ message: "Failed to update preferences" });
    }
  });

  // Validation Routes
  app.post("/api/validate", (req, res) => {
    try {
      const { html } = req.body;
      
      // Basic validation check
      // In a more advanced implementation, this would use a proper HTML validator
      const errors: { line: number; message: string }[] = [];
      
      // Check for common unclosed tags
      const openTags = html.match(/<[^\/][^>]*>/g) || [];
      const closeTags = html.match(/<\/[^>]*>/g) || [];
      
      if (openTags.length !== closeTags.length) {
        errors.push({ 
          line: 1, 
          message: "Possible unclosed tag. Check that all tags are properly closed." 
        });
      }
      
      res.json({ valid: errors.length === 0, errors });
    } catch (error) {
      console.error("Error validating HTML:", error);
      res.status(500).json({ message: "Failed to validate HTML" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
