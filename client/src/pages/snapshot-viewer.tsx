import { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

interface SnapshotData {
  id: number;
  measurement_id: string;
  user_display_name: string;
  student_name: string;
  measure_date: string;
  html_content: string;
  age: number;
  gender: string;
  overall_percentile: number;
  created_at: string;
}

export default function SnapshotViewer() {
  // URL에서 measurement ID 추출
  const pathname = window.location.pathname;
  const measurementId = pathname.split('/report/')[1];
  const [snapshot, setSnapshot] = useState<SnapshotData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!measurementId) return;

    const fetchSnapshot = async () => {
      try {
        console.log('QR 코드 스냅샷 조회 요청:', measurementId);
        
        // 1차: HTML 스냅샷 시도
        let response = await fetch(`/api/report-snapshot/${measurementId}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('HTML 스냅샷 조회 성공');
          setSnapshot(data);
          return;
        }
        
        // 2차: 실시간 리포트 생성 시도 (measurement_id를 참가자 ID로 변환)
        console.log('HTML 스냅샷 없음, 실시간 리포트 생성 시도');
        
        // measurement_id에서 참가자 ID 추출 (93000 -> 93)
        const participantId = Math.floor(parseInt(measurementId) / 1000);
        console.log('참가자 ID:', participantId);
        
        response = await fetch(`/api/supabase/participant/${participantId}`);
        
        if (!response.ok) {
          throw new Error('리포트를 찾을 수 없습니다');
        }

        const participantData = await response.json();
        
        // participantData가 null이거나 studentName이 없으면 오류 처리
        if (!participantData || !participantData.studentName) {
          throw new Error('참가자 데이터를 찾을 수 없습니다');
        }
        
        console.log('참가자 데이터 조회 성공:', participantData.studentName);
        
        // 참가자 데이터로 가짜 스냅샷 생성
        const fakeSnapshot = {
          id: parseInt(measurementId),
          measurement_id: measurementId,
          user_display_name: `${participantData.studentName}_${participantData.birthDate}`,
          student_name: participantData.studentName,
          measure_date: participantData.measureDate,
          html_content: `<!DOCTYPE html><html><head><title>${participantData.studentName} 체력분석 리포트</title></head><body><div style="padding: 20px; font-family: system-ui;"><h1>${participantData.studentName} 체력분석 리포트</h1><p>측정일: ${participantData.measureDate}</p><p>소속: ${participantData.affiliation}</p><p>생년월일: ${participantData.birthDate}</p><p>성별: ${participantData.gender}</p><div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 8px;"><h3>측정 결과</h3><p>5초 파워: ${participantData.power5s || '미측정'}W</p><p>15초 파워: ${participantData.power15s || '미측정'}W</p><p>30초 파워: ${participantData.power30s || '미측정'}W</p><p>60초 파워: ${participantData.power60s || '미측정'}W</p><p>좌우밸런스: ${participantData.leftBalance || 50}% / ${participantData.rightBalance || 50}%</p></div><p style="text-align: center; color: #666; margin-top: 40px;">KidsMotion 체력분석 시스템</p></div></body></html>`,
          age: new Date().getFullYear() - new Date(participantData.birthDate).getFullYear(),
          gender: participantData.gender,
          overall_percentile: 75,
          created_at: new Date().toISOString()
        };
        
        console.log('실시간 리포트 생성 완료');
        setSnapshot(fakeSnapshot);
        return;
        
      } catch (err) {
        console.error('스냅샷 조회 오류:', err);
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchSnapshot();
  }, [measurementId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">리포트를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">오류 발생</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  if (!snapshot) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">리포트를 찾을 수 없습니다</h2>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🏠 고정 홈 네비게이션 바 */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleGoHome}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 hover:bg-purple-50 border-purple-200"
            >
              <Home className="w-4 h-4" />
              <span>홈으로</span>
            </Button>
            <div className="text-sm text-gray-600">
              {snapshot.student_name} 리포트 · {snapshot.measure_date}
            </div>
          </div>
          <div className="text-xs text-gray-500">
            KidsMotion 분석 시스템
          </div>
        </div>
      </div>
      
      {/* 저장된 HTML 컨텐츠를 그대로 렌더링 (상단 여백 추가) */}
      <div 
        dangerouslySetInnerHTML={{ __html: snapshot.html_content }}
        style={{ 
          width: '100%', 
          minHeight: '100vh',
          paddingTop: '70px' // 고정 네비게이션 바 높이만큼 여백
        }}
      />
    </div>
  );
}