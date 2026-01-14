import express, { type Express, type Request, type Response, type NextFunction } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { 
      protocol: 'ws',
      host: process.env.REPL_DOMAIN || 'localhost',
      port: 443,
      secure: process.env.REPL_DOMAIN ? true : false,
    },
  };

  // Create inline Vite config instead of importing it
  const inlineViteConfig = {
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "client", "src"),
        "@shared": path.resolve(process.cwd(), "shared"),
        "@assets": path.resolve(process.cwd(), "attached_assets"),
      },
    },
    root: path.resolve(process.cwd(), "client"),
    build: {
      outDir: "../dist/public",
      emptyOutDir: true,
      minify: process.env.NODE_ENV === "production",
      sourcemap: process.env.NODE_ENV === "development",
    },
    server: {
      port: 3000,
      host: true,
      allowedHosts: true,
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }
  };

  const vite = await createViteServer({
    ...inlineViteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: {
      ...inlineViteConfig.server,
      ...serverOptions,
    },
    appType: "custom",
  });

  app.use(vite.middlewares);

  // Serve static files from public folder BEFORE the catch-all route
  app.use(express.static(path.resolve(process.cwd(), "public")));

  app.use("*", async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // Fixed path resolution - build files are now at project_root/dist/public
  const distPath = path.resolve(process.cwd(), "dist", "public");

  if (!fs.existsSync(distPath)) {
    log(`Build directory not found at: ${distPath}`, "static");
    log("Make sure to run 'npm run build' before starting the production server", "static");
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  log(`Serving static files from: ${distPath}`, "static");
  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req: Request, res: Response) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}