// QR 코드 웹뷰용 정적 HTML 리포트 컴포넌트
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StaticRadarChart, StaticProgressBar, StaticBalanceChart, StaticComparisonChart } from '@/components/static-charts';
import { QRCodeSVG } from "qrcode.react";

interface StaticWebReportProps {
  data: {
    id: number;
    studentName: string;
    affiliation: string;
    gender: string;
    age: number;
    measureDate: string;
    birthDate: string;
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
    strengths: string;
    improvements: string;
    aiCoreInsights: string;
    balanceStatus: string;
  };
}

export default function StaticWebReport({ data }: StaticWebReportProps) {
  const getGradeColor = (percentile: number) => {
    if (percentile >= 97) return "#8B5CF6"; // purple
    if (percentile >= 85) return "#3B82F6"; // blue
    if (percentile >= 15) return "#10B981"; // green
    if (percentile >= 3) return "#F59E0B"; // yellow
    return "#EF4444"; // red
  };

  const getGradeText = (percentile: number) => {
    if (percentile >= 97) return "매우우수";
    if (percentile >= 85) return "우수";
    if (percentile >= 15) return "보통";
    if (percentile >= 3) return "부족";
    return "매우부족";
  };

  const fitnessItems = [
    {
      title: "5초 순발력",
      power: data.power5s,
      percentile: data.percentile5s,
      explanation: "순간적인 폭발력을 측정하여 순발력 수준을 평가합니다."
    },
    {
      title: "15초 스프린트 파워",
      power: data.power15s,
      percentile: data.percentile15s,
      explanation: "빠른 속도로 짧은 시간 동안 지속할 수 있는 근력을 측정합니다."
    },
    {
      title: "30초 파워 지속력",
      power: data.power30s,
      percentile: data.percentile30s,
      explanation: "중간 강도의 운동을 지속할 수 있는 근지구력을 평가합니다."
    },
    {
      title: "60초 근력",
      power: data.power60s,
      percentile: data.percentile60s,
      explanation: "1분간 지속적인 근력 발휘 능력을 측정합니다."
    }
  ];

  if (data.power180s) {
    fitnessItems.push({
      title: "180초 근지구력",
      power: data.power180s,
      percentile: data.percentile180s || 50,
      explanation: "3분간 지속적인 근지구력 능력을 측정합니다."
    });
  }

  if (data.power360s) {
    fitnessItems.push({
      title: "360초 심폐지구력",
      power: data.power360s,
      percentile: data.percentile360s || 50,
      explanation: "6분간 지속적인 심폐지구력 능력을 측정합니다."
    });
  }

  const reportUrl = `${window.location.origin}/report/${data.id}`;

  return (
    <div className="min-h-screen bg-gray-50 p-4" style={{ width: '1200px', margin: '0 auto' }}>
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">키즈모션 체력 분석 리포트</h1>
          <p className="text-gray-600">과학적 측정 기반 맞춤형 체력 진단</p>
        </div>

        {/* 기본 정보 카드 */}
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">기본 정보</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">이름</span>
                    <span className="font-medium">{data.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">소속</span>
                    <span className="font-medium">{data.affiliation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">성별</span>
                    <span className="font-medium">{data.gender === 'M' ? '남성' : '여성'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">나이</span>
                    <span className="font-medium">{data.age}세</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">측정 정보</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">측정일</span>
                    <span className="font-medium">{data.measureDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">키</span>
                    <span className="font-medium">{data.height}cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">몸무게</span>
                    <span className="font-medium">{data.weight}kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">BMI</span>
                    <span className="font-medium">{((data.weight / (data.height / 100) ** 2)).toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 좌우 밸런스 */}
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">좌우 밸런스 분석</h3>
            <div className="flex justify-center">
              <StaticBalanceChart 
                leftBalance={data.leftBalance}
                rightBalance={data.rightBalance}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                좌우 밸런스 차이: {Math.abs(data.leftBalance - data.rightBalance).toFixed(1)}%
              </p>
              <p className="text-sm text-gray-700 mt-2">{data.balanceStatus}</p>
            </div>
          </CardContent>
        </Card>

        {/* 체력 세부 평가 */}
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">항목별 체력 세부평가</h3>
            <div className="space-y-6">
              {fitnessItems.map((item, index) => (
                <div key={index} className="border-b border-gray-100 pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.power}W | 환산점수: {Math.round(item.percentile)}</p>
                    </div>
                    <div className="text-right">
                      <div 
                        className="px-3 py-1 rounded-full text-white text-sm font-medium"
                        style={{ backgroundColor: getGradeColor(item.percentile) }}
                      >
                        {getGradeText(item.percentile)}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{item.percentile.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${item.percentile}%`,
                        backgroundColor: getGradeColor(item.percentile)
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{item.explanation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 체력 종합 분석 */}
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">체력 종합 분석</h3>
            <div className="grid grid-cols-2 gap-8">
              
              {/* 종합 백분위 */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="m18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="m18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="url(#gradient-comprehensive)"
                      strokeWidth="2"
                      strokeDasharray={`${data.overallPercentile}, 100`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient-comprehensive" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">{Math.round(data.overallPercentile)}</span>
                    <span className="text-sm text-gray-600">종합 백분위</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  ({(data.power180s || data.power360s) ? '6개 영역 기준' : '4개 영역 기준'})
                </p>
              </div>

              {/* 방사형 그래프 */}
              <div className="flex justify-center">
                <StaticRadarChart 
                  data={{
                    balance: data.balanceStatus === "이상적" ? 100 : data.balanceStatus === "주의" ? 70 : 40,
                    power: data.percentile5s,
                    strength: data.percentile15s,
                    muscleEndurance: data.percentile30s,
                    cardioEndurance: data.percentile60s
                  }}
                />
              </div>
            </div>

            {/* 최고/개선 항목 */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-gray-600 mb-2">💪 최고 항목</p>
                <p className="font-semibold text-green-600">{data.strengths || "균형잡힌 발달"}</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-gray-600 mb-2">🎯 개선 항목</p>
                <p className="font-semibold text-yellow-600">{data.improvements || "지속적 관리"}</p>
              </div>
            </div>

            {/* 지구력 스펙트럼 */}
            {(data.power180s || data.power360s) && (
              <div className="mt-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">지구력 스펙트럼</h4>
                  <div className="flex items-center justify-center space-x-8">
                    {data.power180s && data.percentile180s && (
                      <div className="text-center">
                        <div className="text-xs text-gray-600 mb-1">180초</div>
                        <div className="text-lg font-bold text-blue-600">{Math.round(data.percentile180s)}%</div>
                        <div className="text-xs text-gray-500">근지구력</div>
                      </div>
                    )}
                    {data.power360s && data.percentile360s && (
                      <div className="text-center">
                        <div className="text-xs text-gray-600 mb-1">360초</div>
                        <div className="text-lg font-bold text-purple-600">{Math.round(data.percentile360s)}%</div>
                        <div className="text-xs text-gray-500">심폐지구력</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 체력변화 비교 */}
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">신체변화 비교</h3>
            <div className="text-center">
              <StaticComparisonChart
                currentData={{
                  power5s: data.power5s,
                  power15s: data.power15s,
                  power30s: data.power30s,
                  power60s: data.power60s
                }}
              />
              <p className="text-sm text-gray-600 mt-4">
                현재 측정 결과 (이전 측정 데이터가 있으면 비교 표시)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* AI 분석 */}
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">AI 종합 분석</h3>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {data.aiCoreInsights}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* QR 코드 */}
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">리포트 공유</h3>
              <div className="flex justify-center mb-4">
                <QRCodeSVG 
                  value={reportUrl}
                  size={128}
                  level="M"
                  data-testid="qr-code"
                />
              </div>
              <p className="text-sm text-gray-600">
                QR 코드를 스캔하여 언제든지 리포트를 다시 확인할 수 있습니다
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {reportUrl}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 푸터 */}
        <div className="text-center text-gray-500 text-sm py-8">
          <p>KidsMotion 체력 분석 시스템</p>
          <p className="mt-1">과학적 측정 기반 맞춤형 체력 진단 서비스</p>
        </div>
      </div>
    </div>
  );
}