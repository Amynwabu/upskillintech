import { useState } from "react";
import { Link } from "wouter";
import { Calendar, MapPin, Users, Clock, ArrowLeft, Video, Building2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Events() {
  const [selectedType, setSelectedType] = useState("All");

  const eventTypes = ["All", "Webinar", "Workshop", "Conference", "Meetup"];

  const events = [
    {
      id: 1,
      title: "AI in Healthcare: Transforming Patient Care",
      type: "Webinar",
      date: "March 15, 2026",
      time: "2:00 PM - 3:30 PM EST",
      location: "Online",
      attendees: 250,
      speaker: "Dr. Sarah Mitchell",
      speakerTitle: "Chief AI Officer, MedTech Solutions",
      description: "Join us for an insightful webinar exploring how AI is revolutionizing healthcare delivery, from diagnostic tools to personalized treatment plans.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
      status: "Upcoming",
      registrationUrl: "#",
    },
    {
      id: 2,
      title: "Hands-On: Building Your First LLM Application",
      type: "Workshop",
      date: "March 18, 2026",
      time: "10:00 AM - 4:00 PM EST",
      location: "New York, NY",
      attendees: 50,
      speaker: "James Chen",
      speakerTitle: "Senior AI Engineer, TechCorp",
      description: "A full-day intensive workshop where you'll learn to build and deploy your own large language model application from scratch.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop",
      status: "Few Spots Left",
      registrationUrl: "#",
    },
    {
      id: 3,
      title: "AI Summit 2025: The Future of Intelligent Systems",
      type: "Conference",
      date: "April 20-22, 2026",
      time: "9:00 AM - 6:00 PM EST",
      location: "San Francisco, CA",
      attendees: 1500,
      speaker: "Multiple Speakers",
      speakerTitle: "Industry Leaders & Researchers",
      description: "The premier AI conference bringing together researchers, practitioners, and business leaders to explore the latest advances in artificial intelligence.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      status: "Early Bird",
      registrationUrl: "#",
    },
    {
      id: 4,
      title: "AI Ethics & Responsible Innovation Panel",
      type: "Webinar",
      date: "March 22, 2026",
      time: "1:00 PM - 2:30 PM EST",
      location: "Online",
      attendees: 300,
      speaker: "Panel Discussion",
      speakerTitle: "Ethics Experts & Policy Makers",
      description: "A thought-provoking panel discussion on the ethical implications of AI deployment and frameworks for responsible innovation.",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=400&fit=crop",
      status: "Upcoming",
      registrationUrl: "#",
    },
    {
      id: 5,
      title: "Local AI Community Meetup: March Edition",
      type: "Meetup",
      date: "March 28, 2026",
      time: "6:00 PM - 9:00 PM EST",
      location: "Boston, MA",
      attendees: 75,
      speaker: "Community Members",
      speakerTitle: "AI Practitioners & Enthusiasts",
      description: "Join fellow AI enthusiasts for networking, knowledge sharing, and lightning talks on the latest AI projects and innovations.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop",
      status: "Open",
      registrationUrl: "#",
    },
    {
      id: 6,
      title: "Computer Vision Masterclass: From Theory to Production",
      type: "Workshop",
      date: "April 10, 2026",
      time: "10:00 AM - 5:00 PM EST",
      location: "Seattle, WA",
      attendees: 40,
      speaker: "Dr. Emily Thompson",
      speakerTitle: "Computer Vision Researcher, AI Labs",
      description: "Master computer vision techniques with hands-on exercises covering image classification, object detection, and deployment strategies.",
      image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=400&fit=crop",
      status: "Upcoming",
      registrationUrl: "#",
    },
  ];

  const filteredEvents = events.filter((event) => {
    return selectedType === "All" || event.type === selectedType;
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case "Webinar":
        return Video;
      case "Workshop":
        return Users;
      case "Conference":
        return Building2;
      case "Meetup":
        return Globe;
      default:
        return Calendar;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Few Spots Left":
        return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      case "Early Bird":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      default:
        return "text-blue-500 bg-blue-500/10 border-blue-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-24 pb-12 border-b border-border">
        <div className="container">
          <Link href="/resources">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Button>
          </Link>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <Calendar className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-500">Events & Workshops</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Upcoming{" "}
              <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                AI Events
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              Connect with the AI community through webinars, workshops, conferences, and local meetups
            </p>

            {/* Featured Webinar CTA */}
            <div className="bg-gradient-to-r from-green-500/10 via-teal-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold mb-3">
                    <Video className="w-3 h-3" />
                    FEATURED WEBINAR
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Build the Right AI Skillset</h3>
                  <p className="text-muted-foreground mb-3">
                    Join Dr. Amaka Adiuku for a live session on January 17, 2026 • 7PM UK / 8PM Nigeria Time
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Learn AI skills that will help you work less and earn more
                  </p>
                </div>
                <Link href="/events/webinar">
                  <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 shadow-lg shadow-green-500/20">
                    Register Now - Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Type Filter */}
      <section className="py-6 border-b border-border bg-muted/30">
        <div className="container">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedType === type
                    ? "bg-green-500 text-white"
                    : "bg-card border border-border hover:border-green-500/50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map((event) => {
              const EventIcon = getEventIcon(event.type);
              return (
                <div
                  key={event.id}
                  className="group rounded-xl bg-card border border-border hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all overflow-hidden"
                >
                  {/* Event Image */}
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

                  {/* Event Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-green-500 transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Event Meta */}
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>

                    {/* Speaker */}
                    <div className="pt-4 border-t border-border mb-4">
                      <p className="text-sm font-medium">{event.speaker}</p>
                      <p className="text-xs text-muted-foreground">{event.speakerTitle}</p>
                    </div>

                    {/* CTA */}
                    <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90">
                      Register Now
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground">
                Try selecting a different event type
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Host an Event with Us</h2>
            <p className="text-muted-foreground mb-8">
              Want to share your AI expertise? Partner with us to host a workshop, webinar, or meetup
            </p>
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90">
              Propose an Event
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
