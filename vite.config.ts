import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(async ({ command, mode }) => {
  const plugins: PluginOption[] = [react()];

  // Only include runtime error overlay in development
  if (process.env.NODE_ENV === "development") {
    try {
      const { default: runtimeErrorOverlay } = await import("@replit/vite-plugin-runtime-error-modal");
      plugins.push(runtimeErrorOverlay() as PluginOption);
    } catch (error: any) {
      console.warn("Runtime error overlay plugin not available:", error?.message || error);
    }
  }

  // Only include cartographer in non-production Repl environments
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
  ) {
    try {
      const { cartographer } = await import("@replit/vite-plugin-cartographer");
      plugins.push(cartographer() as PluginOption);
    } catch (error: any) {
      console.warn("Cartographer plugin not available:", error?.message || error);
    }
  }

  return {
    plugins,
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
      // Optimize for production
      minify: process.env.NODE_ENV === "production",
      sourcemap: process.env.NODE_ENV === "development",
      rollupOptions: {
        // Handle potential issues with external dependencies
        external: (id) => {
          // Don't externalize dependencies that should be bundled
          return false;
        }
      }
    },
    // Add server configuration for development
    server: {
      port: 5000,
      host: "0.0.0.0",
      allowedHosts: true,
      hmr: {
        protocol: 'wss',
        clientPort: 443,
      },
    },
    // Ensure proper handling of environment variables
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }
  };
});
