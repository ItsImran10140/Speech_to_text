import express from "express";
import cors from "cors";
import transcriptionRoutes from "./routes/transcription";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", transcriptionRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Speech-to-Text API is running" });
});

export default app;
