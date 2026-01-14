import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const selectUserSchema = createSelectSchema(users);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = z.infer<typeof selectUserSchema>;

// Explicit type definitions as fallback to avoid Drizzle type inference issues
export interface UserInterface {
  id: number;
  username: string;
  password: string;
}

export interface InsertUserInterface {
  username: string;
  password: string;
}