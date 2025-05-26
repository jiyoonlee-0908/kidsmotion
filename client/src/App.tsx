import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Records from "@/pages/records";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Admin from "@/pages/admin";
import InviteCodeForm from "@/components/invite-code-form";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Check if user was previously authenticated
  useEffect(() => {
    const auth = localStorage.getItem('kidsmotion_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    
    // Check URL for current page
    const path = window.location.pathname;
    if (path === '/about') setCurrentPage('about');
    else if (path === '/contact') setCurrentPage('contact');
    else if (path === '/records') setCurrentPage('records');
    else if (path === '/admin') setCurrentPage('admin');
    else setCurrentPage('home');
  }, []);

  const handleAuthSuccess = () => {
    localStorage.setItem('kidsmotion_authenticated', 'true');
    setIsAuthenticated(true);
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.history.pushState({}, '', `/${page === 'home' ? '' : page}`);
  };

  // Admin page can be accessed without authentication
  if (currentPage === 'admin') {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Admin />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <InviteCodeForm onSuccess={handleAuthSuccess} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return <About onNavigate={navigateTo} />;
      case 'contact':
        return <Contact onNavigate={navigateTo} />;
      case 'records':
        return <Records onNavigate={navigateTo} />;
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {renderCurrentPage()}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
