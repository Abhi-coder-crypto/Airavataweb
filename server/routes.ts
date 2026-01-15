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
      // Try to find the service by slug first
      const service = await db.collection("services").findOne({ 
        $or: [
          { slug: req.params.slug },
          { title: { $regex: new RegExp(`^${req.params.slug.replace(/-/g, ' ')}$`, 'i') } }
        ]
      });
      
      let dbProjects: any[] = [];
      const queryConditions: any[] = [
        { serviceSlug: req.params.slug },
        { category: req.params.slug }
      ];

      if (service) {
        const serviceIdString = service._id.toString();
        queryConditions.push({ serviceId: serviceIdString });
        queryConditions.push({ serviceId: service._id });
        console.log(`Found service in DB for slug ${req.params.slug}: ${serviceIdString}`);
      }

      dbProjects = await db.collection("projects").find({
        $or: queryConditions
      }).toArray();
      
      if (dbProjects.length > 0) {
        console.log(`Fetched ${dbProjects.length} projects for ${req.params.slug} from MongoDB`);
        return res.json(dbProjects.map(p => ({ ...p, id: p._id.toString() })));
      }

      // Final attempt: search by normalized service name in the project title or description if needed, 
      // but usually serviceSlug or serviceId should be enough.
      
    } catch (e) {
      console.error("MongoDB error", e);
    }
    
    // Fallback logic
    const service = services.find(s => s.slug === req.params.slug);
    if (!service) return res.json([]);
    const filtered = projects.filter(p => p.serviceId === service.id);
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
