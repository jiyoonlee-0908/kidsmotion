import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bike, BarChart, Scale, Smartphone, Target, Phone, Mail, MapPin } from "lucide-react";
import MeasurementForm from "@/components/measurement-form";
import ResultsDisplay from "@/components/results-display";
import MeasurementHistory from "@/components/measurement-history";
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
  const [currentView, setCurrentView] = useState<'home' | 'measurement' | 'history' | 'about' | 'contact'>('home');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMeasurementComplete = (data: MeasurementResponse) => {
    setMeasurementData(data);
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewMeasurement = () => {
    setShowResults(false);
    setMeasurementData(null);
    setCurrentView('measurement');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 결과가 표시 중이면 결과 화면을 보여줌
  if (showResults && measurementData) {
    return <ResultsDisplay data={measurementData} onNewMeasurement={handleNewMeasurement} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* 상단 네비게이션 */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* 로고 */}
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <Bike className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  KidsMotion
                </h1>
                <p className="text-sm text-gray-500">MotionBike</p>
              </div>
            </div>

            {/* 네비게이션 메뉴 */}
            <div className="flex space-x-8">
              <Button
                variant="ghost"
                className={`text-lg font-medium px-4 py-2 ${
                  currentView === 'home' 
                    ? 'text-purple-600 border-b-2 border-purple-600' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
                onClick={() => {
                  setCurrentView('home');
                  setShowResults(false);
                }}
              >
                홈
              </Button>
              
              {/* 분석 드롭다운 */}
              <div 
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <Button
                  variant="ghost"
                  className={`text-lg font-medium px-4 py-2 ${
                    currentView === 'measurement' || currentView === 'history'
                      ? 'text-purple-600 border-b-2 border-purple-600' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  분석
                </Button>
                
                {/* 드롭다운 메뉴 */}
                {showDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <Button
                      variant="ghost"
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                        currentView === 'measurement' ? 'text-purple-600 bg-purple-50' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        setCurrentView('measurement');
                        setShowResults(false);
                        setShowDropdown(false);
                      }}
                    >
                      측정
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                        currentView === 'history' ? 'text-purple-600 bg-purple-50' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        setCurrentView('history');
                        setShowResults(false);
                        setShowDropdown(false);
                      }}
                    >
                      기록
                    </Button>
                  </div>
                )}
              </div>
              
              <Button
                variant="ghost"
                className={`text-lg font-medium px-4 py-2 ${
                  currentView === 'about' 
                    ? 'text-purple-600 border-b-2 border-purple-600' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
                onClick={() => {
                  setCurrentView('about');
                  setShowResults(false);
                }}
              >
                소개
              </Button>
              
              <Button
                variant="ghost"
                className={`text-lg font-medium px-4 py-2 ${
                  currentView === 'contact' 
                    ? 'text-purple-600 border-b-2 border-purple-600' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
                onClick={() => {
                  setCurrentView('contact');
                  setShowResults(false);
                }}
              >
                문의
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* 홈 화면 */}
          {currentView === 'home' && (
            <div className="space-y-12">
              {/* AI 기반 어린이 체력 분석 타이틀 */}
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">AI 기반 어린이 체력 분석</h1>
                <p className="text-xl text-gray-600 mb-8">정확한 측정과 과학적인 분석으로 우리 아이의 건강한 성장을 돕겠습니다.</p>
              </div>

              {/* 특징 카드들 */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-white border-purple-200 hover:shadow-lg transition-all">
                  <Scale className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="font-bold text-lg text-gray-800 mb-3">좌우 밸런스</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    정확한 좌우 균형 측정으로 신체 불균형을 조기에 발견
                  </p>
                </Card>

                <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:shadow-lg transition-all">
                  <BarChart className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-bold text-lg text-gray-800 mb-3">정밀 분석</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    5단계 파워로 순발력부터 심폐지구력까지 종합 평가
                  </p>
                </Card>

                <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-white border-green-200 hover:shadow-lg transition-all">
                  <Target className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h3 className="font-bold text-lg text-gray-800 mb-3">AI 코칭</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    개인별 특성에 맞는 운동 처방과 개선 방안 제시
                  </p>
                </Card>

                <Card className="text-center p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200 hover:shadow-lg transition-all">
                  <Smartphone className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                  <h3 className="font-bold text-lg text-gray-800 mb-3">전문 리포트</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    상세한 PDF 리포트와 QR 코드로 간편한 공유
                  </p>
                </Card>
              </div>
            </div>
          )}

          {/* 측정 화면 */}
          {currentView === 'measurement' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">측정 정보 입력</h2>
                <p className="text-gray-600">정확한 분석을 위해 모든 정보를 입력해 주세요</p>
              </div>
              <Card className="border-purple-200 shadow-xl">
                <CardContent className="p-8">
                  <MeasurementForm onComplete={handleMeasurementComplete} />
                </CardContent>
              </Card>
            </div>
          )}

          {/* 기록 화면 */}
          {currentView === 'history' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">측정 기록 조회</h2>
                <p className="text-gray-600">학생의 이름, 성별, 생년월일로 기록을 검색할 수 있습니다</p>
              </div>
              <MeasurementHistory 
                studentName="" 
                searchStudent={{
                  name: "",
                  gender: "",
                  birthDate: ""
                }}
              />
            </div>
          )}

          {/* 소개 화면 */}
          {currentView === 'about' && (
            <div className="space-y-12">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">KidsMotion 소개</h1>
                <p className="text-xl text-gray-600 mb-8">과학적이고 정확한 어린이 체력 측정 시스템입니다.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">우리의 목표</h3>
                  <p className="text-gray-600 leading-relaxed">
                    KidsMotion은 어린이들의 건강한 성장을 위해 과학적이고 정확한 체력 측정 서비스를 제공합니다. 
                    AI 기반 분석을 통해 개인별 맞춤형 운동 처방을 제공하여 아이들의 체력 향상을 돕습니다.
                  </p>
                </Card>
                
                <Card className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">핵심 기술</h3>
                  <p className="text-gray-600 leading-relaxed">
                    최첨단 와트바이크 기술과 정밀한 센서를 활용하여 0.1% 단위의 정확한 측정이 가능합니다. 
                    5단계 파워 측정을 통해 순발력, 근력, 근지구력, 심폐지구력을 종합적으로 평가합니다.
                  </p>
                </Card>
              </div>
            </div>
          )}

          {/* 문의 화면 */}
          {currentView === 'contact' && (
            <div className="space-y-12">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">문의하기</h1>
                <p className="text-xl text-gray-600 mb-8">궁금한 점이 있으시면 언제든지 연락해 주세요.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">연락처 정보</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-3 text-purple-600" />
                      <span>010-8445-0908</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-3 text-blue-600" />
                      <span>info@motionbike.com</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-green-600" />
                      <span>서울시 강서구 금낭화로 234, GX2</span>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">운영 시간</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>평일: 09:00 - 18:00</p>
                    <p>토요일: 09:00 - 15:00</p>
                    <p>일요일 및 공휴일: 휴무</p>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}