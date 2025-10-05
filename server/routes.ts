import type { Express } from "express";
import { createServer, type Server } from "http";

const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || "http://yamanote.proxy.rlwy.net:17090";

export async function registerRoutes(app: Express): Promise<Server> {
  // Proxy endpoint for pairing
  app.get("/api/pair", async (req, res) => {
    try {
      const { code } = req.query;
      
      if (!code) {
        return res.status(400).json({ status: "error", message: "Phone number code is required" });
      }

      const response = await fetch(`${WHATSAPP_API_URL}/pair?code=${code}`);
      const data = await response.json();
      
      return res.json(data);
    } catch (error) {
      console.error("Error pairing:", error);
      return res.status(500).json({ status: "error", message: "Failed to pair number" });
    }
  });

  // Proxy endpoint for getting sessions
  app.get("/api/sessions", async (req, res) => {
    try {
      const response = await fetch(`${WHATSAPP_API_URL}/sessions`);
      const data = await response.json();
      
      return res.json(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      return res.status(500).json({ status: "error", message: "Failed to fetch sessions" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
