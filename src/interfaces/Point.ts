import { Document } from "mongoose";

export interface IPoint extends Document {
  location: {
    name: string;
    placeId: string;
  };
}
