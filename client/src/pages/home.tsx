import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bike, HelpCircle, Settings, Shield, Users, BarChart, Phone, Mail, MapPin, Star, Scale, Smartphone, History, Search } from "lucide-react";
import MeasurementForm from "@/components/measurement-form";
import ResultsDisplay from "@/components/results-display";
import MeasurementHistory from "@/components/measurement-history";
import MobileAppIntegration from "@/components/mobile-app-integration";
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
  const [showHistory, setShowHistory] = useState(false);
  const [searchStudent, setSearchStudent] = useState({
    name: "",
    gender: "",
    birthDate: ""
  });

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
    setShowHistory(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchStudent = () => {
    const { name, gender, birthDate } = searchStudent;
    if (!name.trim() || !gender || !birthDate) {
      alert("이름, 성별, 생년월일을 모두 입력해 주세요.");
      return;
    }
    setShowHistory(true);
    setShowResults(false);
    
    // Smooth scroll to history section
    setTimeout(() => {
      const historyElement = document.getElementById('history-container');
      if (historyElement) {
        historyElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Modern Header */}
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-xl">
                <Bike className="text-white w-8 h-8" />
              </div>
              <div className="flex items-baseline space-x-2">
                <h1 className="text-3xl font-black tracking-tight text-gray-800">
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
                <a href="#analysis" className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5">분석</a>
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
        {!showResults && !showHistory ? (
          <>
            {/* Hero Section */}
            <section id="home" className="text-center mb-20">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">AI 기반 아동 체력 분석</span>
                </h1>
                <p className="text-lg text-gray-600 mb-16 leading-relaxed max-w-4xl mx-auto font-medium">
                  정확한 측정 데이터와 인공지능 분석으로 우리 아이의 체력을 과학적으로 평가하고 <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent font-semibold">맞춤형 운동 처방</span>을 제공합니다
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
            
            {/* 메인 선택 섹션 */}
            <section className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* 새로운 측정 */}
                <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group" 
                      onClick={() => {
                        const formElement = document.getElementById('measurement-form');
                        if (formElement) {
                          formElement.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Bike className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors">새로운 측정</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      아이의 체력을 새로 측정하고<br />
                      AI 분석 결과를 확인해보세요
                    </p>
                    <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      측정 시작하기
                    </Button>
                  </CardContent>
                </Card>

                {/* 기록 조회 */}
                <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                      onClick={() => {
                        const searchElement = document.getElementById('student-search');
                        if (searchElement) {
                          searchElement.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <History className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors">기록 조회</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      이전 측정 기록을 조회하고<br />
                      성장 과정을 확인해보세요
                    </p>
                    <Button variant="outline" className="w-full border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300">
                      기록 조회하기
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 학생 검색 섹션 */}
            <section id="student-search" className="mb-16">
              <div className="max-w-2xl mx-auto">
                <Card className="glass-effect border-0 shadow-xl">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                        <Search className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">학생 기록 조회</h3>
                      <p className="text-gray-600">정확한 학생 식별을 위해 모든 정보를 입력해 주세요</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">학생 이름</label>
                        <Input
                          type="text"
                          placeholder="학생 이름을 입력하세요"
                          value={searchStudent.name}
                          onChange={(e) => setSearchStudent({...searchStudent, name: e.target.value})}
                          className="h-12"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">성별</label>
                          <select
                            value={searchStudent.gender}
                            onChange={(e) => setSearchStudent({...searchStudent, gender: e.target.value})}
                            className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="">선택하세요</option>
                            <option value="M">남자</option>
                            <option value="F">여자</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">생년월일</label>
                          <Input
                            type="date"
                            value={searchStudent.birthDate}
                            onChange={(e) => setSearchStudent({...searchStudent, birthDate: e.target.value})}
                            className="h-12"
                          />
                        </div>
                      </div>

                      <Button 
                        onClick={handleSearchStudent}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Search className="w-5 h-5 mr-2" />
                        기록 조회하기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 측정 폼 섹션 */}
            <div id="measurement-form">
              <MeasurementForm onComplete={handleMeasurementComplete} />
            </div>
          </>
        ) : showHistory ? (
          <div id="history-container">
            <MeasurementHistory 
              studentName={searchStudent.name}
              searchStudent={searchStudent}
            />
            <div className="text-center mt-8">
              <Button 
                onClick={handleNewMeasurement}
                variant="outline"
                className="px-8 py-3"
              >
                홈으로 돌아가기
              </Button>
            </div>
          </div>
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
