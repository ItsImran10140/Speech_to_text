import { AssemblyAI } from "assemblyai";
import fs from "fs";
import { AssemblyAIResponse } from "../types";

class AssemblyService {
  private client: AssemblyAI;

  constructor() {
    this.client = new AssemblyAI({
      apiKey: "244965ec60ea44fda4704374939b823c",
    });
  }

  async transcribeFile(filePath: string): Promise<AssemblyAIResponse> {
    try {
      // Upload file to AssemblyAI
      const uploadResponse = await this.client.files.upload(
        fs.createReadStream(filePath)
      );

      // Create transcription
      const transcript = await this.client.transcripts.transcribe({
        audio: uploadResponse,
      });

      // Clean up local file
      fs.unlinkSync(filePath);

      return {
        id: transcript.id,
        status: transcript.status,
        text: transcript.text ?? undefined,
        error: transcript.error,
      };
    } catch (error) {
      // Clean up local file on error
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      throw error;
    }
  }
}

export default new AssemblyService();
