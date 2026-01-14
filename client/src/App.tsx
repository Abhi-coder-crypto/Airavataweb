import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Portfolio from "@/pages/Portfolio";
import ProjectsGallery from "@/pages/projects-gallery";
import ProjectDetails from "@/pages/project-details";
import DigitalMarketingGallery from "@/pages/digital-marketing-gallery";
import DigitalMarketingBrands from "@/pages/digital-marketing-brands";
import DigitalMarketingReels from "@/pages/digital-marketing-reels";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/projects/digital-marketing" component={DigitalMarketingGallery} />
      <Route path="/digital-marketing/:categoryId" component={DigitalMarketingBrands} />
      <Route path="/digital-marketing/:categoryId/:brandId" component={DigitalMarketingReels} />
      <Route path="/projects/:serviceSlug" component={ProjectsGallery} />
      <Route path="/projects/:serviceSlug/:projectId" component={ProjectDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;