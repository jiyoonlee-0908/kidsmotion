import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bike, HelpCircle, Settings, Shield, Users, BarChart, Phone, Mail, MapPin, Star, Scale, Smartphone, History, Search, Menu, X, Activity, Target } from "lucide-react";
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
  const [currentView, setCurrentView] = useState<'measurement' | 'history'>('measurement');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchStudent, setSearchStudent] = useState({
    name: "",
    gender: "",
    birthDate: ""
  });

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

  const handleSearchStudent = () => {
    const { name, gender, birthDate } = searchStudent;
    if (!name.trim() || !gender || !birthDate) {
      alert("이름, 성별, 생년월일을 모두 입력해 주세요.");
      return;
    }
    setCurrentView('history');
    setShowResults(false);
    setSidebarOpen(false);
  };

  // 결과가 표시 중이면 결과 화면을 보여줌
  if (showResults && measurementData) {
    return <ResultsDisplay data={measurementData} onNewMeasurement={handleNewMeasurement} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex">
      {/* 사이드바 */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:shadow-none lg:border-r border-gray-200`}>
        <div className="flex flex-col h-full">
          {/* 사이드바 헤더 */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Bike className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    KidsMotion
                  </h1>
                  <p className="text-xs text-gray-500">by MotionBike</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* 네비게이션 메뉴 */}
          <div className="flex-1 p-6">
            <nav className="space-y-3">
              <Button
                variant={currentView === 'measurement' ? 'default' : 'ghost'}
                className={`w-full justify-start text-left ${
                  currentView === 'measurement' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  setCurrentView('measurement');
                  setShowResults(false);
                  setSidebarOpen(false);
                }}
              >
                <Activity className="w-5 h-5 mr-3" />
                새로운 측정
              </Button>
              
              <Button
                variant={currentView === 'history' ? 'default' : 'ghost'}
                className={`w-full justify-start text-left ${
                  currentView === 'history' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  setCurrentView('history');
                  setShowResults(false);
                  setSidebarOpen(false);
                }}
              >
                <History className="w-5 h-5 mr-3" />
                기록 조회
              </Button>
            </nav>

            {/* 기록 조회 옵션 */}
            {currentView === 'history' && (
              <Card className="mt-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <Search className="w-4 h-4 mr-2 text-purple-600" />
                    학생 검색
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="student-name" className="text-sm font-medium text-gray-700">
                        학생 이름
                      </Label>
                      <Input
                        id="student-name"
                        placeholder="예) 김철수"
                        value={searchStudent.name}
                        onChange={(e) => setSearchStudent(prev => ({...prev, name: e.target.value}))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="student-gender" className="text-sm font-medium text-gray-700">
                        성별
                      </Label>
                      <Select value={searchStudent.gender} onValueChange={(value) => setSearchStudent(prev => ({...prev, gender: value}))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="성별 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="M">남성</SelectItem>
                          <SelectItem value="F">여성</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="student-birthdate" className="text-sm font-medium text-gray-700">
                        생년월일
                      </Label>
                      <Input
                        id="student-birthdate"
                        type="date"
                        value={searchStudent.birthDate}
                        onChange={(e) => setSearchStudent(prev => ({...prev, birthDate: e.target.value}))}
                        className="mt-1"
                      />
                    </div>
                    <Button 
                      onClick={handleSearchStudent}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      검색
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* 사이드바 푸터 */}
          <div className="p-6 border-t border-gray-200">
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex items-center">
                <Phone className="w-3 h-3 mr-2" />
                010-8445-0908
              </div>
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-2" />
                서울시 강서구 금낭화로 234, GX2
              </div>
              <div className="flex items-center">
                <Mail className="w-3 h-3 mr-2" />
                info@motionbike.com
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 lg:ml-0">
        {/* 모바일 헤더 */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Bike className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                KidsMotion
              </h1>
            </div>
            <div className="w-10"></div>
          </div>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="p-6">
          {currentView === 'measurement' && (
            <div>
              {/* 헤더 섹션 */}
              <div className="hidden lg:block mb-8">
                <div className="text-center">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    KidsMotion
                  </h1>
                  <p className="text-gray-600 text-lg">
                    어린이 체력 측정 및 분석 시스템
                  </p>
                  <div className="text-sm text-gray-500 mt-2">
                    by <span className="font-semibold text-gray-700">MotionBike</span>
                  </div>
                </div>
              </div>

              {/* 특징 카드들 */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="text-center p-6 border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-all">
                  <Scale className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="font-semibold text-gray-800 mb-2">좌우밸런스</h3>
                  <p className="text-sm text-gray-600">정확한 좌우 균형 측정</p>
                </Card>

                <Card className="text-center p-6 border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all">
                  <BarChart className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold text-gray-800 mb-2">체력분석</h3>
                  <p className="text-sm text-gray-600">과학적 체력 분석</p>
                </Card>

                <Card className="text-center p-6 border-2 border-green-100 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-all">
                  <Target className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h3 className="font-semibold text-gray-800 mb-2">AI코칭</h3>
                  <p className="text-sm text-gray-600">맞춤형 운동 가이드</p>
                </Card>

                <Card className="text-center p-6 border-2 border-orange-100 bg-gradient-to-br from-orange-50 to-white hover:shadow-lg transition-all">
                  <Smartphone className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                  <h3 className="font-semibold text-gray-800 mb-2">전문리포트</h3>
                  <p className="text-sm text-gray-600">상세한 분석 리포트</p>
                </Card>
              </div>

              {/* 측정 입력 폼 */}
              <div className="max-w-4xl mx-auto">
                <Card className="border-2 border-purple-200 shadow-xl">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">측정 정보 입력</h2>
                      <p className="text-gray-600">정확한 분석을 위해 모든 정보를 입력해 주세요</p>
                    </div>
                    <MeasurementForm onComplete={handleMeasurementComplete} />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {currentView === 'history' && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">측정 기록 조회</h2>
                <p className="text-gray-600">학생의 과거 측정 기록을 확인할 수 있습니다</p>
              </div>

              {searchStudent.name && searchStudent.gender && searchStudent.birthDate ? (
                <MeasurementHistory 
                  studentName={searchStudent.name}
                  searchStudent={searchStudent}
                />
              ) : (
                <Card className="text-center p-12 border-2 border-gray-200">
                  <History className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">학생 정보를 입력하세요</h3>
                  <p className="text-gray-500">
                    왼쪽 사이드바에서 학생의 이름, 성별, 생년월일을 입력하고 검색 버튼을 눌러주세요.
                  </p>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 모바일 오버레이 */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}