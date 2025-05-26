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
    <div className="min-h-screen bg-gray-50">
      {showResults && measurementData ? (
        <ResultsDisplay 
          data={measurementData} 
          onNewMeasurement={handleNewMeasurement} 
        />
      ) : (
        <>
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center">
                  <div 
                    onClick={() => {
                      setShowResults(false);
                      setMeasurementData(null);
                    }}
                    className="flex items-center cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center mr-3">
                      <Bike className="text-white w-5 h-5" />
                    </div>
                    <h1 className="text-xl font-bold">
                      <span className="text-purple-600">KidsBike</span>
                      <span className="text-gray-600 ml-2 font-normal">MotionBike</span>
                    </h1>
                  </div>
                </div>
                
                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                  <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">홈</Link>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <span className="text-gray-700 hover:text-purple-600 font-medium cursor-pointer flex items-center">
                        분석 <ChevronDown className="ml-1 w-4 h-4" />
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Search className="mr-2 h-4 w-4" />
                        새 측정하기
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/records">
                          <History className="mr-2 h-4 w-4" />
                          기록 조회
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Link href="/about" className="text-gray-700 hover:text-purple-600 font-medium">소개</Link>
                  <Link href="/contact" className="text-gray-700 hover:text-purple-600 font-medium">문의</Link>
                </nav>
                
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg transition-colors">
                    <HelpCircle className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Title */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">AI 기반 아동 체력 분석</h1>
                <p className="text-lg text-gray-600">
                  정확한 측정 데이터를 통해 알맞은 운동을 분석 아이의 체력을 과학적으로 평가하고 맞춤형 운동을 제공받습니다
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                      <BarChart className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">최첨 별헌스</h3>
                    <p className="text-sm text-gray-600">
                      최첨 고성능 냥력을 통해거거<br />
                      측정이차 오로젠과 체크
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                      <Star className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">정밀 분석</h3>
                    <p className="text-sm text-gray-600">
                      4가지 요소를 모두 정밀하게<br />
                      측정하여 제공하는 정확성 및 평가
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">AI 코칭</h3>
                    <p className="text-sm text-gray-600">
                      개인의 측정 성능을 맞춤 운동방<br />
                      법을 적용하여 가이 발전 제시
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                      <Users className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">전문 리포트</h3>
                    <p className="text-sm text-gray-600">
                      보조식이 자료셰고 제고다 업하<br />
                      성각 분석 건계 요법적된 책정
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Measurement Form */}
              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center mr-3">
                      <Scale className="text-white w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">측정 정보 입력</h2>
                  </div>
                  
                  <MeasurementForm onComplete={handleMeasurementComplete} />
                </CardContent>
              </Card>
            </div>
          </main>

          <MobileAppIntegration measurementData={measurementData} />
        </>
      )}
    </div>
  );
}