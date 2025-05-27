import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  CheckCircle, 
  AlertCircle, 
  Target, 
  Clock, 
  Users, 
  BarChart3,
  Heart,
  Zap,
  Scale,
  Activity
} from "lucide-react";
import Navigation from "@/components/navigation";

interface UserGuideProps {
  onNavigate?: (page: string) => void;
}

export default function UserGuide({ onNavigate }: UserGuideProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation onNavigate={onNavigate} />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                사용자 가이드
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              키즈모션 체력측정의 모든 과정을 단계별로 안내해드립니다
            </p>
          </div>

          {/* Quick Start Guide */}
          <Card className="mb-12 border-purple-100">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <Play className="w-7 h-7 text-purple-600" />
                <span>빠른 시작 가이드</span>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">5분 완성</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-purple-600">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">정보 입력</h3>
                  <p className="text-sm text-gray-600">아이의 기본 정보를 입력해주세요</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">체력측정</h3>
                  <p className="text-sm text-gray-600">와트바이크로 5분간 측정합니다</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-teal-600">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">AI 분석</h3>
                  <p className="text-sm text-gray-600">즉시 결과와 분석이 완료됩니다</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">4</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">운동처방</h3>
                  <p className="text-sm text-gray-600">맞춤 운동 추천을 받으세요</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Steps */}
          <div className="space-y-8">
            {/* Step 1 */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <span>기본 정보 입력</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">필수 정보</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>학생 이름</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>생년월일</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>성별</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>신장 및 체중</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">선택 정보</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span>소속 기관</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span>운동 경험</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span>특이사항</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <span>체력 측정 과정</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>기본 4항목 5분 소요, 선택 2항목은 추가 시간 소요될 수 있음</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <span className="text-gray-700">✓ 순발력 (5초)</span>
                      <Badge className="bg-blue-100 text-blue-700">필수</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <span className="text-gray-700">✓ 스프린트 파워 (15초)</span>
                      <Badge className="bg-blue-100 text-blue-700">필수</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <span className="text-gray-700">✓ 파워 지속력 (30초)</span>
                      <Badge className="bg-blue-100 text-blue-700">필수</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <span className="text-gray-700">✓ 근력 (60초)</span>
                      <Badge className="bg-blue-100 text-blue-700">필수</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border border-dashed">
                      <span className="text-gray-700">✓ 근지구력 (180초)</span>
                      <Badge variant="outline" className="border-orange-300 text-orange-600">선택</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border border-dashed">
                      <span className="text-gray-700">✓ 심폐지구력 (300초)</span>
                      <Badge variant="outline" className="border-orange-300 text-orange-600">선택</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">측정 항목</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <Scale className="w-4 h-4 text-green-500" />
                        <span>좌우 밸런스</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span>순발력</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-blue-500" />
                        <span>스프린트 파워</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-purple-500" />
                        <span>파워 지속력</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-red-500" />
                        <span>근력</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-orange-500" />
                        <span>근지구력 (선택)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-pink-500" />
                        <span>심폐지구력 (선택)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">주의사항</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <span>측정 전 충분한 휴식</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <span>편안한 운동복 착용</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <span>무리하지 않기</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-teal-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <span>결과 분석 이해하기</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">등급 체계</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <span className="font-medium text-green-800">매우우수</span>
                        <span className="text-sm text-green-600">상위 4%</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                        <span className="font-medium text-blue-800">우수</span>
                        <span className="text-sm text-blue-600">상위 20%</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                        <span className="font-medium text-yellow-800">보통</span>
                        <span className="text-sm text-yellow-600">상위 50%</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                        <span className="font-medium text-orange-800">낮음</span>
                        <span className="text-sm text-orange-600">하위 20%</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                        <span className="font-medium text-red-800">매우낮음</span>
                        <span className="text-sm text-red-600">하위 4%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">분석 지표</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-purple-500" />
                        <span>또래 대비 백분위</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-purple-500" />
                        <span>체력 요소별 점수</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-purple-500" />
                        <span>강점과 약점 분석</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-purple-500" />
                        <span>AI 맞춤 코멘트</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <span>운동 처방 활용법</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">전문 운동 처방 리포트</h4>
                  <p className="text-green-700 mb-4">
                    AI가 학생의 체력 수준과 약점을 분석하여 기관별 맞춤 운동 프로그램과 지도 가이드를 제공합니다.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Target className="w-6 h-6 text-green-600" />
                      </div>
                      <h5 className="font-medium text-green-800">개별 맞춤</h5>
                      <p className="text-sm text-green-600">학생별 운동 처방</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-green-600" />
                      </div>
                      <h5 className="font-medium text-green-800">과학적 분석</h5>
                      <p className="text-sm text-green-600">데이터 기반 처방</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <h5 className="font-medium text-green-800">전문 가이드</h5>
                      <p className="text-sm text-green-600">지도자용 매뉴얼</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tips Section */}
          <Card className="mt-12 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-purple-800">
                💡 효과적인 활용을 위한 팁
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-purple-800">측정 전</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 충분한 수면과 휴식</li>
                    <li>• 측정 2시간 전 가벼운 식사</li>
                    <li>• 편안한 운동복과 운동화 착용</li>
                    <li>• 아이에게 측정 과정 미리 설명</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-purple-800">측정 후</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 결과를 아이와 함께 확인</li>
                    <li>• 강점은 칭찬하고 격려</li>
                    <li>• 약점은 개선 목표로 설정</li>
                    <li>• 운동 처방을 꾸준히 실천</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}