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
  const [savedReports, setSavedReports] = useState<any[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchAffiliation, setSearchAffiliation] = useState('');
  const [searchBirthDate, setSearchBirthDate] = useState('');
  const [searchGender, setSearchGender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showReports, setShowReports] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    handleSearch();
  }, []);

  // 저장된 리포트 조회
  const searchSavedReports = async () => {
    if (!searchName.trim()) {
      toast({
        title: "알림",
        description: "학생 이름을 입력해주세요.",
        variant: "default",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/student-reports/${encodeURIComponent(searchName.trim())}`);
      
      if (!response.ok) {
        throw new Error('리포트를 가져오는데 실패했습니다.');
      }
      
      const reports = await response.json();
      setSavedReports(reports);
      setShowReports(true);
      
      if (reports.length === 0) {
        toast({
          title: "알림",
          description: "저장된 리포트가 없습니다.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error('리포트 검색 오류:', error);
      toast({
        title: "오류",
        description: "리포트를 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
      setShowReports(false);
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
            <Button 
              onClick={searchSavedReports}
              disabled={isLoading}
              variant="outline"
              className="border-[#7B5CFF] text-[#7B5CFF] hover:bg-[#7B5CFF] hover:text-white"
            >
              <FileText className="w-4 h-4 mr-2" />
              {isLoading ? '검색 중...' : '저장된 리포트 검색'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 저장된 리포트 목록 */}
      {showReports && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              저장된 리포트 ({savedReports.length}개)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {savedReports.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                저장된 리포트가 없습니다.
              </div>
            ) : (
              <div className="space-y-4">
                {savedReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-semibold text-gray-900">측정일: {report.measure_date}</p>
                            <p className="text-sm text-gray-600">나이: {report.age}세</p>
                          </div>
                          <div>
                            <Badge className={`${
                              report.overall_percentile >= 97 ? 'bg-purple-100 text-purple-800' :
                              report.overall_percentile >= 85 ? 'bg-blue-100 text-blue-800' :
                              report.overall_percentile >= 15 ? 'bg-green-100 text-green-800' :
                              report.overall_percentile >= 3 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {Math.round(report.overall_percentile)}% ({
                                report.overall_percentile >= 97 ? '매우우수' :
                                report.overall_percentile >= 85 ? '우수' :
                                report.overall_percentile >= 15 ? '보통' :
                                report.overall_percentile >= 3 ? '부족' : '매우부족'
                              })
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(report.created_at).toLocaleDateString('ko-KR')} 저장
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => {
                            // QR 리포트 URL로 직접 이동
                            window.open(`/report/${report.measurement_id}`, '_blank');
                          }}
                          className="bg-[#7B5CFF] hover:bg-[#6A4CE6]"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          리포트 보기
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* 검색 결과 */}
      {!showReports && (
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
      )}
    </div>
  );
}