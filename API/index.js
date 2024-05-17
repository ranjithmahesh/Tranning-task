// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.routes.js";
import IntrestsRoutes from "./routes/interests.routes.js";
import EventsRoutes from "./routes/event.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => console.log(err));

app.use("/api/users", UserRoutes);
app.use("/api/intrests", IntrestsRoutes);
app.use("/api/events", EventsRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
