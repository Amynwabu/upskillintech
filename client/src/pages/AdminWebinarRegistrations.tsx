import { useEffect, useMemo, useState } from "react";
import { Calendar, Download, Mail, RefreshCw, Search, Users } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNotifications } from "@/hooks/useNotifications";

type RegistrationStatus = "registered" | "waitlisted" | "cancelled" | "attended" | "no_show";

export default function AdminWebinarRegistrations() {
  const { showNotification } = useNotifications();
  const utils = trpc.useUtils();
  const [webinarId, setWebinarId] = useState<number>();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<RegistrationStatus | "all">("all");
  const webinarsQuery = trpc.webinar.adminWebinars.useQuery();
  useEffect(() => {
    if (!webinarId && webinarsQuery.data?.[0]) setWebinarId(webinarsQuery.data[0].id);
  }, [webinarId, webinarsQuery.data]);
  const listQuery = trpc.webinar.adminList.useQuery({
    webinarId,
    search: search || undefined,
    status: status === "all" ? undefined : status,
    limit: 500,
  });
  const registrations = listQuery.data ?? [];
  const selectedWebinar = webinarsQuery.data?.find(item => item.id === webinarId);
  const today = new Date().toDateString();
  const stats = useMemo(() => ({
    total: registrations.length,
    today: registrations.filter(item => new Date(item.registration.createdAt).toDateString() === today).length,
    marketingRate: registrations.length
      ? Math.round(registrations.filter(item => item.registration.marketingConsent).length / registrations.length * 100)
      : 0,
    confirmations: registrations.filter(item => item.confirmationStatus === "sent" || item.confirmationStatus === "delivered").length,
  }), [registrations, today]);

  const attendance = trpc.webinar.attendance.useMutation({
    async onSuccess() {
      await utils.webinar.adminList.invalidate();
      showNotification("Updated", "Registration status updated.", "success");
    },
  });
  const resend = trpc.webinar.resendConfirmation.useMutation({
    onSuccess() {
      showNotification("Queued", "A new confirmation email has been queued.", "success");
    },
  });
  const exportCsv = trpc.webinar.exportCsv.useQuery(
    { webinarId: webinarId ?? 0 },
    { enabled: false },
  );
  const download = async () => {
    if (!webinarId) return;
    const result = await exportCsv.refetch();
    if (!result.data) return;
    const blob = new Blob([result.data.csv], { type: "text/csv;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = result.data.filename;
    link.click();
    URL.revokeObjectURL(href);
  };

  return (
    <div className="surface-light min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Webinar administration</h1>
            <p className="mt-2 text-muted-foreground">Registrations, delivery status, attendance and protected exports.</p>
          </div>
          <Select value={webinarId?.toString()} onValueChange={value => setWebinarId(Number(value))}>
            <SelectTrigger className="w-full bg-white md:w-[360px]"><SelectValue placeholder="Select a webinar" /></SelectTrigger>
            <SelectContent>{webinarsQuery.data?.map(item => <SelectItem key={item.id} value={String(item.id)}>{item.title}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric title="Total registrations" value={stats.total} note={selectedWebinar?.status ?? "No webinar selected"} icon={Users} />
          <Metric title="Registrations today" value={stats.today} note="Local admin timezone" icon={Calendar} />
          <Metric title="Marketing consent" value={`${stats.marketingRate}%`} note="Optional consent rate" icon={Users} />
          <Metric title="Confirmations sent" value={stats.confirmations} note={`of ${stats.total}`} icon={Mail} />
        </div>

        <Card className="surface-light mb-6">
          <CardContent className="flex flex-col gap-3 pt-6 md:flex-row">
            <div className="relative flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input className="pl-9" placeholder="Search by normalised email" value={search} onChange={event => setSearch(event.target.value)} /></div>
            <Select value={status} onValueChange={value => setStatus(value as typeof status)}>
              <SelectTrigger className="md:w-[210px]"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="all">All statuses</SelectItem>{["registered", "waitlisted", "attended", "no_show", "cancelled"].map(item => <SelectItem key={item} value={item}>{item.replace("_", " ")}</SelectItem>)}</SelectContent>
            </Select>
            <Button variant="outline" onClick={() => listQuery.refetch()}><RefreshCw className="mr-2 h-4 w-4" />Refresh</Button>
            <Button onClick={download} disabled={!webinarId}><Download className="mr-2 h-4 w-4" />Export CSV</Button>
          </CardContent>
        </Card>

        <Card className="surface-light">
          <CardHeader><CardTitle>Registration list</CardTitle><CardDescription>Only authenticated administrators can load or change this data.</CardDescription></CardHeader>
          <CardContent>
            {listQuery.isLoading ? <p className="py-12 text-center text-muted-foreground">Loading registrations…</p> : registrations.length ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader><TableRow><TableHead>Participant</TableHead><TableHead>Role / source</TableHead><TableHead>Status</TableHead><TableHead>Email delivery</TableHead><TableHead>Registered</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                  <TableBody>{registrations.map(item => {
                    const reg = item.registration;
                    return (
                      <TableRow key={reg.id}>
                        <TableCell><strong>{reg.firstName ?? reg.name} {reg.lastName}</strong><div className="text-xs text-muted-foreground">{reg.email}</div></TableCell>
                        <TableCell>{reg.role || "—"}<div className="text-xs text-muted-foreground">{reg.utmSource || "Direct / unknown"}</div></TableCell>
                        <TableCell><select className="rounded border bg-white p-1 text-sm" value={reg.registrationStatus} onChange={event => attendance.mutate({ registrationId: reg.id, status: event.target.value as RegistrationStatus })}><option value="registered">registered</option><option value="waitlisted">waitlisted</option><option value="attended">attended</option><option value="no_show">no show</option><option value="cancelled">cancelled</option></select></TableCell>
                        <TableCell><div className="text-xs">Confirmation: {item.confirmationStatus}</div><div className="text-xs">48h: {item.reminderTwoDayStatus}</div><div className="text-xs">1h: {item.reminderOneHourStatus}</div></TableCell>
                        <TableCell className="whitespace-nowrap">{new Date(reg.createdAt).toLocaleString()}</TableCell>
                        <TableCell><Button size="sm" variant="outline" onClick={() => resend.mutate({ registrationId: reg.id })}>Resend</Button></TableCell>
                      </TableRow>
                    );
                  })}</TableBody>
                </Table>
              </div>
            ) : <div className="py-12 text-center text-muted-foreground"><Users className="mx-auto mb-3 h-10 w-10" />No registrations match these filters.</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Metric({ title, value, note, icon: Icon }: { title: string; value: string | number; note: string; icon: typeof Users }) {
  return <Card className="surface-light"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm">{title}</CardTitle><Icon className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{value}</div><p className="text-xs text-muted-foreground">{note}</p></CardContent></Card>;
}
