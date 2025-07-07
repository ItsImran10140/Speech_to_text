import { Request, Response } from "express";
import assemblyService from "../services/assemblyService";
import { TranscriptionResponse } from "../types";

export class TranscriptionController {
  async transcribe(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          error: "No file uploaded",
        } as TranscriptionResponse);
        return;
      }

      const result = await assemblyService.transcribeFile(req.file.path);

      if (result.status === "error") {
        res.status(500).json({
          success: false,
          error: result.error || "Transcription failed",
        } as TranscriptionResponse);
        return;
      }

      res.json({
        success: true,
        transcription: result.text,
        id: result.id,
      } as TranscriptionResponse);
    } catch (error) {
      console.error("Transcription error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      } as TranscriptionResponse);
    }
  }
}
