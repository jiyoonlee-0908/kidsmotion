import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Target, Building2, BarChart3, Zap, MessageCircleQuestion } from "lucide-react";
import Navigation from "@/components/navigation";
import CommonFooter from "@/components/common-footer";

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
            부모의 걱정을 데이터로 바꾸는 팀입니다
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            아이가 바르게 자라는지 알고 싶은 부모의 마음,<br/>
            <span className="text-purple-600 font-semibold">우리가 5분 만에 답해드릴게요</span>
          </p>
        </div>

        {/* Founder Letter */}
        <Card className="mb-16 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-700 mb-4">💝 창업자 편지</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-8 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-xl font-bold mb-6 text-gray-800">"엄마로서의 걱정이, 창업으로 이어졌습니다."</h3>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>아이를 자전거에 태웠을 때였습니다.<br/>
                자꾸 허리가 한쪽으로 기울고, 자세가 불안정해 보였습니다.<br/>
                제가 척추측만증이 있다 보니 더 민감하게 느꼈는지도 모르겠습니다.<br/>
                하지만 분명 어딘가 불편해 보였고, 걱정이 되었습니다.</p>

                <p>병원에 갔습니다.<br/>
                "아이들은 원래 그래요. 괜찮아요."<br/>
                "MRI까지 찍을 필요는 없고, 엑스레이로도 잘 안 나와요."<br/>
                그렇게 말하더군요.</p>

                <p className="font-medium text-purple-700">그 순간 알았습니다.<br/>
                "괜찮다"는 말은 근거가 없으면 안심이 되지 않는다는 걸요.<br/>
                정확히 어디가, 얼마나, 어떤 이유로 괜찮은지 설명해주는 수치는 없었습니다.</p>

                <p>그게 바로 창업의 출발점이었습니다.<br/>
                '감'이 아니라 '데이터'로 아이의 몸을 이해해야 한다는 확신.<br/>
                "정확하게 알고, 정확하게 도와줄 수 있어야 한다"는 다짐.</p>

                <div className="bg-purple-50 p-4 rounded-lg my-6">
                  <p>저는 남편의 사이클 아카데미에서 어시스트 업무를 맡고 있습니다.<br/>
                  남편은 24년간 국가대표 선수로 활동했고, 저는 그 곁에서 어시스트하며<br/>
                  10년 넘게 수많은 사이클 선수를 희망하는 아이들과 부모들을 가까이에서 지켜봤습니다.</p>
                </div>

                <p>특히, 선수반에 등록하려는 아이들을 볼 때마다 한계를 느꼈습니다.<br/>
                어떤 아이는 분명 부족해 보이는데,<br/>
                "운동시켜도 될까요?"라는 부모님의 질문에 정확히 말해줄 데이터가 없었습니다.</p>

                <p>"상위 1%가 아니면 운동으로 성공하기 어렵습니다."<br/>
                그렇게 설명해도, 객관적인 수치가 없다 보니<br/>
                부모는 결국 마음으로 판단하고, 아이는 부담을 안고 훈련에 들어갑니다.</p>

                <p className="font-medium text-red-600">이건 결국, 아이의 가능성에도, 부모의 시간과 비용에도 좋지 않은 선택이었습니다.</p>

                <p className="font-bold text-green-700">그래서 저는 만들었습니다.<br/>
                운동 자질을 데이터로 확인할 수 있는 장비.<br/>
                운동을 해야 할 아이, 하지 말아야 할 아이를 정확히 구분해주는 시스템.</p>

                <p>이건 처음엔 제 아이를 위해 만든 것이었습니다.<br/>
                하지만 지금은, 같은 고민을 가진 수많은 부모와 아카데미, 병원, 학교 모두에게<br/>
                절실히 필요한 장비라고 확신합니다.</p>

                <div className="bg-blue-50 p-4 rounded-lg my-6">
                  <p className="font-medium">눈으로 확인할 수 있는 성장 데이터.<br/>
                  부모가 납득할 수 있는 해석 리포트.<br/>
                  아이에게 꼭 맞는 훈련 방향.</p>
                </div>

                <p className="text-lg font-bold text-purple-700">이제는 '괜찮을 거예요'가 아니라<br/>
                "지금 어떤 상태고, 앞으로 무엇을 해야 할지"를 말할 수 있어야 할 때입니다.</p>

                <p className="text-right font-medium text-gray-600 mt-6">– 모션바이크 대표</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 문제 정의 */}
        <Card className="mb-16 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-red-700 mb-4">📋 우리가 해결하려는 문제</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">부모들의 고민</h3>
                <div className="space-y-4">
                  <div className="bg-white p-3 rounded-lg border-l-4 border-red-500">
                    <p className="text-gray-700 mb-2">"아이 좌우가 심하게 틀어진 것 같은데... 혹시 성장에 문제가 생기는 건 아니겠지?"</p>
                    <div className="bg-green-50 p-2 rounded text-sm text-green-700">
                      → 좌우 밸런스 정확한 수치로 측정 및 개선방안 제시
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border-l-4 border-red-500">
                    <p className="text-gray-700 mb-2">"아이 운동시키고 싶은데 이 정도면 운동시켜도 될까? 상위 1%도 살아남지 못하는데..."</p>
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
                    <p className="text-gray-700 mb-2">"아이 운동발달이 늦는 것 같아서 병원에 갔는데 '괜찮다'고만 하고... 정말 괜찮은 건지 불안해!"</p>
                    <div className="bg-green-50 p-2 rounded text-sm text-green-700">
                      → 조기 개입 가능: 5등급, 하위 4% 바로 확인하여 즉시 대응
                    </div>
                  </div>

                  {/* 오른쪽과 대칭 맞추기 위한 여백 */}
                  <div className="h-24"></div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">현재 검진의 한계</h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border-l-4 border-yellow-500">
                    <p className="text-yellow-600 mb-2">영유아검진의 대근육운동발달 항목의 한계</p>
                    <p className="text-gray-700">• "두 손으로 한 발을 잡고, 닭싸움 자세로 세번이상 점프한다" → ①②③④<br/>
                      <span className="text-xs text-gray-500">&nbsp;&nbsp;(54-60개월 검진에서 실시)</span>
                    </p>
                    <p className="text-gray-700">• "아무것도 붙잡지 않고 한발로 3초 이상 서있는다" → ①②③④<br/>
                      <span className="text-xs text-gray-500">&nbsp;&nbsp;(42-48개월 검진에서 실시)</span>
                    </p>
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



        {/* 솔루션 개요 */}
        <Card className="mb-16 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700 mb-4">💡 기술이 아닌 진심으로 만든 해결책</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center bg-white p-6 rounded-lg border border-green-200">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-xl font-bold text-green-700 mb-3">5분 측정</h3>
                <p className="text-gray-600">바쁜 부모도, 예민한 아이도 부담 없이</p>
              </div>
              <div className="text-center bg-white p-6 rounded-lg border border-green-200">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="text-xl font-bold text-green-700 mb-3">정확한 수치</h3>
                <p className="text-gray-600">이제 추측하지 않아도 됩니다</p>
              </div>
              <div className="text-center bg-white p-6 rounded-lg border border-green-200">
                <div className="text-4xl mb-3">🤖</div>
                <h3 className="text-xl font-bold text-green-700 mb-3">AI 분석</h3>
                <p className="text-gray-600">복잡한 숫자를 부모가 이해하는 말로</p>
              </div>
            </div>
            
            {/* 정부 정책 간소화 */}
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-700 mb-3">🏛️ 정부 정책과의 연결점</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 mb-2"><strong>현재 한계:</strong> 아날로그 측정으로 정확성 부족, 국민건강 빅데이터 구축 불가</p>
                </div>
                <div>
                  <p className="text-gray-700"><strong>우리의 기여:</strong> 디지털 체력측정으로 정량적 데이터 제공, 정책 수립 기초자료 구축</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 비즈니스 모델 & 시장 */}
        <Card className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-700 mb-4">🏢 필요한 곳에 닿고 있습니다</CardTitle>
          </CardHeader>
          <CardContent>
            {/* 시장 규모 추가 */}
            <div className="mb-8 bg-white p-6 rounded-lg border border-emerald-200">
              <h3 className="text-xl font-bold text-emerald-800 mb-4">💰 시장 규모</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center bg-emerald-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">249만명</div>
                  <p className="text-gray-600 text-sm">전국 초등학생 수<br/>(2024년 기준)</p>
                </div>
                <div className="text-center bg-red-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">3,302개소</div>
                  <p className="text-gray-600 text-sm">소아·청소년과<br/>전문 진료기관</p>
                </div>
                <div className="text-center bg-blue-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2만4천개+</div>
                  <p className="text-gray-600 text-sm">아동 스포츠 학원<br/>(축구·태권도·수영 등)</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              
              {/* 의료기관 */}
              <div className="bg-white p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold mb-4 text-red-700">🏥 소아과/병원</h3>
                <div className="space-y-3">
                  <div className="bg-red-50 p-3 rounded">
                    <h4 className="font-semibold text-red-800">핵심 가치</h4>
                    <p className="text-sm text-red-700">"영유아검진 프리미엄 서비스"</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <h4 className="font-semibold text-red-800">차별화 포인트</h4>
                    <p className="text-sm text-red-700">• 다른 병원과 차별화<br/>• 환자 만족도 향상<br/>• 재방문율 증가</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <h4 className="font-semibold text-red-800">제공 서비스</h4>
                    <p className="text-sm text-red-700">체력 현황 의료진 리포트<br/>성장 발달 추적 서비스</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-100 rounded">
                  <p className="text-sm font-medium text-green-800">부모 심리: "의사가 정확한 수치로 설명해주니 신뢰할 수 있다"</p>
                </div>
              </div>

              {/* 스포츠 학원 */}
              <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-bold mb-4 text-blue-700">🏃‍♂️ 스포츠학원</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded">
                    <h4 className="font-semibold text-blue-800">핵심 가치</h4>
                    <p className="text-sm text-blue-700">"우리 학원 효과 수치로 증명"</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <h4 className="font-semibold text-blue-800">차별화 포인트</h4>
                    <p className="text-sm text-blue-700">• 학생 실력 향상 데이터 제공<br/>• 학부모 만족도 증가<br/>• 타 학원 대비 경쟁력 확보</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <h4 className="font-semibold text-blue-800">제공 서비스</h4>
                    <p className="text-sm text-blue-700">월 5만원으로 무제한 측정<br/>성장 리포트 자동 생성</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-100 rounded">
                  <p className="text-sm font-medium text-green-800">부모 심리: "우리 아이 부족한 부분을 정확히 알고 운동시켜준다"</p>
                </div>
              </div>

              {/* 정부기관 */}
              <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold mb-4 text-purple-700">🏛️ 보건소/공공기관</h3>
                <div className="space-y-3">
                  <div className="bg-purple-50 p-3 rounded">
                    <h4 className="font-semibold text-purple-800">핵심 가치</h4>
                    <p className="text-sm text-purple-700">"지역 아동 건강 빅데이터"</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <h4 className="font-semibold text-purple-800">차별화 포인트</h4>
                    <p className="text-sm text-purple-700">• 정부 정책 데이터 제공<br/>• 지역 건강 통계 구축<br/>• 예산 효율성 증명</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <h4 className="font-semibold text-purple-800">제공 서비스</h4>
                    <p className="text-sm text-purple-700">지역별 아동 체력 통계<br/>정책 수립 기초 자료</p>
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

        {/* 하드웨어 및 기술 */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl">
              🛡️ 신뢰할 수 있는 이유들
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
                <p className="text-sm text-gray-600 text-center bg-gray-50 p-2 rounded">
                  * 보안상 실제 하드웨어 사진은 미팅 시 별도 공개
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
                    <h4 className="font-semibold text-gray-800 mb-2">⚡ 공기 저항 시스템</h4>
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

        {/* MotionBike만의 독점 기술 - 우리의 솔루션과 시장 진입 전략 사이 */}
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
                <h3 className="font-semibold text-lg mb-2">AI 리포트 제공</h3>
                <p className="text-gray-600 mb-3">복잡한 숫자, 지표를 부모가 이해하는<br/>맞춤 해석으로 변환</p>
                <div className="bg-purple-100 p-2 rounded text-sm text-purple-700">
                  기존: 숫자만 제공<br/>
                  → MotionBike: 숫자+맞춤 해석
                </div>
              </div>
              
              <div className="text-center p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="text-4xl mb-4">⚖️</div>
                <h3 className="font-semibold text-lg mb-2">실시간 밸런스 감지</h3>
                <p className="text-gray-600 mb-3">좌우 불균형을 페달링으로<br/>정량 측정</p>
                <div className="bg-blue-100 p-2 rounded text-sm text-blue-700">
                  기존: 설문 평가<br/>
                  → MotionBike: 실시간 센서
                </div>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="font-semibold text-lg mb-2">AI 기반 처방</h3>
                <p className="text-gray-600 mb-3">GPT-4o로 개인별<br/>맞춤 운동 처방</p>
                <div className="bg-green-100 p-2 rounded text-sm text-green-700">
                  기존: 일반적 조언<br/>
                  → MotionBike: 개인 맞춤
                </div>
              </div>
            </div>

            {/* 과학적 근거 추가 */}
            <div className="mt-8 bg-gradient-to-r from-cyan-100 to-blue-100 p-6 rounded-lg border border-cyan-200">
              <h3 className="text-xl font-bold text-cyan-800 mb-4">🔬 측정의 과학적 신뢰성</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-cyan-700 mb-3">⚡ 5분 측정의 정확성</h4>
                  <div className="bg-white p-4 rounded-lg">
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• <strong>5초 순발력:</strong> 순간 최대 파워 측정</li>
                      <li>• <strong>15초 스프린트:</strong> 무산소 능력 평가</li>
                      <li>• <strong>30초 지속력:</strong> 젖산 역치 확인</li>
                      <li>• <strong>60초 근력:</strong> 근육 지구력 측정</li>
                      <li>• <strong>180초 근지구력:</strong> 유산소-무산소 경계</li>
                      <li>• <strong>360초 심폐지구력:</strong> 유산소 능력 평가</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-700 mb-3">🎯 센서 기반 정밀 측정</h4>
                  <div className="bg-white p-4 rounded-lg">
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• <strong>프레임 내 센서:</strong> 실시간 좌우밸런스 및 체력측정</li>
                      <li>• <strong>외부 심박센서:</strong> 운동 강도 정밀 분석</li>
                    </ul>
                  </div>
                  
                  {/* 스포츠과학 검증을 여기로 이동 */}
                  <div className="mt-4 bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-cyan-700 mb-2">🏆 스포츠과학 검증</h4>
                    <p className="text-gray-700 text-sm">
                      사이클링은 국제적으로 인정받는 체력 측정 방법입니다. 
                      <strong>와트(W) 단위의 파워 측정</strong>은 스포츠과학에서 가장 정확한 운동 능력 평가 지표로 사용되며, 
                      올림픽 선수들도 동일한 방식으로 체력을 측정합니다.
                    </p>
                  </div>
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
                    <li>• 연령별 체력 기준 데이터베이스화</li>
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

        {/* 실증과 성장 계획 */}
        <Card className="mb-16 bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-2xl">
              🚀 우리는 지금, 이 시장을 증명하고 있습니다
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* 파일럿 테스트 */}
            {/* 확정 기관 */}
            <div className="bg-white p-6 rounded-lg border border-green-200 mb-6">
              <h3 className="text-xl font-bold text-green-800 mb-4">2025년 파일럿 테스트 확정 기관</h3>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-800 mb-2">1. IYC 유소년 스포츠센터 (서울 강서구)</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• <strong>2025년 7월부터 장비 도입 예정</strong></li>
                  <li>• 아동 대상 체력 측정 및 리포트 시연 (100명 대상)</li>
                </ul>
              </div>
            </div>

            {/* 검증 계획 요약 */}
            <div className="bg-white p-6 rounded-lg border border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4">검증 계획 요약</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">📋 테스트 규모</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• <strong>총 4개 기관</strong>, 1년간 무상 제공</li>
                    <li>• (1개 기관 확정, 3개 기관 협의중)</li>

                    <li>• <strong>측정 항목:</strong> 순발력, 파워, 좌우 밸런스, 심폐지구력 등 총 6종</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">📊 데이터 확보 목표</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• <strong>예상 측정 대상 아동 수:</strong> 300명</li>
                    <li>• <strong>목표:</strong> 1년 내 한국 유아 전용 체력 기준선 자체 생성</li>
                    <li>• <strong>최종 목적:</strong> 데이터 기반 AI 피드백 알고리즘 개발의 기반 확보</li>
                  </ul>
                </div>
              </div>
            </div>


          </CardContent>
        </Card>



        {/* 학부모 불안감 해소 */}
        <Card className="mb-16 bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
          <CardHeader>
            <CardTitle className="text-2xl">
              📈 기관 도입 시 예상 효과
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* 왼쪽: 걱정들 */}
              <div>
                <h3 className="text-xl font-bold text-orange-800 mb-4">😰 운영상 고민들</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-red-600 mb-2">"월 5만원 구독료가 부담스럽지 않나?"</h4>
                    <p className="text-gray-700 text-sm">학원 아동 1명당 월 15만원 받는데, 키즈모션 도입으로 <strong>'과학적 체력측정' 차별화</strong> 서비스 제공이 가능합니다. 신규 회원 유치 효과로 투자비 회수가 빠릅니다.</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-red-600 mb-2">"학부모들이 정말 관심 가질까?"</h4>
                    <p className="text-gray-700 text-sm">아동 성장에 대한 부모의 관심은 최고조입니다. <strong>"내 아이의 정확한 체력 수준"</strong>을 알고 싶어하는 니즈가 매우 높아 마케팅 포인트로 활용 가능합니다.</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-red-600 mb-2">"장비 운영이 복잡하지 않을까?"</h4>
                    <p className="text-gray-700 text-sm">2m × 1.5m 공간만 있으면 설치 가능하고, 자가충전으로 전력도 불필요합니다. <strong>3시간 교육 후 바로 운영</strong> 가능한 간단한 시스템입니다.</p>
                  </div>
                </div>
              </div>

              {/* 오른쪽: 해결책들 */}
              <div>
                <h3 className="text-xl font-bold text-green-800 mb-4">✅ 실제 운영 효과</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-600 mb-2">🎯 차별화된 경쟁력 확보</h4>
                    <p className="text-gray-700 text-sm"><strong>"과학적 체력 분석 도입 기관"</strong>으로 브랜딩이 가능합니다. 경쟁 학원 대비 프리미엄 서비스 제공으로 회원비 인상도 가능해집니다.</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-600 mb-2">💪 학부모 만족도 극대화</h4>
                    <p className="text-gray-700 text-sm">객관적 데이터 제공으로 학부모 신뢰도가 높아집니다. <strong>"아이가 어떻게 발전하고 있는지"</strong> 구체적으로 보여줄 수 있어 만족도 급상승합니다.</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-600 mb-2">🔬 데이터 기반 운영 가능</h4>
                    <p className="text-gray-700 text-sm">정량적 데이터로 <strong>"이 아이에게는 이런 훈련이 필요합니다"</strong> 맞춤 지도가 가능합니다. 감에 의존하지 않는 과학적 운영으로 전문성을 인정받습니다.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 하단: 핵심 메시지 */}
            <div className="mt-8 bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-center text-blue-800 mb-4">💝 키즈모션이 기관에 드리는 진짜 가치</h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl mb-2">🎯</div>
                  <h4 className="font-semibold text-blue-700">차별화 경쟁력</h4>
                  <p className="text-sm text-gray-600">과학적 측정 도입으로<br/>프리미엄 브랜딩 가능</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">📈</div>
                  <h4 className="font-semibold text-blue-700">회원 만족도 향상</h4>
                  <p className="text-sm text-gray-600">객관적 데이터 제공으로<br/>학부모 신뢰도 증가</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">💰</div>
                  <h4 className="font-semibold text-blue-700">수익성 개선</h4>
                  <p className="text-sm text-gray-600">신규 회원 유치와<br/>기존 회원 유지율 상승</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 투자자 예상 질문 & 답변 */}
        <Card className="mb-16 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl">
              🔥 투자자가 묻기 전에 미리 답하는 FAQ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              
              {/* 시장 관련 질문 */}
              <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-lg font-bold text-blue-700 mb-3">💰 시장 관련</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">Q: "249만 학생? 실제 고객은 몇 명인가요?"</p>
                    <p className="text-gray-700 text-sm">A: B2B/B2G 모델이므로 개별 부모가 아닌 기관이 고객입니다. 3천302개 소아청소년과 + 2만4천개 스포츠학원이 잠재 고객이며, 1천개 기관만 확보해도 연 6억원 달성 가능합니다.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">Q: "글로벌 시장에서 몇 % 점유할 건가요?"</p>
                    <p className="text-gray-700 text-sm">A: 한국 시장 독점 후 아시아 확장 전략입니다. 일본/중국도 저출산+아동건강 관심 급증 중이며, 한국 시장 안정화 후 단계적 해외 진출을 계획하고 있습니다.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">Q: "기관에서 월 5만원 구독료가 부담스럽지 않나요?"</p>
                    <p className="text-gray-700 text-sm">A: 업체 관점에서 월 5만원은 매우 합리적입니다. 스포츠학원의 경우 아동 1명당 월 15만원 정도 받는데, 키즈모션 도입으로 '과학적 체력측정' 차별화 서비스 제공이 가능하여 신규 회원 유치와 기존 회원 만족도 향상으로 투자비 회수가 빠릅니다.</p>
                  </div>
                </div>
              </div>

              {/* 기술 관련 질문 */}
              <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-lg font-bold text-purple-700 mb-3">🤖 기술 관련</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">Q: "GPT API 쓰는 게 독점 기술인가요?"</p>
                    <p className="text-gray-700 text-sm">A: AI는 도구일 뿐, 핵심은 아동 맞춤 데이터베이스입니다. 연령별/성별 체력 기준값은 수년간 축적된 독점 자산이며, 좌우 밸런스 실시간 측정은 하드웨어 특허 기술입니다.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">Q: "자전거만 측정? 다양한 운동은 언제 하나요?"</p>
                    <div className="text-gray-700 text-sm">
                      <p className="mb-2">A: 자전거가 유일하게 모든 조건을 만족합니다.</p>
                      <div className="mb-2">
                        <span className="text-green-600">✅ 좌우밸런스 정량측정</span> | 
                        <span className="text-blue-600"> ✅ 시공간 제약없음</span> | 
                        <span className="text-purple-600"> ✅ 전신체력 데이터</span>
                      </div>
                      <p className="text-gray-600">
                        달리기(날씨제약), 악력(부분측정), 수영(시설제약)과 달리 종합적 측정이 가능합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 경쟁 관련 질문 */}
              <div className="bg-white p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-lg font-bold text-red-700 mb-3">💀 경쟁 관련</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">Q: "InBody 같은 기계가 이미 있는데 키즈모션을 왜 도입할까요?"</p>
                    <p className="text-gray-700 text-sm">A: 완전히 다른 영역입니다. InBody는 체성분(근육량, 체지방률), 우리는 운동능력(순발력, 지구력, 밸런스)을 측정합니다. 목표는 InBody처럼 의료기관 필수 장비가 되는 것입니다.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">Q: "550만원 장비 투자수익률은 어떻게 되나요?"</p>
                    <p className="text-gray-700 text-sm">A: 직접 수익보다는 브랜딩 효과가 핵심입니다. '최신 아동 체력 측정 도입 병원'으로 차별화되며, 영유아검진 질 향상으로 환자 만족도와 재방문율이 증가합니다.</p>
                  </div>
                </div>
              </div>

              {/* 비즈니스 모델 질문 */}
              <div className="bg-white p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-lg font-bold text-green-700 mb-3">📊 비즈니스 모델</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">Q: "B2B만? B2C 시장은 포기하는 건가요?"</p>
                    <p className="text-gray-700 text-sm">A: B2B가 더 안정적이고 큰 시장입니다. 공공기관(보건소 261개, 스포츠센터 수백 개)은 정부 예산으로 안정적이며, 의료기관은 지속적 수익을 보장합니다.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">Q: "5년차 500억 근거가 있나요?"</p>
                    <p className="text-gray-700 text-sm">A: 2025년 파일럿 테스트(사이클아카데미에서 100명 데이터 검증)를 바탕으로 한 보수적 계산입니다. 스포츠학원 1,000개(연 6억) + 하드웨어 1,000대(55억) + 공공기관 500개(연 3억) = 연 64억. 실제 검증된 수요를 기반으로 한 현실적 목표입니다.</p>
                  </div>
                </div>
              </div>

              {/* 실행력 질문 */}
              <div className="bg-white p-6 rounded-lg border-l-4 border-yellow-500">
                <h3 className="text-lg font-bold text-yellow-700 mb-3">⏰ 실행력</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">Q: "현재 개발 상황은 어떻게 되나요?"</p>
                    <div className="text-gray-700 text-sm">
                      <p className="mb-2">A: 웹 MVP와 하드웨어 프로토타입이 모두 완성되었습니다.</p>
                      <p className="text-gray-600 text-xs mb-2">(보안상 이유로 하드웨어 사진은 미팅 시 별도 공개)</p>
                      <p className="text-gray-700">단계별 진출 계획: 2027년 스포츠학원 시작 → 2028년 의료기기 신청 → 2029년 의료기관 진출</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">Q: "특허 출원만? 등록은 언제인가요?"</p>
                    <p className="text-gray-700 text-sm">A: 출원 즉시 18개월 우선권을 확보했습니다. 핵심은 시장 선점과 데이터 축적 속도이며, 특허보다 네트워크 효과가 더 강한 진입장벽입니다.</p>
                  </div>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* 투자 요청 */}
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">💎 지금이 골든타임! 투자 기회</CardTitle>
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
                    <h4 className="font-semibold">2027년: 스포츠학원 진입</h4>
                    <p className="text-sm">파일럿 검증 완료 후 100개 학원 × 월 5만원 = 연 6억 매출<br/>
                    <span className="text-xs opacity-90">+ 하드웨어 판매 100대 × 550만원 = 5.5억</span></p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">2028년: 의료기기 신청</h4>
                    <p className="text-sm">임상시험 진행, 하드웨어 판매 확대</p>
                  </div>

                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">2029년: 의료기관 진출</h4>
                    <p className="text-sm">병원 + 보건소 진입으로 본격적 확산</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI 계산서 구체화 */}
            <div className="mt-8 bg-white/10 p-6 rounded-lg border border-white/20">
              <h3 className="text-xl font-bold mb-4">📊 구체적 ROI 계산서</h3>
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* 스포츠학원 ROI */}
                <div className="bg-white/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">🏃‍♂️ 스포츠학원 ROI (월 5만원)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>월 구독료:</span>
                      <span className="font-semibold">-5만원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>회원 증가 효과:</span>
                      <span className="font-semibold">월 10명 추가</span>
                    </div>
                    <div className="flex justify-between">
                      <span>추가 수업료 수익:</span>
                      <span className="font-semibold">+50만원</span>
                    </div>
                    <div className="border-t border-white/30 pt-2 flex justify-between font-bold">
                      <span>순수익:</span>
                      <span className="text-green-300">월 45만원</span>
                    </div>
                    <p className="text-xs text-white/80 mt-2">
                      "체력 측정으로 우리 학원 효과 증명 → 학부모 만족도 ↑ → 신규 회원 유치"
                    </p>
                  </div>
                </div>

                {/* 병원 ROI */}
                <div className="bg-white/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">🏥 병원 ROI (월 5만원)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>월 구독료:</span>
                      <span className="font-semibold">-5만원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>차별화 검진료:</span>
                      <span className="font-semibold">+30만원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>재방문 환자 증가:</span>
                      <span className="font-semibold">+20만원</span>
                    </div>
                    <div className="border-t border-white/30 pt-2 flex justify-between font-bold">
                      <span>순수익:</span>
                      <span className="text-green-300">월 45만원</span>
                    </div>
                    <p className="text-xs text-white/80 mt-2">
                      "최신 장비 도입병원 → 브랜딩 효과 → 환자 만족도 ↑ → 재방문율 증가"
                    </p>
                  </div>
                </div>
              </div>

              {/* 하드웨어 ROI */}
              <div className="mt-6 bg-white/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">💰 하드웨어 투자 회수 계산 (스포츠학원 기준)</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-300">550만원</div>
                    <p>초기 하드웨어 비용</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-300">12개월</div>
                    <p>투자 회수 기간<br/>(월 45만원 순수익 기준)</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-300">540만원</div>
                    <p>2년차 순수익<br/>(연 540만원)</p>
                  </div>
                </div>
                
                <div className="mt-4 bg-green-600/20 p-3 rounded-lg border border-green-500/30">
                  <p className="text-center text-sm">
                    <strong>결론:</strong> 1년 투자 회수 후 매년 540만원 순수익 → 
                    <span className="text-green-300 font-bold">5년간 2,700만원 수익</span>
                  </p>
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
                <p>📍 서울시 강서구 금낭화로 234, GX2</p>
                <p className="text-sm opacity-75 mt-4">지하철 5호선 방화역 4번 출구</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
      <CommonFooter onNavigate={onNavigate} />
    </div>
  );
}