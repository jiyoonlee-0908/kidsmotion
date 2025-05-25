import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Dumbbell, Heart, Timer, Target, Play, CheckCircle, 
  ArrowRight, Flame, Star, Clock, TrendingUp 
} from "lucide-react";
import type { Measurement, AnalysisResult } from "@shared/schema";

interface ExerciseRecommendationsProps {
  measurement: Measurement;
  analysis: AnalysisResult;
}

interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetArea: 'power' | 'strength' | 'muscleEndurance' | 'cardioEndurance' | 'balance';
  benefits: string[];
  instructions: string[];
  icon: any;
}

export default function ExerciseRecommendations({ measurement, analysis }: ExerciseRecommendationsProps) {
  
  const getWeakestAreas = () => {
    const percentiles = {
      power: analysis.percentile5s || 50,
      strength: analysis.percentile15s || 50,
      muscleEndurance: analysis.percentile30s || 50,
      cardioEndurance: analysis.percentile60s || 50
    };
    
    return Object.entries(percentiles)
      .sort(([,a], [,b]) => a - b)
      .slice(0, 2)
      .map(([area]) => area);
  };

  const getBalanceNeed = () => {
    const balanceDiff = Math.abs(measurement.leftBalance - measurement.rightBalance);
    return balanceDiff > 5;
  };

  const getAllExercises = (): Exercise[] => [
    // Power exercises
    {
      id: 'jump-squats',
      name: '점프 스쿼트',
      description: '폭발적인 하체 파워를 기르는 운동',
      duration: '3세트 x 10회',
      difficulty: 'intermediate',
      targetArea: 'power',
      benefits: ['하체 폭발력 향상', '순간 파워 증가', '점프력 강화'],
      instructions: [
        '어깨 너비로 다리를 벌리고 선다',
        '스쿼트 자세로 앉는다',
        '최대한 높이 점프한다',
        '부드럽게 착지하여 다시 스쿼트 자세로'
      ],
      icon: TrendingUp
    },
    {
      id: 'burpees',
      name: '버피',
      description: '전신 폭발력과 지구력을 동시에',
      duration: '3세트 x 8회',
      difficulty: 'advanced',
      targetArea: 'power',
      benefits: ['전신 파워 증가', '심폐지구력 향상', '체력 전반 강화'],
      instructions: [
        '서있는 자세에서 시작',
        '스쿼트 후 플랭크 자세',
        '팔굽혀펴기 1회',
        '다시 스쿼트 후 점프'
      ],
      icon: Flame
    },

    // Strength exercises
    {
      id: 'push-ups',
      name: '팔굽혀펴기',
      description: '상체 근력의 기본이 되는 운동',
      duration: '3세트 x 8-12회',
      difficulty: 'beginner',
      targetArea: 'strength',
      benefits: ['상체 근력 강화', '코어 안정성', '어깨 강화'],
      instructions: [
        '플랭크 자세로 시작',
        '팔을 어깨 너비로 벌림',
        '가슴이 바닥에 닿을 때까지 내림',
        '팔을 펴서 원위치로'
      ],
      icon: Dumbbell
    },
    {
      id: 'squats',
      name: '스쿼트',
      description: '하체 근력 강화의 왕',
      duration: '3세트 x 12-15회',
      difficulty: 'beginner',
      targetArea: 'strength',
      benefits: ['하체 근력 증가', '코어 강화', '자세 개선'],
      instructions: [
        '어깨 너비로 다리를 벌림',
        '엉덩이를 뒤로 빼며 앉기',
        '무릎이 발끝을 넘지 않게',
        '힘을 주어 일어서기'
      ],
      icon: Dumbbell
    },

    // Muscle Endurance exercises
    {
      id: 'plank',
      name: '플랭크',
      description: '코어 지구력을 기르는 최고의 운동',
      duration: '3세트 x 30-60초',
      difficulty: 'intermediate',
      targetArea: 'muscleEndurance',
      benefits: ['코어 지구력', '자세 안정성', '전신 균형'],
      instructions: [
        '엎드린 자세에서 팔꿈치로 지탱',
        '몸을 일직선으로 유지',
        '배에 힘을 주고 버티기',
        '호흡을 자연스럽게'
      ],
      icon: Timer
    },
    {
      id: 'mountain-climbers',
      name: '마운틴 클라이머',
      description: '코어 지구력과 심폐지구력을 동시에',
      duration: '3세트 x 20회',
      difficulty: 'intermediate',
      targetArea: 'muscleEndurance',
      benefits: ['코어 지구력', '심폐 능력', '전신 협응력'],
      instructions: [
        '플랭크 자세로 시작',
        '한쪽 무릎을 가슴 쪽으로',
        '빠르게 다리를 교대로',
        '코어에 힘을 유지'
      ],
      icon: Timer
    },

    // Cardio Endurance exercises
    {
      id: 'jumping-jacks',
      name: '점핑 잭',
      description: '심폐지구력 향상의 기본 운동',
      duration: '3세트 x 30초',
      difficulty: 'beginner',
      targetArea: 'cardioEndurance',
      benefits: ['심폐지구력 향상', '전신 순환', '협응력 개발'],
      instructions: [
        '다리를 모으고 팔을 옆에',
        '점프하며 다리를 벌리고 팔을 위로',
        '다시 점프하며 원위치',
        '리듬감 있게 반복'
      ],
      icon: Heart
    },
    {
      id: 'high-knees',
      name: '하이니',
      description: '심박수를 올리는 제자리 달리기',
      duration: '3세트 x 30초',
      difficulty: 'beginner',
      targetArea: 'cardioEndurance',
      benefits: ['심폐 능력 향상', '하체 순발력', '코어 안정성'],
      instructions: [
        '제자리에서 달리기',
        '무릎을 가슴 높이까지',
        '팔을 자연스럽게 흔들기',
        '빠른 템포 유지'
      ],
      icon: Heart
    },

    // Balance exercises
    {
      id: 'single-leg-stand',
      name: '한발 서기',
      description: '균형감각과 안정성 향상',
      duration: '양발 각 30초씩',
      difficulty: 'beginner',
      targetArea: 'balance',
      benefits: ['균형감각 향상', '발목 안정성', '집중력 개발'],
      instructions: [
        '한발로 서서 균형 잡기',
        '다른 발은 살짝 들어올림',
        '시선을 한 점에 고정',
        '30초간 균형 유지'
      ],
      icon: Target
    }
  ];

  const getRecommendedExercises = () => {
    const weakAreas = getWeakestAreas();
    const needsBalance = getBalanceNeed();
    const allExercises = getAllExercises();
    
    let recommended = [];
    
    // Add exercises for weak areas
    weakAreas.forEach(area => {
      const areaExercises = allExercises.filter(ex => ex.targetArea === area);
      recommended.push(...areaExercises.slice(0, 2));
    });
    
    // Add balance exercise if needed
    if (needsBalance) {
      const balanceExercise = allExercises.find(ex => ex.targetArea === 'balance');
      if (balanceExercise) recommended.push(balanceExercise);
    }
    
    // Remove duplicates and limit to 5
    return recommended.filter((ex, index, self) => 
      self.findIndex(e => e.id === ex.id) === index
    ).slice(0, 5);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '초급';
      case 'intermediate': return '중급';
      case 'advanced': return '고급';
      default: return difficulty;
    }
  };

  const getTargetAreaText = (area: string) => {
    switch (area) {
      case 'power': return '파워';
      case 'strength': return '근력';
      case 'muscleEndurance': return '근지구력';
      case 'cardioEndurance': return '심폐지구력';
      case 'balance': return '밸런스';
      default: return area;
    }
  };

  const recommendedExercises = getRecommendedExercises();
  const weakAreas = getWeakestAreas();

  return (
    <div className="space-y-6">
      {/* Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            맞춤 운동 처방
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-900 mb-2">분석 결과</h3>
              <div className="text-sm text-purple-700 space-y-1">
                <p>• 주요 개선 영역: {weakAreas.map(area => getTargetAreaText(area)).join(', ')}</p>
                {getBalanceNeed() && <p>• 좌우 균형 개선 필요</p>}
                <p>• 총 {recommendedExercises.length}개의 맞춤 운동을 추천합니다</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Exercises */}
      <div className="grid gap-4">
        {recommendedExercises.map((exercise, index) => (
          <Card key={exercise.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <exercise.icon className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{exercise.name}</h3>
                      <p className="text-gray-600 text-sm">{exercise.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getDifficultyColor(exercise.difficulty)}>
                        {getDifficultyText(exercise.difficulty)}
                      </Badge>
                      <Badge variant="outline">
                        {getTargetAreaText(exercise.targetArea)}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{exercise.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>우선순위 {index + 1}</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">운동 효과</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {exercise.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">운동 방법</h4>
                      <ol className="text-sm text-gray-600 space-y-1">
                        {exercise.instructions.map((instruction, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-4 h-4 bg-purple-100 text-purple-600 rounded-full text-xs flex items-center justify-center mt-0.5">
                              {i + 1}
                            </span>
                            {instruction}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Play className="w-4 h-4 mr-2" />
                      운동 시작
                    </Button>
                    <Button size="sm" variant="outline">
                      즐겨찾기
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            주간 운동 계획
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-2">
              {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-sm font-medium text-gray-700 mb-2">{day}</div>
                  <div className={`p-2 rounded ${
                    index < 3 || index === 4 || index === 6 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {index < 3 || index === 4 || index === 6 ? '운동' : '휴식'}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">운동 팁</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 주 3-4회, 하루 걸러 운동하세요</li>
                <li>• 운동 전후 5분씩 스트레칭을 해주세요</li>
                <li>• 점진적으로 강도를 높여가세요</li>
                <li>• 충분한 수분 섭취를 잊지 마세요</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}