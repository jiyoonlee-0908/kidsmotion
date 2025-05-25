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

export default function Home() {
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
                
                <a href="#about" className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5">소개</a>
                <a href="#contact" className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5">문의</a>
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

            {/* About Section */}
            <div id="about" className="mt-20 mb-16">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-800 mb-6">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">MotionBike 소개</span>
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                    아동 체력 분석의 새로운 표준을 제시하는 AI 기반 플랫폼입니다.<br/>
                    과학적 근거와 첨단 기술을 바탕으로 우리 아이들의 건강한 성장을 지원합니다.<br/>
                    정확한 체력 측정부터 개인맞춤형 운동 처방까지, 전문적이고 체계적인 솔루션을 제공합니다.<br/>
                    미래 세대의 건강한 삶을 위한 혁신적인 디지털 헬스케어 서비스를 경험해보세요.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-none shadow-xl">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                          <BarChart className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">정밀한 체력 분석</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        와트바이크 기반의 과학적 측정 시스템으로 아이의 체력을 정확하게 분석합니다. 
                        5초, 15초, 30초, 60초 구간별 파워 측정을 통해 순발력, 근력, 근지구력, 심폐지구력을 종합적으로 평가합니다.
                      </p>
                      <ul className="text-gray-600 space-y-2">
                        <li>• 나이별, 성별 맞춤 기준 적용</li>
                        <li>• W/kg^0.67 공식으로 정확한 상대파워 계산</li>
                        <li>• 좌우 균형 분석으로 신체 밸런스 확인</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-none shadow-xl">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4">
                          <Star className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">AI 맞춤 코칭</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        OpenAI 기반 인공지능이 측정 결과를 분석하여 개인별 맞춤 운동 처방과 
                        성장 가이드를 제공합니다. 전문적이면서도 이해하기 쉬운 한국어 코칭을 받아보세요.
                      </p>
                      <ul className="text-gray-600 space-y-2">
                        <li>• 개인별 강점과 개선점 분석</li>
                        <li>• 맞춤형 운동 프로그램 추천</li>
                        <li>• 성장 단계별 목표 설정 지원</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div id="contact" className="mt-20 mb-16">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">문의하기</h2>
                  <p className="text-lg text-gray-600">
                    MotionBike에 대해 궁금한 점이 있으시거나 도움이 필요하시면 언제든 연락해주세요.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <Phone className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">전화 문의</h3>
                      <p className="text-gray-600 mb-2">빠른 상담을 원하시면</p>
                      <p className="text-2xl font-bold text-purple-600">010-8445-0908</p>
                      <p className="text-sm text-gray-500 mt-2">평일 09:00 - 18:00</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">이메일 문의</h3>
                      <p className="text-gray-600 mb-2">자세한 문의사항은</p>
                      <p className="text-lg font-semibold text-blue-600">info@motionbike.co.kr</p>
                      <p className="text-sm text-gray-500 mt-2">24시간 내 답변 드립니다</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">방문 문의</h3>
                      <p className="text-gray-600 mb-2">직접 방문하시려면</p>
                      <p className="text-base font-medium text-teal-600">서울시 강서구<br/>금낭화로 234, GX2</p>
                      <p className="text-sm text-gray-500 mt-2">사전 예약 필수</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
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
              
              <div id="about">
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
                  <li>사용자 가이드</li>
                  <li>FAQ</li>
                  <li>기술 지원</li>
                  <li>업데이트 안내</li>
                </ul>
              </div>
              
              <div id="contact">
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
