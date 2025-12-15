import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/_core/hooks/useAuth";
import { 
  ArrowLeft, 
  Mail, 
  Send, 
  Eye, 
  MousePointer, 
  AlertTriangle, 
  UserMinus,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  BarChart3,
  Activity
} from "lucide-react";

export default function AdminEmailAnalytics() {
  const { user } = useAuth();
  const [days, setDays] = useState(30);

  const { data, isLoading, refetch, isRefetching } = trpc.admin.getEmailAnalytics.useQuery(
    { days },
    { enabled: user?.role === "admin" }
  );

  // Check admin access
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Admin Access Required</h2>
            <p className="text-gray-600 mb-4">You need admin privileges to view email analytics.</p>
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const summary = data?.summary;
  const eventsByDate = data?.eventsByDate || [];
  const eventsByTemplate = data?.eventsByTemplate || [];
  const recentEvents = data?.recentEvents || [];

  // Calculate max values for chart scaling
  const maxDelivered = Math.max(...eventsByDate.map(d => d.delivered), 1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/emails">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Email Templates
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Email Analytics</h1>
                <p className="text-gray-600">Track email performance and engagement metrics</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Select value={String(days)} onValueChange={(v) => setDays(Number(v))}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => refetch()} disabled={isRefetching}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefetching ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Send className="w-4 h-4" />
                    <span className="text-sm">Total Sent</span>
                  </div>
                  <p className="text-2xl font-bold">{summary?.totalSent || 0}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-green-600 mb-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">Delivered</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{summary?.delivered || 0}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Opened</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{summary?.opened || 0}</p>
                  <p className="text-xs text-gray-500">{summary?.openRate || 0}% rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-purple-600 mb-2">
                    <MousePointer className="w-4 h-4" />
                    <span className="text-sm">Clicked</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{summary?.clicked || 0}</p>
                  <p className="text-xs text-gray-500">{summary?.clickRate || 0}% rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-red-600 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">Bounced</span>
                  </div>
                  <p className="text-2xl font-bold text-red-600">{summary?.bounced || 0}</p>
                  <p className="text-xs text-gray-500">{summary?.bounceRate || 0}% rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-orange-600 mb-2">
                    <UserMinus className="w-4 h-4" />
                    <span className="text-sm">Unsubscribed</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{summary?.unsubscribed || 0}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-yellow-600 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">Spam Reports</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-600">{summary?.spamReports || 0}</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Performance Over Time */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Performance Over Time
                  </CardTitle>
                  <CardDescription>Daily email events for the selected period</CardDescription>
                </CardHeader>
                <CardContent>
                  {eventsByDate.length === 0 ? (
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      <p>No email events recorded yet</p>
                    </div>
                  ) : (
                    <div className="h-64 relative">
                      {/* Simple bar chart */}
                      <div className="flex items-end justify-between h-48 gap-1 px-2">
                        {eventsByDate.slice(-14).map((day, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div 
                              className="w-full bg-green-500 rounded-t transition-all"
                              style={{ height: `${(day.delivered / maxDelivered) * 100}%`, minHeight: day.delivered > 0 ? "4px" : "0" }}
                              title={`Delivered: ${day.delivered}`}
                            />
                            <div 
                              className="w-full bg-blue-500 rounded-t transition-all"
                              style={{ height: `${(day.opened / maxDelivered) * 100}%`, minHeight: day.opened > 0 ? "4px" : "0" }}
                              title={`Opened: ${day.opened}`}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
                        {eventsByDate.slice(-14).map((day, i) => (
                          <span key={i} className="flex-1 text-center truncate">
                            {new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 justify-center mt-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded" />
                          <span>Delivered</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded" />
                          <span>Opened</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Events by Template */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Events by Template
                  </CardTitle>
                  <CardDescription>Distribution of events across email templates</CardDescription>
                </CardHeader>
                <CardContent>
                  {eventsByTemplate.length === 0 ? (
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      <p>No template data available</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {eventsByTemplate.map((template, i) => {
                        const maxCount = Math.max(...eventsByTemplate.map(t => t.count));
                        const percentage = (template.count / maxCount) * 100;
                        const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500"];
                        return (
                          <div key={i}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium capitalize">
                                {template.templateType.replace(/_/g, " ")}
                              </span>
                              <span className="text-gray-600">{template.count} events</span>
                            </div>
                            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${colors[i % colors.length]} transition-all`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Events Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Email Events</CardTitle>
                <CardDescription>Latest 20 email events received from SendGrid</CardDescription>
              </CardHeader>
              <CardContent>
                {recentEvents.length === 0 ? (
                  <div className="py-8 text-center text-gray-500">
                    <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No email events recorded yet</p>
                    <p className="text-sm mt-2">Events will appear here once SendGrid webhook is configured</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 font-medium">Time</th>
                          <th className="text-left py-3 px-2 font-medium">Email</th>
                          <th className="text-left py-3 px-2 font-medium">Event</th>
                          <th className="text-left py-3 px-2 font-medium">Template</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentEvents.map((event: any, i: number) => (
                          <tr key={i} className="border-b last:border-0">
                            <td className="py-3 px-2 text-gray-600">
                              {new Date(event.timestamp).toLocaleString()}
                            </td>
                            <td className="py-3 px-2 font-mono text-xs">{event.email}</td>
                            <td className="py-3 px-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                event.eventType === "delivered" ? "bg-green-100 text-green-700" :
                                event.eventType === "open" ? "bg-blue-100 text-blue-700" :
                                event.eventType === "click" ? "bg-purple-100 text-purple-700" :
                                event.eventType === "bounce" ? "bg-red-100 text-red-700" :
                                "bg-gray-100 text-gray-700"
                              }`}>
                                {event.eventType}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-gray-600 capitalize">
                              {event.templateType?.replace(/_/g, " ") || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Setup Instructions */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">SendGrid Webhook Setup</CardTitle>
              </CardHeader>
              <CardContent className="text-blue-700">
                <p className="mb-4">To receive email events, configure the SendGrid Event Webhook:</p>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Go to SendGrid Dashboard → Settings → Mail Settings → Event Webhook</li>
                  <li>Set HTTP Post URL to: <code className="bg-blue-100 px-2 py-1 rounded">{window.location.origin}/api/webhooks/sendgrid</code></li>
                  <li>Select events: Processed, Dropped, Delivered, Deferred, Bounce, Open, Click, Spam Report, Unsubscribe</li>
                  <li>Enable the webhook and save</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
