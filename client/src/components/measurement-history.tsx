import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, TrendingDown, Minus, History, Target, Award, ChevronRight } from "lucide-react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import type { Measurement, AnalysisResult } from "@shared/schema";

interface MeasurementHistoryProps {
  studentName: string;
  currentMeasurement?: Measurement;
}

interface HistoryData {
  measurement: Measurement;
  analysis: AnalysisResult;
}

export default function MeasurementHistory({ studentName, currentMeasurement }: MeasurementHistoryProps) {
  const [history, setHistory] = useState<HistoryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<'power' | 'strength' | 'muscleEndurance' | 'cardioEndurance'>('power');

  useEffect(() => {
    if (studentName) {
      fetchHistory();
    }
  }, [studentName]);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/measurements/student/${encodeURIComponent(studentName)}`);
      if (response.ok) {
        const measurements = await response.json();
        
        // Get analysis results for each measurement
        const historyWithAnalysis = await Promise.all(
          measurements.map(async (measurement: Measurement) => {
            try {
              const analysisResponse = await fetch(`/api/measurements/${measurement.id}`);
              if (analysisResponse.ok) {
                const data = await analysisResponse.json();
                return { measurement, analysis: data.analysis };
              }
              return null;
            } catch {
              return null;
            }
          })
        );

        setHistory(historyWithAnalysis.filter(Boolean) as HistoryData[]);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getGrowthTrend = () => {
    if (history.length < 2) return null;
    
    const recent = history[history.length - 1];
    const previous = history[history.length - 2];
    
    const currentValue = recent.measurement[selectedMetric];
    const previousValue = previous.measurement[selectedMetric];
    
    const change = currentValue - previousValue;
    const changePercent = ((change / previousValue) * 100).toFixed(1);
    
    return {
      change,
      changePercent,
      isPositive: change > 0,
      isNeutral: Math.abs(change) < 1
    };
  };

  const getChartData = () => {
    return history.map((item, index) => ({
      date: new Date(item.measurement.createdAt).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
      [selectedMetric]: item.measurement[selectedMetric],
      percentile: item.analysis.percentiles[selectedMetric],
      overallPercentile: item.analysis.overallPercentile
    }));
  };

  const getMetricDisplayName = (metric: string) => {
    const names = {
      power: '파워',
      strength: '근력', 
      muscleEndurance: '근지구력',
      cardioEndurance: '심폐지구력'
    };
    return names[metric as keyof typeof names] || metric;
  };

  const getPeerComparison = () => {
    if (!currentMeasurement) return null;
    
    // Calculate peer averages (mock data - replace with real peer data)
    const peerAverages = {
      power: currentMeasurement.age <= 8 ? 120 : currentMeasurement.age <= 10 ? 180 : 250,
      strength: currentMeasurement.age <= 8 ? 80 : currentMeasurement.age <= 10 ? 120 : 160,
      muscleEndurance: currentMeasurement.age <= 8 ? 50 : currentMeasurement.age <= 10 ? 75 : 100,
      cardioEndurance: currentMeasurement.age <= 8 ? 40 : currentMeasurement.age <= 10 ? 60 : 80
    };

    return Object.entries(peerAverages).map(([metric, peerAvg]) => {
      const myValue = currentMeasurement[metric as keyof typeof peerAverages];
      const diff = myValue - peerAvg;
      const diffPercent = ((diff / peerAvg) * 100).toFixed(1);
      
      return {
        metric,
        myValue,
        peerAvg,
        diff,
        diffPercent,
        isBetter: diff > 0
      };
    });
  };

  const trend = getGrowthTrend();
  const chartData = getChartData();
  const peerComparison = getPeerComparison();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            측정 기록 로딩 중...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Growth Summary */}
      {trend && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              성장 현황
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['power', 'strength', 'muscleEndurance', 'cardioEndurance'].map((metric) => {
                const current = history[history.length - 1]?.measurement[metric as keyof Measurement] || 0;
                const previous = history[history.length - 2]?.measurement[metric as keyof Measurement] || 0;
                const change = current - previous;
                const isPositive = change > 0;
                
                return (
                  <div key={metric} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">{getMetricDisplayName(metric)}</div>
                    <div className="text-xl font-bold text-gray-900">{current}W</div>
                    <div className={`text-sm flex items-center justify-center gap-1 ${
                      isPositive ? 'text-green-600' : change === 0 ? 'text-gray-500' : 'text-red-500'
                    }`}>
                      {isPositive ? <TrendingUp className="w-3 h-3" /> : 
                       change === 0 ? <Minus className="w-3 h-3" /> : 
                       <TrendingDown className="w-3 h-3" />}
                      {change > 0 ? '+' : ''}{change.toFixed(0)}W
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              성장 그래프
            </span>
            <div className="flex gap-2">
              {['power', 'strength', 'muscleEndurance', 'cardioEndurance'].map((metric) => (
                <Button
                  key={metric}
                  variant={selectedMetric === metric ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMetric(metric as any)}
                >
                  {getMetricDisplayName(metric)}
                </Button>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value}W`,
                    name === selectedMetric ? getMetricDisplayName(selectedMetric) : name
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke="#7B5CFF" 
                  fill="#7B5CFF" 
                  fillOpacity={0.1}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>아직 측정 기록이 없습니다.</p>
              <p className="text-sm">첫 번째 측정을 완료해보세요!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Peer Comparison */}
      {peerComparison && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              또래 비교
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {peerComparison.map((comparison) => (
                <div key={comparison.metric} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{getMetricDisplayName(comparison.metric)}</div>
                    <div className="text-sm text-gray-600">
                      내 점수: {comparison.myValue}W | 또래 평균: {comparison.peerAvg}W
                    </div>
                  </div>
                  <Badge variant={comparison.isBetter ? "default" : "secondary"}>
                    {comparison.isBetter ? '+' : ''}{comparison.diffPercent}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Measurement Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            측정 기록 타임라인
          </CardTitle>
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
            <div className="space-y-4">
              {history.slice().reverse().map((item, index) => (
                <div key={item.measurement.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">{history.length - index}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">
                        {new Date(item.measurement.createdAt).toLocaleDateString('ko-KR')}
                      </span>
                      <Badge variant="outline">
                        종합 {item.analysis.overallPercentile}백분위
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 grid grid-cols-2 md:grid-cols-4 gap-2">
                      <span>파워: {item.measurement.power}W</span>
                      <span>근력: {item.measurement.strength}W</span>
                      <span>근지구력: {item.measurement.muscleEndurance}W</span>
                      <span>심폐지구력: {item.measurement.cardioEndurance}W</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>측정 기록이 없습니다.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}