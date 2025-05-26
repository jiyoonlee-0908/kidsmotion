import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText,
  Download,
  Share2,
  QrCode,
  BarChart3,
  PieChart,
  TrendingUp,
  Award,
  Target,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Printer,
  Mail,
  Eye,
  Shield,
  Lightbulb,
  FileCheck
} from "lucide-react";
import Navigation from "@/components/navigation";

interface ProfessionalReportProps {
  onNavigate?: (page: string) => void;
}

export default function ProfessionalReport({ onNavigate }: ProfessionalReportProps) {
  const reportFeatures = [
    {
      icon: BarChart3,
      title: "상세 데이터 분석",
      description: "체력 측정 결과를 다각도로 분석한 전문가급 리포트",
      color: "blue"
    },
    {
      icon: TrendingUp,
      title: "시각적 차트",
      description: "이해하기 쉬운 그래프와 차트로 구성된 시각적 분석",
      color: "green"
    },
    {
      icon: Target,
      title: "맞춤형 권장사항",
      description: "개인별 체력 상태에 따른 구체적인 개선 방안 제시",
      color: "purple"
    },
    {
      icon: Award,
      title: "전문가 인증",
      description: "스포츠 과학 기반의 신뢰할 수 있는 전문 분석 리포트",
      color: "orange"
    }
  ];

  const reportSections = [
    {
      title: "개인 정보 및 측정 개요",
      description: "기본 정보, 측정일, 측정 환경 등",
      icon: Users,
      content: ["성명, 나이, 성별", "신장, 체중, BMI", "측정 일시 및 환경", "측정 장비 정보"]
    },
    {
      title: "체력 측정 결과",
      description: "와트바이크 측정을 통한 정확한 체력 데이터",
      icon: BarChart3,
      content: ["절대 파워 (W)", "상대 파워 (W/kg^0.67)", "근력 및 근지구력", "심폐지구력 점수"]
    },
    {
      title: "백분위 및 등급 분석",
      description: "또래 대비 체력 수준 및 5단계 등급 평가",
      icon: PieChart,
      content: ["연령별 백분위", "5등급 체력 평가", "강점 및 약점 분석", "균형감각 평가"]
    },
    {
      title: "AI 기반 종합 분석",
      description: "OpenAI를 활용한 전문가 수준의 종합 평가",
      icon: Star,
      content: ["체력 종합 평가", "개선 우선순위", "맞춤형 운동 처방", "성장 예측 분석"]
    },
    {
      title: "운동 처방 및 권장사항",
      description: "개인 맞춤형 운동 프로그램 및 생활 개선 방안",
      icon: Target,
      content: ["추천 운동 프로그램", "운동 빈도 및 강도", "생활 습관 개선", "재측정 일정 제안"]
    },
    {
      title: "성장 목표 및 관리",
      description: "단계별 목표 설정 및 지속적 관리 방안",
      icon: TrendingUp,
      content: ["단기/장기 목표", "성취 지표 설정", "진도 관리 방법", "부모님 가이드"]
    }
  ];

  const outputFormats = [
    {
      icon: FileText,
      title: "PDF 리포트",
      description: "인쇄 및 보관이 용이한 고품질 PDF 문서",
      features: ["A4 사이즈 최적화", "고해상도 차트", "전문적 디자인", "인쇄 친화적"],
      color: "red"
    },
    {
      icon: QrCode,
      title: "QR 코드 공유",
      description: "간편한 QR 코드를 통한 디지털 공유",
      features: ["즉시 공유 가능", "모바일 최적화", "링크 생성", "접근 제어"],
      color: "blue"
    },
    {
      icon: Mail,
      title: "이메일 전송",
      description: "지정된 이메일로 자동 발송",
      features: ["자동 발송", "첨부파일 포함", "안전한 전송", "수신 확인"],
      color: "green"
    },
    {
      icon: Eye,
      title: "온라인 뷰어",
      description: "웹브라우저에서 바로 확인 가능",
      features: ["즉시 확인", "반응형 디자인", "확대/축소", "북마크 가능"],
      color: "purple"
    }
  ];

  const benefits = [
    "전문가 수준의 체계적인 분석 리포트",
    "학부모님과 학생이 쉽게 이해할 수 있는 구성",
    "과학적 데이터에 기반한 신뢰성 있는 내용",
    "개인 맞춤형 구체적인 개선 방안 제시",
    "다양한 형태로 간편한 공유 및 보관",
    "지속적인 성장 관리를 위한 실용적 가이드"
  ];

  const sampleMetrics = [
    { label: "전체 체력 점수", value: "73점", percentile: "68%" },
    { label: "파워 (상대)", value: "18.5", percentile: "72%" },
    { label: "근력", value: "75점", percentile: "65%" },
    { label: "지구력", value: "82점", percentile: "78%" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation onNavigate={onNavigate} />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <FileText className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                전문 리포트 생성
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              체력 측정 결과를 바탕으로 전문가 수준의 상세한 분석 리포트를 자동 생성합니다. 
              학부모님과 학생 모두가 쉽게 이해할 수 있는 체계적인 구성으로 제공됩니다.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">
                <FileCheck className="w-4 h-4 mr-2" />
                전문가급 분석
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                AI 기반 권장사항
              </Badge>
              <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2">
                <Share2 className="w-4 h-4 mr-2" />
                다양한 공유 방식
              </Badge>
            </div>
          </div>

          {/* Report Features */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">리포트 핵심 기능</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reportFeatures.map((feature, index) => {
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
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Report Sections */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">리포트 구성 항목</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportSections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{section.title}</h3>
                          <p className="text-gray-600 text-sm font-normal">{section.description}</p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {section.content.map((item, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Sample Report Preview */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">리포트 예시</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>체력 측정 결과 요약</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sampleMetrics.map((metric, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{metric.label}</span>
                        <div className="text-right">
                          <div className="font-bold text-blue-600">{metric.value}</div>
                          <div className="text-sm text-gray-600">상위 {metric.percentile}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <Award className="w-4 h-4 inline mr-1" />
                      전반적으로 또래 대비 우수한 체력을 보유하고 있습니다.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <span>맞춤형 권장사항</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-1">강점 영역</h4>
                      <p className="text-sm text-green-700">심폐지구력이 뛰어나며 지속적인 유지가 필요합니다.</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-1">개선 영역</h4>
                      <p className="text-sm text-orange-700">근력 향상을 위한 웨이트 트레이닝을 권장합니다.</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-1">추천 운동</h4>
                      <p className="text-sm text-purple-700">주 3회, 30분씩 복합 근력 운동 실시</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Output Formats */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">리포트 제공 형태</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {outputFormats.map((format, index) => {
                const IconComponent = format.icon;
                const colorClasses = {
                  red: "bg-red-100 text-red-600 border-red-200",
                  blue: "bg-blue-100 text-blue-600 border-blue-200",
                  green: "bg-green-100 text-green-600 border-green-200",
                  purple: "bg-purple-100 text-purple-600 border-purple-200"
                };
                
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${colorClasses[format.color as keyof typeof colorClasses]}`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <CardTitle className="text-lg">{format.title}</CardTitle>
                      <p className="text-gray-600 text-sm">{format.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {format.features.map((feature, i) => (
                          <Badge key={i} variant="outline" className="text-xs mr-1 mb-1">
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
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-center mb-8">전문 리포트의 장점</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <CardContent className="p-12">
                <div className="flex items-center justify-center mb-6">
                  <Lightbulb className="w-16 h-16" />
                </div>
                <h2 className="text-3xl font-bold mb-4">전문가급 리포트를 받아보세요!</h2>
                <p className="text-xl mb-8 opacity-90">
                  체력 측정 후 즉시 생성되는 상세한 분석 리포트로 성장을 확인하세요
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-100"
                    onClick={() => onNavigate && onNavigate('home')}
                  >
                    체력 측정 시작하기
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10"
                    onClick={() => onNavigate && onNavigate('contact')}
                  >
                    샘플 리포트 보기
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