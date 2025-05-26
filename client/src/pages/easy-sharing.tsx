import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Share2,
  QrCode,
  Smartphone,
  Link,
  Mail,
  MessageSquare,
  Download,
  Copy,
  Zap,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Camera,
  Globe,
  Heart,
  Shield,
  Lightbulb,
  Send
} from "lucide-react";
import Navigation from "@/components/navigation";

interface EasySharingProps {
  onNavigate?: (page: string) => void;
}

export default function EasySharing({ onNavigate }: EasySharingProps) {
  const sharingMethods = [
    {
      icon: QrCode,
      title: "QR 코드 스캔",
      description: "QR 코드 하나로 누구든지 쉽게 결과 확인",
      color: "blue",
      features: ["즉시 생성", "스마트폰 스캔", "링크 자동 연결", "보안 암호화"]
    },
    {
      icon: Link,
      title: "공유 링크",
      description: "간단한 링크로 어디서든 결과 공유",
      color: "green",
      features: ["짧은 URL", "모바일 최적화", "접근 제어", "유효기간 설정"]
    },
    {
      icon: Mail,
      title: "이메일 전송",
      description: "지정된 이메일로 결과 자동 발송",
      color: "purple",
      features: ["자동 발송", "첨부파일", "읽음 확인", "재전송 가능"]
    },
    {
      icon: MessageSquare,
      title: "메신저 공유",
      description: "카카오톡, 라인 등으로 바로 공유",
      color: "orange",
      features: ["원클릭 공유", "미리보기", "그룹 전송", "즐겨찾기"]
    }
  ];

  const sharingFeatures = [
    {
      icon: Zap,
      title: "즉시 공유",
      description: "측정 완료 후 바로 공유 가능한 빠른 시스템",
      benefit: "대기시간 없이 즉시 결과 확인"
    },
    {
      icon: Shield,
      title: "안전한 공유",
      description: "개인정보 보호를 위한 보안 링크 생성",
      benefit: "승인된 사용자만 접근 가능"
    },
    {
      icon: Smartphone,
      title: "모바일 최적화",
      description: "스마트폰에서 보기 편한 반응형 디자인",
      benefit: "언제 어디서나 편리한 확인"
    },
    {
      icon: Users,
      title: "가족 공유",
      description: "가족 구성원 모두가 쉽게 확인할 수 있는 시스템",
      benefit: "함께 성장 과정 관리"
    }
  ];

  const shareTargets = [
    {
      title: "부모님과 공유",
      description: "자녀의 체력 향상 과정을 함께 확인",
      icon: Heart,
      scenarios: [
        "측정 결과 즉시 확인",
        "운동 처방 함께 검토",
        "성장 과정 모니터링",
        "격려와 응원 메시지"
      ]
    },
    {
      title: "선생님과 공유",
      description: "학교 체육 활동과 연계한 관리",
      icon: Users,
      scenarios: [
        "체육 수업 참고 자료",
        "개별 지도 계획 수립",
        "학급 평균과 비교",
        "학부모 상담 자료"
      ]
    },
    {
      title: "친구들과 공유",
      description: "또래와 함께하는 건강한 경쟁",
      icon: Star,
      scenarios: [
        "체력 수준 비교",
        "함께 운동 계획",
        "성취 축하하기",
        "동기 부여 효과"
      ]
    }
  ];

  const sharingProcess = [
    {
      step: 1,
      title: "측정 완료",
      description: "체력 측정 및 분석 완료 후 공유 버튼 클릭",
      icon: CheckCircle
    },
    {
      step: 2,
      title: "공유 방식 선택",
      description: "QR코드, 링크, 이메일 등 원하는 방식 선택",
      icon: Share2
    },
    {
      step: 3,
      title: "즉시 공유",
      description: "선택한 방식으로 바로 공유 완료",
      icon: Send
    },
    {
      step: 4,
      title: "확인 완료",
      description: "공유받은 사람이 언제든지 결과 확인",
      icon: Globe
    }
  ];

  const benefits = [
    "복잡한 절차 없이 원클릭으로 간편 공유",
    "다양한 공유 방식으로 상황에 맞는 선택",
    "모바일 최적화로 언제 어디서나 확인",
    "보안 링크로 안전한 개인정보 보호",
    "가족 모두가 함께 성장 과정 관리",
    "실시간 공유로 즉시 피드백 가능"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation onNavigate={onNavigate} />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-purple-100 rounded-full flex items-center justify-center">
                <Share2 className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                간편한 결과 공유
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              체력 측정 결과를 가족, 선생님, 친구들과 쉽고 빠르게 공유하세요. 
              다양한 공유 방식으로 누구나 편리하게 결과를 확인할 수 있습니다.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                원클릭 공유
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                안전한 보안
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">
                <Smartphone className="w-4 h-4 mr-2" />
                모바일 최적화
              </Badge>
            </div>
          </div>

          {/* Sharing Methods */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">공유 방식</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sharingMethods.map((method, index) => {
                const IconComponent = method.icon;
                const colorClasses = {
                  blue: "bg-blue-100 text-blue-600 border-blue-200",
                  green: "bg-green-100 text-green-600 border-green-200",
                  purple: "bg-purple-100 text-purple-600 border-purple-200",
                  orange: "bg-orange-100 text-orange-600 border-orange-200"
                };
                
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${colorClasses[method.color as keyof typeof colorClasses]}`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <CardTitle className="text-lg">{method.title}</CardTitle>
                      <p className="text-gray-600 text-sm">{method.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {method.features.map((feature, i) => (
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

          {/* Sharing Process */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">공유 과정</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sharingProcess.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="text-center relative">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-purple-600 rounded-full mx-auto flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{step.step}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                    {index < sharingProcess.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full z-10">
                        <ArrowRight className="w-6 h-6 text-gray-300 mx-auto" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Sharing Features */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">핵심 기능</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sharingFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                          <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">{feature.benefit}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Share Targets */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">누구와 공유할까요?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {shareTargets.map((target, index) => {
                const IconComponent = target.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{target.title}</h3>
                          <p className="text-gray-600 text-sm font-normal">{target.description}</p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {target.scenarios.map((scenario, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                            {scenario}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Live Demo Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">공유 예시</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <QrCode className="w-5 h-5 text-blue-600" />
                    <span>QR 코드 공유</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      QR 코드를 스캔하면 바로 결과 페이지로 이동합니다
                    </p>
                    <div className="flex space-x-2 justify-center">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        다운로드
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="w-4 h-4 mr-1" />
                        복사
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Link className="w-5 h-5 text-green-600" />
                    <span>링크 공유</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">공유 링크</p>
                      <p className="text-xs text-blue-600 break-all">
                        https://kidsmotion.app/share/abc123
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-blue-50 rounded text-center">
                        <Clock className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                        <p className="text-xs text-blue-800">7일간 유효</p>
                      </div>
                      <div className="p-2 bg-green-50 rounded text-center">
                        <Shield className="w-4 h-4 mx-auto mb-1 text-green-600" />
                        <p className="text-xs text-green-800">암호화 보안</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full">
                      <Share2 className="w-4 h-4 mr-1" />
                      링크 공유하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-green-50 to-purple-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-center mb-8">간편한 결과 공유의 장점</h2>
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
            <Card className="bg-gradient-to-r from-green-600 to-purple-600 text-white border-0">
              <CardContent className="p-12">
                <div className="flex items-center justify-center mb-6">
                  <Lightbulb className="w-16 h-16" />
                </div>
                <h2 className="text-3xl font-bold mb-4">지금 바로 결과를 공유해보세요!</h2>
                <p className="text-xl mb-8 opacity-90">
                  체력 측정 후 가족, 친구들과 성과를 나누고 함께 성장하세요
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-green-600 hover:bg-gray-100"
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
                    공유 방법 문의
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