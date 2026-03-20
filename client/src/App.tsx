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

      {/* Programs & Learning */}
      <Route path={"/programs"} component={Programs} />
      <Route path={"/enterprise"} component={Enterprise} />

      {/* Community & Events */}
      <Route path={"/community"} component={Community} />
      <Route path={"/events"} component={Events} />

      {/* Newsletter */}
      <Route path={"/newsletter"} component={Newsletter} />
      <Route path={"/newsletter/archive"} component={NewsletterArchive} />
      <Route path={"/newsletter/:slug"} component={NewsletterArticle} />

      {/* Legal */}
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />

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
