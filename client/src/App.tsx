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
import IRMaterials from "@/pages/ir-materials";
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
    else if (path === '/ir-materials') setCurrentPage('ir-materials');
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
      case 'ir-materials':
        return <IRMaterials onNavigate={navigateTo} />;
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">
            {renderCurrentPage()}
          </div>
          {/* 고정 푸터 */}
          <footer className="bg-slate-800 text-white py-12">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 서비스 */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">서비스</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>AI 기반 운동 처방</li>
                    <li>지속적 성장 관리</li>
                    <li>전문 리포트 생성</li>
                    <li>간편한 결과 공유</li>
                  </ul>
                </div>
                
                {/* 지원 */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">지원</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>사용자 가이드</li>
                    <li>FAQ</li>
                    <li>기술 지원</li>
                    <li>업데이트 안내</li>
                  </ul>
                </div>
                
                {/* 연락처 */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">연락처</h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center">
                      <span className="mr-2">📞</span>
                      <span>010-8445-0908</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">✉️</span>
                      <span>support@motionbike.co.kr</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📍</span>
                      <span>서울시 강서구 금낭화로 234, GX2</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 회사 정보 */}
              <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
                <p>MotionBike 가족으로 - 아동 체력 분석 | 실버모션 - 시니어 건강관리 | 휠모션 - 장애인 재활</p>
                <p className="mt-2">© 2025 MotionBike. All rights reserved. | 개인정보처리방침 | 이용약관</p>
                <p className="mt-1 text-xs">
                  [권장] 으로 이동하여 Windows를 정품 인증할 수 있습니다.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
