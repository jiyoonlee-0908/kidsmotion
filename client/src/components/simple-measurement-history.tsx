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
            <div className="space-y-6">
              {/* Student Info Card */}
              <Card className="fitness-card">
                <CardContent>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">학생 정보</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">이름</p>
                      <p className="font-semibold text-gray-900">{selectedMeasurement.studentName}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">소속</p>
                      <p className="font-semibold text-gray-900">{selectedMeasurement.affiliation}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">나이</p>
                      <p className="font-semibold text-gray-900">{selectedMeasurement.age}세</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">성별</p>
                      <p className="font-semibold text-gray-900">{selectedMeasurement.gender === 'M' ? '남자' : '여자'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">측정일</p>
                      <p className="font-semibold text-gray-900">{selectedMeasurement.measureDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comprehensive Analysis Card */}
              <Card className="fitness-card">
                <CardContent>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Trophy className="text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">종합 체력 분석</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="relative w-20 h-20 mx-auto mb-3">
                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="m18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="2"
                          />
                          <path
                            d="m18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            strokeDasharray={`${selectedMeasurement.overallPercentile}, 100`}
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#7c3aed" />
                              <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-gray-900">{Math.round(selectedMeasurement.overallPercentile)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">종합 백분위</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">강점</p>
                      <p className="font-semibold text-green-600">5초 순발력, 30초 근지구력</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">보완점</p>
                      <p className="font-semibold text-yellow-600">15초 근력, 장기지구력</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">한줄 요약</p>
                      <p className="text-sm text-gray-900">순발력이 뛰어난 활발한 아동으로, 근력 보강이 필요합니다.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Balance Analysis Card */}
              <Card className="fitness-card">
                <CardContent>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Scale className="text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">좌우 밸런스 분석</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex justify-center">
                      <BalanceChart 
                        leftBalance={selectedMeasurement.leftBalance} 
                        rightBalance={selectedMeasurement.rightBalance} 
                        status="주의 필요"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">왼쪽</span>
                        <span className="font-semibold">{selectedMeasurement.leftBalance}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">오른쪽</span>
                        <span className="font-semibold">{selectedMeasurement.rightBalance}%</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">AI 코멘트</h4>
                        <p className="text-sm text-gray-700">좌우 밸런스에 10%의 차이가 있어 주의가 필요합니다. 오른쪽 다리 근력이 더 강하며, 왼쪽 다리 강화 운동을 통해 균형을 맞추는 것이 중요합니다.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Fitness Assessment Card */}
              <Card className="fitness-card">
                <CardContent>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">항목별 체력 세부평가</h3>
                  </div>
                  <div className="space-y-6">
                    {/* 5초 파워 */}
                    <div className="fitness-item">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">5초 최대파워 (순발력)</h4>
                          <p className="text-sm text-gray-600">{selectedMeasurement.power5s}W | 환산점수: {Math.round(selectedMeasurement.percentile5s)}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-emerald-500 text-white text-sm font-medium">매우우수</Badge>
                          <p className="text-sm text-gray-600 mt-1">{selectedMeasurement.percentile5s}%</p>
                        </div>
                      </div>
                      <div className="progress-bar mb-3">
                        <div className="progress-fill bg-emerald-500" style={{width: `${selectedMeasurement.percentile5s}%`}}></div>
                      </div>
                      <p className="text-sm text-gray-700">짧은 시간 동안 최대한의 힘을 발휘하는 능력이 매우 뛰어납니다.</p>
                    </div>

                    {/* 15초 파워 */}
                    <div className="fitness-item">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">15초 최대파워 (근력)</h4>
                          <p className="text-sm text-gray-600">{selectedMeasurement.power15s}W | 환산점수: {Math.round(selectedMeasurement.percentile15s)}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-red-500 text-white text-sm font-medium">경고</Badge>
                          <p className="text-sm text-gray-600 mt-1">{selectedMeasurement.percentile15s}%</p>
                        </div>
                      </div>
                      <div className="progress-bar mb-3">
                        <div className="progress-fill bg-red-500" style={{width: `${selectedMeasurement.percentile15s}%`}}></div>
                      </div>
                      <p className="text-sm text-gray-700">근력 향상을 위한 체계적인 훈련이 필요합니다.</p>
                    </div>

                    {/* 30초 파워 */}
                    <div className="fitness-item">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">30초 최대파워 (근지구력)</h4>
                          <p className="text-sm text-gray-600">{selectedMeasurement.power30s}W | 환산점수: {Math.round(selectedMeasurement.percentile30s)}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-emerald-500 text-white text-sm font-medium">매우우수</Badge>
                          <p className="text-sm text-gray-600 mt-1">{selectedMeasurement.percentile30s}%</p>
                        </div>
                      </div>
                      <div className="progress-bar mb-3">
                        <div className="progress-fill bg-emerald-500" style={{width: `${selectedMeasurement.percentile30s}%`}}></div>
                      </div>
                      <p className="text-sm text-gray-700">근육의 지구력이 매우 뛰어나 지속적인 활동에 유리합니다.</p>
                    </div>

                    {/* 60초 파워 */}
                    <div className="fitness-item">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">60초 최대파워 (심폐지구력)</h4>
                          <p className="text-sm text-gray-600">{selectedMeasurement.power60s}W | 환산점수: {Math.round(selectedMeasurement.percentile60s)}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-blue-500 text-white text-sm font-medium">우수</Badge>
                          <p className="text-sm text-gray-600 mt-1">{selectedMeasurement.percentile60s}%</p>
                        </div>
                      </div>
                      <div className="progress-bar mb-3">
                        <div className="progress-fill bg-blue-500" style={{width: `${selectedMeasurement.percentile60s}%`}}></div>
                      </div>
                      <p className="text-sm text-gray-700">심폐 기능이 우수하여 지구력 운동에 적합합니다.</p>
                    </div>

                    {/* 180초 파워 */}
                    {selectedMeasurement.power180s && (
                      <div className="fitness-item">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">180초 최대파워 (장기지구력)</h4>
                            <p className="text-sm text-gray-600">{selectedMeasurement.power180s}W | 환산점수: {Math.round(selectedMeasurement.percentile180s!)}</p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-yellow-500 text-white text-sm font-medium">평균</Badge>
                            <p className="text-sm text-gray-600 mt-1">{selectedMeasurement.percentile180s}%</p>
                          </div>
                        </div>
                        <div className="progress-bar mb-3">
                          <div className="progress-fill bg-yellow-500" style={{width: `${selectedMeasurement.percentile180s}%`}}></div>
                        </div>
                        <p className="text-sm text-gray-700">장기간 지속되는 운동 능력이 평균 수준입니다.</p>
                      </div>
                    )}

                    {/* 360초 파워 */}
                    {selectedMeasurement.power360s && (
                      <div className="fitness-item">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">360초 최대파워 (초장기지구력)</h4>
                            <p className="text-sm text-gray-600">{selectedMeasurement.power360s}W | 환산점수: {Math.round(selectedMeasurement.percentile360s!)}</p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-red-500 text-white text-sm font-medium">경고</Badge>
                            <p className="text-sm text-gray-600 mt-1">{selectedMeasurement.percentile360s}%</p>
                          </div>
                        </div>
                        <div className="progress-bar mb-3">
                          <div className="progress-fill bg-red-500" style={{width: `${selectedMeasurement.percentile360s}%`}}></div>
                        </div>
                        <p className="text-sm text-gray-700">초장기 지구력 향상을 위한 체계적인 훈련이 필요합니다.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Radar Chart Card */}
              <Card className="fitness-card">
                <CardContent>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">체력 프로필 차트</h3>
                  </div>
                  <div className="flex justify-center mb-6">
                    <RadarChart
                      data={{
                        power: selectedMeasurement.percentile5s,
                        strength: selectedMeasurement.percentile15s,
                        muscleEndurance: selectedMeasurement.percentile30s,
                        cardioEndurance: selectedMeasurement.percentile60s,
                        balance: 75
                      }}
                    />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">AI 종합 분석</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-green-700 mb-1">우수한 영역</h5>
                        <p className="text-sm text-gray-700">• 순발력 (91백분위): 동연령 대비 매우 뛰어난 폭발적 힘 발휘 능력</p>
                        <p className="text-sm text-gray-700">• 근지구력 (98백분위): 근육의 지속적 수축 능력이 탁월함</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-orange-600 mb-1">개선이 필요한 영역</h5>
                        <p className="text-sm text-gray-700">• 근력 (17백분위): 기초 근력 향상을 위한 체계적 훈련 필요</p>
                        <p className="text-sm text-gray-700">• 장기지구력: 360초 파워 개선을 통한 지구력 향상 권장</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-blue-600 mb-1">운동 처방</h5>
                        <p className="text-sm text-gray-700">순발력을 활용한 스포츠 활동과 함께 근력 강화 운동을 병행하면 균형 잡힌 체력 발달이 가능합니다.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 운동 추천 및 안내사항 */}
              <Card className="fitness-card">
                <CardContent>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Trophy className="text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">운동 추천 및 안내사항</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-3">🏃‍♀️ 권장 운동</h4>
                      <ul className="space-y-2 text-sm text-blue-700">
                        <li>• 달리기, 줄넘기 (순발력 향상)</li>
                        <li>• 스쿼트, 런지 (하체 근력 강화)</li>
                        <li>• 플랭크, 버티기 (코어 근지구력)</li>
                        <li>• 자전거 타기 (심폐지구력)</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-3">📋 측정 안내</h4>
                      <ul className="space-y-2 text-sm text-green-700">
                        <li>• 3-6개월 주기로 재측정 권장</li>
                        <li>• 충분한 휴식 후 측정 필요</li>
                        <li>• 꾸준한 운동으로 체력 향상 가능</li>
                        <li>• 개인차를 고려한 단계적 훈련</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-3">💡 KidsMotion 소개</h4>
                      <div className="space-y-2 text-sm text-yellow-700">
                        <p className="font-medium">아동 전용 체력 측정 시스템</p>
                        <ul className="space-y-1 text-gray-600">
                          <li>• 체력 측정은 5분 내외로 간편하게 진행됩니다</li>
                          <li>• 성장기 아이들의 체력 발달 추이를 지속적으로 관찰하세요</li>
                          <li>• 총 체력 백분위: 4개 항목 백분위 평균으로 계산</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">측정 기준 정보</h4>
                      <div className="space-y-2 text-xs text-gray-600">
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
                </CardContent>
              </Card>
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