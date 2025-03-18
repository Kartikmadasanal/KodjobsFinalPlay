import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, loginSchema } from "@shared/schema";
import { updateProfileSchema } from "@shared/update-schema";
import { ZodError } from "zod";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

const USERS_FILE = path.join(process.cwd(), "users.json");

// Initialize users.json if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/signup", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Read existing users
      const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
      
      // Check if username already exists
      if (users.some((u: any) => u.username === userData.username)) {
        return res.status(400).json({ message: "Username already taken" });
      }

      // Hash password before storing
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Add new user with hashed password
      const userWithHashedPassword = { ...userData, password: hashedPassword };
      users.push(userWithHashedPassword);
      fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const loginData = loginSchema.parse(req.body);
      
      // Read users
      const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
      
      // Find user by username
      const user = users.find((u: any) => u.username === loginData.username);

      // Verify password
      if (!user || !(await bcrypt.compare(loginData.password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Return user data excluding sensitive information
      const { password, ...userInfo } = user;
      // console.log(userInfo);
      
      res.json({ message: "Logged in successfully", user: userInfo });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.put("/api/profile", async (req, res) => {
    try {
      const updateData = updateProfileSchema.parse(req.body);
      const username = req.body.username;

      // Read users
      const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
      
      // Find user index
      const userIndex = users.findIndex((u: any) => u.username === username);
      
      if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update user data
      users[userIndex] = { ...users[userIndex], ...updateData };
      
      // Save updated users
      fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

      // Return updated user data excluding password
      const { password, ...userInfo } = users[userIndex];
      res.json({ message: "Profile updated successfully", user: userInfo });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
