import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";

export default function FitnessReportViewer() {
  const { id } = useParams<{ id: string }>();

  const { data: report, isLoading, error } = useQuery({
    queryKey: ['/api/fitness-report-snapshot', id],
    queryFn: async () => {
      const response = await fetch(`/api/fitness-report-snapshot/${id}`);
      if (!response.ok) {
        throw new Error('리포트를 찾을 수 없습니다');
      }
      return response.json();
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">리포트를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">리포트를 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-4">요청하신 체력분석 리포트가 존재하지 않거나 삭제되었습니다.</p>
          <button 
            onClick={() => window.location.href = '/'} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  console.log("새로운 리포트 로드 완료:", report.student_name, report.measure_date);

  return (
    <div className="w-full">
      {/* HTML 스냅샷을 그대로 렌더링 */}
      <div 
        dangerouslySetInnerHTML={{ __html: report.html_content }}
        className="w-full"
      />
    </div>
  );
}