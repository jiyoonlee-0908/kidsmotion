import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, Award, Star, Zap, Target, TrendingUp, 
  Medal, Crown, Flame, Shield, Heart, Timer 
} from "lucide-react";
import type { Measurement, AnalysisResult } from "@shared/schema";

interface AchievementBadgesProps {
  measurement: Measurement;
  analysis: AnalysisResult;
  previousMeasurements?: Measurement[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: 'power' | 'strength' | 'endurance' | 'balance' | 'improvement' | 'milestone';
  condition: (measurement: Measurement, analysis: AnalysisResult, previous?: Measurement[]) => boolean;
  progress: (measurement: Measurement, analysis: AnalysisResult, previous?: Measurement[]) => number;
  requirement: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export default function AchievementBadges({ measurement, analysis, previousMeasurements = [] }: AchievementBadgesProps) {
  
  const achievements: Achievement[] = [
    // Power Achievements
    {
      id: 'power-starter',
      name: '파워 입문자',
      description: '첫 번째 파워 측정 완료',
      icon: Zap,
      category: 'power',
      condition: () => true,
      progress: () => 100,
      requirement: '파워 측정 완료',
      rarity: 'common'
    },
    {
      id: 'power-excellent',
      name: '파워 엘리트',
      description: '파워 80백분위 이상 달성',
      icon: Lightning,
      category: 'power',
      condition: (_, analysis) => analysis.percentile5s >= 80,
      progress: (_, analysis) => Math.min((analysis.percentile5s / 80) * 100, 100),
      requirement: '파워 80백분위 이상',
      rarity: 'epic'
    },
    {
      id: 'power-champion',
      name: '파워 챔피언',
      description: '파워 96백분위 이상 달성',
      icon: Crown,
      category: 'power',
      condition: (_, analysis) => analysis.percentile5s >= 96,
      progress: (_, analysis) => Math.min((analysis.percentile5s / 96) * 100, 100),
      requirement: '파워 96백분위 이상',
      rarity: 'legendary'
    },

    // Improvement Achievements
    {
      id: 'first-improvement',
      name: '성장의 시작',
      description: '이전 측정 대비 향상',
      icon: TrendingUp,
      category: 'improvement',
      condition: (measurement, _, previous) => {
        if (!previous || previous.length === 0) return false;
        const lastMeasurement = previous[previous.length - 1];
        return measurement.power5s > lastMeasurement.power5s;
      },
      progress: (measurement, _, previous) => {
        if (!previous || previous.length === 0) return 0;
        const lastMeasurement = previous[previous.length - 1];
        const improvement = ((measurement.power5s - lastMeasurement.power5s) / lastMeasurement.power5s) * 100;
        return Math.min(improvement * 10, 100);
      },
      requirement: '이전 대비 파워 향상',
      rarity: 'common'
    },
    {
      id: 'consistent-improver',
      name: '꾸준한 성장',
      description: '3회 연속 향상',
      icon: Flame,
      category: 'improvement',
      condition: (measurement, _, previous) => {
        if (!previous || previous.length < 2) return false;
        const last3 = [...previous.slice(-2), { power5s: measurement.power5s }];
        return last3[1].power5s > last3[0].power5s && last3[2].power5s > last3[1].power5s;
      },
      progress: (measurement, _, previous) => {
        if (!previous || previous.length < 2) return 0;
        const improvements = [];
        for (let i = 1; i < Math.min(previous.length, 3); i++) {
          if (previous[i].power5s > previous[i-1].power5s) improvements.push(true);
        }
        return (improvements.length / 3) * 100;
      },
      requirement: '3회 연속 향상',
      rarity: 'rare'
    },

    // Balance Achievements
    {
      id: 'perfect-balance',
      name: '완벽한 균형',
      description: '좌우 밸런스 차이 2% 이하',
      icon: Shield,
      category: 'balance',
      condition: (measurement) => Math.abs(measurement.leftBalance - measurement.rightBalance) <= 2,
      progress: (measurement) => {
        const diff = Math.abs(measurement.leftBalance - measurement.rightBalance);
        return Math.max(0, (1 - diff / 5) * 100);
      },
      requirement: '밸런스 차이 2% 이하',
      rarity: 'epic'
    },

    // Endurance Achievements
    {
      id: 'endurance-warrior',
      name: '지구력 전사',
      description: '심폐지구력 75백분위 이상',
      icon: Heart,
      category: 'endurance',
      condition: (_, analysis) => analysis.percentile60s >= 75,
      progress: (_, analysis) => Math.min((analysis.percentile60s / 75) * 100, 100),
      requirement: '심폐지구력 75백분위 이상',
      rarity: 'rare'
    },

    // Milestone Achievements
    {
      id: 'first-measurement',
      name: '첫 걸음',
      description: '첫 체력 측정 완료',
      icon: Star,
      category: 'milestone',
      condition: () => true,
      progress: () => 100,
      requirement: '첫 측정 완료',
      rarity: 'common'
    },
    {
      id: 'fifth-measurement',
      name: '꾸준함의 힘',
      description: '5회차 측정 달성',
      icon: Medal,
      category: 'milestone',
      condition: (_, __, previous) => (previous?.length || 0) >= 4,
      progress: (_, __, previous) => Math.min(((previous?.length || 0) / 5) * 100, 100),
      requirement: '5회 측정 완료',
      rarity: 'rare'
    }
  ];

  const earnedAchievements = achievements.filter(achievement => 
    achievement.condition(measurement, analysis, previousMeasurements)
  );

  const inProgressAchievements = achievements.filter(achievement => 
    !achievement.condition(measurement, analysis, previousMeasurements) &&
    achievement.progress(measurement, analysis, previousMeasurements) > 0
  );

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'rare': return 'shadow-blue-200 shadow-lg';
      case 'epic': return 'shadow-purple-200 shadow-lg';
      case 'legendary': return 'shadow-yellow-200 shadow-xl';
      default: return '';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'power': return Zap;
      case 'strength': return Trophy;
      case 'endurance': return Heart;
      case 'balance': return Shield;
      case 'improvement': return TrendingUp;
      case 'milestone': return Star;
      default: return Award;
    }
  };

  return (
    <div className="space-y-6">
      {/* Earned Achievements */}
      {earnedAchievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              획득한 배지 ({earnedAchievements.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {earnedAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`relative p-4 rounded-lg border-2 text-center transition-all hover:scale-105 ${getRarityColor(achievement.rarity)} ${getRarityGlow(achievement.rarity)}`}
                >
                  <div className="mb-3">
                    <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center mb-2">
                      <achievement.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {achievement.rarity}
                    </Badge>
                  </div>
                  <h3 className="font-medium text-sm mb-1">{achievement.name}</h3>
                  <p className="text-xs opacity-80">{achievement.description}</p>
                  
                  {achievement.rarity === 'legendary' && (
                    <div className="absolute -top-1 -right-1">
                      <Crown className="w-4 h-4 text-yellow-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Towards Achievements */}
      {inProgressAchievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              진행 중인 도전과제
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inProgressAchievements.map((achievement) => {
                const progress = achievement.progress(measurement, analysis, previousMeasurements);
                return (
                  <div key={achievement.id} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <achievement.icon className="w-5 h-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{achievement.name}</h3>
                          <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{achievement.requirement}</span>
                            <span>{progress.toFixed(0)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achievement Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            성취 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{earnedAchievements.length}</div>
              <div className="text-sm text-yellow-700">획득 배지</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{inProgressAchievements.length}</div>
              <div className="text-sm text-blue-700">진행 중</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {earnedAchievements.filter(a => a.rarity === 'epic' || a.rarity === 'legendary').length}
              </div>
              <div className="text-sm text-purple-700">특별 배지</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Math.round((earnedAchievements.length / achievements.length) * 100)}%
              </div>
              <div className="text-sm text-green-700">완료율</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Achievement Hint */}
      {inProgressAchievements.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">다음 목표</p>
                <p className="text-gray-600">
                  {inProgressAchievements[0]?.name}까지 {(100 - inProgressAchievements[0]?.progress(measurement, analysis, previousMeasurements)).toFixed(0)}% 남았어요!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Lightning icon component (since it's not in lucide-react by default)
function Lightning({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 0L6 12h4l-2 12 7-12h-4l2-12z"/>
    </svg>
  );
}