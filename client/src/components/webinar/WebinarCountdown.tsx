import { useEffect, useMemo, useState } from "react";
import type { PublicWebinar } from "@shared/webinar";
import { getWebinarPhase } from "@shared/webinar";

function remaining(target: Date | null) {
  if (!target) return null;
  const difference = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

export default function WebinarCountdown({
  webinar,
  compact = false,
}: {
  webinar: PublicWebinar;
  compact?: boolean;
}) {
  const target = useMemo(
    () => webinar.eventStartAt ? new Date(webinar.eventStartAt) : null,
    [webinar.eventStartAt],
  );
  const [time, setTime] = useState(() => remaining(target));

  useEffect(() => {
    setTime(remaining(target));
    if (!target) return;
    const interval = window.setInterval(() => setTime(remaining(target)), 1000);
    return () => window.clearInterval(interval);
  }, [target]);

  const phase = getWebinarPhase({
    ...webinar,
    eventStartAt: target,
    eventEndAt: webinar.eventEndAt ? new Date(webinar.eventEndAt) : null,
    registrationOpensAt: webinar.registrationOpensAt ? new Date(webinar.registrationOpensAt) : null,
    registrationClosesAt: webinar.registrationClosesAt ? new Date(webinar.registrationClosesAt) : null,
  });
  if (!time || phase === "date_pending") {
    return <p className="webinar-countdown-message">Date and UK time will be announced soon.</p>;
  }
  if (phase === "cancelled") return <p className="webinar-countdown-message">This webinar has been cancelled.</p>;
  if (phase === "completed") return <p className="webinar-countdown-message">This live webinar has ended.</p>;
  if (phase === "live") return <p className="webinar-countdown-message">We’re live now.</p>;

  return (
    <div className={`webinar-countdown ${compact ? "webinar-countdown--compact" : ""}`} aria-label="Time remaining until the webinar">
      {Object.entries(time).map(([label, value]) => (
        <div className="webinar-countdown__unit" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
      <noscript>The live countdown requires JavaScript. Please check the event date shown above.</noscript>
    </div>
  );
}

