import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, Trophy, TrendingUp, Target, Dumbbell, Heart, 
  BarChart3, History, Award, Share2, Download, RotateCcw 
} from "lucide-react";

// Import all new components
import SimpleMeasurementHistory from "./simple-measurement-history";
import GoalSetting from "./goal-setting";
import ExerciseRecommendations from "./exercise-recommendations";
import Balance3DAvatar from "./balance-3d-avatar";
import AchievementBadges from "./achievement-badges";
import PDFExport from "./pdf-export";
import MobileAppIntegration from "./mobile-app-integration";

// Import existing components
import RadarChart from "./charts/radar-chart";
import ProgressChart from "./charts/progress-chart";
import BalanceChart from "./charts/balance-chart";

import type { Measurement, AnalysisResult } from "@shared/schema";

interface EnhancedResultsDisplayProps {
  data: {
    measurement: Measurement;
    analysis: AnalysisResult;
    strengths: string[];
    improvements: string[];
  };
  onNewMeasurement: () => void;
}

export default function EnhancedResultsDisplay({ data, onNewMeasurement }: EnhancedResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  const getGrade = (percentile: number) => {
    if (percentile >= 97) return "매우우수";
    if (percentile >= 85) return "우수";
    if (percentile >= 15) return "보통";
    if (percentile >= 3) return "부족";
    return "매우부족";
  };

  const getGradeColor = (percentile: number) => {
    if (percentile >= 97) return "text-purple-600 bg-purple-50";
    if (percentile >= 85) return "text-blue-600 bg-blue-50";
    if (percentile >= 15) return "text-green-600 bg-green-50";
    if (percentile >= 3) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getBalanceStatus = (left: number, right: number) => {
    const diff = Math.abs(left - right);
    if (diff <= 5) return "균형";
    if (diff <= 10) return "약간불균형";
    return "불균형";
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{data.measurement.studentName}</h1>
                <p className="text-purple-100">
                  {data.measurement.age}세 • {data.measurement.sex === 'M' ? '남자' : '여자'} • 
                  {new Date(data.measurement.createdAt || '').toLocaleDateString('ko-KR')}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{data.analysis.overallPercentile}점</div>
              <div className="text-purple-100">종합 백분위</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <PDFExport data={data} />
        <Button variant="outline" onClick={() => setActiveTab("mobile")}>
          <Share2 className="w-4 h-4 mr-2" />
          모바일 연동
        </Button>
        <Button variant="outline" onClick={onNewMeasurement}>
          <RotateCcw className="w-4 h-4 mr-2" />
          새 측정
        </Button>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">개요</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">기록</span>
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span className="hidden sm:inline">목표</span>
          </TabsTrigger>
          <TabsTrigger value="exercise" className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4" />
            <span className="hidden sm:inline">운동</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">배지</span>
          </TabsTrigger>
          <TabsTrigger value="mobile" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">연동</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(data.analysis.percentile5s)}`}>
                  <Trophy className="w-4 h-4" />
                  {getGrade(data.analysis.percentile5s)}
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-gray-900">{data.measurement.power}W</div>
                  <div className="text-sm text-gray-600">파워 ({data.analysis.percentile5s}%)</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(data.analysis.percentile15s)}`}>
                  <Dumbbell className="w-4 h-4" />
                  {getGrade(data.analysis.percentile15s)}
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-gray-900">{data.measurement.strength}W</div>
                  <div className="text-sm text-gray-600">근력 ({data.analysis.percentile15s}%)</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(data.analysis.percentile30s)}`}>
                  <TrendingUp className="w-4 h-4" />
                  {getGrade(data.analysis.percentile30s)}
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-gray-900">{data.measurement.muscleEndurance}W</div>
                  <div className="text-sm text-gray-600">근지구력 ({data.analysis.percentile30s}%)</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(data.analysis.percentile60s)}`}>
                  <Heart className="w-4 h-4" />
                  {getGrade(data.analysis.percentile60s)}
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-gray-900">{data.measurement.cardioEndurance}W</div>
                  <div className="text-sm text-gray-600">심폐지구력 ({data.analysis.percentile60s}%)</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <RadarChart 
              data={{
                balance: 50,
                power: data.analysis.percentile5s,
                strength: data.analysis.percentile15s,
                muscleEndurance: data.analysis.percentile30s,
                cardioEndurance: data.analysis.percentile60s
              }} 
            />
            <Balance3DAvatar 
              leftBalance={data.measurement.leftBalance}
              rightBalance={data.measurement.rightBalance}
              status={getBalanceStatus(data.measurement.leftBalance, data.measurement.rightBalance)}
            />
          </div>

          {/* AI Analysis */}
          {data.analysis.aiAnalysis && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🤖 AI 코칭 분석
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">종합 평가</h4>
                    <p className="text-blue-700 leading-relaxed">{data.analysis.aiAnalysis.summary}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">💪 강점</h4>
                      <ul className="text-green-700 space-y-1">
                        {data.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-orange-900 mb-2">🎯 개선점</h4>
                      <ul className="text-orange-700 space-y-1">
                        {data.improvements.map((improvement, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span>
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <SimpleMeasurementHistory />
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals">
          <GoalSetting currentMeasurement={data.measurement} />
        </TabsContent>

        {/* Exercise Tab */}
        <TabsContent value="exercise">
          <ExerciseRecommendations 
            measurement={data.measurement} 
            analysis={data.analysis} 
          />
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <AchievementBadges 
            measurement={data.measurement}
            analysis={data.analysis}
          />
        </TabsContent>

        {/* Mobile Integration Tab */}
        <TabsContent value="mobile">
          <MobileAppIntegration measurementData={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}