import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import Home from "@/pages/home";
import Records from "@/pages/records";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import Admin from "@/pages/admin";
import InviteCodeForm from "@/components/invite-code-form";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user was previously authenticated
  useEffect(() => {
    const auth = localStorage.getItem('kidsmotion_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = () => {
    localStorage.setItem('kidsmotion_authenticated', 'true');
    setIsAuthenticated(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Switch>
          <Route path="/admin" component={Admin} />
          {!isAuthenticated ? (
            <Route>
              <InviteCodeForm onSuccess={handleAuthSuccess} />
            </Route>
          ) : (
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/records" component={Records} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/report/:id" component={Home} />
              <Route component={NotFound} />
            </Switch>
          )}
        </Switch>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;