import { Server as SocketIOServer } from "socket.io";
import type { Server as HTTPServer } from "http";
import type { Socket } from "socket.io";
import { sdk } from "./_core/sdk";
import * as db from "./db";

interface AuthenticatedSocket extends Socket {
  userId?: number;
  userEmail?: string;
}

let ioInstance: SocketIOServer | null = null;

export function getIO(): SocketIOServer {
  if (!ioInstance) {
    throw new Error("Socket.IO not initialized. Call setupWebSocket first.");
  }
  return ioInstance;
}

export function setupWebSocket(httpServer: HTTPServer) {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*", // In production, specify your frontend URL
      methods: ["GET", "POST"],
    },
  });
  
  ioInstance = io;

  // Authentication middleware
  io.use(async (socket: any, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error("Authentication required"));
      }

      // Verify session token using SDK
      const sessionInfo = await sdk.verifySession(token);
      
      if (!sessionInfo || !sessionInfo.openId) {
        return next(new Error("Invalid session"));
      }
      
      const user = await db.getUserByOpenId(sessionInfo.openId);
      
      if (!user) {
        return next(new Error("User not found"));
      }
      
      socket.userId = user.id;
      socket.userEmail = user.email || "Unknown";
      
      console.log(`[WebSocket] User ${socket.userEmail} (ID: ${user.id}) connected`);
      next();
    } catch (error) {
      console.error("[WebSocket] Authentication error:", error);
      next(new Error("Invalid token"));
    }
  });

  // Connection handler
  io.on("connection", (socket: any) => {
    const userId = socket.userId;
    
    // Join user-specific room for targeted notifications
    socket.join(`user:${userId}`);
    
    // Broadcast user online status
    io.emit("user:online", { userId, email: socket.userEmail });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`[WebSocket] User ${socket.userEmail} disconnected`);
      io.emit("user:offline", { userId });
    });

    // Community events
    socket.on("community:newPost", (data: any) => {
      // Broadcast new post to all connected clients
      io.emit("community:postCreated", {
        ...data,
        userId,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on("community:likePost", (data: { postId: number }) => {
      // Broadcast like update
      io.emit("community:postLiked", {
        postId: data.postId,
        userId,
      });
    });

    socket.on("community:newComment", (data: { postId: number; comment: string }) => {
      // Broadcast new comment
      io.emit("community:commentAdded", {
        ...data,
        userId,
        userEmail: socket.userEmail,
        timestamp: new Date().toISOString(),
      });
    });

    // Typing indicators
    socket.on("community:typing", (data: { postId: number }) => {
      socket.broadcast.emit("community:userTyping", {
        postId: data.postId,
        userId,
        userEmail: socket.userEmail,
      });
    });

    socket.on("community:stopTyping", (data: { postId: number }) => {
      socket.broadcast.emit("community:userStoppedTyping", {
        postId: data.postId,
        userId,
      });
    });
  });

  return io;
}

// Helper function to send notification to specific user
export function sendNotificationToUser(
  userId: number,
  notification: {
    type: string;
    title: string;
    message: string;
    link?: string;
  }
) {
  const io = getIO();
  io.to(`user:${userId}`).emit("notification:new", {
    ...notification,
    timestamp: new Date().toISOString(),
  });
}

// Helper function to broadcast community update
export function broadcastCommunityUpdate(
  event: string,
  data: any
) {
  const io = getIO();
  io.emit(event, {
    ...data,
    timestamp: new Date().toISOString(),
  });
}
