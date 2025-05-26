import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bike, HelpCircle, Settings, Shield, Users, BarChart, Phone, Mail, MapPin, Star, Scale, Smartphone, ChevronDown, Search, History } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MeasurementForm from "@/components/measurement-form";
import ResultsDisplay from "@/components/results-display";
import MobileAppIntegration from "@/components/mobile-app-integration";
import type { Measurement, AnalysisResult } from "@shared/schema";

interface MeasurementResponse {
  measurement: Measurement;
  analysis: AnalysisResult;
  strengths: string[];
  improvements: string[];
}

interface HomeProps {
  onNavigate?: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [location] = useLocation();
  const [showResults, setShowResults] = useState(false);
  const [measurementData, setMeasurementData] = useState<MeasurementResponse | null>(null);

  // 홈 페이지로 돌아올 때 상태 리셋
  useEffect(() => {
    if (location === '/') {
      setShowResults(false);
      setMeasurementData(null);
    }
  }, [location]);

  const handleMeasurementComplete = (data: MeasurementResponse) => {
    setMeasurementData(data);
    setShowResults(true);
    
    // Smooth scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results-container');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNewMeasurement = () => {
    setShowResults(false);
    setMeasurementData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Modern Header */}
      <header className="glass-effect border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-xl">
                <Bike className="text-white w-8 h-8" />
              </div>
              <div className="flex items-baseline space-x-2">
                <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  KidsBike
                </h1>
                <span className="text-lg font-medium text-gray-500 tracking-wide">
                  MotionBike
                </span>
              </div>
              <div className="hidden">
                <p className="text-sm text-gray-500 font-medium tracking-wide mt-1">AI 기반 아동 체력 분석 플랫폼</p>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#home" className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5">홈</a>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5 flex items-center space-x-1">
                      <span>분석</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem asChild>
                      <a href="#analysis" className="flex items-center space-x-2 w-full cursor-pointer">
                        <Search className="w-4 h-4" />
                        <span>측정</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/records" className="flex items-center space-x-2 w-full cursor-pointer">
                        <History className="w-4 h-4" />
                        <span>기록</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <span 
                  onClick={() => onNavigate && onNavigate('about')}
                  className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5 cursor-pointer"
                >
                  소개
                </span>
                <span 
                  onClick={() => onNavigate && onNavigate('contact')}
                  className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5 cursor-pointer"
                >
                  문의
                </span>
              </nav>
              <div className="flex items-center space-x-3">
                <button className="p-3 rounded-2xl bg-white/60 hover:bg-white/80 text-gray-700 hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl">
                  <HelpCircle className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-2xl bg-white/60 hover:bg-white/80 text-gray-700 hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showResults ? (
          <>
            {/* Hero Section */}
            <section id="home" className="text-center mb-20">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">AI 기반 아동 체력 분석</span>
                </h1>
                <p className="text-lg text-black mb-16 leading-relaxed max-w-4xl mx-auto font-medium">
                  정확한 측정 데이터와 인공지능 분석으로 우리 아이의 체력을 과학적으로 평가하고 맞춤형 운동 처방을 제공합니다
                </p>
                <div className="grid grid-cols-4 gap-8 mb-16">
                  <div className="fitness-card text-center group">
                    <div className="fitness-icon mx-auto mb-6">
                      <Scale className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">좌우 밸런스</h3>
                    <p className="text-gray-600 leading-relaxed">좌우 균형 상태를 정밀하게<br />측정하고 분석하여 제공</p>
                  </div>
                  <div className="fitness-card text-center group">
                    <div className="fitness-icon mx-auto mb-6">
                      <BarChart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">정밀 분석</h3>
                    <p className="text-gray-600 leading-relaxed">4가지 체력요소를 정밀하게<br />측정하고 백분위로 평가</p>
                  </div>
                  <div className="fitness-card text-center group">
                    <div className="fitness-icon mx-auto mb-6">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">AI 코칭</h3>
                    <p className="text-gray-600 leading-relaxed">개인별 특성에 맞는 맞춤형<br />운동 처방과 개선 방안 제시</p>
                  </div>
                  <div className="fitness-card text-center group">
                    <div className="fitness-icon mx-auto mb-6">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">전문 리포트</h3>
                    <p className="text-gray-600 leading-relaxed">보호자와 지도자를 위한<br />상세한 분석 리포트 제공</p>
                  </div>
                </div>
              </div>
            </section>
            
            <div id="analysis">
              <MeasurementForm onComplete={handleMeasurementComplete} />
            </div>


          </>
        ) : (
          <div id="results-container">
            {measurementData && (
              <ResultsDisplay 
                data={measurementData}
                onNewMeasurement={handleNewMeasurement}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      {!showResults && (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="fitness-icon">
                    <Bike className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">MotionBike</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  아동 체력 분석의 새로운 표준을 제시하는 AI 기반 플랫폼입니다.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">서비스</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>체력 측정 및 분석</li>
                  <li>AI 기반 운동 처방</li>
                  <li>진도 상황 관리</li>
                  <li>전문 리포트 생성</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">지원</h4>
                <ul className="space-y-2 text-gray-300">
                  <li 
                    onClick={() => onNavigate && onNavigate('user-guide')}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    사용자 가이드
                  </li>
                  <li className="cursor-pointer hover:text-white transition-colors">FAQ</li>
                  <li className="cursor-pointer hover:text-white transition-colors">기술 지원</li>
                  <li className="cursor-pointer hover:text-white transition-colors">업데이트 안내</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">연락처</h4>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4" />
                    <span>010-8445-0908</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4" />
                    <span>support@motionbike.co.kr</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4" />
                    <span>서울시 강서구 금낭화로 234, GX2</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2025 MotionBike. All rights reserved. | 개인정보처리방침 | 이용약관</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
