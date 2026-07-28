import { CalendarPlus, Download } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function WebinarCalendarButtons({ slug }: { slug: string }) {
  const { data } = trpc.webinar.calendar.useQuery({ slug });
  const download = () => {
    if (!data?.ics) return;
    const blob = new Blob([data.ics], { type: "text/calendar;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = data.filename;
    link.click();
    URL.revokeObjectURL(href);
  };
  if (!data?.links) return null;
  return (
    <div className="webinar-action-row" aria-label="Add webinar to calendar">
      <a className="webinar-button webinar-button--secondary" href={data.links.google} target="_blank" rel="noreferrer">
        <CalendarPlus size={18} /> Google Calendar
      </a>
      <a className="webinar-button webinar-button--secondary" href={data.links.outlook} target="_blank" rel="noreferrer">
        <CalendarPlus size={18} /> Outlook
      </a>
      <button className="webinar-button webinar-button--secondary" type="button" onClick={download}>
        <Download size={18} /> Download .ics
      </button>
    </div>
  );
}

