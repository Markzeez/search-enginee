import mongoose, { Document as MongooseDocument } from "mongoose";

export interface IDocument extends MongooseDocument {
  title: string;
  content: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new mongoose.Schema<IDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model<IDocument>("Document", DocumentSchema);