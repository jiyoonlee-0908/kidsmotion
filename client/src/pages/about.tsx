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
            <div className="mb-4">
              <span className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
                🎯 국내 최초 어린이 전용 스마트 체력 측정 장비
              </span>
            </div>
            <h1 className="text-6xl font-bold text-gray-800 mb-8">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                키즈모션
              </span>
              <br/>
              <span className="text-3xl text-gray-700 font-medium">
                아이의 체력을 측정하는 첫 번째 디지털 솔루션
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-5xl mx-auto">
              <strong className="text-gray-800">"가장 설득력 있는 아동 체력 분석 솔루션"</strong><br/><br/>
              키즈모션 모션바이크는 운동 중 실시간 데이터를 기반으로 성장과 체력을 분석하는 혁신적인 스마트 사이클입니다.<br/>
              단순히 '작게 만든 자전거'가 아닌, <strong className="text-blue-600">100~150cm 어린이 체형에 맞춘 커스텀 프레임</strong>의 정밀 피트니스 기기로,<br/>
              파워미터·케이던스 내장, 공기저항 기반 플라이휠, 외장 심박계를 통해<br/>
              순발력, 근지구력, 심폐지구력, 좌우 밸런스, 페달링 일관성 등의 동적 운동 데이터를 자동 분석·시각화하여<br/>
              <strong className="text-purple-600">측정으로 끝나지 않고 훈련까지 연결되는 완결형 플랫폼</strong>을 제공합니다.
            </p>
          </div>

          {/* Main Features */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                왜 <span className="text-purple-600">키즈모션</span>인가?
              </h2>
              <p className="text-lg text-gray-600">기존 아날로그 체력측정의 한계를 뛰어넘는 디지털 혁신</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-none shadow-xl transform hover:scale-105 transition-transform duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                      <BarChart className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">실시간 정밀 측정</h3>
                      <span className="text-sm text-purple-600 font-semibold">국내외 최초 동적 운동 데이터 분석</span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    기존 악력기, 정적 측정과 달리 <strong>운동 중 생체 신호를 실시간으로 정량화</strong>합니다. 
                    파워미터·케이던스 내장, 공기저항 기반 플라이휠로 순발력부터 심폐지구력까지 완벽 분석.
                  </p>
                  <div className="bg-white/60 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">🔬 과학적 측정 시스템</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• W/kg^0.67 공식 기반 정확한 상대파워 계산</li>
                      <li>• 좌우 밸런스 & 페달링 일관성 분석</li>
                      <li>• 외장 심박계 연동 심폐기능 평가</li>
                      <li>• 한국 아동 표준 데이터 기반 백분위 산출</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-none shadow-xl transform hover:scale-105 transition-transform duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">완결형 플랫폼</h3>
                      <span className="text-sm text-blue-600 font-semibold">측정 → 분석 → 훈련 피드백</span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    단순 측정이 아닌 <strong>실시간 자세 분석과 훈련 피드백까지 연결</strong>되는 
                    통합 솔루션. AI가 개인별 맞춤 운동 처방과 성장 가이드를 자동 생성합니다.
                  </p>
                  <div className="bg-white/60 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">🤖 AI 기반 맞춤 코칭</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 개인별 강점/약점 즉시 분석</li>
                      <li>• 성장 단계별 맞춤 운동 프로그램</li>
                      <li>• 전문적이면서 이해하기 쉬운 한국어 리포트</li>
                      <li>• 공공보건, 교육, 유소년 스포츠 전 영역 활용</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Features */}
          <div className="space-y-8">
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">측정 시스템의 특징</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-xl font-bold text-purple-600">파워</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">파워 측정</h4>
                    <p className="text-sm text-gray-600">5초, 15초, 30초, 60초 구간별로 파워를 측정하여 체력 요소를 종합 분석합니다.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-xl font-bold text-blue-600">균형</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">좌우 밸런스</h4>
                    <p className="text-sm text-gray-600">좌측과 우측 다리의 파워 균형을 분석하여 신체 밸런스 상태를 확인합니다.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-xl font-bold text-teal-600">AI</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">AI 리포트</h4>
                    <p className="text-sm text-gray-600">측정 결과를 바탕으로 AI가 개인별 맞춤 분석 리포트와 운동 처방을 제공합니다.</p>
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
                      MotionBike는 아동 체력 측정 및 분석 서비스를 개발하는 스타트업으로, 
                      와트바이크를 활용한 체력 측정과 AI 기반 리포트 시스템을 제공합니다.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">설립 예정:</span>
                        <span className="ml-2 text-gray-600">2026년</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">위치:</span>
                        <span className="ml-2 text-gray-600">서울시 강서구</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">서비스:</span>
                        <span className="ml-2 text-gray-600">체력 측정 & AI 리포트</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">단계:</span>
                        <span className="ml-2 text-gray-600">MVP 개발중</span>
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