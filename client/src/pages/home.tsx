import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bike, BarChart, Scale, Smartphone, History, Search, Activity, Target, Phone, Mail, MapPin } from "lucide-react";
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
  const [currentView, setCurrentView] = useState<'measurement' | 'history'>('measurement');
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
  };

  // 결과가 표시 중이면 결과 화면을 보여줌
  if (showResults && measurementData) {
    return <ResultsDisplay data={measurementData} onNewMeasurement={handleNewMeasurement} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex">
      {/* 좁은 사이드바 */}
      <div className="w-20 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        {/* 로고 */}
        <div className="p-4 border-b border-gray-200">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto">
            <Bike className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* 네비게이션 */}
        <div className="flex-1 p-3 space-y-3">
          <Button
            variant="ghost"
            size="lg"
            className={`w-full h-14 flex flex-col items-center justify-center p-2 ${
              currentView === 'measurement' 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            onClick={() => {
              setCurrentView('measurement');
              setShowResults(false);
            }}
          >
            <Activity className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">측정</span>
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            className={`w-full h-14 flex flex-col items-center justify-center p-2 ${
              currentView === 'history' 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            onClick={() => {
              setCurrentView('history');
              setShowResults(false);
            }}
          >
            <History className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">기록</span>
          </Button>
        </div>

        {/* 연락처 */}
        <div className="p-3 border-t border-gray-200 text-center">
          <div className="text-xs text-gray-400 space-y-1">
            <div>010-8445-0908</div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1">
        {/* 헤더 */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="max-w-6xl mx-auto">
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
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            {currentView === 'measurement' && (
              <div className="space-y-8">
                {/* 특징 카드들 */}
                <div className="grid md:grid-cols-4 gap-6">
                  <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-white border-purple-200 hover:shadow-lg transition-all">
                    <Scale className="w-12 h-12 mx-auto mb-3 text-purple-600" />
                    <h3 className="font-semibold text-gray-800 mb-1">좌우밸런스</h3>
                    <p className="text-sm text-gray-600">정확한 균형 측정</p>
                  </Card>

                  <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:shadow-lg transition-all">
                    <BarChart className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                    <h3 className="font-semibold text-gray-800 mb-1">체력분석</h3>
                    <p className="text-sm text-gray-600">과학적 분석</p>
                  </Card>

                  <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-white border-green-200 hover:shadow-lg transition-all">
                    <Target className="w-12 h-12 mx-auto mb-3 text-green-600" />
                    <h3 className="font-semibold text-gray-800 mb-1">AI코칭</h3>
                    <p className="text-sm text-gray-600">맞춤형 가이드</p>
                  </Card>

                  <Card className="text-center p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200 hover:shadow-lg transition-all">
                    <Smartphone className="w-12 h-12 mx-auto mb-3 text-orange-600" />
                    <h3 className="font-semibold text-gray-800 mb-1">전문리포트</h3>
                    <p className="text-sm text-gray-600">상세한 분석</p>
                  </Card>
                </div>

                {/* 측정 입력 폼 */}
                <Card className="border-purple-200 shadow-xl">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">측정 정보 입력</h2>
                      <p className="text-gray-600">정확한 분석을 위해 모든 정보를 입력해 주세요</p>
                    </div>
                    <MeasurementForm onComplete={handleMeasurementComplete} />
                  </CardContent>
                </Card>
              </div>
            )}

            {currentView === 'history' && (
              <div className="space-y-8">
                {/* 학생 검색 섹션 */}
                <Card className="border-purple-200 shadow-lg">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
                        <Search className="w-6 h-6 mr-3 text-purple-600" />
                        학생 검색
                      </h2>
                      <p className="text-gray-600">이름, 성별, 생년월일로 정확한 학생을 찾아보세요</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                      <div>
                        <Label htmlFor="student-name" className="text-sm font-medium text-gray-700 mb-2 block">
                          학생 이름
                        </Label>
                        <Input
                          id="student-name"
                          placeholder="예) 김철수"
                          value={searchStudent.name}
                          onChange={(e) => setSearchStudent(prev => ({...prev, name: e.target.value}))}
                          className="h-12"
                        />
                      </div>

                      <div>
                        <Label htmlFor="student-gender" className="text-sm font-medium text-gray-700 mb-2 block">
                          성별
                        </Label>
                        <Select value={searchStudent.gender} onValueChange={(value) => setSearchStudent(prev => ({...prev, gender: value}))}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="성별 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="M">남성</SelectItem>
                            <SelectItem value="F">여성</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="student-birthdate" className="text-sm font-medium text-gray-700 mb-2 block">
                          생년월일
                        </Label>
                        <Input
                          id="student-birthdate"
                          type="date"
                          value={searchStudent.birthDate}
                          onChange={(e) => setSearchStudent(prev => ({...prev, birthDate: e.target.value}))}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="text-center mt-8">
                      <Button 
                        onClick={handleSearchStudent}
                        size="lg"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg px-12 h-12"
                      >
                        <Search className="w-5 h-5 mr-2" />
                        학생 기록 검색
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* 검색 결과 */}
                {searchStudent.name && searchStudent.gender && searchStudent.birthDate ? (
                  <MeasurementHistory 
                    studentName={searchStudent.name}
                    searchStudent={searchStudent}
                  />
                ) : (
                  <Card className="text-center p-12 border-2 border-dashed border-gray-300 bg-gray-50">
                    <History className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">학생 정보를 입력하세요</h3>
                    <p className="text-gray-500">
                      위 검색창에서 학생의 이름, 성별, 생년월일을 입력하고 검색해주세요.
                    </p>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 푸터 */}
        <div className="bg-gray-800 text-white mt-16">
          <div className="max-w-6xl mx-auto p-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <Bike className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  KidsMotion
                </h3>
                <span className="text-gray-400 text-sm ml-2">by MotionBike</span>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-300">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  010-8445-0908
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  서울시 강서구 금낭화로 234, GX2
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  info@motionbike.com
                </div>
              </div>
              
              <div className="border-t border-gray-600 pt-4">
                <p className="text-gray-400 text-sm">
                  © 2024 MotionBike. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}