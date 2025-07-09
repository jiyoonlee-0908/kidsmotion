import { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import ResultsDisplay from '@/components/results-display';

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

interface ParticipantData {
  measureDate: string;
  studentName: string;
  affiliation: string;
  birthDate: string;
  gender: string;
  power5s: number;
  power15s: number;
  power30s: number;
  power60s: number;
  power180s?: number;
  power360s?: number;
  leftBalance: number;
  rightBalance: number;
  height: number;
  weight: number;
  maxHeartRate?: number;
  avgHeartRate?: number;
  analysis?: {
    overallGrade: string;
    overallPercentile: number;
    percentile5s: number;
    percentile15s: number;
    percentile30s: number;
    percentile60s: number;
    percentile180s?: number;
    percentile360s?: number;
    strengths: string;
    improvements: string;
    aiCoreInsights: string;
    balanceStatus: string;
  };
}

export default function SnapshotViewer() {
  // URL에서 measurement ID 추출
  const pathname = window.location.pathname;
  const measurementId = pathname.split('/report/')[1];
  const [snapshot, setSnapshot] = useState<SnapshotData | null>(null);
  const [participantData, setParticipantData] = useState<ParticipantData | null>(null);
  const [showLiveReport, setShowLiveReport] = useState(false);
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

        const liveParticipantData = await response.json();
        
        // participantData가 null이거나 studentName이 없으면 오류 처리
        if (!liveParticipantData || !liveParticipantData.studentName) {
          throw new Error('참가자 데이터를 찾을 수 없습니다');
        }
        
        console.log('참가자 데이터 조회 성공:', liveParticipantData.studentName);
        
        // 백분위 계산 API 호출
        const analysisResponse = await fetch('/api/analyze-measurement', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...liveParticipantData,
            id: participantId
          })
        });
        
        if (analysisResponse.ok) {
          const analysisData = await analysisResponse.json();
          console.log('백분위 계산 완료:', analysisData);
          
          // 분석 결과와 함께 참가자 데이터 저장
          setParticipantData({
            ...liveParticipantData,
            analysis: analysisData
          });
        } else {
          console.warn('백분위 계산 실패, 기본값 사용');
          setParticipantData(liveParticipantData);
        }
        
        setShowLiveReport(true);
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

  // 실시간 리포트 표시
  if (showLiveReport && participantData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ResultsDisplay 
          measurement={{
            id: parseInt(measurementId),
            studentName: participantData.studentName,
            affiliation: participantData.affiliation,
            gender: participantData.gender === '남성' ? 'M' : 'F',
            age: new Date().getFullYear() - new Date(participantData.birthDate).getFullYear(),
            measureDate: participantData.measureDate,
            birthDate: participantData.birthDate,
            height: participantData.height,
            weight: participantData.weight,
            power5s: participantData.power5s,
            power15s: participantData.power15s,
            power30s: participantData.power30s,
            power60s: participantData.power60s,
            power180s: participantData.power180s,
            power360s: participantData.power360s,
            leftBalance: participantData.leftBalance,
            rightBalance: participantData.rightBalance,
            maxHeartRate: participantData.maxHeartRate,
            avgHeartRate: participantData.avgHeartRate,
            overallGrade: participantData.analysis?.overallGrade || '보통',
            overallPercentile: participantData.analysis?.overallPercentile || 50,
            percentile5s: participantData.analysis?.percentile5s || 50,
            percentile15s: participantData.analysis?.percentile15s || 50,
            percentile30s: participantData.analysis?.percentile30s || 50,
            percentile60s: participantData.analysis?.percentile60s || 50,
            percentile180s: participantData.analysis?.percentile180s,
            percentile360s: participantData.analysis?.percentile360s,
            strengths: participantData.analysis?.strengths || '분석 중...',
            improvements: participantData.analysis?.improvements || '분석 중...',
            aiCoreInsights: participantData.analysis?.aiCoreInsights || '분석 중...',
            balanceStatus: participantData.analysis?.balanceStatus || '분석 중...'
          }}
          onBack={() => {}}
          showQR={true}
          enablePrint={true}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 저장된 HTML 컨텐츠를 그대로 렌더링 */}
      <div 
        dangerouslySetInnerHTML={{ __html: snapshot.html_content }}
        style={{ width: '100%', minHeight: '100vh' }}
      />
    </div>
  );
}