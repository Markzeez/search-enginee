import express from "express";
import { createDocument, searchDocuments } from "../controller/documentController";

const router = express.Router();

router.post("/", createDocument);
router.get("/search", searchDocuments);

export default router;