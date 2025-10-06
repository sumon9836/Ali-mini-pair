import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import PairPage from "@/pages/PairPage";
import TopBar from "@/components/TopBar";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/pair" component={PairPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 animate-gradient relative overflow-hidden">
          {/* Animated background blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
          
          <TopBar />
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
