import React from 'react';
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/ErrorBoundary";
import { QuizProvider } from "@/contexts/QuizContext";

import Home from "@/pages/Home";
import ScanGrowthQuiz from "@/pages/ScanGrowthQuiz";
import RadarPage from "@/pages/RadarPage";
import LPPage from "@/pages/LPPage";
import AdminPage from "@/pages/AdminPage";
import NotFound from "@/pages/not-found";

// Scroll to top on route change component
const ScrollToTop = () => {
  const [location] = React.useState(window.location.pathname);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/scan-growth" component={ScanGrowthQuiz} />
      <Route path="/radar" component={RadarPage} />
      <Route path="/lp" component={LPPage} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <QuizProvider>
          <ScrollToTop />
          <Router />
          <Toaster />
        </QuizProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
