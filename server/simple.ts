import express from "express";
import { registerRoutes } from "./routes";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  const server = await registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  // ALWAYS serve on port 5000
  const port = 5000;
  server.listen(port, 'localhost', () => {
    console.log(`Server running on http://localhost:${port}`);
  });
})(); 