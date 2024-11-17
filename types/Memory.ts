import { DocumentData, DocumentReference, GeoPoint, Timestamp } from "firebase/firestore";

interface SentimentAnalysis {
  excitement: number;
  happiness: number;
  anger: number;
  confidence: number;
}

export interface MemoryInsight {
  context: string;
  sentimentAnalysis: SentimentAnalysis;
}

interface Location {
  address: string;
  coordinates: GeoPoint;
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
  created: Timestamp;
  text: string;
}

type ProcessStage = "LIFT OFF" | "CRUISING" | "LANDED";

export interface Memory {
  id: string;
  liked?: boolean;
  processStage: ProcessStage;
  actionItems?: DocumentReference<DocumentData>[];
  endTime?: Timestamp;
  insight?: MemoryInsight;
  location?: Location;
  quotes?: Quote[];
  keywords?: string[];
  startTime: Timestamp;
  title?: string;
  shortSummary?: string;
  longSummary?: string;
  transcriptions?: Transcription[];
  updatedAt: Timestamp;
  userId: string;
  ref: DocumentReference<DocumentData>;
}
