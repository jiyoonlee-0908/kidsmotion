import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Target, Building2, BarChart3, Zap } from "lucide-react";

export default function IRMaterials() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 헤더 */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
            Investor Relations
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            MotionBike IR 자료
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI 기반 아동 체력 분석 시장을 선도하는 혁신 기업
          </p>
        </div>

        {/* 핵심 지표 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                시장 규모
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">2.3조원</div>
              <p className="text-sm text-gray-600">글로벌 피트니스 테크 시장</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                타겟 시장
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">520만명</div>
              <p className="text-sm text-gray-600">국내 초등학생 인구</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Target className="w-5 h-5 mr-2 text-purple-600" />
                성장률
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600 mb-2">15%</div>
              <p className="text-sm text-gray-600">연평균 시장 성장률</p>
            </CardContent>
          </Card>
        </div>

        {/* 비즈니스 모델 */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Building2 className="w-6 h-6 mr-3 text-purple-600" />
              비즈니스 모델
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">B2B 시장</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">초등학교 체육 수업 도입</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">소아청소년과 건강검진</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">스포츠 클럽 체력 측정</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">수익 구조</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">하드웨어 판매 (일시)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">소프트웨어 라이선스 (구독)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">데이터 분석 서비스</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 경쟁우위 */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Zap className="w-6 h-6 mr-3 text-yellow-600" />
              핵심 경쟁우위
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="font-semibold text-lg mb-2">AI 기반 분석</h3>
                <p className="text-gray-600">OpenAI GPT-4o 활용한 개인별 맞춤 분석</p>
              </div>
              
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-4xl mb-4">⚖️</div>
                <h3 className="font-semibold text-lg mb-2">과학적 정확성</h3>
                <p className="text-gray-600">W/kg^0.67 공식 기반 체중 보정</p>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-semibold text-lg mb-2">5분 측정</h3>
                <p className="text-gray-600">신속하고 정확한 종합 체력 평가</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 연락처 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <BarChart3 className="w-6 h-6 mr-3 text-indigo-600" />
              투자 문의
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-6">
                혁신적인 아동 체력 분석 시장의 성장에 함께 하세요
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 text-lg">
                투자 제안서 요청
              </Button>
              <div className="mt-6 text-sm text-gray-600">
                <p>📞 010-8445-0908</p>
                <p>📍 서울시 강서구 금낭화로 234, GX2</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}