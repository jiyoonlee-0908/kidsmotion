import { useEffect, useState } from 'react';
import { useParams } from 'wouter';

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
  const { measurementId } = useParams();
  const [snapshot, setSnapshot] = useState<SnapshotData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!measurementId) return;

    const fetchSnapshot = async () => {
      try {
        const response = await fetch(`/api/report-snapshot/${measurementId}`);
        
        if (!response.ok) {
          throw new Error('리포트를 찾을 수 없습니다');
        }

        const data = await response.json();
        setSnapshot(data);
      } catch (err) {
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