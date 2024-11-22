import { DocumentData, DocumentReference } from "firebase/firestore";

export interface SentimentAnalysis {
  excitement: number;
  happiness: number;
  anger: number;
  confidence: number;
}

export interface MemoryInsight {
  context: string;
  sentiment: SentimentAnalysis;
}

interface Location {
  address: string;
  coordinates: { _latitude: number; _longitude: number };
  country: string;
  placeId: string;
  zip: string;
}

interface Quote {
  text: string;
}

export interface Transcription {
  duration?: number;
  speaker?: string;
  created: string;
  text: string;
}

type ProcessStage = "LIFT OFF" | "CRUISING" | "LANDED";

export interface Memory {
  id: string;
  liked?: boolean;
  processStage: ProcessStage;
  actionItems?: DocumentReference<DocumentData>[];
  endTime?: string;
  insight?: MemoryInsight;
  sentiment?: SentimentAnalysis;
  location?: Location;
  quotes?: Quote[];
  keywords?: string[];
  startTime: string;
  title?: string;
  shortSummary?: string;
  longSummary?: string;
  transcriptions?: Transcription[];
  upstringdAt: string;
  userId: string;
  ref: DocumentReference<DocumentData>;
}
