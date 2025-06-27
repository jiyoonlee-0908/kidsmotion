import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, BarChart, Phone, Mail, MapPin, Scale, HelpCircle, Settings } from "lucide-react";
import { useLocation } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MeasurementForm from "@/components/measurement-form";
import ResultsDisplay from "@/components/results-display";
import SimpleLoadingAnimation from "@/components/simple-loading-animation";
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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

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
    setIsAnalyzing(false);
    
    // Smooth scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results-container');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleMeasurementStart = () => {
    setIsAnalyzing(true);
  };

  const handleNewMeasurement = () => {
    setShowResults(false);
    setMeasurementData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {!showResults ? (
          <>
            {/* Hero Section */}
            <section id="home" className="text-center mb-20 pt-4">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">AI 차세대 아동 체력 분석</span>
                </h1>
                <p className="text-xl text-black mb-16 leading-relaxed max-w-6xl mx-auto font-medium">
                  과학적 정밀 측정과 AI 전문 분석으로 우리 아이의 숨겨진 체력 잠재력을 발견합니다
                </p>
                <div className="grid grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16">
                  <div className="fitness-card text-center group">
                    <div className="fitness-icon mx-auto mb-6">
                      <Scale className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-sm sm:text-lg lg:text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">좌우 밸런스</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">좌우 균형 상태를 정밀하게<br />측정하고 분석하여 제공</p>
                  </div>
                  <div className="fitness-card text-center group">
                    <div className="fitness-icon mx-auto mb-6">
                      <BarChart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-sm sm:text-lg lg:text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">종합 체력 분석</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">종합적인 체력 측정으로<br />정확한 백분위 평가 제공</p>
                  </div>
                  <div className="fitness-card text-center group">
                    <div className="fitness-icon mx-auto mb-6">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-sm sm:text-lg lg:text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">개인별 피드백</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">AI 기반 개인 맞춤형<br />운동 처방과 개선 방안 제시</p>
                  </div>
                  <div className="fitness-card text-center group">
                    <div className="fitness-icon mx-auto mb-6">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-sm sm:text-lg lg:text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">전문 리포트</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">보호자와 지도자를 위한<br />상세한 분석 리포트 제공</p>
                  </div>
                </div>
                
                {/* 운동 처방 안내 */}
                <div className="text-center mb-8">
                  <p className="text-sm text-gray-500 font-medium">개인별 최적화된 운동 처방을 제공합니다</p>
                </div>
              </div>
            </section>
            
            <div id="analysis">
              <MeasurementForm 
                onComplete={handleMeasurementComplete} 
                onStart={handleMeasurementStart}
              />
            </div>
          </>
        ) : (
          <div id="results-container">
            {measurementData && (
              <ResultsDisplay 
                data={measurementData}
                onNewMeasurement={handleNewMeasurement}
                onNavigate={onNavigate}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      {!showResults && (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Services Grid */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              <div className="flex flex-col h-full">
                <h4 className="text-xl font-bold mb-4">서비스</h4>
                <ul className="space-y-2 text-gray-300 flex-grow">
                  <li 
                    onClick={() => onNavigate && onNavigate('ai-exercise-prescription')}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    AI 기반 운동 처방
                  </li>
                  <li 
                    onClick={() => onNavigate && onNavigate('growth-management')}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    지속적 성장 관리
                  </li>
                  <li 
                    onClick={() => onNavigate && onNavigate('professional-report')}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    전문 리포트 생성
                  </li>
                  <li 
                    onClick={() => onNavigate && onNavigate('easy-sharing')}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    간편한 결과 공유
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col h-full">
                <h4 className="text-xl font-bold mb-4">지원</h4>
                <ul className="space-y-2 text-gray-300 flex-grow">
                  <li 
                    onClick={() => onNavigate && onNavigate('user-guide')}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    사용자 가이드
                  </li>
                  <li 
                    onClick={() => onNavigate && onNavigate('faq')}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    FAQ
                  </li>
                  <li 
                    onClick={() => onNavigate && onNavigate('tech-support')}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    기술 지원
                  </li>
                  <li 
                    onClick={() => onNavigate && onNavigate('updates')}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    업데이트 안내
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col h-full">
                <h4 className="text-xl font-bold mb-4">연락처</h4>
                <div className="space-y-3 text-gray-300 flex-grow">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4" />
                    <span>010-8445-0908</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4" />
                    <span>dayinj@naver.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4" />
                    <span>서울시 강서구 금낭화로 234, GX2</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-12 pt-8">
              {/* MotionBike Section */}
              <div className="text-center mb-2 text-xs text-gray-500">
                <strong>MotionBike</strong> <strong>키즈모션</strong> - 아동 체력 분석 | <strong>실버모션</strong> - 시니어 건강관리 | <strong>휠모션</strong> - 장애인 재활
              </div>
              
              <div className="text-center text-gray-400">
                <p>&copy; 2025 MotionBike. All rights reserved. | 
                  <span 
                    onClick={() => onNavigate && onNavigate('privacy-policy')}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    개인정보처리방침
                  </span> | 
                  <span 
                    onClick={() => onNavigate && onNavigate('terms-of-service')}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    이용약관
                  </span></p>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Simple Loading Animation */}
      <SimpleLoadingAnimation 
        isVisible={isAnalyzing} 
        onAnimationComplete={() => {}}
      />

      {/* Help Modal */}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
              <HelpCircle className="w-6 h-6 text-purple-600" />
              <span>도움말 센터</span>
            </DialogTitle>
            <DialogDescription>
              KidsMotion 사용법과 지원 정보를 확인하세요.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Phone className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <h4 className="font-semibold text-gray-800">전화 지원</h4>
                  <p className="text-sm text-gray-600">010-8445-0908</p>
                  <p className="text-xs text-gray-500">평일 09:00-18:00</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Mail className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-semibold text-gray-800">이메일 지원</h4>
                  <p className="text-sm text-gray-600">dayinj@naver.com</p>
                  <p className="text-xs text-gray-500">24시간 내 답변</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-semibold text-gray-800">방문 지원</h4>
                  <p className="text-sm text-gray-600">서울시 강서구 금낭화로 234, GX2</p>
                  <p className="text-xs text-gray-500">사전 예약 필수</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
              <Settings className="w-6 h-6 text-purple-600" />
              <span>시스템 설정</span>
            </DialogTitle>
            <DialogDescription>
              MotionBike 시스템 정보와 업데이트 안내를 확인하세요.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">시스템 정보</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">버전:</span>
                    <span className="ml-2 font-semibold">v0.1</span>
                  </div>
                  <div>
                    <span className="text-gray-600">최종 업데이트:</span>
                    <span className="ml-2 font-semibold">2025.05.26</span>
                  </div>
                  <div>
                    <span className="text-gray-600">측정 엔진:</span>
                    <span className="ml-2 font-semibold">MotionBike v0.1</span>
                  </div>
                  <div>
                    <span className="text-gray-600">AI 모델:</span>
                    <span className="ml-2 font-semibold">GPT-4o</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">개발 로드맵</h3>
                <div className="space-y-3">
                  <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-800">v1.0 정식 출시 예정 (2026년 상반기)</h4>
                    <ul className="text-sm text-purple-700 mt-1 space-y-1">
                      <li>• 전국 의료기관 대상 베타 테스트 완료</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">개인정보 및 약관</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    개인정보처리방침 보기
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    서비스 이용약관 보기
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    데이터 삭제 요청
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}