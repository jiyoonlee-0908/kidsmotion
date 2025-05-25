import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bike, HelpCircle, Settings, Shield, Users, BarChart, Phone, Mail, MapPin, Star } from "lucide-react";
import MeasurementForm from "@/components/measurement-form";
import ResultsDisplay from "@/components/results-display";
import type { Measurement, AnalysisResult } from "@shared/schema";

interface MeasurementResponse {
  measurement: Measurement;
  analysis: AnalysisResult;
  strengths: string[];
  improvements: string[];
}

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [measurementData, setMeasurementData] = useState<MeasurementResponse | null>(null);

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
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="fitness-icon animated-pulse">
                <Bike className="text-white w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  <span className="gradient-text">MotionBike</span>
                  <span className="text-gray-700 mx-2">|</span>
                  <span className="text-gray-800">KidsMotion</span>
                </h1>
                <p className="text-sm text-gray-600 font-medium">AI 기반 아동 체력 분석 플랫폼</p>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#home" className="text-gray-700 hover:text-primary font-medium transition-colors">홈</a>
                <a href="#analysis" className="text-gray-700 hover:text-primary font-medium transition-colors">분석</a>
                <a href="#about" className="text-gray-700 hover:text-primary font-medium transition-colors">소개</a>
                <a href="#contact" className="text-gray-700 hover:text-primary font-medium transition-colors">문의</a>
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
            <section id="home" className="text-center mb-16">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-6">
                  <span className="gradient-text">AI 기반 아동 체력 분석</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  정확한 측정 데이터와 인공지능 분석으로 우리 아이의 체력을 과학적으로 평가하고 
                  맞춤형 운동 처방을 제공합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="fitness-card text-center">
                    <div className="fitness-icon mx-auto mb-4">
                      <BarChart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">정밀 분석</h3>
                    <p className="text-gray-600">4가지 체력 요소를 정밀하게 측정하고 백분위로 평가</p>
                  </div>
                  <div className="fitness-card text-center">
                    <div className="fitness-icon mx-auto mb-4">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">AI 코칭</h3>
                    <p className="text-gray-600">개인별 특성에 맞는 맞춤형 운동 처방과 개선 방안 제시</p>
                  </div>
                  <div className="fitness-card text-center">
                    <div className="fitness-icon mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">전문 리포트</h3>
                    <p className="text-gray-600">보호자와 지도자를 위한 상세한 분석 리포트 제공</p>
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
              
              <div id="about">
                <h4 className="text-lg font-semibold mb-4">서비스</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>체력 측정 및 분석</li>
                  <li>AI 기반 운동 처방</li>
                  <li>진전도 추적 관리</li>
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
                    <span>1588-0000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4" />
                    <span>support@motionbike.co.kr</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4" />
                    <span>서울시 강남구 테헤란로</span>
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
