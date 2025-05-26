import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Records from "@/pages/records";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import UserGuide from "@/pages/user-guide";
import FAQ from "@/pages/faq";
import TechSupport from "@/pages/tech-support";
import Updates from "@/pages/updates";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import AIExercisePrescription from "@/pages/ai-exercise-prescription";
import GrowthManagement from "@/pages/growth-management";
import ProfessionalReport from "@/pages/professional-report";
import EasySharing from "@/pages/easy-sharing";
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
    else if (path === '/user-guide') setCurrentPage('user-guide');
    else if (path === '/faq') setCurrentPage('faq');
    else if (path === '/tech-support') setCurrentPage('tech-support');
    else if (path === '/updates') setCurrentPage('updates');
    else if (path === '/privacy-policy') setCurrentPage('privacy-policy');
    else if (path === '/terms-of-service') setCurrentPage('terms-of-service');
    else if (path === '/ai-exercise-prescription') setCurrentPage('ai-exercise-prescription');
    else if (path === '/growth-management') setCurrentPage('growth-management');
    else if (path === '/professional-report') setCurrentPage('professional-report');
    else if (path === '/easy-sharing') setCurrentPage('easy-sharing');
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
    // 페이지 전환 시 맨 위로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      case 'user-guide':
        return <UserGuide onNavigate={navigateTo} />;
      case 'faq':
        return <FAQ onNavigate={navigateTo} />;
      case 'tech-support':
        return <TechSupport onNavigate={navigateTo} />;
      case 'updates':
        return <Updates onNavigate={navigateTo} />;
      case 'privacy-policy':
        return <PrivacyPolicy onNavigate={navigateTo} />;
      case 'terms-of-service':
        return <TermsOfService onNavigate={navigateTo} />;
      case 'ai-exercise-prescription':
        return <AIExercisePrescription onNavigate={navigateTo} />;
      case 'growth-management':
        return <GrowthManagement onNavigate={navigateTo} />;
      case 'professional-report':
        return <ProfessionalReport onNavigate={navigateTo} />;
      case 'easy-sharing':
        return <EasySharing onNavigate={navigateTo} />;
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
