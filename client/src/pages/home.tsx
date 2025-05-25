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
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 text-white shadow-xl">
          <div className="max-w-6xl mx-auto p-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mr-4">
                  <Bike className="w-10 h-10 text-purple-600" />
                </div>
                <div className="text-left">
                  <h1 className="text-4xl font-bold text-white mb-1">
                    KidsMotion
                  </h1>
                  <p className="text-purple-200 text-sm">
                    by <span className="font-semibold text-white">MotionBike</span>
                  </p>
                </div>
              </div>
              <p className="text-xl text-white/90 mb-6">
                어린이 체력 측정 및 분석 시스템
              </p>
              
              {/* 연락처 정보 */}
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Phone className="w-6 h-6 mx-auto mb-2 text-white" />
                  <p className="text-white font-medium">010-8445-0908</p>
                  <p className="text-purple-200 text-sm">고객센터</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-white" />
                  <p className="text-white font-medium">서울시 강서구</p>
                  <p className="text-purple-200 text-sm">금낭화로 234, GX2</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Mail className="w-6 h-6 mx-auto mb-2 text-white" />
                  <p className="text-white font-medium">info@motionbike.com</p>
                  <p className="text-purple-200 text-sm">문의 이메일</p>
                </div>
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
        <div className="bg-gray-900 text-white mt-16">
          <div className="max-w-6xl mx-auto p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* 회사 소개 */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <Bike className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      KidsMotion
                    </h3>
                    <p className="text-gray-400 text-sm">by MotionBike</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  과학적이고 정확한 어린이 체력 측정을 통해 
                  건강한 성장을 지원하는 전문 분석 시스템입니다.
                </p>
              </div>

              {/* 서비스 특징 */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">서비스 특징</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    정확한 좌우 밸런스 측정
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    과학적 체력 분석 리포트
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    AI 기반 맞춤형 코칭
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    상세한 전문가 리포트 제공
                  </li>
                </ul>
              </div>

              {/* 연락처 */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">연락처</h4>
                <div className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-3 text-purple-400" />
                    <span>010-8445-0908</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-3 text-blue-400" />
                    <span>서울시 강서구 금낭화로 234, GX2</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-3 text-green-400" />
                    <span>info@motionbike.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 하단 저작권 */}
            <div className="border-t border-gray-700 mt-8 pt-6 text-center">
              <p className="text-gray-400 text-sm">
                © 2024 MotionBike. All rights reserved. | KidsMotion 어린이 체력 측정 시스템
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}