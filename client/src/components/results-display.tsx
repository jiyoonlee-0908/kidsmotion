import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, Trophy, Scale, BarChart3, TrendingUp, 
  FileText, Calendar, Info, ChartLine, RotateCcw, QrCode, Download, Printer, Heart
} from "lucide-react";
import BalanceChart from "@/components/charts/balance-chart";
import RadarChart from "@/components/charts/radar-chart";
import ProgressChart from "@/components/charts/progress-chart";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { Measurement, AnalysisResult } from "@shared/schema";

interface ResultsDisplayProps {
  data: {
    measurement: Measurement;
    analysis: AnalysisResult;
    strengths: string[];
    improvements: string[];
  };
  onNewMeasurement: () => void;
  onNavigate?: (page: string) => void;
}

export default function ResultsDisplay({ data, onNewMeasurement, onNavigate }: ResultsDisplayProps) {
  const { measurement, analysis, strengths, improvements } = data;
  
  const getGradeColor = (percentile: number) => {
    if (percentile >= 90) return "bg-emerald-500";
    if (percentile >= 70) return "bg-blue-500";
    if (percentile >= 40) return "bg-yellow-500";
    if (percentile >= 20) return "bg-orange-500";
    return "bg-red-500";
  };
  
  const getGradeText = (percentile: number) => {
    if (percentile >= 90) return "매우우수";
    if (percentile >= 70) return "우수";
    if (percentile >= 40) return "평균";
    if (percentile >= 20) return "주의";
    return "경고";
  };

  const reportUrl = `${window.location.origin}/report/${measurement.id}`;

  // PDF 저장 기능
  const handleSavePDF = async () => {
    const element = document.getElementById('results-container');
    if (!element) {
      alert('저장할 결과 화면을 찾을 수 없습니다.');
      return;
    }

    try {
      // 로딩 메시지 표시
      const loadingToast = document.createElement('div');
      loadingToast.textContent = 'PDF를 생성하고 있습니다...';
      loadingToast.style.cssText = 'position:fixed;top:20px;right:20px;background:#333;color:white;padding:10px 20px;border-radius:5px;z-index:1000;';
      document.body.appendChild(loadingToast);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // 첫 페이지 추가
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // 여러 페이지가 필요한 경우
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // 파일명에서 특수문자 제거
      const fileName = `${measurement.studentName?.replace(/[^a-zA-Z0-9가-힣]/g, '_') || 'Unknown'}_체력분석_리포트.pdf`;
      pdf.save(fileName);
      
      // 로딩 메시지 제거
      document.body.removeChild(loadingToast);
      
      // 성공 메시지
      const successToast = document.createElement('div');
      successToast.textContent = 'PDF가 성공적으로 저장되었습니다!';
      successToast.style.cssText = 'position:fixed;top:20px;right:20px;background:#10b981;color:white;padding:10px 20px;border-radius:5px;z-index:1000;';
      document.body.appendChild(successToast);
      setTimeout(() => document.body.removeChild(successToast), 3000);

    } catch (error) {
      console.error('PDF 저장 오류:', error);
      alert(`PDF 저장 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  // 인쇄 기능
  const handlePrint = () => {
    window.print();
  };
  
  const fitnessItems = [
    {
      title: "순발력 (5초)",
      power: measurement.power5s,
      percentile: Math.round(analysis.percentile5s),
      explanation: `순간적으로 최대의 힘을 발휘하는 능력을 평가합니다. 100명 중 ${Math.round(100 - analysis.percentile5s)}등 수준입니다.`,
      category: "power"
    },
    {
      title: "스프린트 파워 (15초)",
      power: measurement.power15s,
      percentile: Math.round(analysis.percentile15s),
      explanation: `15초간 강한 힘을 지속적으로 발휘하는 능력을 평가합니다. 100명 중 ${Math.round(100 - analysis.percentile15s)}등 수준입니다.`,
      category: "strength"
    },
    {
      title: "파워 지속력 (30초)",
      power: measurement.power30s,
      percentile: Math.round(analysis.percentile30s),
      explanation: `30초간 일정한 강도의 힘을 유지하는 능력을 평가합니다. 100명 중 ${Math.round(100 - analysis.percentile30s)}등 수준입니다.`,
      category: "endurance"
    },
    {
      title: "근력 (60초)",
      power: measurement.power60s,
      percentile: Math.round(analysis.percentile60s),
      explanation: `1분간 근육이 지치지 않고 운동을 계속하는 능력을 평가합니다. 100명 중 ${Math.round(100 - analysis.percentile60s)}등 수준입니다.`,
      category: "cardio"
    },
    // 180초, 360초 데이터가 있으면 추가
    ...(measurement.power180s && analysis.percentile180s ? [{
      title: "근지구력 (180초)",
      power: measurement.power180s,
      percentile: Math.round(analysis.percentile180s),
      explanation: `3분간 근육의 지구력을 통해 지속적인 운동 능력을 평가합니다. 100명 중 ${Math.round(100 - analysis.percentile180s)}등 수준입니다.`,
      category: "muscular-endurance"
    }] : []),
    ...(measurement.power360s && analysis.percentile360s ? [{
      title: "심폐지구력 (360초)",
      power: measurement.power360s,
      percentile: Math.round(analysis.percentile360s),
      explanation: `6분간 심장과 폐의 협력을 통한 장시간 운동 지속 능력을 평가합니다. 100명 중 ${Math.round(100 - analysis.percentile360s)}등 수준입니다.`,
      category: "cardio-endurance"
    }] : [])
  ];

  const comprehensiveAnalysisPoints = analysis.comprehensiveAnalysis?.split(" | ") || [];

  return (
    <div className="space-y-6">
      {/* Header with Action Buttons */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold gradient-text">체력 분석 결과</h2>
        <div className="flex items-center space-x-3">
          <Button 
            onClick={handleSavePDF}
            className="fitness-icon hover:scale-105 transition-all duration-300"
          >
            <Download className="w-5 h-5 text-white" />
          </Button>
          <Button 
            onClick={handlePrint}
            className="fitness-icon hover:scale-105 transition-all duration-300"
          >
            <Printer className="w-5 h-5 text-white" />
          </Button>
          <Button 
            onClick={() => {
              if (onNavigate) {
                onNavigate('measurement');
              } else {
                onNewMeasurement();
              }
            }}
            variant="outline" 
            className="px-6 py-3 rounded-2xl border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="font-semibold">새 측정</span>
          </Button>
        </div>
      </div>

      {/* Card 1: Basic Info */}
      <Card className="fitness-card">
        <CardContent>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="fitness-icon">
                <User className="text-white w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold gradient-text">{measurement.studentName}</h3>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center shadow-lg border border-white">
              <QRCodeSVG value={reportUrl} size={72} />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">측정일</p>
              <p className="font-semibold text-gray-900">{measurement.measureDate}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">소속</p>
              <p className="font-semibold text-gray-900">{measurement.affiliation}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">생년월일</p>
              <p className="font-semibold text-gray-900">{measurement.birthDate}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">키/체중</p>
              <p className="font-semibold text-gray-900">{measurement.height}cm / {measurement.weight}kg</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">BMI</p>
              <p className="font-semibold text-gray-900">{analysis.bmi.toFixed(1)}</p>
            </div>
          </div>
        </CardContent>
      </Card>



      {/* Card 3: Balance Analysis */}
      <Card className="fitness-card">
        <CardContent>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Scale className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">좌우 밸런스 분석</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-center">
              <BalanceChart 
                leftBalance={measurement.leftBalance} 
                rightBalance={measurement.rightBalance} 
                status={analysis.balanceStatus}
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">왼쪽</span>
                <span className="font-semibold">{measurement.leftBalance}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">오른쪽</span>
                <span className="font-semibold">{measurement.rightBalance}%</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">AI 코멘트</h4>
                <p className="text-sm text-gray-700">{analysis.balanceComment || "좌우 밸런스 분석을 통해 균형 상태를 확인했습니다."}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Detailed Fitness Assessment */}
      <Card className="fitness-card">
        <CardContent>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">항목별 체력 세부평가</h3>
          </div>
          <div className="space-y-6">
            {fitnessItems.map((item, index) => (
              <div key={index} className="fitness-item">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.power}W | 환산점수: {Math.round(item.percentile)}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getGradeColor(item.percentile)} text-white text-sm font-medium`}>
                      {getGradeText(item.percentile)}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">{item.percentile}%</p>
                  </div>
                </div>
                <div className="progress-bar mb-3">
                  <div 
                    className={`progress-fill ${getGradeColor(item.percentile)}`}
                    style={{ width: `${item.percentile}%` }}
                  />
                </div>
                <p className="text-sm text-gray-700">{item.explanation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Card 5: Heart Rate Health Assessment */}
      {(analysis.maxBpm || analysis.avgBpm || analysis.restingBpm) && (
        <Card className="fitness-card">
          <CardContent>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">심박수 확인</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 최대 심박수 */}
              {analysis.maxBpm && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-red-600">{analysis.maxBpm}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">최대 심박수</h4>
                  <p className="text-sm text-gray-600">
                    해당 나이 평균 최대심박수: {220 - analysis.age}
                  </p>
                </div>
              )}
              
              {/* 평균 심박수 */}
              {analysis.avgBpm && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-green-600">{analysis.avgBpm}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">운동시 평균 심박수</h4>
                  <p className="text-sm text-gray-600">
                    {analysis.maxBpm ? `최대 심박수 대비 ${Math.round((analysis.avgBpm / analysis.maxBpm) * 100)}%로 운동` : "운동 적응도 평가"}
                  </p>
                </div>
              )}
            </div>
            
            {/* 심박수 건강 요약 */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">💓 심박수 건강 포인트</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>🏃‍♀️ 규칙적인 운동으로 심박을 더 건강하게 만들어봐요!</p>
                <p>📈 시간이 지나면서 운동시 평균 심박수가 낮아지는 것을 목표로 해봐요!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Card 6: Comprehensive Analysis */}
      <Card className="fitness-card">
        <CardContent>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">체력 종합 분석</h3>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6 -mt-4">
            {/* 종합 백분위 점수 */}
            <div className="text-center mt-12">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="m18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <path
                    d="m18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeDasharray={`${analysis.overallPercentile}, 100`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">{Math.round(analysis.overallPercentile)}</span>
                </div>
              </div>
              <p className="text-base font-semibold text-gray-700">종합 백분위</p>
              <p className="text-sm text-gray-400 mt-1">
                ({(measurement.power180s || measurement.power360s) ? '6개' : '4개'} 영역 기준)
              </p>
            </div>

            {/* 방사형 그래프 */}
            <div className="flex justify-center -mt-2">
              <RadarChart 
                data={{
                  power: analysis.percentile5s,
                  strength: analysis.percentile15s,
                  muscleEndurance: analysis.percentile30s,
                  cardioEndurance: analysis.percentile60s
                }}
              />
            </div>

            {/* 최고/개선 항목 */}
            <div className="grid grid-cols-2 gap-4 text-sm items-center">
              <div className="text-center p-3 bg-green-50 rounded-lg flex flex-col justify-center h-full">
                <p className="text-gray-600 mb-1">💪 최고 항목</p>
                <p className="font-semibold text-green-600">{strengths[0] || "균형잡힌 발달"}</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg flex flex-col justify-center h-full">
                <p className="text-gray-600 mb-1">🎯 개선 항목</p>
                <p className="font-semibold text-yellow-600">{improvements[0] || "지속적 관리"}</p>
              </div>
            </div>

            {/* 지구력 스펙트럼 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">지구력 스펙트럼</h4>
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <div className="text-xs text-gray-600 mb-1">180초</div>
                  <div className="text-lg font-bold text-blue-600">
                    {measurement.power180s && analysis.percentile180s ? Math.round(analysis.percentile180s) : 0}%
                  </div>
                  <div className="text-xs text-gray-500">근지구력</div>
                </div>
                <div className="flex-shrink-0 mx-2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                </div>
                <div className="text-center flex-1">
                  <div className="text-xs text-gray-600 mb-1">360초</div>
                  <div className="text-lg font-bold text-purple-600">
                    {measurement.power360s && analysis.percentile360s ? Math.round(analysis.percentile360s) : 0}%
                  </div>
                  <div className="text-xs text-gray-500">심폐지구력</div>
                </div>
              </div>
            </div>
          </div>
            
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4 text-lg">🤖 체력 분석 요약</h4>
            <div className="text-gray-700 leading-relaxed text-base">
              <p>{analysis.aiSummary || "체력 분석을 완료했습니다."}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 6-1: 종합해설 */}
      <Card className="fitness-card">
        <CardContent>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">종합해설</h3>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
              AI 종합 해설
            </div>
          </div>
          
          <div className="text-gray-700 leading-relaxed space-y-4">
            {analysis.detailedReport ? (
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: analysis.detailedReport
                    .replace(/\n\n/g, '</div><div class="mt-4">')
                    .replace(/\n/g, '<br>')
                    .replace(/(🔍|🌟|💡|🏃|📅|🗓️|👪|⚠️|📈) ([^\n<]+)/g, '<div class="mt-6 mb-4"><h4 class="text-base font-bold text-gray-900 mb-3 flex items-start gap-2"><span class="text-lg flex-shrink-0">$1</span> <span>$2</span></h4><div class="pl-8">')
                    .replace(/상위 (\d+)%/g, '<span class="text-purple-600 font-semibold">상위 $1%</span>')
                    .replace(/하위 (\d+)%/g, '<span class="text-orange-600 font-semibold">하위 $1%</span>')
                    .replace(/(\d+)등/g, '<span class="text-purple-600 font-semibold">$1등</span>')
                    .replace(/(\d+)분간/g, '<span class="text-blue-600 font-semibold">$1분간</span>')
                    .replace(/(\d+)%로/g, '<span class="text-purple-600 font-semibold">$1%로</span>')
                    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
                    + '</div>'
                }} 
              />
            ) : (
              <p className="text-gray-500">상세 종합해설을 준비하고 있습니다...</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Card 7: Progress Comparison */}
      <Card className="fitness-card">
        <CardContent>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">신체 변화 비교</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h4 className="font-semibold text-gray-900 mb-4">체력 변화</h4>
              <ProgressChart 
                currentData={[
                  Math.round(analysis.percentile5s),
                  Math.round(analysis.percentile15s),
                  Math.round(analysis.percentile30s),
                  Math.round(analysis.percentile60s),
                  ...(measurement.power180s && analysis.percentile180s ? [Math.round(analysis.percentile180s)] : []),
                  ...(measurement.power360s && analysis.percentile360s ? [Math.round(analysis.percentile360s)] : [])
                ]}
                labels={[
                  "순발력 (5초)",
                  "스프린트 파워 (15초)",
                  "파워 지속력 (30초)",
                  "근력 (60초)",
                  ...(measurement.power180s ? ["근지구력 (180초)"] : []),
                  ...(measurement.power360s ? ["심폐지구력 (360초)"] : [])
                ]}
              />
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">좌우 밸런스 변화</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">날짜</th>
                      <th className="text-center py-2">좌</th>
                      <th className="text-center py-2">우</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">이전 측정</td>
                      <td className="text-center py-2">42%</td>
                      <td className="text-center py-2">58%</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">{measurement.measureDate}</td>
                      <td className="text-center py-2 font-semibold">{measurement.leftBalance}%</td>
                      <td className="text-center py-2 font-semibold">{measurement.rightBalance}%</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 flex items-center space-x-2">
                  <TrendingUp className="text-green-500" />
                  <span className="text-sm text-gray-700">밸런스가 개선되고 있습니다.</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>



      {/* Card 8: Next Measurement Guide */}
      <Card className="fitness-card">
        <CardContent>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">다음 측정 및 이력 안내</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <ChartLine className="text-primary" />
                <div>
                  <p className="font-semibold text-gray-900">권장 측정 주기</p>
                  <p className="text-sm text-gray-600">1-2개월 내 재측정 권장</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <QrCode className="text-primary" />
                <div>
                  <p className="font-semibold text-gray-900">측정 이력 확인</p>
                  <p className="text-sm text-gray-600">QR코드 또는 관리자 페이지에서 확인</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                  <QRCodeSVG value={reportUrl} size={96} />
                </div>
                <p className="text-sm text-gray-600">이력 확인 QR</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 9: Reference Notes */}
      <Card className="fitness-card">
        <CardContent>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Info className="text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">참고사항</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2 flex items-center">
                  <User className="text-primary mr-2 w-4 h-4" />
                  지도선생님 참고
                </p>
                <p className="text-gray-600">중점 관리 항목: 근지구력 (180초)과 좌우균형</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2 flex items-center">
                  <User className="text-primary mr-2 w-4 h-4" />
                  보호자 참고
                </p>
                <ul className="space-y-1 text-gray-600">
                  <li>• 체력 측정은 5분 내외로 간편하게 진행됩니다</li>
                  <li>• 성장기 아이들의 체력 발달 추이를 지속적으로 관찰하세요</li>
                  <li>• 총 체력 백분위: 4개 항목 백분위 평균으로 계산</li>
                </ul>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">측정 기준 정보</h4>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>데이터 버전:</span>
                  <span>v2025-05-26</span>
                </div>
                <div className="flex justify-between">
                  <span>보정 지수:</span>
                  <span>0.67</span>
                </div>
                <div className="flex justify-between">
                  <span>평가 기준:</span>
                  <span>P4/P20/P80/P96</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
