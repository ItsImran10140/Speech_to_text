export interface TranscriptionResponse {
  success: boolean;
  transcription?: string;
  error?: string;
  id?: string;
}

export interface AssemblyAIResponse {
  id: string;
  status: string;
  text?: string;
  error?: string;
}
