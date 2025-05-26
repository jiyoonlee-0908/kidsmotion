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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {showResults && measurementData ? (
        <ResultsDisplay 
          data={measurementData} 
          onNewMeasurement={handleNewMeasurement} 
        />
      ) : (
        <>
          {/* Modern Header */}
          <header className="glass-effect border-b border-white/20 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div className="flex items-center space-x-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-xl">
                    <Bike className="text-white w-8 h-8" />
                  </div>
                  <div 
                    onClick={() => {
                      setShowResults(false);
                      setMeasurementData(null);
                    }}
                    className="cursor-pointer"
                  >
                    <h1 className="text-3xl font-black tracking-tight">
                      <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        KidsMotion
                      </span>
                      <span className="text-slate-700 ml-3 text-xl font-normal">
                        | MotionBike
                      </span>
                    </h1>
                  </div>
                </div>
                
                {/* Navigation */}
                <nav className="hidden lg:flex items-center space-x-8">
                  <span className="text-lg font-semibold text-violet-600 border-b-2 border-violet-500 pb-1">홈</span>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <span className="text-lg font-semibold text-slate-700 hover:text-violet-600 transition-colors cursor-pointer px-3 py-2 rounded-xl hover:bg-violet-50">
                        분석 <ChevronDown className="inline w-4 h-4 ml-1" />
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem asChild>
                        <a href="#measurement" className="flex items-center space-x-2 w-full cursor-pointer">
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
                  
                  <Link href="/about" className="text-lg font-semibold text-slate-700 hover:text-violet-600 transition-colors px-3 py-2 rounded-xl hover:bg-violet-50">소개</Link>
                  <Link href="/contact" className="text-lg font-semibold text-slate-700 hover:text-violet-600 transition-colors px-3 py-2 rounded-xl hover:bg-violet-50">문의</Link>
                </nav>
                <div className="flex items-center space-x-3">
                  <button className="p-3 rounded-2xl bg-white/60 hover:bg-white/80 text-slate-700 hover:text-violet-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <HelpCircle className="w-6 h-6" />
                  </button>
                  <button className="p-3 rounded-2xl bg-white/60 hover:bg-white/80 text-slate-700 hover:text-violet-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <Settings className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Mobile menu button */}
                <div className="lg:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-lg bg-white/60 hover:bg-white/80 text-slate-700 hover:text-violet-600 transition-colors">
                        <BarChart className="h-6 w-6" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>
                        <Scale className="mr-2 h-4 w-4" />
                        홈
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bike className="mr-2 h-4 w-4" />
                        기록 조회
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        소개
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone className="mr-2 h-4 w-4" />
                        문의
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <main className="relative overflow-hidden pt-16 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Hero Content */}
              <div className="text-center space-y-12 mb-20">
                <div className="space-y-8">
                  <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg">
                    ⚡ AI 체력분석 시스템
                  </div>
                  
                  <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-none tracking-tighter">
                    우리 아이의
                    <br />
                    <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      체력을
                    </span>
                    <br />
                    과학적으로
                  </h1>
                  
                  <p className="text-2xl md:text-3xl text-slate-600 font-medium max-w-4xl mx-auto leading-relaxed">
                    5분 측정으로 완벽한 분석 리포트와<br />
                    <span className="text-violet-600 font-bold">맞춤 운동처방</span>을 받아보세요
                  </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                        <BarChart className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">정밀 측정</h3>
                      <p className="text-slate-600 leading-relaxed">
                        의료급 센서로<br />
                        정확한 데이터 수집
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <Star className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">AI 분석</h3>
                      <p className="text-slate-600 leading-relaxed">
                        개인별 맞춤<br />
                        운동 처방
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">안전성</h3>
                      <p className="text-slate-600 leading-relaxed">
                        검증된 측정법으로<br />
                        안전한 평가
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                        <Smartphone className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">간편성</h3>
                      <p className="text-slate-600 leading-relaxed">
                        5분 측정으로<br />
                        즉시 결과 확인
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Measurement Form Section */}
              <div id="measurement-section" className="max-w-4xl mx-auto">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                  <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white p-8 rounded-t-3xl">
                    <div className="text-center">
                      <h2 className="text-3xl font-bold mb-4">체력 측정 시작하기</h2>
                      <p className="text-violet-100 text-lg">
                        학생 정보를 입력하고 5분 만에 완벽한 체력 분석 리포트를 받아보세요
                      </p>
                    </div>
                  </div>
                  
                  <CardContent className="p-8">
                    <MeasurementForm onComplete={handleMeasurementComplete} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>

          <MobileAppIntegration measurementData={measurementData} />
        </>
      )}
    </div>
  );
}