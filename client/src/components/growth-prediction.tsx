import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Calendar, Target, Zap, Trophy, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import type { Measurement, AnalysisResult } from "@shared/schema";

interface GrowthPredictionProps {
  currentMeasurement: Measurement;
  previousMeasurements: Measurement[];
  currentAnalysis: AnalysisResult;
}

export default function GrowthPrediction({ currentMeasurement, previousMeasurements, currentAnalysis }: GrowthPredictionProps) {
  
  const calculateGrowthTrend = (measurements: Measurement[], field: keyof Measurement) => {
    if (measurements.length < 2) return 0;
    
    // Linear regression for trend calculation
    const dataPoints = measurements.map((m, index) => ({
      x: index,
      y: Number(m[field])
    })).filter(p => !isNaN(p.y));
    
    if (dataPoints.length < 2) return 0;
    
    const n = dataPoints.length;
    const sumX = dataPoints.reduce((sum, p) => sum + p.x, 0);
    const sumY = dataPoints.reduce((sum, p) => sum + p.y, 0);
    const sumXY = dataPoints.reduce((sum, p) => sum + p.x * p.y, 0);
    const sumXX = dataPoints.reduce((sum, p) => sum + p.x * p.x, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    return slope;
  };

  const predictFutureValue = (currentValue: number, trend: number, months: number) => {
    // Assuming measurements every month, predict future value
    const measurementFrequency = 1; // per month
    const futurePoints = months / measurementFrequency;
    return Math.max(0, currentValue + (trend * futurePoints));
  };

  const getGrowthRate = (trend: number, currentValue: number) => {
    return currentValue > 0 ? (trend / currentValue) * 100 : 0;
  };

  const calculatePredictions = () => {
    const allMeasurements = [...previousMeasurements, currentMeasurement];
    
    const predictions = {
      power5s: {
        current: currentMeasurement.power5s,
        trend: calculateGrowthTrend(allMeasurements, 'power5s'),
        predicted6m: 0,
        predicted12m: 0,
        growthRate: 0
      },
      power15s: {
        current: currentMeasurement.power15s,
        trend: calculateGrowthTrend(allMeasurements, 'power15s'),
        predicted6m: 0,
        predicted12m: 0,
        growthRate: 0
      },
      power30s: {
        current: currentMeasurement.power30s,
        trend: calculateGrowthTrend(allMeasurements, 'power30s'),
        predicted6m: 0,
        predicted12m: 0,
        growthRate: 0
      },
      power60s: {
        current: currentMeasurement.power60s,
        trend: calculateGrowthTrend(allMeasurements, 'power60s'),
        predicted6m: 0,
        predicted12m: 0,
        growthRate: 0
      }
    };

    // Calculate predictions for each metric
    Object.keys(predictions).forEach(key => {
      const metric = predictions[key as keyof typeof predictions];
      metric.predicted6m = predictFutureValue(metric.current, metric.trend, 6);
      metric.predicted12m = predictFutureValue(metric.current, metric.trend, 12);
      metric.growthRate = getGrowthRate(metric.trend, metric.current);
    });

    return predictions;
  };

  const generatePredictionChart = () => {
    const allMeasurements = [...previousMeasurements, currentMeasurement];
    const predictions = calculatePredictions();
    
    // Historical data
    const historicalData = allMeasurements.map((measurement, index) => ({
      month: `${index + 1}개월 전`,
      power5s: measurement.power5s,
      power15s: measurement.power15s,
      power30s: measurement.power30s,
      power60s: measurement.power60s,
      type: 'historical'
    }));

    // Current data
    const currentData = {
      month: '현재',
      power5s: currentMeasurement.power5s,
      power15s: currentMeasurement.power15s,
      power30s: currentMeasurement.power30s,
      power60s: currentMeasurement.power60s,
      type: 'current'
    };

    // Predicted data
    const predictedData = [
      {
        month: '6개월 후',
        power5s: predictions.power5s.predicted6m,
        power15s: predictions.power15s.predicted6m,
        power30s: predictions.power30s.predicted6m,
        power60s: predictions.power60s.predicted6m,
        type: 'predicted'
      },
      {
        month: '12개월 후',
        power5s: predictions.power5s.predicted12m,
        power15s: predictions.power15s.predicted12m,
        power30s: predictions.power30s.predicted12m,
        power60s: predictions.power60s.predicted12m,
        type: 'predicted'
      }
    ];

    return [...historicalData, currentData, ...predictedData];
  };

  const predictions = calculatePredictions();
  const chartData = generatePredictionChart();
  
  const getMetricName = (key: string) => {
    const names = {
      power5s: '순발력 (5초)',
      power15s: '무산소 파워 (15초)',
      power30s: '무산소성 지구력 (30초)',
      power60s: '혼합 지구력 (60초)'
    };
    return names[key as keyof typeof names] || key;
  };

  const getGrowthStatus = (growthRate: number) => {
    if (growthRate > 10) return { label: '매우 빠름', color: 'text-green-600 bg-green-50' };
    if (growthRate > 5) return { label: '빠름', color: 'text-blue-600 bg-blue-50' };
    if (growthRate > 0) return { label: '양호', color: 'text-yellow-600 bg-yellow-50' };
    if (growthRate > -5) return { label: '정체', color: 'text-gray-600 bg-gray-50' };
    return { label: '감소', color: 'text-red-600 bg-red-50' };
  };

  const hasEnoughData = previousMeasurements.length >= 2;

  if (!hasEnoughData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            성장 예측 분석
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">데이터 부족</h3>
            <p className="text-gray-600 mb-4">
              정확한 성장 예측을 위해서는 최소 3회 이상의 측정 기록이 필요합니다.
            </p>
            <div className="text-sm text-gray-500">
              현재 기록: {previousMeasurements.length + 1}회 | 필요: 3회 이상
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Growth Prediction Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            성장 예측 그래프
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [`${value}W`, getMetricName(name as string)]}
                  labelStyle={{ color: '#666' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="power5s" 
                  stackId="1"
                  stroke="#7B5CFF" 
                  fill="#7B5CFF" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray={(point: any) => point?.payload?.type === 'predicted' ? '5,5' : '0'}
                />
                <Area 
                  type="monotone" 
                  dataKey="power60s" 
                  stackId="2"
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray={(point: any) => point?.payload?.type === 'predicted' ? '5,5' : '0'}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-600 rounded"></div>
              <span>순발력 (5초)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
              <span>혼합 지구력 (60초)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-gray-400" style={{borderTop: '2px dashed #666'}}></div>
              <span>예측값</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Predictions */}
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(predictions).map(([key, prediction]) => {
          const growthStatus = getGrowthStatus(prediction.growthRate);
          const improvement6m = prediction.predicted6m - prediction.current;
          const improvement12m = prediction.predicted12m - prediction.current;
          
          return (
            <Card key={key}>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{getMetricName(key)}</h3>
                    <Badge className={growthStatus.color}>
                      {growthStatus.label}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">현재</span>
                      <span className="font-bold text-lg">{prediction.current}W</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">6개월 후 예상</span>
                        <div className="text-right">
                          <span className="font-medium">{Math.round(prediction.predicted6m)}W</span>
                          <span className={`text-xs ml-2 ${improvement6m > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ({improvement6m > 0 ? '+' : ''}{Math.round(improvement6m)}W)
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">12개월 후 예상</span>
                        <div className="text-right">
                          <span className="font-medium">{Math.round(prediction.predicted12m)}W</span>
                          <span className={`text-xs ml-2 ${improvement12m > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ({improvement12m > 0 ? '+' : ''}{Math.round(improvement12m)}W)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">월간 성장률</span>
                        <span className={`font-medium ${prediction.growthRate > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {prediction.growthRate > 0 ? '+' : ''}{prediction.growthRate.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Growth Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            성장 인사이트
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">📈 성장 분석</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 현재 성장 추세로 볼 때, 6개월 후 전반적인 체력 향상이 예상됩니다</li>
                <li>• 가장 빠른 성장이 예상되는 영역: {Object.entries(predictions).sort((a, b) => b[1].growthRate - a[1].growthRate)[0] && getMetricName(Object.entries(predictions).sort((a, b) => b[1].growthRate - a[1].growthRate)[0][0])}</li>
                <li>• 꾸준한 훈련을 통해 예측값 이상의 성장도 가능합니다</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">💡 성장 팁</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 월 1-2회 정기적인 측정으로 성장을 모니터링하세요</li>
                <li>• 목표 설정 기능을 활용해 단계적으로 향상시켜보세요</li>
                <li>• 균형잡힌 운동으로 모든 영역을 고르게 발달시키세요</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}