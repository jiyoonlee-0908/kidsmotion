import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Trophy, Calendar, TrendingUp, Zap, CheckCircle } from "lucide-react";
import type { Measurement } from "@shared/schema";

interface GoalSettingProps {
  currentMeasurement: Measurement;
  onGoalSet?: (goal: Goal) => void;
}

interface Goal {
  id: string;
  studentName: string;
  targetPower: number;
  targetStrength: number;
  targetMuscleEndurance: number;
  targetCardioEndurance: number;
  targetDate: string;
  createdAt: string;
  isCompleted: boolean;
}

export default function GoalSetting({ currentMeasurement, onGoalSet }: GoalSettingProps) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    targetPower: currentMeasurement.power + 20,
    targetStrength: currentMeasurement.strength + 15,
    targetMuscleEndurance: currentMeasurement.muscleEndurance + 10,
    targetCardioEndurance: currentMeasurement.cardioEndurance + 10,
    targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const handleCreateGoal = () => {
    const goal: Goal = {
      id: Date.now().toString(),
      studentName: currentMeasurement.studentName,
      ...newGoal,
      createdAt: new Date().toISOString(),
      isCompleted: false
    };

    setGoals([...goals, goal]);
    setIsCreatingGoal(false);
    onGoalSet?.(goal);
  };

  const calculateProgress = (current: number, target: number, initial: number) => {
    if (target <= initial) return 100;
    const progress = ((current - initial) / (target - initial)) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  const getDaysUntilTarget = (targetDate: string) => {
    const target = new Date(targetDate);
    const today = new Date();
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getMotivationalMessage = (progress: number) => {
    if (progress >= 100) return "🎉 목표 달성! 축하합니다!";
    if (progress >= 80) return "💪 거의 다 왔어요! 조금만 더!";
    if (progress >= 60) return "🔥 순조롭게 진행 중이에요!";
    if (progress >= 40) return "⭐ 좋은 페이스로 성장하고 있어요!";
    if (progress >= 20) return "🚀 시작이 좋네요! 계속 화이팅!";
    return "🎯 목표를 향해 첫걸음을 내딛어보세요!";
  };

  const getRecommendedGoals = () => {
    const baseIncrement = Math.floor(currentMeasurement.age / 2) + 5;
    return {
      conservative: {
        power: currentMeasurement.power + baseIncrement,
        strength: currentMeasurement.strength + Math.floor(baseIncrement * 0.7),
        muscleEndurance: currentMeasurement.muscleEndurance + Math.floor(baseIncrement * 0.5),
        cardioEndurance: currentMeasurement.cardioEndurance + Math.floor(baseIncrement * 0.5)
      },
      moderate: {
        power: currentMeasurement.power + baseIncrement * 2,
        strength: currentMeasurement.strength + Math.floor(baseIncrement * 1.5),
        muscleEndurance: currentMeasurement.muscleEndurance + baseIncrement,
        cardioEndurance: currentMeasurement.cardioEndurance + baseIncrement
      },
      ambitious: {
        power: currentMeasurement.power + baseIncrement * 3,
        strength: currentMeasurement.strength + baseIncrement * 2,
        muscleEndurance: currentMeasurement.muscleEndurance + Math.floor(baseIncrement * 1.5),
        cardioEndurance: currentMeasurement.cardioEndurance + Math.floor(baseIncrement * 1.5)
      }
    };
  };

  const recommendedGoals = getRecommendedGoals();
  const currentGoal = goals.find(g => !g.isCompleted);
  
  if (currentGoal) {
    const powerProgress = calculateProgress(currentMeasurement.power, currentGoal.targetPower, currentMeasurement.power - 20);
    const strengthProgress = calculateProgress(currentMeasurement.strength, currentGoal.targetStrength, currentMeasurement.strength - 15);
    const muscleEnduranceProgress = calculateProgress(currentMeasurement.muscleEndurance, currentGoal.targetMuscleEndurance, currentMeasurement.muscleEndurance - 10);
    const cardioEnduranceProgress = calculateProgress(currentMeasurement.cardioEndurance, currentGoal.targetCardioEndurance, currentMeasurement.cardioEndurance - 10);
    
    const averageProgress = (powerProgress + strengthProgress + muscleEnduranceProgress + cardioEnduranceProgress) / 4;
    const daysLeft = getDaysUntilTarget(currentGoal.targetDate);

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            현재 목표 진행 상황
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Progress */}
          <div className="text-center space-y-3">
            <div className="text-3xl font-bold text-purple-600">{averageProgress.toFixed(0)}%</div>
            <Progress value={averageProgress} className="w-full h-3" />
            <p className="text-sm text-gray-600">{getMotivationalMessage(averageProgress)}</p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className={daysLeft <= 7 ? "text-red-600 font-medium" : "text-gray-600"}>
                  {daysLeft > 0 ? `${daysLeft}일 남음` : daysLeft === 0 ? "오늘이 목표일!" : `${Math.abs(daysLeft)}일 지남`}
                </span>
              </div>
            </div>
          </div>

          {/* Individual Metrics Progress */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: '파워', current: currentMeasurement.power, target: currentGoal.targetPower, progress: powerProgress, icon: Zap },
              { label: '근력', current: currentMeasurement.strength, target: currentGoal.targetStrength, progress: strengthProgress, icon: Trophy },
              { label: '근지구력', current: currentMeasurement.muscleEndurance, target: currentGoal.targetMuscleEndurance, progress: muscleEnduranceProgress, icon: TrendingUp },
              { label: '심폐지구력', current: currentMeasurement.cardioEndurance, target: currentGoal.targetCardioEndurance, progress: cardioEnduranceProgress, icon: CheckCircle }
            ].map((metric) => (
              <div key={metric.label} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <metric.icon className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{metric.current}W</span>
                    <span>{metric.target}W</span>
                  </div>
                  <Progress value={metric.progress} className="h-2" />
                  <div className="text-center">
                    <Badge variant={metric.progress >= 100 ? "default" : "outline"} className="text-xs">
                      {metric.progress >= 100 ? "달성!" : `${metric.progress.toFixed(0)}%`}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setIsCreatingGoal(true)}
          >
            새 목표 설정하기
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600" />
          목표 설정
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isCreatingGoal ? (
          <>
            {/* Recommended Goals */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">추천 목표</h3>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(recommendedGoals).map(([type, values]) => (
                  <div key={type} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                       onClick={() => {
                         setNewGoal({
                           targetPower: values.power,
                           targetStrength: values.strength,
                           targetMuscleEndurance: values.muscleEndurance,
                           targetCardioEndurance: values.cardioEndurance,
                           targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                         });
                         setIsCreatingGoal(true);
                       }}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium capitalize">
                        {type === 'conservative' ? '🐢 안정적' : 
                         type === 'moderate' ? '⚡ 적당한' : '🚀 도전적'} 목표
                      </span>
                      <Badge variant="outline">
                        +{values.power - currentMeasurement.power}W
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 grid grid-cols-2 gap-2">
                      <span>파워: {values.power}W</span>
                      <span>근력: {values.strength}W</span>
                      <span>근지구력: {values.muscleEndurance}W</span>
                      <span>심폐지구력: {values.cardioEndurance}W</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={() => setIsCreatingGoal(true)}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              맞춤 목표 설정하기
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">맞춤 목표 설정</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="targetPower">목표 파워 (W)</Label>
                <Input
                  id="targetPower"
                  type="number"
                  value={newGoal.targetPower}
                  onChange={(e) => setNewGoal({...newGoal, targetPower: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="targetStrength">목표 근력 (W)</Label>
                <Input
                  id="targetStrength"
                  type="number"
                  value={newGoal.targetStrength}
                  onChange={(e) => setNewGoal({...newGoal, targetStrength: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="targetMuscleEndurance">목표 근지구력 (W)</Label>
                <Input
                  id="targetMuscleEndurance"
                  type="number"
                  value={newGoal.targetMuscleEndurance}
                  onChange={(e) => setNewGoal({...newGoal, targetMuscleEndurance: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="targetCardioEndurance">목표 심폐지구력 (W)</Label>
                <Input
                  id="targetCardioEndurance"
                  type="number"
                  value={newGoal.targetCardioEndurance}
                  onChange={(e) => setNewGoal({...newGoal, targetCardioEndurance: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="targetDate">목표 달성일</Label>
              <Input
                id="targetDate"
                type="date"
                value={newGoal.targetDate}
                onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleCreateGoal} className="flex-1">
                목표 설정 완료
              </Button>
              <Button variant="outline" onClick={() => setIsCreatingGoal(false)}>
                취소
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}