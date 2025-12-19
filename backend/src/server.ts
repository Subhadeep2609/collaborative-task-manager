import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import commentRoutes from "./routes/comment.routes";
import userRoutes from "./routes/user.routes";


dotenv.config();

const app: Application = express();

/* ------------------ HTTP + SOCKET SERVER ------------------ */
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

/* ------------------ SOCKET EVENTS ------------------ */
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  // Join a task-specific room
  socket.on("join-task", (taskId: string) => {
    socket.join(`task-${taskId}`);
    console.log(`📌 Socket ${socket.id} joined task-${taskId}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

/* ------------------ MIDDLEWARES ------------------ */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

/* ------------------ ROUTES ------------------ */
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);


/* ------------------ HEALTH CHECK ------------------ */
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

/* ------------------ START SERVER ------------------ */
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
