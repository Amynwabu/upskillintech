import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Blog from "./pages/Blog";
import AIGuides from "./pages/AIGuides";
import CaseStudies from "./pages/CaseStudies";
import Webinars from "./pages/Webinars";
import WorkflowsPage from "./pages/Workflows";
import About from "./pages/About";
import Enterprise from "./pages/Enterprise";
import Contact from "./pages/Contact";
import Programs from "./pages/Programs";
import Community from "./pages/Community";
import Newsletter from "./pages/Newsletter";
import NewsletterArticle from "./pages/NewsletterArticle";
import NewsletterArchive from "./pages/NewsletterArchive";
import Events from "./pages/Events";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/Learn";
import LearningPath from "./pages/LearningPath";
import LearningPlayer from "./pages/LearningPlayer";
import CourseDetail from "./pages/CourseDetail";
import BlogPost from "./pages/BlogPost";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
import Consult from "./pages/Consult";
import Transform from "./pages/Transform";
import Research from "./pages/Research";
import Templates from "./pages/Templates";
import WebinarRegistration from "./pages/WebinarRegistration";
import NewsletterPreferences from "./pages/NewsletterPreferences";
import AdminEmails from "./pages/AdminEmails";
import AdminEmailAnalytics from "./pages/AdminEmailAnalytics";
import AdminWebinarRegistrations from "./pages/AdminWebinarRegistrations";

function Router() {
  return (
    <Switch>
      {/* Core */}
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/contact"} component={Contact} />

      {/* Resources & Content */}
      <Route path={"/resources"} component={Resources} />
      <Route path={"/resources/blog"} component={Blog} />
      <Route path={"/resources/ai-guides"} component={AIGuides} />
      <Route path={"/resources/case-studies"} component={CaseStudies} />
      <Route path={"/resources/webinars"} component={Webinars} />
      <Route path={"/resources/workflows"} component={WorkflowsPage} />
      <Route path={"/resources/research"} component={Research} />
      <Route path={"/resources/templates"} component={Templates} />
      <Route path={"/blog/:slug"} component={BlogPost} />

      {/* Programs & Learning */}
      <Route path={"/programs"} component={Programs} />
      <Route path={"/enterprise"} component={Enterprise} />
      <Route path={"/learn"} component={Learn} />
      <Route path={"/learn/:pathId"} component={LearningPath} />
      <Route path={"/learn/:courseId/player"} component={LearningPlayer} />
      <Route path={"/courses/:id"} component={CourseDetail} />

      {/* Community & Events */}
      <Route path={"/community"} component={Community} />
      <Route path={"/events"} component={Events} />

      {/* Consulting & AI Tools */}
      <Route path={"/consult"} component={Consult} />
      <Route path={"/transform"} component={Transform} />

      {/* Newsletter */}
      <Route path={"/newsletter"} component={Newsletter} />
      <Route path={"/newsletter/archive"} component={NewsletterArchive} />
      <Route path={"/newsletter/preferences"} component={NewsletterPreferences} />
      <Route path={"/newsletter/:slug"} component={NewsletterArticle} />

      {/* Webinars */}
      <Route path={"/resources/webinars/:id/register"} component={WebinarRegistration} />

      {/* User */}
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/onboarding"} component={Onboarding} />

      {/* Admin */}
      <Route path={"/admin/emails"} component={AdminEmails} />
      <Route path={"/admin/email-analytics"} component={AdminEmailAnalytics} />
      <Route path={"/admin/webinar-registrations"} component={AdminWebinarRegistrations} />

      {/* Legal */}
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/cookies"} component={Cookies} />

      {/* Fallback */}
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
