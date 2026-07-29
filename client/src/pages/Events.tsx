import { useState } from "react";
import { Link } from "wouter";
import { Calendar, MapPin, Users, Clock, Video, Building2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Events() {
  const [selectedType, setSelectedType] = useState("All");

  const eventTypes = ["All", "Webinar", "Workshop", "Conference", "Meetup"];

  const events = [
    {
      id: 1,
      title: "AI in Healthcare: Transforming Patient Care",
      type: "Webinar",
      date: "December 15, 2025",
      time: "2:00 PM - 3:30 PM EST",
      location: "Online",
      attendees: 250,
      speaker: "Dr. Sarah Mitchell",
      speakerTitle: "Chief AI Officer, MedTech Solutions",
      description: "Join us for an insightful webinar exploring how AI is revolutionizing healthcare delivery, from diagnostic tools to personalized treatment plans.",
      image: "/community-engagement.jpg",
      status: "Upcoming",
      registrationUrl: "#",
    },
    {
      id: 2,
      title: "Hands-On: Building Your First LLM Application",
      type: "Workshop",
      date: "December 18, 2025",
      time: "10:00 AM - 4:00 PM EST",
      location: "New York, NY",
      attendees: 50,
      speaker: "James Chen",
      speakerTitle: "Senior AI Engineer, TechCorp",
      description: "A full-day intensive workshop where you'll learn to build and deploy your own large language model application from scratch.",
      image: "/training-diverse-team.jpg",
      status: "Few Spots Left",
      registrationUrl: "#",
    },
    {
      id: 3,
      title: "AI Summit 2026: The Future of Intelligent Systems",
      type: "Conference",
      date: "January 20-22, 2026",
      time: "9:00 AM - 6:00 PM EST",
      location: "San Francisco, CA",
      attendees: 1500,
      speaker: "Multiple Speakers",
      speakerTitle: "Industry Leaders & Researchers",
      description: "The premier AI conference bringing together researchers, practitioners, and business leaders to explore the latest advances in artificial intelligence.",
      image: "/networking-event.jpg",
      status: "Early Bird",
      registrationUrl: "#",
    },
    {
      id: 4,
      title: "AI Ethics & Responsible Innovation Panel",
      type: "Webinar",
      date: "December 22, 2025",
      time: "1:00 PM - 2:30 PM EST",
      location: "Online",
      attendees: 300,
      speaker: "Panel Discussion",
      speakerTitle: "Ethics Experts & Policy Makers",
      description: "A thought-provoking panel discussion on the ethical implications of AI deployment and frameworks for responsible innovation.",
      image: "/community-engagement.jpg",
      status: "Upcoming",
      registrationUrl: "#",
    },
    {
      id: 5,
      title: "Local AI Community Meetup: December Edition",
      type: "Meetup",
      date: "December 28, 2025",
      time: "6:00 PM - 9:00 PM EST",
      location: "London, UK",
      attendees: 75,
      speaker: "Community Members",
      speakerTitle: "AI Practitioners & Enthusiasts",
      description: "Join fellow AI enthusiasts for networking, knowledge sharing, and lightning talks on the latest AI projects and innovations.",
      image: "/networking-event.jpg",
      status: "Open",
      registrationUrl: "#",
    },
    {
      id: 6,
      title: "AI Productivity Masterclass",
      type: "Webinar",
      date: "January 17, 2026",
      time: "7:00 PM Europe/London",
      location: "Online",
      attendees: 500,
      speaker: "Dr. Amaka Adiuku",
      speakerTitle: "Founder, UpskillinTech | AI Researcher & Lecturer",
      description: "Learn the AI skills that help you work smarter, save hours every week, and stay ahead in your career — without needing a technical background.",
      image: "/networking-event.jpg",
      status: "Upcoming",
      registrationUrl: "/resources/webinars",
    },
  ];

  const filteredEvents = events.filter((event) => {
    return selectedType === "All" || event.type === selectedType;
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case "Webinar": return Video;
      case "Workshop": return Users;
      case "Conference": return Building2;
      case "Meetup": return Globe;
      default: return Calendar;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Few Spots Left": return "text-[#859D30] bg-[#F4F7EA]0/10 border-[#859D30]";
      case "Early Bird": return "text-green-600 bg-green-500/10 border-green-500/20";
      default: return "text-[#859D30] bg-[#F4F7EA]0/10 border-[#859D30]";
    }
  };

  return (
    <div className="min-h-screen bg-[#07100B]">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 border-b border-[#1F2937]" style={{ background: "linear-gradient(135deg, #f0fdfc 0%, #F4F7EA 100%)" }}>
        <div className="container">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(133, 157, 48,0.10)", border: "1px solid rgba(133, 157, 48,0.25)" }}>
              <Calendar className="w-4 h-4" style={{ color: "#859D30" }} />
              <span className="text-sm font-semibold" style={{ fontFamily: "'Sora', sans-serif", color: "#859D30" }}>Events &amp; Workshops</span>
            </div>

            <h1 className="mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              Upcoming{" "}
              <span style={{ background: "linear-gradient(135deg, #859D30, #859D30)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                AI Events
              </span>
            </h1>

            <p className="mb-8" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.2rem", color: "#9CA3AF" }}>
              Connect with the AI community through webinars, workshops, conferences, and local meetups — all focused on practical AI adoption.
            </p>

            {/* Featured Webinar CTA */}
            <div className="rounded-2xl p-6 md:p-8" style={{ background: "linear-gradient(135deg, rgba(133, 157, 48,0.08), rgba(133, 157, 48,0.08))", border: "1px solid rgba(133, 157, 48,0.20)" }}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-semibold mb-3" style={{ background: "#859D30" }}>
                    <Video className="w-3 h-3" />
                    FEATURED EVENT
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Sora', sans-serif", color: "#F3F4F6" }}>
                    AI Productivity Masterclass
                  </h3>
                  <p className="mb-2" style={{ fontFamily: "'DM Sans', sans-serif", color: "#9CA3AF" }}>
                    With Dr. Amaka Adiuku · January 17, 2026 · 7PM Europe/London
                  </p>
                  <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: "#9CA3AF" }}>
                    Learn AI skills that help you work less and achieve more
                  </p>
                </div>
                <Link href="/resources/webinars">
                  <Button size="lg" className="font-semibold px-8" style={{ background: "#859D30", color: "white" }}>
                    Register Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Type Filter */}
      <section className="py-5 border-b border-[#1F2937] bg-[#07100B]">
        <div className="container">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedType === type ? "text-white" : "bg-[#07100B] border border-[#1F2937] text-gray-600 hover:border-[#859D30]"
                }`}
                style={selectedType === type ? { background: "#859D30", fontFamily: "'Sora', sans-serif" } : { fontFamily: "'Sora', sans-serif" }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-14">
        <div className="container">
          <p className="mb-8" style={{ fontFamily: "'DM Sans', sans-serif", color: "#9CA3AF", fontSize: "0.95rem" }}>
            Showing {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map((event) => {
              const EventIcon = getEventIcon(event.type);
              return (
                <div
                  key={event.id}
                  className="group rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-xl"
                  style={{ background: "#07100B", borderColor: "#E5E7EB" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(133, 157, 48,0.4)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB"; }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                        {event.status}
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm flex items-center gap-2">
                        <EventIcon className="w-3 h-3" />
                        {event.type}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 transition-colors group-hover:text-[#859D30]" style={{ fontFamily: "'Sora', sans-serif", color: "#F3F4F6" }}>
                      {event.title}
                    </h3>
                    <p className="text-sm mb-4 line-clamp-2" style={{ fontFamily: "'DM Sans', sans-serif", color: "#9CA3AF" }}>
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4 text-sm">
                      {[
                        { Icon: Calendar, text: event.date },
                        { Icon: Clock, text: event.time },
                        { Icon: MapPin, text: event.location },
                        { Icon: Users, text: `${event.attendees} attendees` },
                      ].map(({ Icon, text }) => (
                        <div key={text} className="flex items-center gap-2" style={{ color: "#9CA3AF" }}>
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 mb-4" style={{ borderTop: "1px solid #F3F4F6" }}>
                      <p className="text-sm font-semibold" style={{ fontFamily: "'Sora', sans-serif", color: "#F3F4F6" }}>{event.speaker}</p>
                      <p className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif", color: "#9CA3AF" }}>{event.speakerTitle}</p>
                    </div>

                    <a
                      href={event.registrationUrl}
                      className="block w-full text-center font-bold rounded-xl px-6 py-3 transition-all"
                      style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.95rem", background: "#859D30", color: "white", textDecoration: "none" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#859D30"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#859D30"; }}
                    >
                      Register Now
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>No events found</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#9CA3AF" }}>Try selecting a different event type</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "#07100B" }}>
        <div className="container max-w-3xl text-center">
          <h2 className="mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Host an Event with Us</h2>
          <p className="mb-8" style={{ fontFamily: "'DM Sans', sans-serif", color: "#9CA3AF" }}>
            Want to share your AI expertise? Partner with UpskillinTech to host a workshop, webinar, or meetup for our community.
          </p>
          <a href="/contact" className="btn-primary" style={{ fontSize: "1rem" }}>
            Propose an Event
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
