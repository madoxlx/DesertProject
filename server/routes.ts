import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for destinations
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getAllDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });

  // API routes for popular destinations
  app.get("/api/destinations/popular", async (req, res) => {
    try {
      const popularDestinations = await storage.getPopularDestinations();
      res.json(popularDestinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch popular destinations" });
    }
  });

  // API routes for packages
  app.get("/api/packages", async (req, res) => {
    try {
      const packages = await storage.getAllPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch packages" });
    }
  });

  // API routes for featured offers
  app.get("/api/packages/featured", async (req, res) => {
    try {
      const featuredPackages = await storage.getFeaturedPackages();
      res.json(featuredPackages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured packages" });
    }
  });

  // API routes for popular packages
  app.get("/api/packages/popular", async (req, res) => {
    try {
      const popularPackages = await storage.getPopularPackages();
      res.json(popularPackages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch popular packages" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
