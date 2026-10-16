import "dotenv/config";
import express from "express";
import dns from "node:dns";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.get("/", (req, res) => res.send("Codeify API running"));
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});