import { TrendingUp, Target, Zap, Users, DollarSign, Globe, Award, BarChart3, ArrowRight, Bike, Shield, Brain, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";

interface IRMaterialsProps {
  onNavigate?: (page: string) => void;
}

export default function IRMaterials({ onNavigate }: IRMaterialsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation onNavigate={onNavigate} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4 mr-2" />
            국내 최초 아동 전용 실시간 체력 분석 플랫폼
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              인바디 이후,
            </span>
            <br />
            가장 설득력 있는 아동 체력 솔루션
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            운동 중 실시간 데이터를 기반으로 성장과 체력을 분석하는 
            <span className="font-semibold text-purple-600"> 세계 최초</span>의 어린이 전용 스마트 사이클
          </p>
        </div>

        {/* Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader>
              <CardTitle className="text-red-700 flex items-center">
                <Target className="w-6 h-6 mr-2" />
                현재 문제점
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700"><span className="font-semibold">정적 측정만 가능:</span> 인바디, 악력기 등은 운동 중 기능적 불균형 측정 불가</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700"><span className="font-semibold">주관적 평가:</span> K-DST 설문 기반으로 정량화된 수치 부재</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700"><span className="font-semibold">아동용 기기 전무:</span> 성인용 축소가 아닌 전용 장비 부재</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700"><span className="font-semibold">일회성 측정:</span> 성장 추이 관리 및 지속적 피드백 불가</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center">
                <Zap className="w-6 h-6 mr-2" />
                KidsMotion 솔루션
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700"><span className="font-semibold">실시간 동적 분석:</span> 운동 중 파워, 밸런스, 심박수 실시간 측정</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700"><span className="font-semibold">정량적 수치화:</span> 6가지 체력요소 백분위 객관화</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700"><span className="font-semibold">아동 전용 설계:</span> 100-150cm 체형 맞춤 커스텀 프레임</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700"><span className="font-semibold">성장 추이 관리:</span> AI 분석 + 지속적 모니터링</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Opportunity */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">시장 기회</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle>58조 원 키즈 시장</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">2025년 국내 키즈 산업 규모, 저출산에도 불구하고 1인당 지출 지속 증가</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <CardTitle>41조 원 글로벌 시장</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">2030년 글로벌 아동 스포츠 장비 시장, 피트니스 부문 연평균 5.5% 성장</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle>블루오션 시장</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">동적 분석 가능한 아동 전용 장비는 전 세계적으로 전무한 상태</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Competitive Advantage */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">핵심 경쟁력</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto">
                  <Bike className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">아동 전용 설계</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">성인용 축소가 아닌 100-150cm 체형 기반 커스텀 프레임</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">실시간 분석</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">운동 중 6가지 체력요소 동시 측정 및 즉시 피드백</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">AI 해석 시스템</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">복잡한 데이터를 부모가 이해하기 쉬운 리포트로 자동 변환</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">성장 추이 관리</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">반복 측정을 통한 지속적 성장 모니터링 및 개선 추적</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Business Model */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">사업 모델</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-blue-700">Phase 1: B2B/B2G</CardTitle>
                <p className="text-sm text-gray-600">초기 시장 진입</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• 보건소, 소아청소년과</li>
                  <li>• 유아체육센터, 스포츠클럽</li>
                  <li>• 지자체 체력센터</li>
                  <li>• 재활 병원</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-green-700">Phase 2: SaaS</CardTitle>
                <p className="text-sm text-gray-600">구독 서비스 확장</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• 월간 성장 리포트</li>
                  <li>• AI 맞춤 운동 가이드</li>
                  <li>• 센터별 관리 대시보드</li>
                  <li>• 데이터 기반 컨설팅</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-purple-700">Phase 3: B2C</CardTitle>
                <p className="text-sm text-gray-600">프리미엄 홈 시장</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• 고소득층 가정용 모델</li>
                  <li>• 홈트레이닝 키트</li>
                  <li>• 성장 콘텐츠 플랫폼</li>
                  <li>• 글로벌 수출 확장</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">핵심 지표</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-700 mb-2">5분</div>
                <p className="text-sm text-gray-600">측정 완료 시간</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-700 mb-2">6가지</div>
                <p className="text-sm text-gray-600">체력요소 동시 분석</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-700 mb-2">100%</div>
                <p className="text-sm text-gray-600">아동 체형 맞춤도</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-orange-50 to-red-100 border-orange-200">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-orange-700 mb-2">세계최초</div>
                <p className="text-sm text-gray-600">아동 전용 스마트 사이클</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Investment Opportunity */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-violet-600 to-purple-600 text-white border-0 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">투자 기회</CardTitle>
              <p className="text-lg opacity-90">아동 헬스케어의 디지털 전환을 선도할 혁신 기술</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-90" />
                  <h3 className="font-semibold mb-2">수익 모델 다각화</h3>
                  <p className="text-sm opacity-80">장비 → SaaS → 콘텐츠 → 글로벌</p>
                </div>
                <div>
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-90" />
                  <h3 className="font-semibold mb-2">확장 가능성</h3>
                  <p className="text-sm opacity-80">공공 → 민간 → 해외 → 플랫폼</p>
                </div>
                <div>
                  <Award className="w-12 h-12 mx-auto mb-3 opacity-90" />
                  <h3 className="font-semibold mb-2">시장 선점 기회</h3>
                  <p className="text-sm opacity-80">기술 공백을 채우는 퍼스트 무버</p>
                </div>
              </div>
              
              <div className="border-t border-white/20 pt-6">
                <p className="text-lg font-medium mb-4">
                  "인바디가 체성분 분석을 정의했듯이,<br />
                  KidsMotion이 아동 체력 분석의 새로운 기준을 만들어갑니다"
                </p>
                <Button 
                  onClick={() => onNavigate?.('contact')}
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold"
                >
                  투자 문의하기 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}