import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import cookieParser from "cookie-parser";
import path from "path";
// importing all routes
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
const app = express();
dotenv.config();
// security packages
app.use(cors());
// middleware packages
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8000;
// db config
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB is connected successfully!");
  })
  .catch((error) => {
    console.log(error);
  });
const __dirname = path.resolve();
// all routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);




app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 
    "client", "dist", "index.html"));
});

// middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal  Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
