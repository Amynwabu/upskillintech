import { useState, useEffect } from "react";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export function useNotifications() {
  const { on, off, isConnected } = useWebSocket();
  const [unreadCount, setUnreadCount] = useState(0);
  const utils = trpc.useUtils();

  // Fetch initial notifications
  const { data: notifications = [] } = trpc.notifications.list.useQuery(undefined, {
    enabled: isConnected,
  });

  // Mark notification as read mutation
  const markAsRead = trpc.notifications.markAsRead.useMutation({
    onSuccess: () => {
      utils.notifications.list.invalidate();
    },
  });

  // Mark all as read mutation
  const markAllAsRead = trpc.notifications.markAllAsRead.useMutation({
    onSuccess: () => {
      utils.notifications.list.invalidate();
      setUnreadCount(0);
    },
  });

  // Calculate unread count
  useEffect(() => {
    const count = notifications.filter((n: any) => !n.isRead).length;
    setUnreadCount(count);
  }, [notifications]);

  // Listen for new notifications from WebSocket
  useEffect(() => {
    if (!isConnected) return;

    const handleNewNotification = (notification: Notification) => {
      console.log("[Notifications] New notification received:", notification);
      
      // Show toast notification
      toast(notification.title, {
        description: notification.message,
        action: notification.link ? {
          label: "View",
          onClick: () => window.location.href = notification.link!,
        } : undefined,
      });

      // Increment unread count
      setUnreadCount(prev => prev + 1);

      // Invalidate notifications query to refetch
      utils.notifications.list.invalidate();
    };

    on("notification:new", handleNewNotification);

    return () => {
      off("notification:new", handleNewNotification);
    };
  }, [isConnected, on, off, utils]);

  return {
    notifications,
    unreadCount,
    markAsRead: (id: number) => markAsRead.mutate({ id }),
    markAllAsRead: () => markAllAsRead.mutate(),
  };
}
