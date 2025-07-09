import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MeasurementData {
  id: number;
  studentName: string;
  affiliation: string;
  gender: string;
  age: number;
  birthDate: string;
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
  strengths?: string;
  improvements?: string;
  aiCoreInsights?: string;
  balanceStatus?: string;
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

  const { toast } = useToast();

  useEffect(() => {
    handleSearch();
  }, []);



  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const searchParams = new URLSearchParams();
      if (searchName.trim()) searchParams.append('studentName', searchName.trim());
      if (searchAffiliation.trim()) searchParams.append('affiliation', searchAffiliation.trim());
      if (searchBirthDate.trim()) searchParams.append('birthDate', searchBirthDate.trim());
      if (searchGender.trim()) searchParams.append('gender', searchGender.trim());

      const response = await fetch(`/api/measurements/search?${searchParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('검색에 실패했습니다.');
      }
      
      const data = await response.json();
      setMeasurements(data);
      console.log('받은 데이터:', data);
    } catch (error) {
      console.error('검색 오류:', error);
      toast({
        title: "오류",
        description: "검색 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case '1등급': return 'bg-purple-100 text-purple-800 border-purple-200';
      case '2등급': return 'bg-blue-100 text-blue-800 border-blue-200';
      case '3등급': return 'bg-green-100 text-green-800 border-green-200';
      case '4등급': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case '5등급': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* 검색 폼 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            측정기록 검색
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">학생 이름</label>
              <Input
                type="text"
                placeholder="이름 검색"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">소속</label>
              <Input
                type="text"
                placeholder="학교명 등"
                value={searchAffiliation}
                onChange={(e) => setSearchAffiliation(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
              <Input
                type="date"
                value={searchBirthDate}
                onChange={(e) => setSearchBirthDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">성별</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchGender}
                onChange={(e) => setSearchGender(e.target.value)}
              >
                <option value="">전체</option>
                <option value="M">남자</option>
                <option value="F">여자</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-[#7B5CFF] hover:bg-[#6A4CE6]"
            >
              <Search className="w-4 h-4 mr-2" />
              {isLoading ? '검색 중...' : '측정기록 검색'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 검색 결과 */}
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
                      {/* 이름 */}
                      <h3 className="text-lg font-semibold text-[#7B5CFF] min-w-[80px]">
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
                    
                    {/* 리포트 보기 버튼 */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // QR 코드와 동일한 페이지로 이동
                        window.open(`/report/${measurement.id}`, '_blank');
                      }}
                      className="text-[#7B5CFF] hover:text-[#6A4CE6] border-[#7B5CFF] hover:bg-[#7B5CFF] hover:text-white ml-4"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      리포트 보기
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