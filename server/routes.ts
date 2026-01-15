import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { services, projects } from "../shared/schema";
import { getDb, ObjectId } from "./mongodb";

export async function registerRoutes(app: Express): Promise<Server> {
  // Portfolio API routes
  app.get("/api/services", async (_req, res) => {
    try {
      const db = await getDb();
      const dbServices = await db.collection("services").find({}).toArray();
      console.log(`Fetched ${dbServices.length} services from MongoDB`);
      if (dbServices.length > 0) {
        return res.json(dbServices.map(s => ({ ...s, id: s._id.toString() })));
      }
    } catch (e) {
      console.error("MongoDB error, falling back to static services", e);
    }
    console.log("Using static services fallback");
    res.json(services);
  });

  app.get("/api/services/:slug", async (req, res) => {
    try {
      const db = await getDb();
      const service = await db.collection("services").findOne({ slug: req.params.slug });
      if (service) {
        return res.json({ ...service, id: service._id.toString() });
      }
    } catch (e) {
      console.error("MongoDB error", e);
    }
    const service = services.find(s => s.slug === req.params.slug);
    if (!service) return res.status(404).send("Service not found");
    res.json(service);
  });

  app.get("/api/projects/service/:slug", async (req, res) => {
    try {
      const db = await getDb();
      // 1. Find the service by slug
      const service = await db.collection("services").findOne({ slug: req.params.slug });
      
      if (service) {
        const serviceIdStr = service._id.toString();
        console.log(`Matching projects for service: ${service.title} (${serviceIdStr})`);

        // 2. Query projects matching this service ID
        const dbProjects = await db.collection("projects").find({
          $or: [
            { "serviceId": service._id },
            { "serviceId": serviceIdStr },
            { "serviceId.$oid": serviceIdStr },
            { "serviceSlug": req.params.slug }
          ]
        }).toArray();

        if (dbProjects.length > 0) {
          console.log(`Successfully fetched ${dbProjects.length} projects for ${req.params.slug}`);
          return res.json(dbProjects.map(p => ({ ...p, id: p._id.toString() })));
        }
      }

      // 3. Fallback: Search by category or serviceName
      const fallbackProjects = await db.collection("projects").find({
        $or: [
          { category: req.params.slug },
          { serviceName: service?.title }
        ]
      }).toArray();

      if (fallbackProjects.length > 0) {
        console.log(`Fetched ${fallbackProjects.length} projects via fallback for ${req.params.slug}`);
        return res.json(fallbackProjects.map(p => ({ ...p, id: p._id.toString() })));
      }

      console.log(`No projects found for ${req.params.slug} in MongoDB.`);
    } catch (e) {
      console.error("MongoDB error", e);
    }
    
    // 4. Static Fallback
    const staticService = services.find(s => s.slug === req.params.slug);
    if (!staticService) return res.json([]);
    const filtered = projects.filter(p => p.serviceId === staticService.id);
    console.log(`Falling back to ${filtered.length} static projects for ${req.params.slug}`);
    res.json(filtered);
  });

  app.get("/api/projects/:serviceSlug/:projectId", async (req, res) => {
    try {
      const db = await getDb();
      const project = await db.collection("projects").findOne({ _id: new ObjectId(req.params.projectId) });
      if (project) {
        return res.json({ ...project, id: project._id.toString() });
      }
    } catch (e) {
      console.error("MongoDB error", e);
    }
    const project = projects.find(p => p.id === req.params.projectId);
    if (!project) return res.status(404).send("Project not found");
    res.json(project);
  });

  const httpServer = createServer(app);

  return httpServer;
}
