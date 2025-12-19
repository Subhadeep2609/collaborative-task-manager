import { io, Socket } from "socket.io-client";

/**
 * Socket instance (singleton)
 */
let socket: Socket | null = null;

/**
 * Get socket instance (lazy initialized)
 */
export const getSocket = () => {
  if (!socket) {
    socket = io(
      import.meta.env.VITE_SOCKET_URL || "http://localhost:8000",
      {
        withCredentials: true,
        autoConnect: false, // 🔥 IMPORTANT: prevent duplicate connections
      }
    );
  }

  return socket;
};

/**
 * Connect socket manually
 */
export const connectSocket = () => {
  const s = getSocket();

  if (!s.connected) {
    s.connect();
  }

  return s;
};

/**
 * Disconnect socket safely
 */
export const disconnectSocket = () => {
  if (socket && socket.connected) {
    socket.disconnect();
  }
};
