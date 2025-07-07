import { Router } from "express";
import { TranscriptionController } from "../controllers/transcriptionController";
import { upload } from "../middleware/upload";

const router = Router();
const transcriptionController = new TranscriptionController();

router.post(
  "/transcribe",
  upload.single("audio"),
  transcriptionController.transcribe
);

export default router;
