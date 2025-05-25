import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Star, Bike, Phone, Mail, MapPin } from "lucide-react";
import Navigation from "@/components/navigation";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                MotionBike 소개
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              아동 체력 분석의 새로운 표준을 제시하는 AI 기반 플랫폼입니다.<br/>
              과학적 근거와 첨단 기술을 바탕으로 우리 아이들의 건강한 성장을 지원합니다.<br/>
              정확한 체력 측정부터 개인맞춤형 운동 처방까지, 전문적이고 체계적인 솔루션을 제공합니다.<br/>
              미래 세대의 건강한 삶을 위한 혁신적인 디지털 헬스케어 서비스를 경험해보세요.
            </p>
          </div>

          {/* Main Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-none shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                    <BarChart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">정밀한 체력 분석</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  와트바이크 기반의 과학적 측정 시스템으로 아이의 체력을 정확하게 분석합니다. 
                  5초, 15초, 30초, 60초 구간별 파워 측정을 통해 순발력, 근력, 근지구력, 심폐지구력을 종합적으로 평가합니다.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• 나이별, 성별 맞춤 기준 적용</li>
                  <li>• W/kg^0.67 공식으로 정확한 상대파워 계산</li>
                  <li>• 좌우 균형 분석으로 신체 밸런스 확인</li>
                  <li>• 한국 아동 표준 데이터 기반 정확한 평가</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-none shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">AI 맞춤 코칭</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  OpenAI 기반 인공지능이 측정 결과를 분석하여 개인별 맞춤 운동 처방과 
                  성장 가이드를 제공합니다. 전문적이면서도 이해하기 쉬운 한국어 코칭을 받아보세요.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• 개인별 강점과 개선점 분석</li>
                  <li>• 맞춤형 운동 프로그램 추천</li>
                  <li>• 성장 단계별 목표 설정 지원</li>
                  <li>• 전문적인 운동 처방 및 가이드라인</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Features */}
          <div className="space-y-8">
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">측정 시스템의 특징</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-purple-600">5s</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">순발력 측정</h4>
                    <p className="text-sm text-gray-600">폭발적인 파워 발휘 능력을 측정하여 순간적인 근력을 평가합니다.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-600">15s</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">근력 측정</h4>
                    <p className="text-sm text-gray-600">근육의 최대 힘을 발휘하는 능력을 평가하여 기초 체력을 확인합니다.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-teal-600">30s</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">근지구력</h4>
                    <p className="text-sm text-gray-600">근육이 지속적으로 힘을 발휘하는 능력을 측정합니다.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">AI 분석의 장점</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">개인맞춤 분석</h4>
                    <p className="text-gray-600 mb-4">
                      각 아동의 나이, 성별, 체격을 고려한 맞춤형 분석으로 정확한 평가를 제공합니다.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 또래 대비 정확한 위치 파악</li>
                      <li>• 개인별 성장 패턴 분석</li>
                      <li>• 강점과 약점 명확히 구분</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">전문적 처방</h4>
                    <p className="text-gray-600 mb-4">
                      운동생리학과 스포츠과학 기반의 전문적인 운동 처방을 AI가 자동으로 생성합니다.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 체력 요소별 맞춤 운동법</li>
                      <li>• 단계별 훈련 프로그램</li>
                      <li>• 안전한 운동 강도 설정</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">회사 소개</h3>
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Bike className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">MotionBike</h4>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      MotionBike는 아동 체력 분석 분야의 선도기업으로, 과학적이고 체계적인 접근을 통해 
                      미래 세대의 건강한 성장을 지원하는 혁신적인 솔루션을 제공합니다.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">설립:</span>
                        <span className="ml-2 text-gray-600">2023년</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">위치:</span>
                        <span className="ml-2 text-gray-600">서울시 강서구</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">특허:</span>
                        <span className="ml-2 text-gray-600">AI 체력분석 기술</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">인증:</span>
                        <span className="ml-2 text-gray-600">의료기기 인증 진행중</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-purple-500 to-blue-500 border-none shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  더 자세한 정보가 필요하신가요?
                </h3>
                <p className="text-purple-100 mb-6">
                  MotionBike 팀이 언제든지 도움을 드릴 준비가 되어있습니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="tel:010-8445-0908"
                    className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    전화 상담: 010-8445-0908
                  </a>
                  <a 
                    href="mailto:info@motionbike.co.kr"
                    className="inline-flex items-center px-6 py-3 bg-white/20 text-white border border-white/30 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    이메일 문의
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}