import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { services, projects } from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Portfolio API routes
  app.get("/api/services", (_req, res) => {
    res.json(services);
  });

  app.get("/api/services/:slug", (req, res) => {
    const service = services.find(s => s.slug === req.params.slug);
    if (!service) return res.status(404).send("Service not found");
    res.json(service);
  });

  app.get("/api/projects/service/:slug", (req, res) => {
    const service = services.find(s => s.slug === req.params.slug);
    if (!service) return res.json([]);
    const filtered = projects.filter(p => p.serviceId === service.id);
    res.json(filtered);
  });

  app.get("/api/projects/:serviceSlug/:projectId", (req, res) => {
    const project = projects.find(p => p.id === req.params.projectId);
    if (!project) return res.status(404).send("Project not found");
    res.json(project);
  });

  const httpServer = createServer(app);

  return httpServer;
}
