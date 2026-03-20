import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Building2,
  School,
  Church,
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  Sparkles,
  ArrowRight,
  MessageSquare,
  BarChart3,
  Rocket,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

export default function Consult() {
  const { user, isAuthenticated } = useAuth();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [bookingForm, setBookingForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    organization: "",
    serviceType: "",
    preferredDate: "",
    message: "",
  });

  const services = [
    {
      id: "sme",
      icon: Building2,
      title: "SME AI Transformation",
      description: "Transform your small or medium business with AI-powered workflows and automation",
      features: [
        "AI readiness assessment",
        "Custom AI strategy roadmap",
        "Workflow automation setup",
        "Team training & onboarding",
        "6-month implementation support",
      ],
      duration: "3-6 months",
      pricing: "From $5,000",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "school",
      icon: School,
      title: "Educational Institution AI Integration",
      description: "Empower educators and students with AI tools for modern learning",
      features: [
        "Curriculum AI integration plan",
        "Teacher training programs",
        "Student AI literacy workshops",
        "Learning management AI tools",
        "Ongoing support & resources",
      ],
      duration: "4-8 months",
      pricing: "From $8,000",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "ministry",
      icon: Church,
      title: "Ministry & Church AI Solutions",
      description: "Enhance ministry operations and community engagement with AI",
      features: [
        "Ministry operations assessment",
        "AI tools for sermon preparation",
        "Community engagement automation",
        "Volunteer management systems",
        "Customized training for staff",
      ],
      duration: "2-4 months",
      pricing: "From $3,500",
      color: "from-green-500 to-teal-500",
    },
  ];

  const consultationProcess = [
    {
      step: 1,
      title: "Discovery Call",
      description: "Free 30-minute consultation to understand your needs and goals",
      icon: MessageSquare,
    },
    {
      step: 2,
      title: "Assessment & Strategy",
      description: "Comprehensive analysis and custom AI transformation roadmap",
      icon: BarChart3,
    },
    {
      step: 3,
      title: "Implementation",
      description: "Hands-on setup, training, and deployment of AI solutions",
      icon: Rocket,
    },
    {
      step: 4,
      title: "Ongoing Support",
      description: "Continuous optimization and support for sustained success",
      icon: Sparkles,
    },
  ];

  const handleBookConsultation = (service: any) => {
    if (!isAuthenticated) {
      toast.error("Please login to book a consultation");
      return;
    }
    setSelectedService(service);
    setBookingForm({ ...bookingForm, serviceType: service.id });
    setShowBookingModal(true);
  };

  const submitBooking = () => {
    // Validate form
    if (!bookingForm.name || !bookingForm.email || !bookingForm.organization || !bookingForm.preferredDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Consultation request submitted! We'll contact you within 24 hours.");
    setShowBookingModal(false);
    setBookingForm({
      name: user?.name || "",
      email: user?.email || "",
      organization: "",
      serviceType: "",
      preferredDate: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-[76px] pb-12">
        {/* Hero Section */}
        <section className="py-16" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f7fef7 45%, #f0f9ff 100%)" }}>
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4" variant="secondary">
                  <Sparkles className="mr-1" size={14} />
                  Expert AI Consultation
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Transform Your Organization with AI
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Partner with our AI experts to design and implement custom strategies
                  tailored to your business, school, or ministry.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" onClick={() => setShowBookingModal(true)}>
                    <Calendar className="mr-2" size={20} />
                    Book Free Discovery Call
                  </Button>
                  <Button size="lg" variant="outline">
                    View Case Studies
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/mentoring-session.jpg"
                  alt="Professional AI consultation and mentoring session"
                  className="rounded-lg shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Consultation Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tailored AI transformation programs for different sectors
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Card key={service.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                        <Icon className="text-white" size={32} />
                      </div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Features */}
                        <div>
                          <h4 className="font-semibold mb-3">What's Included:</h4>
                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Details */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-foreground">{service.pricing}</span>
                          </div>
                        </div>

                        {/* CTA */}
                        <Button
                          className="w-full"
                          onClick={() => handleBookConsultation(service)}
                        >
                          Book Consultation
                          <ArrowRight className="ml-2" size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Consultation Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A proven 4-step approach to successful AI transformation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {consultationProcess.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <Icon className="text-primary" size={32} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
                <p className="text-muted-foreground text-lg">
                  Real results from organizations we've helped transform with AI integration and custom strategies.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/business-meeting.jpg"
                  alt="Successful business team meeting"
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Building2 className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Tech Startup</CardTitle>
                      <p className="text-sm text-muted-foreground">Lagos, Nigeria</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    "UpskillinTech helped us automate our customer service, reducing response time by 70% and saving 20 hours per week."
                  </p>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <div className="text-2xl font-bold text-primary">70%</div>
                      <div className="text-muted-foreground">Faster Response</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">20hrs</div>
                      <div className="text-muted-foreground">Saved Weekly</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <School className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Private School</CardTitle>
                      <p className="text-sm text-muted-foreground">London, UK</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    "Our teachers now use AI tools daily for lesson planning and student assessment. Student engagement increased by 45%."
                  </p>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <div className="text-2xl font-bold text-primary">45%</div>
                      <div className="text-muted-foreground">More Engagement</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">100%</div>
                      <div className="text-muted-foreground">Teacher Adoption</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Church className="text-green-600" size={24} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Community Church</CardTitle>
                      <p className="text-sm text-muted-foreground">Accra, Ghana</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    "AI-powered sermon planning and community management tools helped us reach 3x more people with our message."
                  </p>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <div className="text-2xl font-bold text-primary">3x</div>
                      <div className="text-muted-foreground">More Reach</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">50%</div>
                      <div className="text-muted-foreground">Time Saved</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16" style={{ background: "linear-gradient(90deg, #0D9488 0%, #16A34A 50%, #38B54A 100%)" }}>
          <div className="container">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Organization?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Book a free discovery call today and let's discuss how AI can drive your growth.
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setShowBookingModal(true)}
              >
                <Calendar className="mr-2" size={20} />
                Schedule Free Consultation
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Book Your Consultation</DialogTitle>
            <DialogDescription>
              Fill in your details and we'll get back to you within 24 hours to schedule your discovery call.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="organization">Organization Name *</Label>
              <Input
                id="organization"
                value={bookingForm.organization}
                onChange={(e) => setBookingForm({ ...bookingForm, organization: e.target.value })}
                placeholder="Your Company/School/Ministry"
              />
            </div>

            <div>
              <Label htmlFor="serviceType">Service Type *</Label>
              <Select value={bookingForm.serviceType} onValueChange={(value) => setBookingForm({ ...bookingForm, serviceType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sme">SME AI Transformation</SelectItem>
                  <SelectItem value="school">Educational Institution</SelectItem>
                  <SelectItem value="ministry">Ministry & Church</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="preferredDate">Preferred Date *</Label>
              <Input
                id="preferredDate"
                type="date"
                value={bookingForm.preferredDate}
                onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="message">Tell us about your needs</Label>
              <Textarea
                id="message"
                value={bookingForm.message}
                onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                placeholder="What challenges are you facing? What are your goals?"
                rows={4}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={submitBooking} className="flex-1">
                Submit Request
              </Button>
              <Button variant="outline" onClick={() => setShowBookingModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
