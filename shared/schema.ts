import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const htmlExamples = pgTable("html_examples", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  code: text("code").notNull(),
  level: text("level").notNull().default("beginner"),
});

export const savedWork = pgTable("saved_work", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  code: text("code").notNull(),
  createdAt: text("created_at").notNull(),
  isPublic: boolean("is_public").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertHtmlExampleSchema = createInsertSchema(htmlExamples).pick({
  title: true,
  description: true,
  category: true,
  code: true,
  level: true,
});

export const insertSavedWorkSchema = createInsertSchema(savedWork).pick({
  userId: true,
  title: true,
  code: true,
  createdAt: true,
  isPublic: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertHtmlExample = z.infer<typeof insertHtmlExampleSchema>;
export type HtmlExample = typeof htmlExamples.$inferSelect;

export type InsertSavedWork = z.infer<typeof insertSavedWorkSchema>;
export type SavedWork = typeof savedWork.$inferSelect;
