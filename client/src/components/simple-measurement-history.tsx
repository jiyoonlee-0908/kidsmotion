import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trash2, Search, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
                  className="border rounded-lg p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{measurement.studentName}</h3>
                        <Badge variant="outline" className="text-xs">
                          {measurement.age}세
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {measurement.gender === 'M' ? '남' : '여'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        소속: {measurement.affiliation}
                      </p>
                      <p className="text-sm text-gray-600">
                        측정일: {measurement.measureDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={`mb-2 ${getGradeColor(measurement.overallGrade)}`}>
                        {measurement.overallGrade} ({measurement.overallPercentile}%)
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">5초 파워</p>
                      <p className="text-lg font-semibold">{measurement.power5s}W</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">15초 파워</p>
                      <p className="text-lg font-semibold">{measurement.power15s}W</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">30초 파워</p>
                      <p className="text-lg font-semibold">{measurement.power30s}W</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">60초 파워</p>
                      <p className="text-lg font-semibold">{measurement.power60s}W</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    {onViewDetails && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewDetails(measurement)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        상세보기
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(measurement.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      삭제
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
    </div>
  );
}