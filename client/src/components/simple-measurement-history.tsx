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
                     className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                     onClick={() => setSelectedMeasurement(result.measurement)}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="text-sm">
                        <span className="font-bold text-lg text-gray-900">{result.measurement.studentName}</span>
                        <span className="text-gray-600 ml-3">측정: {result.measurement.measureDate}</span>
                        <span className="text-gray-600 ml-3">{result.measurement.affiliation}</span>
                        <span className="text-gray-600 ml-3">생년: {result.measurement.birthDate}</span>
                        <span className="text-gray-600 ml-3">{result.measurement.gender === 'M' ? '남성' : '여성'}</span>
                        <span className="text-purple-600 ml-3 font-semibold">종합: {Math.round(result.analysis?.overallPercentile || 0)}%</span>
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
                      className="text-red-600 hover:text-red-700"
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
            return (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold gradient-text mb-4">체력 분석 결과</h2>
                <p className="text-sm text-gray-500">(저장된 완전한 리포트가 없어 기본 정보만 표시됩니다)</p>
              </div>

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
                    <p className="font-semibold">{analysis?.bmi?.toFixed(1) || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border">
                <h3 className="text-xl font-bold mb-4">체력 요약</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">{Math.round(analysis?.overallPercentile || 0)}</div>
                    <div className="text-sm text-gray-600">종합 백분위</div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">강점</span>
                      <p className="font-semibold text-green-600">
                        {analysis?.strengths || "집중 훈련이 필요합니다"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">보완점</span>
                      <p className="font-semibold text-orange-600">
                        {analysis?.improvements || "측정 필요"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">한줄 요약</span>
                      <p className="text-sm text-gray-700">
                        {analysis?.aiSummary || "분석 결과를 확인하세요"}
                      </p>
                    </div>
                  </div>
                </div>
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