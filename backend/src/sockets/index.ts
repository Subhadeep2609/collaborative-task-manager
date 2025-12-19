import { Server, Socket } from "socket.io";

const onlineUsers = new Map<string, string>();

export const initSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("🔌 Socket connected:", socket.id);

    socket.on("register", (userId: string) => {
      onlineUsers.set(userId, socket.id);
      console.log(`👤 User ${userId} registered to socket`);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      console.log("❌ Socket disconnected:", socket.id);
    });
  });
};

export const getUserSocket = (userId: string) => {
  return onlineUsers.get(userId);
};
