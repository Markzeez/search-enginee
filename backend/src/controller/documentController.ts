import { Request, Response } from "express";
import Document, { IDocument } from "../models/Document";
import { esClient } from "../config/elasticsearch";

// Create a document
export const createDocument = async (req: Request, res: Response) => {
  try {
    const doc: IDocument = await Document.create(req.body);

    await esClient.index({
      index: "documents",
      id: doc._id.toString(),
      document: {
        title: doc.title,
        content: doc.content,
        tags: doc.tags,
        createdAt: doc.createdAt,
      },
    });

    res.status(201).json(doc);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Search documents
export const searchDocuments = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    const result = await esClient.search({
      index: "documents",
      query: {
        multi_match: {
          query: q,
          fields: ["title^2", "content", "tags"],
          fuzziness: "AUTO",
        },
      },
    });

    const hits = result.hits.hits.map((hit) => ({
      id: hit._id,
      ...hit._source,
      score: hit._score,
    }));

    res.json(hits);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};