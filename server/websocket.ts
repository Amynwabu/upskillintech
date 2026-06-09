import { COOKIE_NAME } from "@shared/const";
import { parse as parseCookieHeader } from "cookie";
import type { Server as HTTPServer } from "http";
import { Server as SocketIOServer, type Socket } from "socket.io";
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

function getSessionToken(socket: Socket) {
  const cookieHeader = socket.handshake.headers.cookie;
  const cookies = cookieHeader ? parseCookieHeader(cookieHeader) : {};
  const cookieToken = cookies[COOKIE_NAME];
  const authToken = socket.handshake.auth?.token;

  return typeof cookieToken === "string"
    ? cookieToken
    : typeof authToken === "string"
      ? authToken
      : undefined;
}

export function setupWebSocket(httpServer: HTTPServer) {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: true,
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  ioInstance = io;

  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = getSessionToken(socket);

      if (!token) {
        return next(new Error("Authentication required"));
      }

      const sessionInfo = await sdk.verifySession(token);

      if (!sessionInfo?.openId) {
        return next(new Error("Invalid session"));
      }

      let user = await db.getUserByOpenId(sessionInfo.openId);

      if (!user) {
        const userInfo = await sdk.getUserInfoWithJwt(token);
        await db.upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: new Date(),
        });
        user = await db.getUserByOpenId(userInfo.openId);
      }

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

  io.on("connection", (socket: AuthenticatedSocket) => {
    const userId = socket.userId;

    socket.join(`user:${userId}`);
    io.emit("user:online", { userId, email: socket.userEmail });

    socket.on("disconnect", () => {
      console.log(`[WebSocket] User ${socket.userEmail} disconnected`);
      io.emit("user:offline", { userId });
    });

    socket.on("community:newPost", (data: unknown) => {
      io.emit("community:postCreated", {
        ...(typeof data === "object" && data ? data : {}),
        userId,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on("community:likePost", (data: { postId: number }) => {
      io.emit("community:postLiked", {
        postId: data.postId,
        userId,
      });
    });

    socket.on("community:newComment", (data: { postId: number; comment: string }) => {
      io.emit("community:commentAdded", {
        ...data,
        userId,
        userEmail: socket.userEmail,
        timestamp: new Date().toISOString(),
      });
    });

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

export function broadcastCommunityUpdate(event: string, data: unknown) {
  const io = getIO();
  io.emit(event, {
    ...(typeof data === "object" && data ? data : {}),
    timestamp: new Date().toISOString(),
  });
}
