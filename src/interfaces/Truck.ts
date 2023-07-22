import { Document } from "mongoose";

export interface ITruck extends Document {
  model: string;
  make: string;
  year: number;
  color: string;
  transportWeight: number;
  created_at: number;
}
