import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, Search, Eye, X, Trophy, Scale, BarChart3, User, Calendar, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BalanceChart from "@/components/charts/balance-chart";
import RadarChart from "@/components/charts/radar-chart";

interface MeasurementData {
  id: number;
  studentName: string;
  affiliation: string;
  gender: string;
  age: number;
  birthDate: string; // 생년월일 추가
  measureDate: string;
  height: number;
  weight: number;
  power5s: number;
  power15s: number;
  power30s: number;
  power60s: number;
  power180s?: number;
  power360s?: number;
  leftBalance: number;
  rightBalance: number;
  maxHeartRate?: number;
  avgHeartRate?: number;
  overallGrade: string;
  overallPercentile: number;
  percentile5s: number;
  percentile15s: number;
  percentile30s: number;
  percentile60s: number;
  percentile180s?: number;
  percentile360s?: number;
}

interface SimpleMeasurementHistoryProps {
  onViewDetails?: (measurement: MeasurementData) => void;
}

export default function SimpleMeasurementHistory({ onViewDetails }: SimpleMeasurementHistoryProps) {
  const [measurements, setMeasurements] = useState<MeasurementData[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchAffiliation, setSearchAffiliation] = useState('');
  const [searchBirthDate, setSearchBirthDate] = useState('');
  const [searchGender, setSearchGender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] = useState<MeasurementData | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [adminPassword, setAdminPassword] = useState('');
  const { toast } = useToast();

  // 오로라 데이터 (실제 저장된 데이터)
  const auroraData: MeasurementData = {
    id: 1,
    studentName: "오로라",
    affiliation: "서울어린이집",
    gender: "F",
    age: 6,
    measureDate: "2025-05-27",
    birthDate: "2019-03-15", // 생년월일 추가
    height: 110,
    weight: 20,
    power5s: 200,
    power15s: 100,
    power30s: 150,
    power60s: 100,
    power180s: 90,
    power360s: 80,
    leftBalance: 45,
    rightBalance: 55,
    maxHeartRate: 210,
    avgHeartRate: 150,
    overallGrade: "우수",
    overallPercentile: 69,
    percentile5s: 91,
    percentile15s: 17,
    percentile30s: 98,
    percentile60s: 69,
    percentile180s: 42,
    percentile360s: 19
  };

  useEffect(() => {
    // 페이지 로딩 시 오로라 데이터 표시
    setMeasurements([auroraData]);
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    
    // 검색 로직
    setTimeout(() => {
      const allData = [auroraData]; // 실제로는 서버에서 가져온 모든 데이터
      
      // 모든 검색 조건이 비어있으면 전체 데이터 표시
      if (!searchName.trim() && !searchAffiliation.trim() && !searchBirthDate.trim() && !searchGender.trim()) {
        setMeasurements(allData);
        setIsLoading(false);
        return;
      }
      
      // 조건에 맞는 데이터 필터링
      const filtered = allData.filter(measurement => {
        const nameMatch = !searchName.trim() || measurement.studentName.toLowerCase().includes(searchName.toLowerCase());
        const affiliationMatch = !searchAffiliation.trim() || measurement.affiliation.toLowerCase().includes(searchAffiliation.toLowerCase());
        const birthDateMatch = !searchBirthDate.trim() || measurement.birthDate.includes(searchBirthDate);
        const genderMatch = !searchGender.trim() || measurement.gender === searchGender;
        
        // 모든 조건을 만족하는 경우만 반환
        return nameMatch && affiliationMatch && birthDateMatch && genderMatch;
      });
      
      setMeasurements(filtered);
      setIsLoading(false);
    }, 300);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteTargetId(id);
    setDeleteConfirmOpen(true);
    setAdminPassword('');
  };

  const handleDeleteConfirm = () => {
    if (adminPassword === '263910') {
      setMeasurements(measurements.filter(m => m.id !== deleteTargetId));
      setDeleteConfirmOpen(false);
      setDeleteTargetId(null);
      setAdminPassword('');
      toast({
        title: "삭제 완료",
        description: "측정 기록이 삭제되었습니다.",
      });
    } else {
      toast({
        title: "삭제 실패",
        description: "비밀번호가 올바르지 않습니다.",
        variant: "destructive",
      });
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case '매우우수': return 'bg-green-100 text-green-800';
      case '우수': return 'bg-blue-100 text-blue-800';
      case '보통': return 'bg-yellow-100 text-yellow-800';
      case '낮음': return 'bg-orange-100 text-orange-800';
      case '매우낮음': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            측정 기록 조회
          </CardTitle>
          <p className="text-sm text-gray-600">
            학생의 과거 측정 기록을 조회할 수 있습니다
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 첫 번째 줄: 이름, 기관 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                <Input
                  placeholder="학생 이름 입력"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">소속 기관</label>
                <Input
                  placeholder="병원, 센터, 학교, 유치원명 입력"
                  value={searchAffiliation}
                  onChange={(e) => setSearchAffiliation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>

            {/* 두 번째 줄: 생년월일, 성별 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
                <Input
                  type="date"
                  placeholder="YYYY-MM-DD"
                  value={searchBirthDate}
                  onChange={(e) => setSearchBirthDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">성별</label>
                <select
                  value={searchGender}
                  onChange={(e) => setSearchGender(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">전체</option>
                  <option value="M">남자</option>
                  <option value="F">여자</option>
                </select>
              </div>
            </div>

            {/* 검색 버튼 */}
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchName('');
                  setSearchAffiliation('');
                  setSearchBirthDate('');
                  setSearchGender('');
                  setMeasurements([auroraData]);
                }}
              >
                초기화
              </Button>
              <Button 
                onClick={handleSearch}
                className="bg-[#7B5CFF] hover:bg-[#6B4CE8]"
                disabled={isLoading}
              >
                <Search className="w-4 h-4 mr-2" />
                {isLoading ? '검색중...' : '검색'}
              </Button>
            </div>

            {/* 검색 안내 */}
            <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
              <p>💡 <strong>검색 팁:</strong></p>
              <p>• 조건을 비워두고 검색하면 전체 기록이 표시됩니다</p>
              <p>• 여러 조건을 입력하면 모든 조건에 맞는 기록만 표시됩니다</p>
              <p>• 이름만 입력하면 동명이인도 함께 표시됩니다</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>검색 결과</CardTitle>
        </CardHeader>
        <CardContent>
          {measurements.length > 0 ? (
            <div className="space-y-4">
              {measurements.map((measurement) => (
                <div
                  key={measurement.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {/* 이름 (클릭 가능, 고정 너비) */}
                      <h3 
                        className="text-lg font-semibold text-[#7B5CFF] cursor-pointer hover:underline min-w-[80px]"
                        onClick={() => setSelectedMeasurement(measurement)}
                      >
                        {measurement.studentName}
                      </h3>
                      
                      {/* 나이, 성별 */}
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className="text-xs">
                          {measurement.age}세
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {measurement.gender === 'M' ? '남' : '여'}
                        </Badge>
                      </div>
                      
                      {/* 소속 */}
                      <span className="text-sm text-gray-600 min-w-[100px]">
                        {measurement.affiliation}
                      </span>
                      
                      {/* 생년월일 */}
                      <span className="text-sm text-gray-600">
                        {measurement.birthDate}
                      </span>
                      
                      {/* 측정일 */}
                      <span className="text-sm text-gray-600">
                        {measurement.measureDate}
                      </span>
                      
                      {/* 등급 */}
                      <Badge className={`${getGradeColor(measurement.overallGrade)}`}>
                        {measurement.overallGrade} ({measurement.overallPercentile}%)
                      </Badge>
                    </div>
                    
                    {/* 삭제 버튼 */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(measurement.id)}
                      className="text-red-600 hover:text-red-700 ml-4"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">검색 조건에 맞는 기록이 없습니다.</p>
              <p className="text-sm text-gray-400 mt-1">
                이름을 비워두고 검색하면 모든 데이터를 볼 수 있습니다.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 상세 리포트 모달 */}
      <Dialog open={!!selectedMeasurement} onOpenChange={() => setSelectedMeasurement(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {selectedMeasurement?.studentName} 체력 분석 리포트
            </DialogTitle>
          </DialogHeader>
          
          {selectedMeasurement && (
            <div className="space-y-8">
              {/* 헤더 */}
              <div className="text-center">
                <h2 className="text-3xl font-bold gradient-text mb-4">체력 분석 결과</h2>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" className="text-purple-600 border-purple-300">
                    새 측정
                  </Button>
                </div>
              </div>

              {/* 기본 정보 섹션 */}
              <div className="bg-white rounded-lg p-6 border">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedMeasurement.studentName}</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600">측정일</p>
                    <p className="font-semibold">{selectedMeasurement.measureDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">소속</p>
                    <p className="font-semibold">{selectedMeasurement.affiliation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">생년월일</p>
                    <p className="font-semibold">{selectedMeasurement.birthDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">키/체중</p>
                    <p className="font-semibold">{selectedMeasurement.height}cm / {selectedMeasurement.weight}kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">BMI</p>
                    <p className="font-semibold">{(selectedMeasurement.weight / ((selectedMeasurement.height / 100) ** 2)).toFixed(1)}</p>
                  </div>
                </div>
              </div>

              {/* 체력 요약 */}
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="text-xl font-bold mb-4">체력 요약</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">{Math.round(selectedMeasurement.overallPercentile)}</div>
                    <div className="text-sm text-gray-600">종합 백분위</div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">강점</span>
                      <p className="font-semibold text-green-600">근력 (60초), 파워 지속력 (30초)</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">보완점</span>
                      <p className="font-semibold text-orange-600">순발력 (5초)</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">한줄 요약</span>
                      <p className="text-sm">{selectedMeasurement.aiSummary || "AI 분석 결과가 없습니다."}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 좌우 밸런스 분석 */}
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="text-xl font-bold mb-4">좌우 밸런스 분석</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex justify-center">
                    <BalanceChart 
                      leftBalance={selectedMeasurement.leftBalance} 
                      rightBalance={selectedMeasurement.rightBalance} 
                      status={selectedMeasurement.balanceStatus}
                    />
                  </div>
                  <div>
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span>왼쪽</span>
                        <span>{selectedMeasurement.leftBalance}%</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>오른쪽</span>
                        <span>{selectedMeasurement.rightBalance}%</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded p-4">
                      <h4 className="font-semibold mb-2">AI 코멘트</h4>
                      <p className="text-sm text-gray-700">{selectedMeasurement.balanceComment}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 항목별 체력 세부평가 */}
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="text-xl font-bold mb-4">항목별 체력 세부평가</h3>
                <div className="space-y-6">
                  <div className="fitness-item">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">순발력 (5초)</h4>
                        <p className="text-sm text-gray-600">{selectedMeasurement.power5s}W | 환산점수: {Math.round(selectedMeasurement.percentile5s)}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${selectedMeasurement.percentile5s >= 80 ? 'bg-green-500' : selectedMeasurement.percentile5s >= 20 ? 'bg-yellow-500' : 'bg-red-500'} text-white`}>
                          {selectedMeasurement.percentile5s >= 80 ? '우수' : selectedMeasurement.percentile5s >= 20 ? '보통' : '경고'}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{selectedMeasurement.percentile5s}%</p>
                      </div>
                    </div>
                    <div className="progress-bar mb-3">
                      <div className={`progress-fill ${selectedMeasurement.percentile5s >= 80 ? 'bg-green-500' : selectedMeasurement.percentile5s >= 20 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                           style={{width: `${selectedMeasurement.percentile5s}%`}}></div>
                    </div>
                    <p className="text-sm text-gray-700">{selectedMeasurement.explanation5s}</p>
                  </div>

                  <div className="fitness-item">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">스프린트 파워 (15초)</h4>
                        <p className="text-sm text-gray-600">{selectedMeasurement.power15s}W | 환산점수: {Math.round(selectedMeasurement.percentile15s)}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${selectedMeasurement.percentile15s >= 80 ? 'bg-green-500' : selectedMeasurement.percentile15s >= 20 ? 'bg-yellow-500' : 'bg-red-500'} text-white`}>
                          {selectedMeasurement.percentile15s >= 80 ? '우수' : selectedMeasurement.percentile15s >= 20 ? '보통' : '경고'}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{selectedMeasurement.percentile15s}%</p>
                      </div>
                    </div>
                    <div className="progress-bar mb-3">
                      <div className={`progress-fill ${selectedMeasurement.percentile15s >= 80 ? 'bg-green-500' : selectedMeasurement.percentile15s >= 20 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                           style={{width: `${selectedMeasurement.percentile15s}%`}}></div>
                    </div>
                    <p className="text-sm text-gray-700">{selectedMeasurement.explanation15s}</p>
                  </div>

                  <div className="fitness-item">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">파워 지속력 (30초)</h4>
                        <p className="text-sm text-gray-600">{selectedMeasurement.power30s}W | 환산점수: {Math.round(selectedMeasurement.percentile30s)}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${selectedMeasurement.percentile30s >= 80 ? 'bg-green-500' : selectedMeasurement.percentile30s >= 20 ? 'bg-yellow-500' : 'bg-red-500'} text-white`}>
                          {selectedMeasurement.percentile30s >= 80 ? '우수' : selectedMeasurement.percentile30s >= 20 ? '보통' : '경고'}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{selectedMeasurement.percentile30s}%</p>
                      </div>
                    </div>
                    <div className="progress-bar mb-3">
                      <div className={`progress-fill ${selectedMeasurement.percentile30s >= 80 ? 'bg-green-500' : selectedMeasurement.percentile30s >= 20 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                           style={{width: `${selectedMeasurement.percentile30s}%`}}></div>
                    </div>
                    <p className="text-sm text-gray-700">{selectedMeasurement.explanation30s}</p>
                  </div>

                  <div className="fitness-item">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">근력 (60초)</h4>
                        <p className="text-sm text-gray-600">{selectedMeasurement.power60s}W | 환산점수: {Math.round(selectedMeasurement.percentile60s)}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${selectedMeasurement.percentile60s >= 80 ? 'bg-green-500' : selectedMeasurement.percentile60s >= 20 ? 'bg-yellow-500' : 'bg-red-500'} text-white`}>
                          {selectedMeasurement.percentile60s >= 80 ? '우수' : selectedMeasurement.percentile60s >= 20 ? '보통' : '경고'}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{selectedMeasurement.percentile60s}%</p>
                      </div>
                    </div>
                    <div className="progress-bar mb-3">
                      <div className={`progress-fill ${selectedMeasurement.percentile60s >= 80 ? 'bg-green-500' : selectedMeasurement.percentile60s >= 20 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                           style={{width: `${selectedMeasurement.percentile60s}%`}}></div>
                    </div>
                    <p className="text-sm text-gray-700">{selectedMeasurement.explanation60s}</p>
                  </div>
                </div>
              </div>

              {/* 심박수 확인 */}
              {(selectedMeasurement.maxHeartRate || selectedMeasurement.avgHeartRate) && (
                <div className="bg-white rounded-lg p-6 border">
                  <h3 className="text-xl font-bold mb-4">심박수 확인</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-500">{selectedMeasurement.maxHeartRate || '-'}</div>
                      <div className="text-sm text-gray-600">최대 심박수</div>
                      <div className="text-xs text-gray-500">해당 나이 평균 최대심박수: {220 - selectedMeasurement.age}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-500">{selectedMeasurement.avgHeartRate || '-'}</div>
                      <div className="text-sm text-gray-600">운동시 평균 심박수</div>
                      <div className="text-xs text-gray-500">최대 심박수 대비 {selectedMeasurement.avgHeartRate && selectedMeasurement.maxHeartRate ? Math.round((selectedMeasurement.avgHeartRate / selectedMeasurement.maxHeartRate) * 100) : '-'}%로 운동</div>
                    </div>
                  </div>
                  <div className="mt-4 bg-pink-50 rounded p-4">
                    <h4 className="font-semibold text-pink-800 mb-2">💓 심박수 건강 포인트</h4>
                    <p className="text-sm text-pink-700">🏃‍♀️ 규칙적인 운동으로 심박을 더 건강하게 만들어봐요!</p>
                    <p className="text-sm text-pink-700">📈 시간이 지나면서 운동시 평균 심박수가 낮아지는 것을 목표로 해봐요!</p>
                  </div>
                </div>
              )}

              {/* 체력 종합 분석 */}
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="text-xl font-bold mb-4">체력 종합 분석</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">AI 종합 해설</h4>
                    <div className="text-sm text-gray-700 space-y-2">
                      {selectedMeasurement.comprehensiveAnalysis?.split(' | ').map((point, index) => (
                        <p key={index}>• {point}</p>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-600">최고 항목</h4>
                      <p className="text-sm">근력 (60초)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-600">개선 항목</h4>
                      <p className="text-sm">순발력 (5초)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 신체 변화 비교 - 임시 데이터 */}
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="text-xl font-bold mb-4">신체 변화 비교</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">체력 변화</h4>
                    <p className="text-sm text-gray-600">이전 측정 데이터가 있으면 여기에 표시됩니다.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">좌우 밸런스 변화</h4>
                    <div className="text-sm">
                      <table className="w-full">
                        <thead>
                          <tr className="text-xs text-gray-600">
                            <th>날짜</th><th>좌</th><th>우</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="text-xs">
                            <td>이전 측정</td><td>-</td><td>-</td>
                          </tr>
                          <tr className="text-xs">
                            <td>{selectedMeasurement.measureDate}</td>
                            <td>{selectedMeasurement.leftBalance}%</td>
                            <td>{selectedMeasurement.rightBalance}%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* 종합 평가 */}
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="text-xl font-bold mb-4">종합 평가</h3>
                <p className="text-sm text-gray-700">{selectedMeasurement.overallAssessment}</p>
              </div>

              {/* 다음 측정 및 이력 안내 */}
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="text-xl font-bold mb-4">다음 측정 및 이력 안내</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">권장 측정 주기</h4>
                    <p className="text-sm">1-2개월 내 재측정 권장</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">측정 이력 확인</h4>
                    <p className="text-sm">QR코드 또는 관리자 페이지에서 확인</p>
                  </div>
                </div>
              </div>

              {/* 참고사항 */}
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="text-xl font-bold mb-4">참고사항</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">지도선생님 참고</h4>
                    <p className="text-sm">중점 관리 항목: 근지구력 (180초)과 좌우균형</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">보호자 참고</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 체력 측정은 5분 내외로 간편하게 진행됩니다</li>
                      <li>• 성장기 아이들의 체력 발달 추이를 지속적으로 관찰하세요</li>
                      <li>• 총 체력 백분위: 4개 항목 백분위 평균으로 계산</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold mb-2">측정 기준 정보</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>데이터 버전:</span>
                      <span>v2025-05-26</span>
                    </div>
                    <div className="flex justify-between">
                      <span>보정 지수:</span>
                      <span>0.67</span>
                    </div>
                    <div className="flex justify-between">
                      <span>평가 기준:</span>
                      <span>P4/P20/P80/P96</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 삭제 확인 모달 */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              관리자 인증
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              측정 기록을 삭제하려면 관리자 비밀번호를 입력하세요.
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">비밀번호</label>
              <Input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="관리자 비밀번호 입력"
                onKeyPress={(e) => e.key === 'Enter' && handleDeleteConfirm()}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteConfirmOpen(false);
                  setAdminPassword('');
                }}
              >
                취소
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
              >
                삭제
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}