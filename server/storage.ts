import { type UserInterface, type InsertUserInterface } from "@shared/schema";

// Use explicit interfaces to avoid Drizzle type inference issues
export interface IStorage {
  getUser(id: number): Promise<UserInterface | undefined>;
  getUserByUsername(username: string): Promise<UserInterface | undefined>;
  createUser(user: InsertUserInterface): Promise<UserInterface>;
}

export class MemStorage implements IStorage {
  private users: Map<number, UserInterface>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<UserInterface | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<UserInterface | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUserInterface): Promise<UserInterface> {
    const id = this.currentId++;
    const user: UserInterface = {
      id,
      username: insertUser.username,
      password: insertUser.password,
    };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();