import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import Home from "@/pages/home";
import Records from "@/pages/records";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Admin from "@/pages/admin";
import InviteCodeForm from "@/components/invite-code-form";

export type PageType = 'home' | 'records' | 'about' | 'contact' | 'admin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  useEffect(() => {
    const auth = localStorage.getItem('kidsmotion_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    
    // URL에 따라 현재 페이지 설정
    const path = window.location.pathname;
    if (path === '/admin') setCurrentPage('admin');
    else if (path === '/about') setCurrentPage('about');
    else if (path === '/contact') setCurrentPage('contact');
    else if (path === '/records') setCurrentPage('records');
    else setCurrentPage('home');
  }, []);

  const handleAuthSuccess = () => {
    localStorage.setItem('kidsmotion_authenticated', 'true');
    setIsAuthenticated(true);
  };

  const navigateToPage = (page: PageType) => {
    setCurrentPage(page);
    const path = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', path);
  };

  const renderCurrentPage = () => {
    if (currentPage === 'admin') {
      return <Admin />;
    }
    
    if (!isAuthenticated) {
      return <InviteCodeForm onSuccess={handleAuthSuccess} />;
    }

    switch (currentPage) {
      case 'records':
        return <Records onNavigate={navigateToPage} />;
      case 'about':
        return <About onNavigate={navigateToPage} />;
      case 'contact':
        return <Contact onNavigate={navigateToPage} />;
      default:
        return <Home onNavigate={navigateToPage} />;
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