import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import { Search, History, User, Calendar, School } from "lucide-react";
import { calculateAge, getGrade, getGradeColor } from "@/lib/fitness-calculations";
import type { Measurement, AnalysisResult } from "@shared/schema";

interface RecordSearchForm {
  studentName: string;
  affiliation: string;
  birthDate: string;
  gender: string;
}

interface HistoryData {
  measurement: Measurement;
  analysis: AnalysisResult;
}

interface RecordsProps {
  onNavigate?: (page: string) => void;
}

export default function Records({ onNavigate }: RecordsProps) {
  const [searchForm, setSearchForm] = useState<RecordSearchForm>({
    studentName: "",
    affiliation: "",
    birthDate: "",
    gender: ""
  });
  const [showResults, setShowResults] = useState(false);

  const { data: measurements, isLoading } = useQuery({
    queryKey: ["/api/measurements/search", searchForm],
    enabled: showResults && searchForm.studentName.length > 0,
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchForm.studentName) params.append('studentName', searchForm.studentName);
      if (searchForm.affiliation) params.append('affiliation', searchForm.affiliation);
      if (searchForm.birthDate) params.append('birthDate', searchForm.birthDate);
      if (searchForm.gender) params.append('gender', searchForm.gender);
      
      const response = await fetch(`/api/measurements/search?${params}`);
      if (!response.ok) throw new Error('검색 실패');
      return response.json();
    }
  });

  const handleSearch = () => {
    if (!searchForm.studentName.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    setShowResults(true);
  };

  const resetSearch = () => {
    setSearchForm({
      studentName: "",
      affiliation: "",
      birthDate: "",
      gender: ""
    });
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Navigation */}
      <Navigation onNavigate={onNavigate} />
      
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <History className="text-white w-6 h-6" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">측정 기록 조회</h1>
          </div>
          <p className="text-gray-600">학생의 과거 체력 측정 기록을 조회할 수 있습니다</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>검색 조건</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <Label htmlFor="studentName">이름 *</Label>
                <Input
                  id="studentName"
                  value={searchForm.studentName}
                  onChange={(e) => setSearchForm(prev => ({ ...prev, studentName: e.target.value }))}
                  placeholder="학생 이름"
                />
              </div>
              
              <div>
                <Label htmlFor="affiliation">소속</Label>
                <Input
                  id="affiliation"
                  value={searchForm.affiliation}
                  onChange={(e) => setSearchForm(prev => ({ ...prev, affiliation: e.target.value }))}
                  placeholder="학교/클럽명"
                />
              </div>
              
              <div>
                <Label htmlFor="birthDate">생년월일</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={searchForm.birthDate}
                  onChange={(e) => setSearchForm(prev => ({ ...prev, birthDate: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="gender">성별</Label>
                <Select value={searchForm.gender} onValueChange={(value) => setSearchForm(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="성별 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="M">남자</SelectItem>
                    <SelectItem value="F">여자</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button onClick={handleSearch} className="flex-1">
                <Search className="w-4 h-4 mr-2" />
                검색
              </Button>
              <Button variant="outline" onClick={resetSearch}>
                초기화
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {showResults && (
          <Card>
            <CardHeader>
              <CardTitle>검색 결과</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">검색 중...</p>
                </div>
              ) : measurements && measurements.length > 0 ? (
                <div className="space-y-4">
                  {measurements.map((item: HistoryData) => {
                    const age = calculateAge(item.measurement.birthDate);
                    const overallGrade = getGrade(item.analysis.overallPercentile);
                    const gradeColor = getGradeColor(item.analysis.overallPercentile);
                    
                    return (
                      <div key={item.measurement.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">{item.measurement.studentName}</h3>
                              <p className="text-sm text-gray-600">
                                {item.measurement.affiliation} • {age}세 • {item.measurement.gender === 'M' ? '남자' : '여자'}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge style={{ backgroundColor: gradeColor, color: 'white' }}>
                              {overallGrade}
                            </Badge>
                            <p className="text-sm text-gray-600 mt-1">
                              {Math.round(item.analysis.overallPercentile)}백분위
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">측정일</p>
                            <p className="font-semibold">{item.measurement.measureDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">키/체중</p>
                            <p className="font-semibold">{item.measurement.height}cm / {item.measurement.weight}kg</p>
                          </div>
                          <div>
                            <p className="text-gray-600">BMI</p>
                            <p className="font-semibold">{item.analysis.bmi.toFixed(1)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">생년월일</p>
                            <p className="font-semibold">{item.measurement.birthDate}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <p className="text-xs text-gray-600">순발력</p>
                            <p className="font-bold">{Math.round(item.analysis.percentile5s)}%</p>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <p className="text-xs text-gray-600">무산소파워</p>
                            <p className="font-bold">{Math.round(item.analysis.percentile15s)}%</p>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <p className="text-xs text-gray-600">무산소지구력</p>
                            <p className="font-bold">{Math.round(item.analysis.percentile30s)}%</p>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <p className="text-xs text-gray-600">혼합지구력</p>
                            <p className="font-bold">{Math.round(item.analysis.percentile60s)}%</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">검색 조건에 맞는 기록이 없습니다.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}