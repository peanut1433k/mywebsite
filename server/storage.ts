import { 
  users, type User, type InsertUser,
  type HtmlExample, type InsertHtmlExample,
  type SavedWork, type InsertSavedWork
} from "@shared/schema";
import { examples } from "../client/src/lib/examples";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // HTML Example methods
  getExamples(category?: string): Promise<HtmlExample[]>;
  getExampleById(id: number): Promise<HtmlExample | undefined>;
  
  // Saved Work methods
  getSavedWorkById(id: number): Promise<SavedWork | undefined>;
  getSavedWorkByUserId(userId: number): Promise<SavedWork[]>;
  createSavedWork(savedWork: InsertSavedWork): Promise<SavedWork>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private htmlExamples: Map<number, HtmlExample>;
  private savedWorks: Map<number, SavedWork>;
  private userId: number;
  private savedWorkId: number;

  constructor() {
    this.users = new Map();
    this.htmlExamples = new Map();
    this.savedWorks = new Map();
    this.userId = 1;
    this.savedWorkId = 1;
    
    // Initialize with examples from the client
    examples.forEach(example => {
      this.htmlExamples.set(example.id, {
        id: example.id,
        title: example.title,
        description: example.description,
        category: example.category,
        code: example.code,
        level: example.level
      });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // HTML Example methods
  async getExamples(category?: string): Promise<HtmlExample[]> {
    const allExamples = Array.from(this.htmlExamples.values());
    if (category) {
      return allExamples.filter(example => example.category === category);
    }
    return allExamples;
  }
  
  async getExampleById(id: number): Promise<HtmlExample | undefined> {
    return this.htmlExamples.get(id);
  }
  
  // Saved Work methods
  async getSavedWorkById(id: number): Promise<SavedWork | undefined> {
    return this.savedWorks.get(id);
  }
  
  async getSavedWorkByUserId(userId: number): Promise<SavedWork[]> {
    return Array.from(this.savedWorks.values()).filter(
      (work) => work.userId === userId
    );
  }
  
  async createSavedWork(insertSavedWork: InsertSavedWork): Promise<SavedWork> {
    const id = this.savedWorkId++;
    // Ensure required fields are set properly
    const savedWork: SavedWork = {
      ...insertSavedWork,
      id,
      userId: insertSavedWork.userId || null,
      isPublic: insertSavedWork.isPublic || false,
    };
    this.savedWorks.set(id, savedWork);
    return savedWork;
  }
}

export const storage = new MemStorage();
