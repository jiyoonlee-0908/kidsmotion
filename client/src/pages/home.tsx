import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bike, HelpCircle, Settings, Shield, Users, BarChart, Phone, Mail, MapPin, Star, Scale, Smartphone, ChevronDown, Search, History } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MeasurementForm from "@/components/measurement-form";
import ResultsDisplay from "@/components/results-display";
import MobileAppIntegration from "@/components/mobile-app-integration";
import Navigation from "@/components/navigation";
import type { Measurement, AnalysisResult } from "@shared/schema";
import type { PageType } from "@/App";

interface MeasurementResponse {
  measurement: Measurement;
  analysis: AnalysisResult;
  strengths: string[];
  improvements: string[];
}

interface HomeProps {
  onNavigate: (page: PageType) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [showResults, setShowResults] = useState(false);
  const [measurementData, setMeasurementData] = useState<MeasurementResponse | null>(null);

  // 홈 페이지로 돌아올 때 상태 리셋
  useEffect(() => {
    setShowResults(false);
    setMeasurementData(null);
  }, []);

  const handleMeasurementComplete = (data: MeasurementResponse) => {
    setMeasurementData(data);
    setShowResults(true);
    
    // 결과 섹션으로 스크롤
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section');
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      <Navigation onNavigate={onNavigate} />
      
      {showResults && measurementData ? (
        <div id="results-section" className="pt-20">
          <ResultsDisplay 
            data={measurementData} 
            onNewMeasurement={handleNewMeasurement} 
          />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <main className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Hero Content */}
              <div className="text-center mb-16">
                <div className="mb-8">
                  <span className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full text-base font-bold shadow-lg">
                    혁신적인 아동 체력측정 솔루션
                  </span>
                </div>
                
                <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 leading-none tracking-tight">
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    키즈모션
                  </span>
                </h1>
                
                <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 leading-relaxed">
                  우리 아이의 진짜 체력을<br/>
                  <span className="text-purple-600">과학적으로</span> 정확하게 측정하세요
                </div>
                
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-50 to-purple-50 rounded-3xl p-10 shadow-2xl border border-gray-100">
                  <p className="text-2xl text-gray-700 font-semibold mb-6 leading-relaxed">
                    단 5분 측정으로<br/>
                    우리 아이만의 맞춤 운동처방을 받아보세요
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="text-4xl mb-4">⚡</div>
                      <div className="font-bold text-gray-800 mb-3 text-lg">정밀 측정</div>
                      <div className="text-gray-600 leading-relaxed">
                        의료급 센서로<br/>
                        정확하게 측정
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="text-4xl mb-4">🎯</div>
                      <div className="font-bold text-gray-800 mb-3 text-lg">AI 분석</div>
                      <div className="text-gray-600 leading-relaxed">
                        개인별 맞춤<br/>
                        운동 처방
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="text-4xl mb-4">📈</div>
                      <div className="font-bold text-gray-800 mb-3 text-lg">성장 추적</div>
                      <div className="text-gray-600 leading-relaxed">
                        지속적인<br/>
                        발전 모니터링
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Measurement Form Section */}
              <div id="measurement-section" className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">체력 측정 시작하기</h2>
                    <p className="text-purple-100 text-lg">
                      학생 정보를 입력하고 5분 만에 완벽한 체력 분석 리포트를 받아보세요
                    </p>
                  </div>
                  
                  <div className="p-8">
                    <MeasurementForm onComplete={handleMeasurementComplete} />
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-none shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                        <BarChart className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">실시간 정밀 측정</h3>
                        <span className="text-sm text-purple-600 font-semibold">국내외 최초 동적 운동 데이터 분석</span>
                      </div>
                    </div>
                    <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                      기존 체력장의 한계를 뛰어넘어<br/>
                      <strong className="text-purple-600">5분 만에 완벽한 체력 분석</strong>을 제공합니다
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <span className="text-purple-500 mr-3">✓</span>
                        <span><strong>순발력</strong> - 순간 최대 파워 측정</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-purple-500 mr-3">✓</span>
                        <span><strong>지구력</strong> - 지속적 운동 능력 평가</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-purple-500 mr-3">✓</span>
                        <span><strong>좌우균형</strong> - 신체 밸런스 분석</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-purple-500 mr-3">✓</span>
                        <span><strong>심폐기능</strong> - 심박수 패턴 분석</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-none shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4">
                        <Star className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">완결형 플랫폼</h3>
                        <span className="text-sm text-blue-600 font-semibold">측정 → 분석 → 훈련 피드백</span>
                      </div>
                    </div>
                    <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                      의사나 트레이너가 직접 상담하는 것처럼<br/>
                      <strong className="text-blue-600">AI가 맞춤형 운동처방서</strong>를 제공합니다
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <span className="text-blue-500 mr-3">✓</span>
                        <span><strong>체력 등급</strong> - 또래 대비 정확한 평가</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-blue-500 mr-3">✓</span>
                        <span><strong>강약점 분석</strong> - 개선이 필요한 부분</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-blue-500 mr-3">✓</span>
                        <span><strong>운동 처방</strong> - 집에서 할 수 있는 운동</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-blue-500 mr-3">✓</span>
                        <span><strong>성장 목표</strong> - 3개월, 6개월 후 계획</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact CTA */}
              <div className="mt-16 text-center">
                <Card className="bg-gradient-to-r from-purple-500 to-blue-500 border-none shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      더 자세한 정보가 필요하신가요?
                    </h3>
                    <p className="text-purple-100 mb-6">
                      MotionBike 팀이 언제든지 도움을 드릴 준비가 되어있습니다.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a 
                        href="tel:010-8445-0908"
                        className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        전화 상담: 010-8445-0908
                      </a>
                      <button 
                        onClick={() => onNavigate('contact')}
                        className="inline-flex items-center px-6 py-3 bg-white/20 text-white border border-white/30 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        이메일 문의
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>

          {/* Mobile App Integration */}
          <MobileAppIntegration measurementData={measurementData} />
        </>
      )}
    </div>
  );
}