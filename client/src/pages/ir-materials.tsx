import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Target, Building2, BarChart3, Zap } from "lucide-react";
import Navigation from "@/components/navigation";

interface IRMaterialsProps {
  onNavigate?: (page: string) => void;
}

export default function IRMaterials({ onNavigate }: IRMaterialsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Navigation onNavigate={onNavigate} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 헤더 */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
            Investor Relations
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            MotionBike 투자 제안서
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            부모의 최대 관심사인 '아이 성장'과 정부의 '국민건강' 정책을 연결하는<br/>
            <span className="text-purple-600 font-semibold">아동 운동발달 정량화 혁신 기업</span>
          </p>
        </div>

        {/* 시장 기회 - 부모 니즈 */}
        <Card className="mb-16 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-2xl text-red-700 mb-4">🚨 부모들이 가장 걱정하는 것: 우리 아이 성장</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">부모들의 고민</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                    <p className="text-gray-700 mb-2">"우리 아이 좌우가 심하게 틀어진 것 같은데... 혹시 성장에 문제가 생기는 건 아니겠지?"</p>
                    <div className="bg-green-50 p-2 rounded text-sm text-green-700">
                      → 좌우 밸런스 정확한 수치로 측정 및 개선방안 제시
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                    <p className="text-gray-700 mb-2">"우리 아이 운동시키고 싶은데 이 정도면 운동시켜도 될까? 상위 1%도 살아남지 못하는데..."</p>
                    <div className="bg-green-50 p-2 rounded text-sm text-green-700">
                      → 1등급 달성 시 상위 1% 재능 확인, 운동 투자 가치 명확 판단
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                    <p className="text-gray-700 mb-2">"다른 아이들보다 체력이 많이 떨어지는 것 같은데... 정확히 얼마나 뒤처지는 거지?"</p>
                    <div className="bg-green-50 p-2 rounded text-sm text-green-700">
                      → 1~5등급 체제와 백분위 퍼센트 제공으로 우리 아이의 정확한 위치 확인
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                    <p className="text-gray-700 mb-2">"병원에 가봐도 '괜찮다'고만 하고 정확한 수치는 알려주지 않아서 불안해!"</p>
                    <div className="bg-green-50 p-2 rounded text-sm text-green-700">
                      → 5분 측정으로 6가지 체력 지표 정량 데이터 제공
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">현재 검진의 한계</h3>
                <div className="space-y-5">
                  <div className="bg-white p-5 rounded-lg border-l-4 border-yellow-500">
                    <p className="text-sm text-yellow-600 mb-2">영유아검진의 대근육운동발달 항목의 한계</p>
                    <p className="text-gray-700 mb-1">• "두 손으로 한 발을 잡고, 닭싸움 자세로 세번이상 점프한다" → ①②③④</p>
                    <p className="text-gray-700 mb-1">• "아무것도 붙잡지 않고 한발로 3초 이상 서있는다" → ①②③④</p>
                    <p className="text-gray-700">• "①②③④의 기준이 뭔가요?" → 주관적 판단, 일관성 없음</p>
                  </div>
                  <div className="bg-white p-5 rounded-lg border-l-4 border-red-500">
                    <p className="text-sm text-red-600 mb-2">초등체력장의 한계</p>
                    <p className="text-gray-700 mb-1">• 아날로그식 측정으로 정확도 한계</p>
                    <p className="text-gray-700 mb-1">• 날씨, 공간에 따른 측정 편차 발생</p>
                    <p className="text-gray-700 mb-1">• 숫자 세는 사람의 실수로 부정확한 결과</p>
                    <p className="text-gray-700">• 측정자에 따른 주관적 판단 개입</p>
                  </div>
                  <div className="bg-white p-5 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm text-blue-600 mb-2">국민체육진흥공단 국민체력100의 한계</p>
                    <p className="text-gray-700 mb-1">• 악력기로 근력 체크 → 전신근력이 아닌 부분근력만 측정</p>
                    <p className="text-gray-700">• 국가 주관 평가임에도 정량 데이터 제공 안됨</p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-400">
                    <p className="text-sm text-gray-600 mb-2">종합 결과</p>
                    <p className="text-gray-700 mb-1">• 정량적 데이터 부재로 조기발견 실패</p>
                    <p className="text-gray-700 mb-1">• 부모의 불안감 증가 및 적절한 대응 시기 놓침</p>
                    <p className="text-gray-700">• 개인별 맞춤 개선 방안 제시 불가</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 정부 정책 기회 */}
        <Card className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-700 mb-4">🏛️ 정부 정책: 국민건강 데이터화 추진</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">국민체력100의 한계</h3>
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="font-semibold mb-3 text-blue-600">현재 측정 방식 (아날로그)</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 제자리 멀리뛰기 → 줄자로 측정</li>
                    <li>• 윗몸말아올리기 → 사람이 카운트</li>
                    <li>• 왕복오래달리기 → 수동 기록</li>
                  </ul>
                  <p className="text-red-600 mt-3 font-medium">→ 정확성 부족, 데이터 축적 어려움</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">정부가 원하는 것</h3>
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="font-semibold mb-3 text-green-600">디지털 전환 필요성</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>정량적 데이터</strong> 수집 시스템</li>
                    <li>• <strong>국민체력 빅데이터</strong> 구축</li>
                    <li>• <strong>객관적 평가</strong>로 정책 수립</li>
                    <li>• <strong>비만 예방</strong> 조기 개입</li>
                  </ul>
                  <p className="text-green-600 mt-3 font-medium">→ MotionBike가 해결책!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 하드웨어 혁신 */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Zap className="w-6 h-6 mr-3 text-purple-600" />
              MotionBike 하드웨어 혁신
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">아동 맞춤 조절 기능</h3>
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800">안장 높이</h4>
                    <p className="text-purple-700">35-65cm 조절 (신장 100-150cm 대응)</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800">안장 전후</h4>
                    <p className="text-purple-700">0-5cm 조절 (다리 길이 맞춤)</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800">핸들 높이</h4>
                    <p className="text-purple-700">25-45cm 조절 (상체 비율 맞춤)</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800">핸들 전후</h4>
                    <p className="text-purple-700">25-40cm 조절 (팔 길이 맞춤)</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">정밀 센서 기술</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800">좌우 밸런스 측정</h4>
                    <p className="text-blue-700">페달링 시 좌우 불균형 실시간 감지</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800">파워 측정</h4>
                    <p className="text-blue-700">W/kg^0.67 공식으로 체중 보정된 상대파워</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800">지구력 분석</h4>
                    <p className="text-blue-700">5초/15초/30초/60초/180초/360초 구간별</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800">협응력 평가</h4>
                    <p className="text-blue-700">체간 안정성, 신경 조절력 수치화</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 시장 진입 전략 */}
        <Card className="mb-16 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700 mb-4">💰 B2B/B2G 시장 진입 전략</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* 의료기관 */}
              <div className="bg-white p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold mb-4 text-red-700">🏥 의료기관</h3>
                <div className="space-y-3">
                  <div className="bg-red-50 p-3 rounded">
                    <h4 className="font-semibold text-red-800">소아청소년과</h4>
                    <p className="text-sm text-red-700">성장클리닉 진료용</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <h4 className="font-semibold text-red-800">재활의학과</h4>
                    <p className="text-sm text-red-700">운동발달 진단용</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <h4 className="font-semibold text-red-800">발달센터</h4>
                    <p className="text-sm text-red-700">조기 개입 치료용</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-100 rounded">
                  <p className="text-sm font-medium text-green-800">부모 심리: "의사가 정확한 수치로 설명해주니 신뢰할 수 있다"</p>
                </div>
              </div>

              {/* 스포츠 학원 */}
              <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-bold mb-4 text-blue-700">⚽ 스포츠 학원</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded">
                    <h4 className="font-semibold text-blue-800">축구교실</h4>
                    <p className="text-sm text-blue-700">개인별 체력 맞춤 훈련</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <h4 className="font-semibold text-blue-800">태권도장</h4>
                    <p className="text-sm text-blue-700">좌우 밸런스 교정</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <h4 className="font-semibold text-blue-800">키즈 피트니스</h4>
                    <p className="text-sm text-blue-700">과학적 운동 처방</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-100 rounded">
                  <p className="text-sm font-medium text-green-800">부모 심리: "우리 아이 부족한 부분을 정확히 알고 운동시켜준다"</p>
                </div>
              </div>

              {/* 정부기관 */}
              <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold mb-4 text-purple-700">🏛️ 정부기관</h3>
                <div className="space-y-3">
                  <div className="bg-purple-50 p-3 rounded">
                    <h4 className="font-semibold text-purple-800">보건소</h4>
                    <p className="text-sm text-purple-700">영유아검진 정량화</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <h4 className="font-semibold text-purple-800">초등학교</h4>
                    <p className="text-sm text-purple-700">체력장 디지털화</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <h4 className="font-semibold text-purple-800">국민체력센터</h4>
                    <p className="text-sm text-purple-700">국민체력100 고도화</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-100 rounded">
                  <p className="text-sm font-medium text-green-800">정부 니즈: "국민체력 빅데이터로 정책 근거 마련"</p>
                </div>
              </div>
            </div>

            {/* 수익 구조 */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg text-center border-2 border-green-200">
                <h4 className="text-lg font-bold text-green-700 mb-2">하드웨어 판매</h4>
                <div className="text-2xl font-bold text-green-600 mb-2">2,500만원</div>
                <p className="text-sm text-gray-600">장비당 일시 수익</p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center border-2 border-blue-200">
                <h4 className="text-lg font-bold text-blue-700 mb-2">소프트웨어 구독</h4>
                <div className="text-2xl font-bold text-blue-600 mb-2">월 50만원</div>
                <p className="text-sm text-gray-600">AI 분석 및 업데이트</p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center border-2 border-purple-200">
                <h4 className="text-lg font-bold text-purple-700 mb-2">데이터 서비스</h4>
                <div className="text-2xl font-bold text-purple-600 mb-2">월 30만원</div>
                <p className="text-sm text-gray-600">빅데이터 분석 리포트</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MotionBike 혁신 솔루션 */}
        <Card className="mb-16 bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-2xl text-yellow-700 mb-4">🎯 MotionBike 혁신: 설문 → 정량 데이터</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-red-600">기존 방식의 문제</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-700 mb-2">영유아검진 설문</h4>
                    <p className="text-gray-700 mb-2">"자전거 탈 수 있나요?"</p>
                    <p className="text-red-600 text-sm">→ 부모 주관적 판단, 부정확</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-700 mb-2">운동발달 평가</h4>
                    <p className="text-gray-700 mb-2">"한발로 3초간 설 수 있는가?"</p>
                    <p className="text-red-600 text-sm">→ 예/아니오, 정량화 불가</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-700 mb-2">조기발견 실패</h4>
                    <p className="text-gray-700 mb-2">골든타임 놓침</p>
                    <p className="text-red-600 text-sm">→ 초등학교 입학 후에야 발견</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600">MotionBike 해결책</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 mb-2">실제 페달링 분석</h4>
                    <p className="text-gray-700 mb-2">좌우 밸런스 85% vs 15%</p>
                    <p className="text-green-600 text-sm">→ 정확한 수치로 불균형 감지</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 mb-2">체간 안정성 측정</h4>
                    <p className="text-gray-700 mb-2">좌우 흔들림 각도 ±3.2°</p>
                    <p className="text-green-600 text-sm">→ 협응력 수치화</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 mb-2">운동 재능 정량 평가</h4>
                    <p className="text-gray-700 mb-2">백분위 95% = 상위 5% 재능 확인</p>
                    <p className="text-green-600 text-sm">→ "우리 아이 운동시켜도 될까?" 명확한 답변</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 mb-2">조기 개입 가능</h4>
                    <p className="text-gray-700 mb-2">백분위 20% 이하 자동 알림</p>
                    <p className="text-green-600 text-sm">→ 즉시 전문가 연계</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 시장 규모 및 기회 */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <TrendingUp className="w-6 h-6 mr-3 text-green-600" />
              시장 규모 및 투자 기회
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">520만명</div>
                <p className="text-gray-600 mb-4">국내 초등학생 인구</p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700">연간 영유아검진 대상자만 70만명</p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">15,000개</div>
                <p className="text-gray-600 mb-4">전국 소아청소년과</p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">성장클리닉 운영 증가 추세</p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">3,500개</div>
                <p className="text-gray-600 mb-4">전국 보건소</p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-700">국민체력100 확산 정책</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-orange-800 mb-4">💡 투자 포인트</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">시장 성장 동력</h4>
                  <ul className="space-y-1 text-orange-700">
                    <li>• 저출산으로 한 자녀당 투자 증가</li>
                    <li>• 부모들의 성장 관련 민감도 증가</li>
                    <li>• 정부의 국민건강 데이터화 정책</li>
                    <li>• 디지털 헬스케어 확산</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">선점 효과</h4>
                  <ul className="space-y-1 text-orange-700">
                    <li>• 아동 운동발달 정량화 최초 시스템</li>
                    <li>• B2B/B2G 시장 진입 장벽 구축</li>
                    <li>• 데이터 누적으로 AI 성능 향상</li>
                    <li>• 의료기관 표준화 가능성</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 경쟁우위 */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Zap className="w-6 h-6 mr-3 text-yellow-600" />
              MotionBike만의 독점 기술
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="font-semibold text-lg mb-2">W/kg^0.67 공식</h3>
                <p className="text-gray-600 mb-3">체중 보정된 상대파워로 정확한 체력 평가</p>
                <div className="bg-purple-100 p-2 rounded text-sm text-purple-700">
                  기존: 절대파워(부정확) → MotionBike: 상대파워(정확)
                </div>
              </div>
              
              <div className="text-center p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="text-4xl mb-4">⚖️</div>
                <h3 className="font-semibold text-lg mb-2">실시간 밸런스 감지</h3>
                <p className="text-gray-600 mb-3">좌우 불균형을 페달링으로 정량 측정</p>
                <div className="bg-blue-100 p-2 rounded text-sm text-blue-700">
                  기존: 설문 평가 → MotionBike: 실시간 센서
                </div>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="font-semibold text-lg mb-2">AI 기반 처방</h3>
                <p className="text-gray-600 mb-3">GPT-4o로 개인별 맞춤 운동 처방</p>
                <div className="bg-green-100 p-2 rounded text-sm text-green-700">
                  기존: 일반적 조언 → MotionBike: 개인 맞춤
                </div>
              </div>
            </div>

            <div className="mt-8 bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-red-700 mb-3">🛡️ 경쟁사 진입 장벽</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">기술적 장벽</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• 아동 맞춤 하드웨어 설계 노하우</li>
                    <li>• 정밀 센서 캘리브레이션 기술</li>
                    <li>• 연령별 체력 기준 데이터베이스</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">시장 진입 장벽</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• 의료기관 인증 및 승인 과정</li>
                    <li>• B2B 영업 네트워크 구축</li>
                    <li>• 사용자 데이터 누적 필요</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 투자 요청 */}
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">🚀 투자 제안</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">왜 지금 투자해야 하는가?</h3>
                <div className="space-y-3">
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">1. 시장 타이밍</h4>
                    <p className="text-sm">디지털 헬스케어 급성장, 정부 정책 지원</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">2. 독점 기술</h4>
                    <p className="text-sm">아동 운동발달 정량화 최초 솔루션</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">3. 확장성</h4>
                    <p className="text-sm">B2B → B2G → 해외진출 단계적 성장</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">투자 수익 전망</h3>
                <div className="space-y-3">
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">1년차: 의료기관 진입</h4>
                    <p className="text-sm">100개 병원 × 2,500만원 = 25억 매출</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">3년차: B2G 확산</h4>
                    <p className="text-sm">보건소 + 학교 진입으로 100억 매출</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">5년차: 시장 표준화</h4>
                    <p className="text-sm">구독 수익 중심 500억 매출 달성</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold mb-4">부모의 걱정을 데이터로 해결하는 기업</h3>
              <p className="text-lg mb-6 opacity-90">
                "우리 아이 성장이 걱정이에요" → "정확한 수치로 알려드릴게요"
              </p>
              <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-bold">
                💼 투자 상담 신청
              </Button>
              <div className="mt-6 space-y-2">
                <p className="text-lg font-semibold">📞 010-8445-0908</p>
                <p>📧 투자제안서 요청 가능</p>
                <p>📍 서울시 강서구 금낭화로 234, GX2</p>
                <p className="text-sm opacity-75 mt-4">지하철 5호선 방화역 4번 출구</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}