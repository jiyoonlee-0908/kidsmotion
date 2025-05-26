import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp,
  Calendar,
  Target,
  LineChart,
  Award,
  Clock,
  Users,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Star,
  Activity,
  Zap,
  Eye,
  Bell,
  BookOpen,
  Trophy,
  Lightbulb
} from "lucide-react";
import Navigation from "@/components/navigation";

interface GrowthManagementProps {
  onNavigate?: (page: string) => void;
}

export default function GrowthManagement({ onNavigate }: GrowthManagementProps) {
  const trackingFeatures = [
    {
      icon: LineChart,
      title: "체력 변화 추적",
      description: "매회 측정 결과를 비교하여\n체력 향상도를 시각적으로 확인",
      color: "blue"
    },
    {
      icon: Target,
      title: "목표 설정 관리",
      description: "개인별 체력 목표를 설정하고\n달성도를 실시간 모니터링",
      color: "green"
    },
    {
      icon: Calendar,
      title: "주기적 평가",
      description: "정기적인 재측정을 통한\n지속적인 성장 상태 점검",
      color: "purple"
    },
    {
      icon: Bell,
      title: "맞춤 알림",
      description: "운동 시기, 재측정 일정 등\n개인 맞춤 알림 서비스",
      color: "orange"
    }
  ];

  const growthPhases = [
    {
      phase: "초기 측정",
      description: "현재 체력 상태 정확한 파악",
      duration: "1회차",
      activities: ["기초 체력 측정", "현재 상태 분석", "개인 목표 설정"],
      icon: BarChart3,
      status: "completed"
    },
    {
      phase: "성장 기간",
      description: "맞춤 운동을 통한 꾸준한 발전",
      duration: "4-8주",
      activities: ["AI 운동 처방 실행", "일일 활동 기록", "주간 진도 점검"],
      icon: TrendingUp,
      status: "active"
    },
    {
      phase: "중간 평가",
      description: "성장 정도 확인 및 프로그램 조정",
      duration: "2회차",
      activities: ["체력 재측정", "향상도 분석", "목표 재설정"],
      icon: Activity,
      status: "upcoming"
    },
    {
      phase: "지속 관리",
      description: "장기적인 건강 관리 체계 구축",
      duration: "지속적",
      activities: ["정기 측정", "생활 패턴 관리", "장기 목표 달성"],
      icon: Trophy,
      status: "future"
    }
  ];

  const trackingMetrics = [
    {
      category: "체력 지표",
      metrics: [
        { name: "파워 (W/kg^0.67)", current: 18.5, target: 22.0, unit: "" },
        { name: "근력", current: 75, target: 85, unit: "점" },
        { name: "근지구력", current: 68, target: 80, unit: "점" },
        { name: "심폐지구력", current: 82, target: 90, unit: "점" }
      ]
    },
    {
      category: "성장 변화",
      metrics: [
        { name: "전체 체력 점수", current: 73, target: 85, unit: "점" },
        { name: "균형감각", current: "좋음", target: "매우좋음", unit: "" },
        { name: "운동 지속시간", current: 25, target: 35, unit: "분" },
        { name: "운동 빈도", current: 3, target: 4, unit: "회/주" }
      ]
    }
  ];

  const managementTools = [
    {
      icon: Eye,
      title: "실시간 대시보드",
      description: "체력 변화를 한눈에 볼 수 있는 시각적 대시보드",
      features: ["그래프 차트", "진도율 표시", "비교 분석", "트렌드 예측"]
    },
    {
      icon: Bell,
      title: "스마트 알림",
      description: "개인 스케줄에 맞춘 운동 및 측정 알림 시스템\n최적의 운동 타이밍과 재측정 일정을 자동으로 알려드립니다",
      features: ["운동 알림", "측정 일정", "목표 리마인드", "격려 메시지"]
    },
    {
      icon: Award,
      title: "성취 시스템",
      description: "목표 달성과 지속적인 참여를 위한 동기부여 시스템",
      features: ["뱃지 획득", "레벨 시스템", "순위 확인", "성과 인증"]
    }
  ];

  const benefits = [
    "체계적인 성장 과정 관리로 효과 극대화",
    "객관적 데이터 기반의 진도 확인",
    "개인 맞춤형 목표 설정 및 조정",
    "지속적인 동기 부여 시스템",
    "장기적인 건강 습관 형성 지원",
    "가족과 함께하는 성장 과정 공유"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'future': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '완료';
      case 'active': return '진행중';
      case 'upcoming': return '예정';
      case 'future': return '계획';
      default: return '대기';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation onNavigate={onNavigate} />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                지속적 성장 관리
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              체계적인 데이터 추적과 분석을 통해 아이의 성장 과정을 꾸준히 관리하고,<br/>
              지속적인 체력 향상을 위한 맞춤형 가이드를 제공합니다.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2">
                <LineChart className="w-4 h-4 mr-2" />
                데이터 기반 추적
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">
                <Target className="w-4 h-4 mr-2" />
                목표 중심 관리
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                장기간 지원
              </Badge>
            </div>
          </div>

          {/* Tracking Features */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">핵심 추적 기능</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trackingFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                const colorClasses = {
                  blue: "bg-blue-100 text-blue-600 border-blue-200",
                  green: "bg-green-100 text-green-600 border-green-200",
                  purple: "bg-purple-100 text-purple-600 border-purple-200",
                  orange: "bg-orange-100 text-orange-600 border-orange-200"
                };
                
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm whitespace-pre-line">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Growth Phases */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">성장 관리 단계</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-all border-blue-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-blue-800">직전 데이터 vs 현재 데이터</h3>
                  <p className="text-gray-600 text-sm">
                    가장 최근 측정값과 현재 측정값을 직접 비교하여 즉각적인 변화 추이를 파악합니다.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all border-green-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-green-800">직전 평균 데이터 vs 현재 데이터</h3>
                  <p className="text-gray-600 text-sm">
                    이전 측정값들의 평균과 현재 데이터를 비교하여 안정적인 성장 패턴을 분석합니다.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all border-purple-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Activity className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-purple-800">📊 종합적인 비교 분석</h3>
                  <p className="text-gray-600 text-sm">
                    정확한 성장 패턴 분석을 위해 개별 측정값과 평균값을 모두 활용한 종합적인 비교 분석을 제공합니다.
                  </p>
                </CardContent>
              </Card>
            </div>

          </section>

          {/* Growth Comparison Chart */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">성장 지표 예시</h2>
            
            <Card className="max-w-6xl mx-auto hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2 text-xl">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <span>직전 평균치 vs 오늘 검사 결과 비교</span>
                </CardTitle>
                <p className="text-center text-gray-600 text-sm mt-2">
                  이전 측정값들의 평균과 최근 측정 결과를 비교하여 성장 패턴을 확인할 수 있습니다.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* 파워 */}
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3">파워</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">직전 평균</span>
                        <span className="font-medium text-blue-600">17.2</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">오늘 측정</span>
                        <span className="font-bold text-green-600">18.5</span>
                      </div>
                      <div className="pt-2 border-t">
                        <span className="text-xs text-green-600 font-medium">+1.3 향상 ↗</span>
                      </div>
                    </div>
                  </div>

                  {/* 근력 */}
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3">근력</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">직전 평균</span>
                        <span className="font-medium text-blue-600">72점</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">오늘 측정</span>
                        <span className="font-bold text-green-600">75점</span>
                      </div>
                      <div className="pt-2 border-t">
                        <span className="text-xs text-green-600 font-medium">+3점 향상 ↗</span>
                      </div>
                    </div>
                  </div>

                  {/* 근지구력 */}
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3">근지구력</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">직전 평균</span>
                        <span className="font-medium text-blue-600">65점</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">오늘 측정</span>
                        <span className="font-bold text-green-600">68점</span>
                      </div>
                      <div className="pt-2 border-t">
                        <span className="text-xs text-green-600 font-medium">+3점 향상 ↗</span>
                      </div>
                    </div>
                  </div>

                  {/* 심폐지구력 */}
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3">심폐지구력</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">직전 평균</span>
                        <span className="font-medium text-blue-600">79점</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">오늘 측정</span>
                        <span className="font-bold text-green-600">82점</span>
                      </div>
                      <div className="pt-2 border-t">
                        <span className="text-xs text-green-600 font-medium">+3점 향상 ↗</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg text-center">
                  <p className="text-sm text-gray-700">
                    <strong>전체적으로 모든 영역에서 꾸준한 향상</strong>이 확인되었습니다. 
                    지속적인 운동과 관리로 더욱 건강한 성장을 기대할 수 있습니다! 🎉
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Management Tools */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">관리 도구</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {managementTools.map((tool, index) => {
                const IconComponent = tool.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{tool.title}</h3>
                          <p className="text-gray-600 text-sm font-normal">{tool.description}</p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        {tool.features.map((feature, i) => (
                          <Badge key={i} variant="outline" className="justify-center text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-center mb-8">지속적 성장 관리의 장점</h2>
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
            <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
              <CardContent className="p-12">
                <div className="flex items-center justify-center mb-6">
                  <Lightbulb className="w-16 h-16" />
                </div>
                <h2 className="text-3xl font-bold mb-4">체계적인 성장 관리를 시작하세요!</h2>
                <p className="text-xl mb-8 opacity-90">
                  데이터 기반의 과학적 성장 관리로 아이의 잠재력을 극대화하세요
                </p>
                <div className="flex justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-green-600 hover:bg-gray-100"
                    onClick={() => onNavigate && onNavigate('home')}
                  >
                    성장 관리 시작하기
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