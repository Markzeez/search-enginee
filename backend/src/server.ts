import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { createIndex } from "./service/indexService";
import documentRoutes from "./routes/documentRoute";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/documents", documentRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await createIndex("documents"); // Replace with appropriate index name
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();