import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, User, Search, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SearchResult {
  measurement: any;
  analysis: any;
}

interface SimpleMeasurementHistoryProps {
  onNewMeasurement?: () => void;
}

export default function SimpleMeasurementHistory({ onNewMeasurement }: SimpleMeasurementHistoryProps) {
  const [searchName, setSearchName] = useState("");
  const [searchAffiliation, setSearchAffiliation] = useState("");
  const [searchBirthDate, setSearchBirthDate] = useState("");
  const [searchGender, setSearchGender] = useState("");
  const [selectedMeasurement, setSelectedMeasurement] = useState<any>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // 검색 쿼리
  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['/api/measurements/search', searchName, searchAffiliation, searchBirthDate, searchGender],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchName && searchName !== '') {
        params.append('studentName', searchName);
      }
      if (searchAffiliation && searchAffiliation !== '') {
        params.append('affiliation', searchAffiliation);
      }
      if (searchBirthDate && searchBirthDate !== '') {
        params.append('birthDate', searchBirthDate);
      }
      if (searchGender && searchGender !== '') {
        params.append('gender', searchGender);
      }
      
      const response = await fetch(`/api/measurements/search?${params}`);
      if (!response.ok) {
        throw new Error('검색 실패');
      }
      return response.json();
    }
  });

  // 삭제 뮤테이션
  const deleteMutation = useMutation({
    mutationFn: async ({ id, password }: { id: number, password: string }) => {
      const response = await fetch(`/api/measurements/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPassword: password })
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || '삭제 실패');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "삭제 완료", description: "측정 기록이 성공적으로 삭제되었습니다." });
      setDeleteConfirmOpen(false);
      setSelectedMeasurement(null);
      setAdminPassword('');
      queryClient.invalidateQueries({ queryKey: ['/api/measurements/search'] });
    },
    onError: (error: Error) => {
      toast({ 
        title: "삭제 실패", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const handleDeleteConfirm = () => {
    if (!selectedMeasurement || !adminPassword) return;
    deleteMutation.mutate({ 
      id: selectedMeasurement.id, 
      password: adminPassword 
    });
  };

  const handleSearch = () => {
    queryClient.invalidateQueries({ queryKey: ['/api/measurements/search', searchName, searchAffiliation, searchBirthDate, searchGender] });
  };

  // 선택된 측정의 분석 결과 가져오기
  const getSelectedAnalysis = () => {
    if (!selectedMeasurement) return null;
    return searchResults.find((item: SearchResult) => item.measurement.id === selectedMeasurement.id)?.analysis;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            측정 기록 조회
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
            <Input
              placeholder="학생 이름"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Input
              placeholder="소속 기관"
              value={searchAffiliation}
              onChange={(e) => setSearchAffiliation(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Input
              placeholder="생년월일 (YYYY-MM-DD)"
              value={searchBirthDate}
              onChange={(e) => setSearchBirthDate(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <select
              className="px-3 py-2 border rounded-md text-sm"
              value={searchGender}
              onChange={(e) => setSearchGender(e.target.value)}
            >
              <option value="">성별 전체</option>
              <option value="M">남성</option>
              <option value="F">여성</option>
            </select>
            <Button onClick={handleSearch}>검색</Button>
          </div>
          <div className="text-xs text-gray-500 mb-4">
            * 동명이인 구분을 위해 여러 조건으로 검색하세요. 전체 조회시 모든 필드를 공백으로 두세요.
          </div>

          {isLoading ? (
            <div className="text-center py-8">검색 중...</div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              검색 결과가 없습니다.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-2">
                총 {searchResults.length}개의 기록이 검색되었습니다.
              </div>
              
              {searchResults.map((result: SearchResult) => (
                <div key={result.measurement.id} 
                     className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-purple-300"
                     onClick={() => setSelectedMeasurement(result.measurement)}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{result.measurement.studentName}</h3>
                        <div className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                          <span>종합 {Math.round(result.analysis?.overallPercentile || 0)}%</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">📅 측정일</span>
                          <span className="text-gray-700 font-medium">{result.measurement.measureDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">🏢 소속</span>
                          <span className="text-gray-700 font-medium">{result.measurement.affiliation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">🎂 생년월일</span>
                          <span className="text-gray-700 font-medium">{result.measurement.birthDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">{result.measurement.gender === 'M' ? '👦' : '👧'} 성별</span>
                          <span className="text-gray-700 font-medium">{result.measurement.gender === 'M' ? '남성' : '여성'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMeasurement(result.measurement);
                        setDeleteConfirmOpen(true);
                      }}
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {onNewMeasurement && (
            <div className="mt-6 text-center">
              <Button onClick={onNewMeasurement} className="gradient-btn">
                새 측정하기
              </Button>
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
          
          {selectedMeasurement && (() => {
            const analysis = getSelectedAnalysis();
            
            // 저장된 전체 리포트 HTML이 있으면 그것을 표시
            if (analysis?.fullReportHtml) {
              return (
                <div 
                  className="complete-report-viewer"
                  dangerouslySetInnerHTML={{ __html: analysis.fullReportHtml }}
                />
              );
            }
            
            // 기존 방식 (fallback)
            const getGradeFromPercentile = (percentile: number) => {
              if (percentile >= 96) return { grade: "매우우수", color: "text-emerald-600 bg-emerald-100" };
              if (percentile >= 80) return { grade: "우수", color: "text-blue-600 bg-blue-100" };
              if (percentile >= 20) return { grade: "보통", color: "text-yellow-600 bg-yellow-100" };
              if (percentile >= 4) return { grade: "낮음", color: "text-orange-600 bg-orange-100" };
              return { grade: "매우낮음", color: "text-red-600 bg-red-100" };
            };

            return (
            <div className="space-y-6">
              {/* 헤더 */}
              <div className="text-center bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl p-8">
                <h2 className="text-4xl font-bold mb-2">{selectedMeasurement.studentName}</h2>
                <p className="text-purple-100 text-lg">체력 측정 결과</p>
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-white/20 rounded-full">
                  <span className="text-sm">📊 종합 백분위: {Math.round(analysis?.overallPercentile || 0)}%</span>
                </div>
              </div>

              {/* 기본 정보 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 border shadow-sm">
                  <div className="text-center">
                    <div className="text-2xl mb-2">📅</div>
                    <p className="text-sm text-gray-600">측정일</p>
                    <p className="font-bold text-gray-900">{selectedMeasurement.measureDate}</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border shadow-sm">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🏫</div>
                    <p className="text-sm text-gray-600">소속</p>
                    <p className="font-bold text-gray-900">{selectedMeasurement.affiliation}</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border shadow-sm">
                  <div className="text-center">
                    <div className="text-2xl mb-2">📏</div>
                    <p className="text-sm text-gray-600">신체정보</p>
                    <p className="font-bold text-gray-900">{selectedMeasurement.height}cm / {selectedMeasurement.weight}kg</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border shadow-sm">
                  <div className="text-center">
                    <div className="text-2xl mb-2">⚖️</div>
                    <p className="text-sm text-gray-600">BMI</p>
                    <p className="font-bold text-gray-900">{analysis?.bmi?.toFixed(1) || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* 체력 항목별 결과 */}
              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="mr-3">💪</span>
                  체력 항목별 결과
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "순발력 (5초)", value: analysis?.percentile5s, icon: "⚡" },
                    { name: "스프린트 파워 (15초)", value: analysis?.percentile15s, icon: "🏃‍♂️" },
                    { name: "파워 지속력 (30초)", value: analysis?.percentile30s, icon: "💨" },
                    { name: "근력 (60초)", value: analysis?.percentile60s, icon: "🦾" },
                    ...(analysis?.percentile180s ? [{ name: "근지구력 (180초)", value: analysis.percentile180s, icon: "🔄" }] : []),
                    ...(analysis?.percentile360s ? [{ name: "심폐지구력 (360초)", value: analysis.percentile360s, icon: "❤️" }] : [])
                  ].map((item, index) => {
                    const { grade, color } = getGradeFromPercentile(item.value || 0);
                    return (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{item.icon}</span>
                          <div>
                            <p className="font-semibold text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">{Math.round(item.value || 0)}%</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
                          {grade}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 좌우 밸런스 */}
              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="mr-3">⚖️</span>
                  좌우 밸런스
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">왼쪽</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedMeasurement.leftBalance}%</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">상태</p>
                    <p className="text-lg font-bold text-purple-600">{analysis?.balanceStatus || "정상"}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">오른쪽</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedMeasurement.rightBalance}%</p>
                  </div>
                </div>
              </div>

              {/* 강점과 보완점 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <span className="mr-3">🏆</span>
                    강점
                  </h3>
                  <p className="text-green-700 leading-relaxed">
                    {analysis?.strengths || "집중 훈련을 통해 강점을 만들어가세요!"}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                    <span className="mr-3">🎯</span>
                    보완점
                  </h3>
                  <p className="text-orange-700 leading-relaxed">
                    {analysis?.improvements || "전반적인 향상이 필요합니다"}
                  </p>
                </div>
              </div>

              {/* 하단 안내 */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 text-center">
                <p className="text-blue-700 mb-2">
                  <span className="font-semibold">💡 알림:</span> 더 자세한 AI 분석과 운동 처방을 보시려면 새로운 측정을 진행해주세요.
                </p>
                <p className="text-sm text-blue-600">
                  새로운 측정에서는 10개 섹션의 완전한 리포트를 제공합니다.
                </p>
              </div>
            </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* 삭제 확인 모달 */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
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