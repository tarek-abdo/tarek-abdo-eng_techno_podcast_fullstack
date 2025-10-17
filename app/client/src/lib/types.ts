export interface Episode {
  _id?: string; // optional if coming from MongoDB
  title: string;
  host: string;
  date?: string;
  description: string;
  imageUrl: string;
  audioUrl: string;
  duration?: number;
  durationAsString?: string;
  createdAt?: string;
}
