import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, Trophy, Scale, BarChart3, TrendingUp, 
  FileText, Calendar, Info, ChartLine, RotateCcw, QrCode, Download, Printer
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
}

export default function ResultsDisplay({ data, onNewMeasurement }: ResultsDisplayProps) {
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
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${measurement.studentName}_체력분석_리포트.pdf`);
    } catch (error) {
      console.error('PDF 저장 오류:', error);
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
      explanation: analysis.explanation5s,
      category: "power"
    },
    {
      title: "근력 (15초)",
      power: measurement.power15s,
      percentile: Math.round(analysis.percentile15s),
      explanation: analysis.explanation15s,
      category: "strength"
    },
    {
      title: "근지구력 (30초)",
      power: measurement.power30s,
      percentile: Math.round(analysis.percentile30s),
      explanation: analysis.explanation30s,
      category: "endurance"
    },
    {
      title: "심폐지구력 (60초)",
      power: measurement.power60s,
      percentile: Math.round(analysis.percentile60s),
      explanation: analysis.explanation60s,
      category: "cardio"
    }
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
            onClick={onNewMeasurement} 
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">측정일</p>
              <p className="font-semibold text-gray-900">{measurement.measureDate}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">이름</p>
              <p className="font-semibold text-gray-900">{measurement.studentName}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">생년월일</p>
              <p className="font-semibold text-gray-900">{measurement.birthDate}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">키</p>
              <p className="font-semibold text-gray-900">{measurement.height} cm</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">체중</p>
              <p className="font-semibold text-gray-900">{measurement.weight} kg</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">BMI</p>
              <p className="font-semibold text-gray-900">{analysis.bmi.toFixed(1)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Fitness Summary */}
      <Card className="fitness-card">
        <CardContent>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">체력 요약</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto brand-gradient rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-white">{Math.round(analysis.overallPercentile)}</span>
              </div>
              <p className="text-sm text-gray-600">종합 백분위</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">강점</p>
              <p className="font-semibold text-green-600">{strengths.join(", ")}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">보완점</p>
              <p className="font-semibold text-yellow-600">{improvements.join(", ")}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">한줄 요약</p>
              <p className="text-sm text-gray-900">{analysis.aiSummary}</p>
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
                <p className="text-sm text-gray-700">{analysis.balanceComment}</p>
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

      {/* Card 5: Comprehensive Analysis */}
      <Card className="fitness-card">
        <CardContent>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">체력 종합 분석</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-center">
              <RadarChart 
                data={{
                  balance: analysis.balanceStatus === "이상적" ? 100 : analysis.balanceStatus === "주의" ? 70 : 40,
                  power: analysis.percentile5s,
                  strength: analysis.percentile15s,
                  muscleEndurance: analysis.percentile30s,
                  cardioEndurance: analysis.percentile60s
                }}
              />
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">AI 종합 해설</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  {comprehensiveAnalysisPoints.map((point, index) => (
                    <p key={index}>{point}</p>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-gray-600">최고 항목</p>
                  <p className="font-semibold text-green-600">{strengths[0]}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">개선 항목</p>
                  <p className="font-semibold text-yellow-600">{improvements[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 6: Progress Comparison */}
      <Card className="fitness-card">
        <CardContent>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">신체 변화 비교</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">체력 변화</h4>
              <ProgressChart 
                currentData={[
                  Math.round(analysis.percentile5s),
                  Math.round(analysis.percentile15s),
                  Math.round(analysis.percentile30s),
                  Math.round(analysis.percentile60s)
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

      {/* Card 7: Overall Assessment */}
      <Card className="fitness-card">
        <CardContent>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <FileText className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">종합 평가</h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>{analysis.overallAssessment}</p>
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
                <p className="text-gray-600">중점 관리 항목: 근지구력과 좌우균형</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2 flex items-center">
                  <User className="text-primary mr-2 w-4 h-4" />
                  보호자 참고
                </p>
                <ul className="space-y-1 text-gray-600">
                  <li>• 좌우 일관성: 페달링 시 좌/우 힘의 차이를 0~100으로 정량화</li>
                  <li>• 보정 파워: 체중^0.67로 보정한 실질 파워, 나이별 백분위와 비교</li>
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
