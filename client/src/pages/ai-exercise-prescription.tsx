import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain,
  Target,
  TrendingUp,
  Users,
  Clock,
  Award,
  Zap,
  Heart,
  Dumbbell,
  Activity,
  CheckCircle,
  ArrowRight,
  Star,
  BarChart3,
  Lightbulb
} from "lucide-react";
import Navigation from "@/components/navigation";

interface AIExercisePrescriptionProps {
  onNavigate?: (page: string) => void;
}

export default function AIExercisePrescription({ onNavigate }: AIExercisePrescriptionProps) {
  const aiFeatures = [
    {
      icon: Brain,
      title: "딥러닝 분석",
      description: "체력 데이터를 AI가 심층 분석하여 개인별 최적 운동 도출",
      color: "purple"
    },
    {
      icon: Target,
      title: "맞춤형 처방",
      description: "나이, 체력 수준, 개선 목표에 따른 개인별 운동 프로그램",
      color: "blue"
    },
    {
      icon: TrendingUp,
      title: "진도 추적",
      description: "운동 효과를 실시간 모니터링하고 프로그램 자동 조정",
      color: "green"
    },
    {
      icon: Award,
      title: "과학적 근거",
      description: "스포츠 과학 연구 기반의 검증된 운동 처방 알고리즘",
      color: "orange"
    }
  ];

  const exerciseCategories = [
    {
      icon: Zap,
      title: "파워 강화",
      description: "순발력과 폭발적 힘을 기르는 운동",
      exercises: ["점프 스쿼트", "버피", "플라이오메트릭 운동", "스프린트"],
      targetAreas: ["하체 근력", "순발력", "심폐지구력"],
      difficulty: "중급",
      duration: "15-20분"
    },
    {
      icon: Dumbbell,
      title: "근력 증진",
      description: "전신 근력을 균형 있게 발달시키는 운동",
      exercises: ["푸시업", "플랭크", "스쿼트", "런지"],
      targetAreas: ["전신 근력", "코어 안정성", "근지구력"],
      difficulty: "초급",
      duration: "20-25분"
    },
    {
      icon: Heart,
      title: "심폐 지구력",
      description: "유산소 능력과 지구력을 향상시키는 운동",
      exercises: ["조깅", "자전거", "줄넘기", "계단 오르기"],
      targetAreas: ["심폐기능", "지구력", "체지방 감소"],
      difficulty: "초급",
      duration: "25-30분"
    },
    {
      icon: Activity,
      title: "균형감각",
      description: "신체 균형과 협응력을 기르는 운동",
      exercises: ["한 발 서기", "밸런스 보드", "보수볼", "짐볼"],
      targetAreas: ["균형감각", "협응력", "유연성"],
      difficulty: "초급",
      duration: "10-15분"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "체력 측정 데이터 수집",
      description: "와트바이크를 통한 정밀한 체력 측정으로 개인의 현재 상태를 파악합니다.",
      icon: BarChart3
    },
    {
      step: 2,
      title: "AI 분석 및 평가",
      description: "OpenAI 기반 알고리즘이 체력 데이터를 분석하여 강점과 개선점을 도출합니다.",
      icon: Brain
    },
    {
      step: 3,
      title: "맞춤 운동 처방",
      description: "개인별 체력 수준과 목표에 맞는 최적의 운동 프로그램을 생성합니다.",
      icon: Target
    },
    {
      step: 4,
      title: "지속적 모니터링",
      description: "운동 효과를 추적하고 필요에 따라 프로그램을 자동으로 조정합니다.",
      icon: TrendingUp
    }
  ];

  const benefits = [
    "개인 맞춤형 운동으로 효과 극대화",
    "과학적 근거 기반의 안전한 운동 처방",
    "지속적인 진도 관리로 동기 부여",
    "전문가 수준의 운동 가이드 제공",
    "체력 향상 결과의 객관적 측정",
    "부상 위험 최소화된 운동 프로그램"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation onNavigate={onNavigate} />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                <Brain className="w-10 h-10 text-purple-600" />
              </div>
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI 기반 운동 처방
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              첨단 AI 기술로 개인의 체력 데이터를 분석하여 가장 효과적인 맞춤형 운동 프로그램을 제공합니다. 
              과학적 근거를 바탕으로 안전하고 효율적인 체력 향상을 도와드립니다.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                OpenAI 기반 분석
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                개인 맞춤형
              </Badge>
              <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                과학적 근거
              </Badge>
            </div>
          </div>

          {/* AI Features */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">AI 운동 처방 핵심 기능</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                const colorClasses = {
                  purple: "bg-purple-100 text-purple-600 border-purple-200",
                  blue: "bg-blue-100 text-blue-600 border-blue-200",
                  green: "bg-green-100 text-green-600 border-green-200",
                  orange: "bg-orange-100 text-orange-600 border-orange-200"
                };
                
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Process Steps */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">AI 운동 처방 과정</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{step.step}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full">
                        <ArrowRight className="w-6 h-6 text-gray-300 mx-auto" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Exercise Categories */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">운동 카테고리</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {exerciseCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{category.title}</h3>
                          <p className="text-gray-600 text-sm font-normal">{category.description}</p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">추천 운동</h4>
                          <div className="flex flex-wrap gap-2">
                            {category.exercises.map((exercise, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {exercise}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">목표 영역</h4>
                          <div className="flex flex-wrap gap-2">
                            {category.targetAreas.map((area, i) => (
                              <Badge key={i} className="bg-blue-100 text-blue-800 text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                              <Clock className="w-4 h-4 inline mr-1" />
                              {category.duration}
                            </span>
                            <Badge variant={category.difficulty === "초급" ? "secondary" : "default"} className="text-xs">
                              {category.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-center mb-8">AI 운동 처방의 장점</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
              <CardContent className="p-12">
                <div className="flex items-center justify-center mb-6">
                  <Lightbulb className="w-16 h-16" />
                </div>
                <h2 className="text-3xl font-bold mb-4">지금 바로 AI 운동 처방 받아보세요!</h2>
                <p className="text-xl mb-8 opacity-90">
                  5분 체력 측정으로 나만의 맞춤형 운동 프로그램을 받아보세요
                </p>
                <div className="flex justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-purple-600 hover:bg-gray-100"
                    onClick={() => onNavigate && onNavigate('home')}
                  >
                    체력 측정 시작하기
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}