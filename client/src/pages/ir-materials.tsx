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
            <CardTitle className="text-2xl text-red-700 mb-4">🚨 부모의 고민 VS 현실: 정확한 측정의 부재</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">부모들의 고민</h3>
                <div className="space-y-4">
                  <div className="bg-white p-3 rounded-lg border-l-4 border-red-500">
                    <p className="text-gray-700 mb-2">"우리 아이 좌우가 심하게 틀어진 것 같은데... 혹시 성장에 문제가 생기는 건 아니겠지?"</p>
                    <div className="bg-green-50 p-2 rounded text-sm text-green-700">
                      → 좌우 밸런스 정확한 수치로 측정 및 개선방안 제시
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border-l-4 border-red-500">
                    <p className="text-gray-700 mb-2">"우리 아이 운동시키고 싶은데 이 정도면 운동시켜도 될까? 상위 1%도 살아남지 못하는데..."</p>
                    <div className="bg-green-50 p-2 rounded text-sm text-green-700">
                      → 1등급 달성 시 상위 1% 재능 확인, 운동 투자 가치 명확 판단
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border-l-4 border-red-500">
                    <p className="text-gray-700 mb-2">"다른 아이들보다 체력이 많이 떨어지는 것 같은데... 정확히 얼마나 뒤처지는 거지?"</p>
                    <div className="bg-green-50 p-2 rounded text-sm text-green-700">
                      → 1~5등급 체제와 백분위 퍼센트 제공으로 우리 아이의 정확한 위치 확인
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border-l-4 border-red-500">
                    <p className="text-gray-700 mb-2">"우리 아이 운동발달이 늦는 것 같아서 병원에 갔는데 '괜찮다'고만 하고... 정말 괜찮은 건지 불안해!"</p>
                    <div className="bg-green-50 p-2 rounded text-sm text-green-700">
                      → 조기 개입 가능: 5등급, 하위 4% 바로 확인하여 즉시 대응
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">현재 검진의 한계</h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border-l-4 border-yellow-500">
                    <p className="text-yellow-600 mb-2">영유아검진의 대근육운동발달 항목의 한계</p>
                    <p className="text-gray-700">• "두 손으로 한 발을 잡고, 닭싸움 자세로 세번이상 점프한다" → ①②③④</p>
                    <p className="text-gray-700">• "아무것도 붙잡지 않고 한발로 3초 이상 서있는다" → ①②③④</p>
                    <p className="text-gray-700">• "①②③④의 기준이 뭔가요?" → 주관적 판단, 일관성 없음</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border-l-4 border-red-500">
                    <p className="text-red-600 mb-2">초등체력장의 한계</p>
                    <p className="text-gray-700">• 아날로그식 측정으로 정확도 한계</p>
                    <p className="text-gray-700">• 날씨, 공간에 따른 측정 편차 발생</p>
                    <p className="text-gray-700">• 측정자에 따른 주관적 판단 개입 가능</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border-l-4 border-blue-500">
                    <p className="text-blue-600 mb-2">국가에서 하는 아동대상 체력측정의 한계</p>
                    <p className="text-gray-700">• 악력기로 근력 체크 → 전신근력이 아닌 부분근력만 측정</p>
                    <p className="text-gray-700">• 국가 주관 평가임에도 정량 데이터 제공 안됨</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-gray-400">
                    <p className="text-gray-600 mb-2">종합 결과</p>
                    <p className="text-gray-700">• 정량적 데이터 부재로 조기발견 실패</p>
                    <p className="text-gray-700">• 부모의 불안감 증가 및 적절한 대응 시기 놓침</p>
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
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                    <p className="text-red-600 mb-2">현재 측정 방식 (아날로그)</p>
                    <p className="text-gray-700">• 제자리 멀리뛰기 → 줄자로 측정</p>
                    <p className="text-gray-700">• 윗몸말아올리기 → 사람이 카운트</p>
                    <p className="text-gray-700">• 왕복오래달리기 → 수동 기록</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-gray-400">
                    <p className="text-gray-600 mb-2">결과</p>
                    <p className="text-gray-700">• 정확성 부족, 데이터 축적 어려움</p>
                    <p className="text-gray-700">• 국민건강 빅데이터 구축 불가</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">정부가 원하는 것</h3>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                    <p className="text-green-600 mb-2">디지털 전환 필요성</p>
                    <p className="text-gray-700">• <strong>정량적 데이터</strong> 수집 시스템</p>
                    <p className="text-gray-700">• <strong>국민체력 빅데이터</strong> 구축</p>
                    <p className="text-gray-700">• <strong>객관적 평가</strong>로 정책 수립</p>
                    <p className="text-gray-700">• <strong>비만 예방</strong> 조기 개입</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                    <p className="text-green-600 mb-2">해결책</p>
                    <p className="text-gray-700">• KidsMotion으로 디지털 체력측정 실현</p>
                    <p className="text-gray-700">• 정확한 데이터로 정책 수립 지원</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 💰 시장 규모 및 기회 - 정책 바로 다음 */}
        <Card className="mb-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">
              💰 시장 규모 & 투자 기회
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">📊 국내 시장 현황</h3>
                <div className="space-y-3">
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">2.49M 초등학생</h4>
                    <p className="text-sm opacity-90">연간 체력 측정 의무화 대상</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">1.77M 소아 건강검진</h4>
                    <p className="text-sm opacity-90">연간 소아청소년과 방문</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">3,302개 소아청소년과</h4>
                    <p className="text-sm opacity-90">잠재 고객 의료기관</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">🌍 글로벌 시장 전망</h3>
                <div className="space-y-3">
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">$21.8B → $30.6B</h4>
                    <p className="text-sm opacity-90">2022년 → 2030년 (4.4% CAGR)</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">아동 헬스케어 급성장</h4>
                    <p className="text-sm opacity-90">디지털 헬스 + 예방의학 트렌드</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">국내 시장 1% 점유시</h4>
                    <p className="text-sm opacity-90">연 300억원 매출 가능</p>
                  </div>
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
              🎯 우리의 솔루션: KidsMotion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">아동 맞춤 조절 기능</h3>
                    <div className="space-y-3">
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-purple-800">대상 연령</h4>
                        <p className="text-purple-700">만 4~12세 (유치원~초등학생)</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-purple-800">신장 대응</h4>
                        <p className="text-purple-700">키 100-150cm 가능한 유동성 프레임</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-purple-800">개인별 맞춤</h4>
                        <p className="text-purple-700">안장, 핸들 높이 및 전후 조절</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">측정 및 분석 기능</h3>
                    <div className="space-y-3">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-blue-800">6가지 체력 평가</h4>
                        <p className="text-blue-700">순발력, 스프린트파워, 파워지속력, 근력, 근지구력, 심폐지구력</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-blue-800">좌우 밸런스 측정</h4>
                        <p className="text-blue-700">정확한 수치로 불균형 감지</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-blue-800">성장 단계 추적</h4>
                        <p className="text-blue-700">이전 측정 대비 발달 상황 분석</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full max-w-xs h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🚴‍♂️</div>
                    <div className="text-sm text-gray-600 font-medium">KidsMotion</div>
                    <div className="text-xs text-gray-500">스마트 사이클</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 text-center italic">
                  * 실사 KidsMotion으로 대체 예정
                </p>
              </div>
            </div>
            
            {/* 하드웨어 상세 설명 */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-bold mb-6 text-center">스마트 사이클 하드웨어 특징</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🔧 조절 가능한 프레임</h4>
                    <p className="text-gray-700">• 안장 높이/전후 조절로 모든 체형에 맞춤</p>
                    <p className="text-gray-700">• 핸들 높이/각도 조절로 올바른 자세 유지</p>
                    <p className="text-gray-700">• 성장하는 아동에게 지속 사용 가능</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">📱 스마트 디스플레이</h4>
                    <p className="text-gray-700">• 실시간 파워, 속도, 심박수 표시</p>
                    <p className="text-gray-700">• 아동 친화적 인터페이스 설계</p>
                    <p className="text-gray-700">• 측정 진행 상황 시각적 피드백</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">⚡ 에어 저항 시스템</h4>
                    <p className="text-gray-700">• 페달링 강도에 따른 자동 저항 조절</p>
                    <p className="text-gray-700">• 정확한 파워 측정을 위한 정밀 센서</p>
                    <p className="text-gray-700">• 좌우 독립 측정으로 밸런스 분석</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🛡️ 안전 설계</h4>
                    <p className="text-gray-700">• 아동용 안전 페달 및 스트랩</p>
                    <p className="text-gray-700">• 넘어짐 방지 안정적인 베이스</p>
                    <p className="text-gray-700">• 응급 정지 버튼 및 안전 가이드</p>
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
                    <p className="text-sm text-blue-700">우리 아이 실력 정확히 파악</p>
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
            <div className="mt-8 grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg text-center border-2 border-green-200">
                <h4 className="text-lg font-bold text-green-700 mb-2">하드웨어 판매</h4>
                <div className="text-3xl font-bold text-green-600 mb-2">550만원</div>
                <p className="text-sm text-gray-600">장비당 일시 수익</p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center border-2 border-blue-200">
                <h4 className="text-lg font-bold text-blue-700 mb-2">소프트웨어 구독</h4>
                <div className="text-3xl font-bold text-blue-600 mb-2">월 5만원</div>
                <p className="text-sm text-gray-600">AI 분석 • 누적데이터 통계 • 백분위 업데이트 • 분석리포트</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MotionBike만의 독점 기술 - 우리의 솔루션 바로 다음 */}
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
                <div className="text-4xl mb-4">📋</div>
                <h3 className="font-semibold text-lg mb-2">AI 리포트 해석</h3>
                <p className="text-gray-600 mb-3">복잡한 숫자를 부모가 이해하는 맞춤 해석으로 변환</p>
                <div className="bg-purple-100 p-2 rounded text-sm text-purple-700">
                  기존: 숫자만 제공 → MotionBike: 맞춤 해석 + 운동처방
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
                    <li>• 체력 평가 알고리즘 새로 정립</li>
                    <li>• 연령별 체력 기준 데이터베이스</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">시장 진입 장벽</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• 2종의료기기 인증 목표</li>
                    <li>• 의료기관 인증 및 승인 과정</li>
                    <li>• B2B 영업 네트워크 구축</li>
                    <li>• 사용자 데이터 누적 필요</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 💰 시장 규모 및 기회 - 우선순위 1 */}
        <Card className="mb-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">
              💰 시장 규모 & 투자 기회
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">📊 국내 시장 현황</h3>
                <div className="space-y-3">
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">2.49M 초등학생</h4>
                    <p className="text-sm opacity-90">연간 체력 측정 의무화 대상</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">1.77M 소아 건강검진</h4>
                    <p className="text-sm opacity-90">연간 소아청소년과 방문</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">3,302개 소아청소년과</h4>
                    <p className="text-sm opacity-90">잠재 고객 의료기관</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">🌍 글로벌 시장 전망</h3>
                <div className="space-y-3">
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">$21.8B → $30.6B</h4>
                    <p className="text-sm opacity-90">2022년 → 2030년 (4.4% CAGR)</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">아동 헬스케어 급성장</h4>
                    <p className="text-sm opacity-90">디지털 헬스 + 예방의학 트렌드</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">국내 시장 1% 점유시</h4>
                    <p className="text-sm opacity-90">연 300억원 매출 가능</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 해외 시장 기회 */}
            <div className="mt-8 bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-lg border border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-4">🌍 글로벌 시장 기회</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center bg-white p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$218억</div>
                  <p className="text-gray-600 mb-2">글로벌 아동 스포츠 장비 시장 (2022년)</p>
                  <div className="bg-blue-50 p-2 rounded">
                    <p className="text-xs text-blue-700">약 29조 원 규모</p>
                  </div>
                </div>
                <div className="text-center bg-white p-4 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">$306억</div>
                  <p className="text-gray-600 mb-2">2030년 전망 시장 규모</p>
                  <div className="bg-green-50 p-2 rounded">
                    <p className="text-xs text-green-700">약 41조 원 (CAGR 4.4%)</p>
                  </div>
                </div>
                <div className="text-center bg-white p-4 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">5.5%</div>
                  <p className="text-gray-600 mb-2">피트니스 장비 부문 연평균 성장률</p>
                  <div className="bg-purple-50 p-2 rounded">
                    <p className="text-xs text-purple-700">가장 빠른 성장세</p>
                  </div>
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
                    <li>• B2B/B2G 시장 진입 용이성</li>
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
                <div className="text-4xl mb-4">📋</div>
                <h3 className="font-semibold text-lg mb-2">AI 리포트 해석</h3>
                <p className="text-gray-600 mb-3">복잡한 숫자를 부모가 이해하는 맞춤 해석으로 변환</p>
                <div className="bg-purple-100 p-2 rounded text-sm text-purple-700">
                  기존: 숫자만 제공 → MotionBike: 맞춤 해석 + 운동처방
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
                    <li>• 체력 평가 알고리즘 새로 정립</li>
                    <li>• 연령별 체력 기준 데이터베이스</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">시장 진입 장벽</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• 2종의료기기 인증 목표</li>
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
                    <h4 className="font-semibold">2년차: 2종의료기기 인증</h4>
                    <p className="text-sm">인증 취득을 목표로 신뢰도 확보</p>
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