import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scale, BarChart3, Shield, Users, Phone, Mail, MapPin, Search, Activity, Calendar, User, Ruler, Weight, Zap, Heart } from "lucide-react";
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
  const [showDropdown, setShowDropdown] = useState(false);
  const [showStudentSearch, setShowStudentSearch] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{name: string, gender: string, birthDate: string} | null>(null);

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
      {/* 상단 헤더 */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* 로고 및 브랜딩 */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  KidsMotion
                </h1>
                <p className="text-sm text-gray-500">MotionBike</p>
              </div>
            </div>

            {/* 네비게이션 */}
            <div className="flex space-x-6">
              <Button
                variant="ghost"
                className={`text-lg font-medium px-4 py-2 ${
                  currentView === 'measurement' ? 'text-purple-600' : 'text-gray-600'
                } hover:text-purple-600`}
                onClick={() => setCurrentView('measurement')}
              >
                홈
              </Button>
              
              {/* 분석 드롭다운 */}
              <div 
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => {
                  setTimeout(() => {
                    setShowDropdown(false);
                  }, 300);
                }}
              >
                <Button
                  variant="ghost"
                  className="text-lg font-medium px-4 py-2 text-gray-600 hover:text-purple-600"
                >
                  분석
                </Button>
                
                {showDropdown && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => {
                      setTimeout(() => {
                        setShowDropdown(false);
                      }, 300);
                    }}
                  >
                    <button
                      className={`w-full text-left px-4 py-2 hover:bg-purple-50 transition-colors ${
                        currentView === 'measurement' ? 'text-purple-600 bg-purple-50 font-medium' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        setCurrentView('measurement');
                        setShowDropdown(false);
                      }}
                    >
                      <Activity className="w-4 h-4 inline mr-2" />
                      측정
                    </button>
                    <button
                      className={`w-full text-left px-4 py-2 hover:bg-purple-50 transition-colors ${
                        currentView === 'history' ? 'text-purple-600 bg-purple-50 font-medium' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        setShowStudentSearch(true);
                        setShowDropdown(false);
                      }}
                    >
                      <Search className="w-4 h-4 inline mr-2" />
                      기록
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-4xl mx-auto p-6">
        {/* 측정 화면 */}
        {currentView === 'measurement' && (
          <div className="space-y-6">
            {/* 타이틀 섹션 */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                AI 기반 아동 체력 분석
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                정확한 측정 데이터와 인공지능 분석으로 우리 아이의 체력을 과학적으로 평가하고 맞춤형 운동 처방을 제공합니다
              </p>
            </div>

            {/* 특징 카드들 */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card className="text-center p-4 bg-gradient-to-br from-purple-50 to-white border-purple-200 hover:shadow-lg transition-all duration-300">
                <Scale className="w-10 h-10 mx-auto mb-3 text-purple-600" />
                <h3 className="font-semibold text-gray-800 mb-2">좌우 밸런스</h3>
                <p className="text-sm text-gray-600 leading-relaxed">정밀한 균형 측정으로<br />신체 불균형 조기 발견</p>
              </Card>

              <Card className="text-center p-4 bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:shadow-lg transition-all duration-300">
                <BarChart3 className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold text-gray-800 mb-2">정밀 분석</h3>
                <p className="text-sm text-gray-600 leading-relaxed">5단계 파워 측정으로<br />종합 체력 평가</p>
              </Card>

              <Card className="text-center p-4 bg-gradient-to-br from-green-50 to-white border-green-200 hover:shadow-lg transition-all duration-300">
                <Shield className="w-10 h-10 mx-auto mb-3 text-green-600" />
                <h3 className="font-semibold text-gray-800 mb-2">AI 코칭</h3>
                <p className="text-sm text-gray-600 leading-relaxed">개인별 특성에 맞는<br />운동 처방 제공</p>
              </Card>

              <Card className="text-center p-4 bg-gradient-to-br from-orange-50 to-white border-orange-200 hover:shadow-lg transition-all duration-300">
                <Users className="w-10 h-10 mx-auto mb-3 text-orange-600" />
                <h3 className="font-semibold text-gray-800 mb-2">전문 리포트</h3>
                <p className="text-sm text-gray-600 leading-relaxed">상세한 PDF 리포트와<br />QR 코드 공유</p>
              </Card>
            </div>

            {/* 측정 정보 입력 폼 */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-xl flex items-center">
                  <Activity className="w-6 h-6 mr-3" />
                  측정 정보 입력
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {/* 기본 정보 섹션 */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-purple-600" />
                    기본 정보
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        측정 날짜
                      </label>
                      <Input 
                        type="date" 
                        defaultValue={new Date().toISOString().split('T')[0]} 
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">학생 이름</label>
                      <Input placeholder="이름을 입력하세요" className="w-full" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">성별</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="성별 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="M">남자</SelectItem>
                          <SelectItem value="F">여자</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">생년월일</label>
                      <Input type="date" className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">나이</label>
                      <Input placeholder="만 나이" className="w-full" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Ruler className="w-4 h-4 inline mr-1" />
                        키 (cm)
                      </label>
                      <Input placeholder="예: 120" className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Weight className="w-4 h-4 inline mr-1" />
                        몸무게 (kg)
                      </label>
                      <Input placeholder="예: 25" className="w-full" />
                    </div>
                  </div>
                </div>

                {/* 파워 측정값 섹션 */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-600" />
                    파워 측정값 (W)
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">순발력</label>
                      <Input placeholder="0" className="w-full text-center font-mono text-lg" />
                      <p className="text-xs text-gray-500 mt-1">5초 최대파워</p>
                    </div>
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">근력</label>
                      <Input placeholder="0" className="w-full text-center font-mono text-lg" />
                      <p className="text-xs text-gray-500 mt-1">15초 최대파워</p>
                    </div>
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">근지구력</label>
                      <Input placeholder="0" className="w-full text-center font-mono text-lg" />
                      <p className="text-xs text-gray-500 mt-1">30초 최대파워</p>
                    </div>
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">심폐지구력</label>
                      <Input placeholder="0" className="w-full text-center font-mono text-lg" />
                      <p className="text-xs text-gray-500 mt-1">60초 최대파워</p>
                    </div>
                  </div>
                </div>

                {/* 좌우 밸런스 섹션 */}
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <Scale className="w-5 h-5 mr-2 text-green-600" />
                    좌우 밸런스 비율 (%)
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">왼쪽</label>
                      <Input 
                        placeholder="50.0" 
                        className="w-full text-center font-mono text-lg" 
                        onChange={(e) => {
                          const leftValue = parseFloat(e.target.value) || 0;
                          const rightInput = e.target.parentElement?.parentElement?.querySelector('div:last-child input') as HTMLInputElement;
                          if (rightInput) {
                            rightInput.value = (100 - leftValue).toFixed(1);
                          }
                        }}
                      />
                    </div>
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">오른쪽</label>
                      <Input 
                        placeholder="50.0" 
                        className="w-full text-center font-mono text-lg" 
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* 심폐기능 섹션 */}
                <div className="bg-red-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-600" />
                    심폐기능 (선택사항)
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">최대심박수</label>
                      <Input placeholder="측정값 없음" className="w-full text-center font-mono" />
                      <p className="text-xs text-gray-500 mt-1">bpm</p>
                    </div>
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">평균심박수</label>
                      <Input placeholder="측정값 없음" className="w-full text-center font-mono" />
                      <p className="text-xs text-gray-500 mt-1">bpm</p>
                    </div>
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">안정시심박수</label>
                      <Input placeholder="측정값 없음" className="w-full text-center font-mono" />
                      <p className="text-xs text-gray-500 mt-1">bpm</p>
                    </div>
                  </div>
                </div>

                {/* 고급 측정 (선택사항) */}
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                    고급 측정 (선택사항)
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">장기 지구력</label>
                      <Input placeholder="측정값 없음" className="w-full text-center font-mono" />
                      <p className="text-xs text-gray-500 mt-1">180초 최대파워 (10세 이상 권장)</p>
                    </div>
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">최대 지구력</label>
                      <Input placeholder="측정값 없음" className="w-full text-center font-mono" />
                      <p className="text-xs text-gray-500 mt-1">360초 최대파워 (10세 이상 권장)</p>
                    </div>
                  </div>
                </div>

                {/* 분석 시작 버튼 */}
                <div className="text-center pt-4">
                  <Button 
                    className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <BarChart3 className="w-6 h-6 mr-3" />
                    AI 체력 분석 시작
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 기록 화면 */}
        {currentView === 'history' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">측정 기록 조회</h2>
              <p className="text-lg text-gray-600">학생의 이름, 성별, 생년월일로 과거 측정 기록을 검색할 수 있습니다</p>
            </div>
            
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
                <CardTitle className="text-xl flex items-center">
                  <Search className="w-6 h-6 mr-3" />
                  학생 검색
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <MeasurementHistory 
                  studentName="" 
                  searchStudent={{
                    name: "",
                    gender: "",
                    birthDate: ""
                  }}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* 푸터 */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-4xl mx-auto p-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* 회사 정보 */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    KidsMotion
                  </h3>
                  <p className="text-gray-400 text-sm">by MotionBike</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                과학적이고 정확한 어린이 체력 측정을 통해 건강한 성장을 지원하는 전문 분석 시스템
              </p>
            </div>

            {/* 서비스 */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">서비스</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>체력 측정 및 분석</li>
                <li>AI 기반 맞춤 코칭</li>
                <li>전문가 리포트</li>
                <li>성장 추적 시스템</li>
              </ul>
            </div>

            {/* 지원 */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">지원</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>사용자 가이드</li>
                <li>기술 지원</li>
                <li>교육 프로그램</li>
                <li>FAQ</li>
              </ul>
            </div>

            {/* 연락처 */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">연락처</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>010-8445-0908</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>info@motionbike.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>서울시 강서구 금낭화로 234, GX2</span>
                </div>
              </div>
            </div>
          </div>

          {/* 저작권 */}
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 MotionBike Co., Ltd. All rights reserved. | 사업자등록번호: 123-45-67890
            </p>
          </div>
        </div>
      </footer>

      {/* 학생 검색 모달 */}
      {showStudentSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Search className="w-5 h-5 mr-2 text-blue-600" />
                  학생 검색
                </h2>
                <button
                  onClick={() => {
                    setShowStudentSearch(false);
                    setSelectedStudent(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-600 mt-2">학생의 이름, 성별, 생년월일을 입력하여 측정 기록을 검색하세요</p>
            </div>

            <div className="p-6">
              {!selectedStudent ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                      <Input 
                        placeholder="홍길동"
                        value={selectedStudent?.name || ""}
                        onChange={(e) => {
                          // 임시로 검색 상태 업데이트
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">성별</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="성별 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">남자</SelectItem>
                          <SelectItem value="female">여자</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">생년월일</label>
                      <Input 
                        type="date"
                        placeholder="2010-01-01"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button 
                      onClick={() => {
                        // 학생 검색 실행 및 결과 표시
                        setSelectedStudent({
                          name: "홍길동",
                          gender: "male", 
                          birthDate: "2010-01-01"
                        });
                        setCurrentView('history');
                        setShowStudentSearch(false);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 px-8"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      검색하기
                    </Button>
                  </div>
                </div>
              ) : (
                <MeasurementHistory 
                  studentName={selectedStudent.name}
                  searchStudent={selectedStudent}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}