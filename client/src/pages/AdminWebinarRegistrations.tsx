import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Users, Calendar, Mail } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useNotifications } from "@/hooks/useNotifications";

export default function AdminWebinarRegistrations() {
  const { showNotification } = useNotifications();
  const { data: registrations, isLoading } = trpc.webinar.exportRegistrations.useQuery();

  const exportToExcel = () => {
    if (!registrations || registrations.length === 0) {
      showNotification("No Data", "There are no registrations to export.", "error");
      return;
    }

    // Create CSV content
    const headers = ["ID", "Name", "Email", "Phone", "Company", "Role", "Webinar Title", "Webinar Date", "Registered At"];
    const rows = registrations.map((reg) => [
      reg.id,
      reg.name,
      reg.email,
      reg.phone || "",
      reg.company || "",
      reg.role || "",
      reg.webinarTitle,
      reg.webinarDate,
      new Date(reg.createdAt).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `webinar-registrations-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification("Export Successful", `Exported ${registrations.length} registrations to CSV.`, "success");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading registrations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Webinar Registrations</h1>
          <p className="text-muted-foreground">
            Manage and export registrations for "Build the Right AI Skillset" webinar
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{registrations?.length || 0}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Event Date</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Jan 17</div>
              <p className="text-xs text-muted-foreground">7PM UK / 8PM Nigeria</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmations Sent</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {registrations?.filter((r) => r.confirmationSent).length || 0}
              </div>
              <p className="text-xs text-muted-foreground">Email confirmations</p>
            </CardContent>
          </Card>
        </div>

        {/* Export Button */}
        <div className="mb-6">
          <Button onClick={exportToExcel} className="gap-2">
            <Download className="w-4 h-4" />
            Export to Excel (CSV)
          </Button>
        </div>

        {/* Registrations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Registration List</CardTitle>
            <CardDescription>
              All registered participants for the webinar
            </CardDescription>
          </CardHeader>
          <CardContent>
            {registrations && registrations.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Registered At</TableHead>
                      <TableHead>Confirmed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.map((reg) => (
                      <TableRow key={reg.id}>
                        <TableCell className="font-medium">{reg.id}</TableCell>
                        <TableCell>{reg.name}</TableCell>
                        <TableCell>{reg.email}</TableCell>
                        <TableCell>{reg.phone || "-"}</TableCell>
                        <TableCell>{reg.company || "-"}</TableCell>
                        <TableCell>{reg.role || "-"}</TableCell>
                        <TableCell>{new Date(reg.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          {reg.confirmationSent ? (
                            <span className="text-green-600 font-medium">✓ Sent</span>
                          ) : (
                            <span className="text-gray-400">Pending</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No registrations yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
