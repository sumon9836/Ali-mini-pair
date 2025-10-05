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

      const response = await fetch(`${WHATSAPP_API_URL}/pair?code=${code}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        return res.status(response.status).json({ 
          status: "error", 
          message: `Upstream API error: ${response.statusText}` 
        });
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error pairing:", error);
      const message = error instanceof Error ? error.message : "Failed to pair number";
      return res.status(500).json({ status: "error", message });
    }
  });

  // Proxy endpoint for getting sessions
  app.get("/api/sessions", async (req, res) => {
    try {
      const response = await fetch(`${WHATSAPP_API_URL}/sessions`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        return res.status(response.status).json({ 
          status: "error", 
          message: `Upstream API error: ${response.statusText}` 
        });
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      const message = error instanceof Error ? error.message : "Failed to fetch sessions";
      return res.status(500).json({ status: "error", message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
