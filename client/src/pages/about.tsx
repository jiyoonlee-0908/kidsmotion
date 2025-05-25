import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Star, Bike, Phone, Mail, MapPin } from "lucide-react";
import Navigation from "@/components/navigation";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="mb-8">
              <span className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full text-base font-bold shadow-lg">
                혁신적인 아동 체력측정 솔루션
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 leading-none tracking-tight">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                키즈모션
              </span>
            </h1>
            
            <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 leading-relaxed">
              아이의 숨겨진 체력을 <span className="text-purple-600">과학적으로</span> 발견하세요
            </div>
            
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-50 to-purple-50 rounded-3xl p-10 shadow-2xl border border-gray-100">
              <p className="text-2xl text-gray-700 font-semibold mb-6">
                "5분 측정으로 우리 아이만의 맞춤 운동처방을 받아보세요"
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">⚡</div>
                  <div className="font-bold text-gray-800 mb-2">정확한 측정</div>
                  <div className="text-sm text-gray-600">의료급 센서로 측정</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">🤖</div>
                  <div className="font-bold text-gray-800 mb-2">AI 분석</div>
                  <div className="text-sm text-gray-600">개인별 맞춤 처방</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">📈</div>
                  <div className="font-bold text-gray-800 mb-2">성장 추적</div>
                  <div className="text-sm text-gray-600">지속적인 발전 모니터링</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Features */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                왜 <span className="text-purple-600">키즈모션</span>을 선택해야 할까요?
              </h2>
              <p className="text-lg text-gray-600">병원, 체육관, 학교에서 실제로 사용되고 있는 검증된 솔루션</p>
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
                    <strong>5분 만에 아이의 체력을 완벽 분석</strong>합니다. 
                    기존 체력장처럼 날씨나 공간에 제약받지 않고, 언제든지 정확한 측정이 가능해요.
                  </p>
                  <div className="bg-white/60 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">🎯 실제 측정되는 항목들</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• <strong>순발력</strong>: 아이가 순간적으로 낼 수 있는 최대 힘</li>
                      <li>• <strong>지구력</strong>: 얼마나 오래 운동할 수 있는지</li>
                      <li>• <strong>좌우균형</strong>: 왼쪽-오른쪽 다리 힘의 차이</li>
                      <li>• <strong>심박수 패턴</strong>: 운동 중 심장 건강 상태</li>
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
                    측정 후 <strong>바로 받아보는 맞춤형 운동처방서</strong>! 
                    의사나 트레이너가 직접 상담해주는 것처럼 자세하고 실용적인 가이드를 AI가 제공합니다.
                  </p>
                  <div className="bg-white/60 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">📋 실제로 받게 되는 리포트</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• <strong>우리 아이 체력 점수</strong>: 또래 대비 정확한 등급</li>
                      <li>• <strong>강점과 약점</strong>: 어떤 부분을 더 키워야 하는지</li>
                      <li>• <strong>맞춤 운동법</strong>: 집에서 할 수 있는 구체적인 운동</li>
                      <li>• <strong>성장 가이드</strong>: 3개월, 6개월 후 목표 설정</li>
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