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
      const slug = req.params.slug;
      if (!slug || slug === "undefined") {
        console.log("Received invalid slug in projects request");
        return res.json([]);
      }

      console.log(`[API] Fetching projects for slug: ${slug}`);
      const service = await db.collection("services").findOne({ slug: slug });
      
      let query: any = {};

      if (service) {
        const serviceIdStr = service._id.toString();
        console.log(`[API] Found service: ${service.title} (${serviceIdStr})`);
        query = {
          $or: [
            { serviceId: service._id },
            { serviceId: serviceIdStr },
            { serviceSlug: slug },
            { category: slug },
            { serviceName: service.title }
          ]
        };
      } else {
        query = { 
          $or: [
            { serviceSlug: slug },
            { category: slug }
          ]
        };
      }

      const dbProjects = await db.collection("projects").find(query).toArray();

      console.log(`[API] Successfully fetched ${dbProjects.length} projects for ${slug}`);
      return res.json(dbProjects.map(p => {
        // Handle MongoDB ObjectId conversion safely
        const id = p._id?.$oid || p._id?.toString() || "";
        const serviceId = p.serviceId?.$oid || p.serviceId?.toString() || "";
        
        console.log(`[API] Mapping project ${p.name}: id=${id}, serviceId=${serviceId}`);
        
        return { 
          ...p, 
          id,
          serviceId
        };
      }));

      // Broadest possible fallback
      const allProjects = await db.collection("projects").find({}).toArray();
      const filtered = allProjects.filter(p => {
        const sid = p.serviceId?.toString() || "";
        const targetSid = service?._id?.toString() || "";
        const pSlug = p.serviceSlug || p.category || "";
        return sid === targetSid || pSlug.toLowerCase() === slug.toLowerCase();
      });

      if (filtered.length > 0) {
        console.log(`[API] Fetched ${filtered.length} projects via broad filter fallback for ${slug}`);
        return res.json(filtered.map(p => ({ ...p, id: p._id.toString() })));
      }

      console.log(`[API] No projects found for ${slug} in MongoDB.`);
    } catch (e) {
      console.error("[API] MongoDB error", e);
    }
    
    const staticService = services.find(s => s.slug === req.params.slug);
    if (!staticService) return res.json([]);
    const filtered = projects.filter(p => p.serviceId === staticService.id);
    console.log(`[API] Falling back to ${filtered.length} static projects for ${req.params.slug}`);
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
