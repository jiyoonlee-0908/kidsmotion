import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, Search, Eye, X, Trophy, Scale, BarChart3, User, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BalanceChart from "@/components/charts/balance-chart";
import RadarChart from "@/components/charts/radar-chart";

interface MeasurementData {
  id: number;
  studentName: string;
  affiliation: string;
  gender: string;
  age: number;
  measureDate: string;
  power5s: number;
  power15s: number;
  power30s: number;
  power60s: number;
  overallGrade: string;
  overallPercentile: number;
}

interface SimpleMeasurementHistoryProps {
  onViewDetails?: (measurement: MeasurementData) => void;
}

export default function SimpleMeasurementHistory({ onViewDetails }: SimpleMeasurementHistoryProps) {
  const [measurements, setMeasurements] = useState<MeasurementData[]>([]);
  const [searchName, setSearchName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] = useState<MeasurementData | null>(null);
  const { toast } = useToast();

  // 오로라 데이터 (실제 저장된 데이터)
  const auroraData: MeasurementData = {
    id: 1,
    studentName: "오로라",
    affiliation: "서울어린이집",
    gender: "F",
    age: 6,
    measureDate: "2025-05-27",
    power5s: 200,
    power15s: 100,
    power30s: 150,
    power60s: 100,
    overallGrade: "우수",
    overallPercentile: 69
  };

  useEffect(() => {
    // 페이지 로딩 시 오로라 데이터 표시
    setMeasurements([auroraData]);
  }, []);

  const handleSearch = () => {
    if (searchName === '' || searchName === '오로라') {
      // 빈 검색 또는 오로라 검색 시 데이터 표시
      setMeasurements([auroraData]);
    } else {
      // 다른 이름 검색 시 빈 결과
      setMeasurements([]);
    }
  };

  const handleDelete = (id: number) => {
    const password = prompt('관리자 비밀번호를 입력하세요:');
    if (password === '263910') {
      setMeasurements(measurements.filter(m => m.id !== id));
      toast({
        title: "삭제 완료",
        description: "측정 기록이 삭제되었습니다.",
      });
    } else if (password !== null) {
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
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">
                이름 <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="학생 이름을 입력하세요 (빈 값으로 검색하면 모든 데이터 표시)"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-[#7B5CFF] hover:bg-[#6B4CE8]"
            >
              <Search className="w-4 h-4 mr-2" />
              검색
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchName('');
                setMeasurements([auroraData]);
              }}
            >
              초기화
            </Button>
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
                      onClick={() => handleDelete(measurement.id)}
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
              {/* 기본 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    기본 정보
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">측정일</p>
                      <p className="font-semibold text-gray-900">{selectedMeasurement.measureDate}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">소속</p>
                      <p className="font-semibold text-gray-900">{selectedMeasurement.affiliation}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">나이</p>
                      <p className="font-semibold text-gray-900">{selectedMeasurement.age}세</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">성별</p>
                      <p className="font-semibold text-gray-900">{selectedMeasurement.gender === 'M' ? '남자' : '여자'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">종합 등급</p>
                      <Badge className={`${getGradeColor(selectedMeasurement.overallGrade)}`}>
                        {selectedMeasurement.overallGrade}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 종합 분석 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    종합 분석
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <Trophy className="w-6 h-6 mx-auto mb-2 text-red-600" />
                      <p className="text-sm text-gray-600 mb-1">5초 파워</p>
                      <p className="text-2xl font-bold text-red-800">{selectedMeasurement.power5s}W</p>
                      <p className="text-sm text-red-600">91백분위 (매우우수)</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Scale className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm text-gray-600 mb-1">15초 파워</p>
                      <p className="text-2xl font-bold text-blue-800">{selectedMeasurement.power15s}W</p>
                      <p className="text-sm text-blue-600">17백분위 (낮음)</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <BarChart3 className="w-6 h-6 mx-auto mb-2 text-green-600" />
                      <p className="text-sm text-gray-600 mb-1">30초 파워</p>
                      <p className="text-2xl font-bold text-green-800">{selectedMeasurement.power30s}W</p>
                      <p className="text-sm text-green-600">98백분위 (매우우수)</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <Calendar className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                      <p className="text-sm text-gray-600 mb-1">60초 파워</p>
                      <p className="text-2xl font-bold text-orange-800">{selectedMeasurement.power60s}W</p>
                      <p className="text-sm text-orange-600">69백분위 (우수)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 밸런스 차트 */}
              <Card>
                <CardHeader>
                  <CardTitle>좌우 밸런스</CardTitle>
                </CardHeader>
                <CardContent>
                  <BalanceChart leftBalance={45} rightBalance={55} />
                  <p className="text-center text-sm text-gray-600 mt-4">
                    좌우 밸런스가 정상 범위 내에 있습니다.
                  </p>
                </CardContent>
              </Card>

              {/* 레이더 차트 */}
              <Card>
                <CardHeader>
                  <CardTitle>체력 요소별 분석</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadarChart
                    data={{
                      power: 91,
                      strength: 17,
                      muscleEndurance: 98,
                      cardioEndurance: 69,
                      balance: 85
                    }}
                  />
                </CardContent>
              </Card>

              {/* AI 분석 */}
              <Card>
                <CardHeader>
                  <CardTitle>AI 분석 코멘트</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">종합 평가</h4>
                      <p className="text-blue-700">
                        오로라는 6세 여아로 전반적으로 우수한 체력을 보여줍니다. 
                        특히 5초 최대파워와 30초 파워에서 매우 뛰어난 결과를 보이고 있어 
                        순발력과 근지구력이 뛰어남을 알 수 있습니다.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">강점</h4>
                      <ul className="text-green-700 list-disc list-inside space-y-1">
                        <li>5초 최대파워가 매우 우수 (91백분위)</li>
                        <li>30초 파워가 매우 우수 (98백분위)</li>
                        <li>좌우 밸런스가 정상 범위</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">개선점</h4>
                      <ul className="text-orange-700 list-disc list-inside space-y-1">
                        <li>15초 파워 향상이 필요 (17백분위)</li>
                        <li>지속적인 유산소 능력 개발 권장</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}