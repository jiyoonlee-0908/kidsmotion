import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Target, Zap, Activity, Heart, Dumbbell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Measurement, AnalysisResult } from "@shared/schema";

interface ExerciseRecommendationCarouselProps {
  measurement: Measurement;
  analysis: AnalysisResult;
}

interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: string;
  intensity: 'low' | 'medium' | 'high';
  targetArea: 'power' | 'strength' | 'muscleEndurance' | 'cardioEndurance' | 'balance';
  benefits: string[];
  instructions: string[];
  icon: any;
  equipment: string[];
  ageRecommendation: string;
  difficultyLevel: number; // 1-5
}

export default function ExerciseRecommendationCarousel({ measurement, analysis }: ExerciseRecommendationCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // 개인화된 운동 추천 로직
  useEffect(() => {
    const generatePersonalizedExercises = (): Exercise[] => {
      const age = new Date().getFullYear() - new Date(measurement.birthDate).getFullYear();
      const recommendations: Exercise[] = [];

      // 파워가 낮은 경우 (percentile5s < 50)
      if (analysis.percentile5s < 50) {
        recommendations.push({
          id: 'jump-squat',
          name: '점프 스쿼트',
          description: '순간 파워와 하체 근력을 동시에 기를 수 있는 운동입니다.',
          duration: '30초 × 3세트',
          intensity: 'medium',
          targetArea: 'power',
          benefits: ['순간 파워 향상', '하체 근력 강화', '점프력 증가'],
          instructions: [
            '어깨너비로 다리를 벌리고 서세요',
            '스쿼트 자세로 앉았다가 힘차게 점프하세요',
            '착지할 때는 무릎을 살짝 구부려 충격을 완화하세요'
          ],
          icon: Zap,
          equipment: ['맨몸'],
          ageRecommendation: `${age}세에 적합`,
          difficultyLevel: 3
        });
      }

      // 근력이 낮은 경우 (percentile15s < 50)
      if (analysis.percentile15s < 50) {
        recommendations.push({
          id: 'push-up',
          name: '팔굽혀펴기',
          description: '상체 근력을 전반적으로 기를 수 있는 기본 운동입니다.',
          duration: '10-15회 × 3세트',
          intensity: 'medium',
          targetArea: 'strength',
          benefits: ['상체 근력 강화', '코어 안정성 향상', '팔 근육 발달'],
          instructions: [
            '플랭크 자세에서 시작하세요',
            '팔꿈치를 구부려 가슴이 바닥에 가까워질 때까지 내려가세요',
            '팔을 펴서 원래 자세로 돌아오세요'
          ],
          icon: Dumbbell,
          equipment: ['맨몸'],
          ageRecommendation: `${age}세에 적합`,
          difficultyLevel: 2
        });
      }

      // 근지구력이 낮은 경우 (percentile30s < 50)
      if (analysis.percentile30s < 50) {
        recommendations.push({
          id: 'plank',
          name: '플랭크',
          description: '코어 근지구력과 전신 안정성을 기르는 운동입니다.',
          duration: '30-60초 × 3세트',
          intensity: 'low',
          targetArea: 'muscleEndurance',
          benefits: ['코어 근지구력 향상', '자세 교정', '전신 안정성 강화'],
          instructions: [
            '엎드린 상태에서 팔꿈치와 발가락으로 몸을 지탱하세요',
            '머리부터 발까지 일직선을 유지하세요',
            '복부에 힘을 주고 자세를 유지하세요'
          ],
          icon: Activity,
          equipment: ['맨몸'],
          ageRecommendation: `${age}세에 적합`,
          difficultyLevel: 2
        });
      }

      // 심폐지구력이 낮은 경우 (percentile60s < 50)
      if (analysis.percentile60s < 50) {
        recommendations.push({
          id: 'burpee',
          name: '버피',
          description: '전신 근력과 심폐지구력을 동시에 기를 수 있는 고강도 운동입니다.',
          duration: '5-10회 × 3세트',
          intensity: 'high',
          targetArea: 'cardioEndurance',
          benefits: ['심폐지구력 향상', '전신 근력 강화', '칼로리 소모'],
          instructions: [
            '서 있는 자세에서 스쿼트로 앉으세요',
            '손을 바닥에 대고 다리를 뒤로 뻗어 플랭크 자세를 만드세요',
            '다시 스쿼트 자세로 돌아와 점프하며 일어서세요'
          ],
          icon: Heart,
          equipment: ['맨몸'],
          ageRecommendation: `${age}세에 적합`,
          difficultyLevel: 4
        });
      }

      // 밸런스 운동 (항상 포함)
      recommendations.push({
        id: 'single-leg-stand',
        name: '한 발 서기',
        description: '균형감각과 하체 안정성을 기르는 운동입니다.',
        duration: '30초 × 각 다리',
        intensity: 'low',
        targetArea: 'balance',
        benefits: ['균형감각 향상', '발목 안정성 강화', '집중력 향상'],
        instructions: [
          '한 발로 서서 다른 발을 살짝 들어올리세요',
          '팔을 양옆으로 벌려 균형을 잡으세요',
          '시선을 한 점에 고정하여 집중하세요'
        ],
        icon: Target,
        equipment: ['맨몸'],
        ageRecommendation: `${age}세에 적합`,
        difficultyLevel: 1
      });

      // 종합 추천 운동
      recommendations.push({
        id: 'mountain-climber',
        name: '마운틴 클라이머',
        description: '심폐지구력과 코어 근력을 동시에 기를 수 있는 운동입니다.',
        duration: '30초 × 3세트',
        intensity: 'medium',
        targetArea: 'cardioEndurance',
        benefits: ['심폐지구력 향상', '코어 근력 강화', '전신 컨디셔닝'],
        instructions: [
          '플랭크 자세에서 시작하세요',
          '한쪽 무릎을 가슴 쪽으로 당기세요',
          '빠르게 다리를 교대로 움직이세요'
        ],
        icon: Activity,
        equipment: ['맨몸'],
        ageRecommendation: `${age}세에 적합`,
        difficultyLevel: 3
      });

      return recommendations;
    };

    setExercises(generatePersonalizedExercises());
  }, [measurement, analysis]);

  const nextExercise = () => {
    setCurrentIndex((prev) => (prev + 1) % exercises.length);
  };

  const prevExercise = () => {
    setCurrentIndex((prev) => (prev - 1 + exercises.length) % exercises.length);
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTargetAreaName = (area: string) => {
    switch (area) {
      case 'power': return '파워';
      case 'strength': return '근력';
      case 'muscleEndurance': return '근지구력';
      case 'cardioEndurance': return '심폐지구력';
      case 'balance': return '균형';
      default: return area;
    }
  };

  if (exercises.length === 0) {
    return <div>운동 추천을 불러오는 중...</div>;
  }

  const currentExercise = exercises[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          개인 맞춤 운동 추천
        </h3>
        <p className="text-gray-600">
          체력 측정 결과를 바탕으로 {measurement.studentName}님에게 적합한 운동을 추천해드립니다.
        </p>
      </div>

      <div className="relative">
        <Card className="overflow-hidden bg-gradient-to-br from-white to-purple-50 border-2 border-purple-100">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <currentExercise.icon className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">{currentExercise.name}</CardTitle>
                  <CardDescription className="text-purple-100">
                    {getTargetAreaName(currentExercise.targetArea)} 향상 운동
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-90">
                  {currentIndex + 1} / {exercises.length}
                </div>
                <Badge variant="secondary" className="mt-1">
                  난이도 {currentExercise.difficultyLevel}/5
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {currentExercise.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Badge className={getIntensityColor(currentExercise.intensity)}>
                    {currentExercise.intensity === 'low' ? '저강도' : 
                     currentExercise.intensity === 'medium' ? '중강도' : '고강도'}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {currentExercise.duration}
                  </Badge>
                  <Badge variant="outline">
                    {currentExercise.ageRecommendation}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">운동 효과</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentExercise.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">필요 장비</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentExercise.equipment.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">운동 방법</h4>
                  <ol className="space-y-2">
                    {currentExercise.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 네비게이션 버튼 */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
          onClick={prevExercise}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
          onClick={nextExercise}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* 캐러셀 인디케이터 */}
      <div className="flex justify-center mt-4 space-x-2">
        {exercises.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-purple-600' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* 추가 안내사항 */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <Target className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">운동 시 주의사항</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• 운동 전 5-10분 가벼운 준비운동을 하세요</li>
              <li>• 본인의 체력에 맞게 강도를 조절하세요</li>
              <li>• 운동 중 통증이 느껴지면 즉시 중단하세요</li>
              <li>• 운동 후 충분한 휴식과 수분 섭취를 하세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}