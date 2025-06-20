import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Target, Building2, BarChart3, Zap, MessageCircleQuestion } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import CommonFooter from "@/components/common-footer";
import ScrollReveal from "@/components/scroll-reveal";

interface IRMaterialsProps {
  onNavigate?: (page: string) => void;
}

export default function IRMaterials({ onNavigate }: IRMaterialsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        
        {/* 헤더 */}
        <ScrollReveal direction="fade" duration={0.8}>
          <div className="text-center mb-16">
            <ScrollReveal direction="up" delay={0.2}>
              <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
                Investor Relations
              </Badge>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.4}>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                부모의 걱정을 데이터로 바꾸는 팀입니다
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.6}>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                아이가 바르게 자라는지 알고 싶은 부모의 마음,<br/>
                <span className="text-purple-600 font-semibold">MotionBike에서 정량 데이터로 답해드릴게요</span>
              </p>
            </ScrollReveal>
          </div>
        </ScrollReveal>

        {/* 영상 섹션 */}
        <ScrollReveal direction="up" delay={0.1}>
          <Card className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700 mb-4">🚴‍♀️ KidsMotion 실제 체험 영상</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video">
                <video 
                  controls 
                  className="w-full h-full object-cover"
                  poster="/api/placeholder/800/450"
                >
                  <source src="/assets/kidsmotion-demo.mp4" type="video/mp4" />
                  영상을 지원하지 않는 브라우저입니다.
                </video>
              </div>
              <p className="text-center text-gray-600 mt-4">
                실제 KidsMotion 장비를 사용하는 모습을 확인해보세요
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Founder Letter */}
        <ScrollReveal direction="up" delay={0.2}>
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

                  <p>혹시나 해서 여러 전문가에게 문의했지만,<br/>
                  "아직 어리니까 더 지켜보세요"<br/>
                  "괜찮을 거예요"<br/>
                  이런 답변만 돌아왔습니다.</p>

                  <p className="font-medium text-blue-600">그런데 저는 정확히 알고 싶었습니다.<br/>
                  "지금 아이가 어떤 상태인지, 앞으로 어떻게 해야 할지"를.</p>

                  <p>그래서 직접 만들기로 했습니다.<br/>
                  아이 체력을 정확히 측정하고, 불균형을 찾아내고,<br/>
                  개선 방법까지 제시해주는 장비를.</p>

                  <p>처음엔 제 아이만을 위한 것이었습니다.<br/>
                  하지만 주변에서 관심을 보이기 시작했고,<br/>
                  저와 같은 고민을 가진 부모들이 너무 많다는 걸 알게 되었습니다.</p>

                  <div className="bg-amber-50 p-4 rounded-lg my-6 border-l-4 border-amber-400">
                    <p className="font-medium text-amber-800">특히 운동 학원에서 일하면서 더 절실함을 느꼈습니다.</p>
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
        </ScrollReveal>

        {/* 문제 정의 */}
        <ScrollReveal direction="up" delay={0.1}>
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
                      <p className="text-gray-700 mb-2">"운동 학원에 보내도 될까? 우리 아이가 잘할 수 있을까?"</p>
                      <div className="bg-green-50 p-2 rounded text-sm text-green-700">
                        → 체력 데이터로 운동 적성 객관적 판단
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border-l-4 border-red-500">
                      <p className="text-gray-700 mb-2">"키가 작은데 성장에 도움이 되는 운동이 뭘까?"</p>
                      <div className="bg-green-50 p-2 rounded text-sm text-green-700">
                        → AI 기반 개인 맞춤 운동 처방
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">기관들의 어려움</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-600 mb-1">🏥 소아과/재활의학과</h4>
                      <p className="text-gray-700 text-sm mb-2">• 체형 불균형 조기 발견 어려움<br/>• 객관적 운동 처방 기준 부족</p>
                      <div className="bg-blue-50 p-2 rounded text-sm text-blue-700">
                        → 정밀 측정으로 조기 진단 및 맞춤 처방
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-600 mb-1">🏫 학교/교육청</h4>
                      <p className="text-gray-700 text-sm mb-2">• 학생 체력 정확한 파악 한계<br/>• 개별 맞춤 지도 어려움</p>
                      <div className="bg-purple-50 p-2 rounded text-sm text-purple-700">
                        → 과학적 데이터 기반 체육 교육
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-600 mb-1">⚽ 스포츠 아카데미</h4>
                      <p className="text-gray-700 text-sm mb-2">• 선수 선발 기준 모호<br/>• 부모 설득 어려움</p>
                      <div className="bg-green-50 p-2 rounded text-sm text-green-700">
                        → 객관적 데이터로 잠재력 평가
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 정부 정책과의 연결점 추가 */}
              <div className="mt-8 bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-lg border border-indigo-200">
                <h3 className="text-xl font-bold text-indigo-800 mb-4">🏛️ 정부 정책과의 부합성</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-indigo-700 mb-2">국정과제와의 연결</h4>
                    <div className="bg-white p-3 rounded-lg">
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• <strong>정량적 데이터</strong> 수집 시스템</li>
                        <li>• <strong>국민체력 빅데이터</strong> 구축</li>
                        <li>• <strong>객관적 평가</strong>로 정책 수립</li>
                        <li>• <strong>비만 예방</strong> 조기 개입</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                      <h5 className="font-semibold text-green-600 mb-2">우리의 해결책</h5>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li>• KidsMotion으로 디지털 체력측정 실현</li>
                        <li>• 정확한 데이터로 정책 수립 지원</li>
                        <li>• 국민체력 빅데이터 구축에 기여</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* 비즈니스 모델 & 시장 */}
        <ScrollReveal direction="up" delay={0.1}>
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
                    <div className="text-sm text-gray-600">
                      <p className="font-medium mb-2">현재 상황</p>
                      <p>• 성장 상담이 늘고 있으나 객관적 측정 도구 부족</p>
                      <p>• 체형 불균형 조기 발견의 어려움</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-red-700 font-medium text-sm">우리의 솔루션</p>
                      <p className="text-gray-700 text-sm">의료진이 신뢰할 수 있는 정밀 측정 데이터 제공</p>
                    </div>
                  </div>
                </div>

                {/* 교육기관 */}
                <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold mb-4 text-blue-700">🏫 학교/교육청</h3>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <p className="font-medium mb-2">현재 상황</p>
                      <p>• 학생 건강 체력 관리 중요성 증대</p>
                      <p>• 개별 맞춤 지도 어려움</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-blue-700 font-medium text-sm">우리의 솔루션</p>
                      <p className="text-gray-700 text-sm">과학적 데이터 기반의 체육 교육 혁신</p>
                    </div>
                  </div>
                </div>

                {/* 스포츠 산업 */}
                <div className="bg-white p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-xl font-bold mb-4 text-green-700">⚽ 스포츠 아카데미</h3>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <p className="font-medium mb-2">현재 상황</p>
                      <p>• 조기 스포츠 교육 수요 급증</p>
                      <p>• 객관적 선발 기준 필요</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-green-700 font-medium text-sm">우리의 솔루션</p>
                      <p className="text-gray-700 text-sm">데이터 기반 재능 발굴 및 맞춤 훈련</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* 우리의 솔루션 */}
        <ScrollReveal direction="up" delay={0.1}>
          <Card className="mb-16 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-2xl text-green-700 mb-4">🚴‍♀️ 우리의 솔루션: KidsMotion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">핵심 기능</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-600 mb-2">⚡ 5분 안에 6가지 체력 측정</h4>
                      <p className="text-gray-700 text-sm">순발력, 스프린트, 근력, 근지구력, 심폐지구력을 단계별로 정확히 측정</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-600 mb-2">⚖️ 실시간 좌우 밸런스 분석</h4>
                      <p className="text-gray-700 text-sm">페달링 과정에서 좌우 불균형을 실시간으로 감지하고 정량화</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-600 mb-2">🤖 AI 기반 맞춤 분석 리포트</h4>
                      <p className="text-gray-700 text-sm">복잡한 데이터를 부모가 이해하기 쉬운 해석과 운동 처방으로 변환</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">장비 특징</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">🔧 높이 조절 시스템</h4>
                      <p className="text-gray-700 text-sm">• 4-12세 아동 모든 체형에 맞춤 조절</p>
                      <p className="text-gray-700 text-sm">• 125cm~170cm 신장 범위 대응</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">💪 DC 모터 저항 시스템</h4>
                      <p className="text-gray-700 text-sm">• 아동 맞춤 정밀 부하 조절</p>
                      <p className="text-gray-700 text-sm">• 안전하고 정확한 측정</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">🛡️ 안전 설계</h4>
                      <p className="text-gray-700 text-sm">• 넘어짐 방지 안정적인 베이스</p>
                      <p className="text-gray-700 text-sm">• 응급 정지 버튼 및 안전 가이드</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* MotionBike만의 독점 기술 */}
        <ScrollReveal direction="up" delay={0.1}>
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
                      <li>• DC 모터 기반 정밀 제어 시스템</li>
                      <li>• 의료기기급 데이터 수집 알고리즘</li>
                      <li>• 아동 맞춤 하드웨어 설계 노하우</li>
                      <li>• 연령별 체력 기준 데이터베이스화</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">시장 선점 우위</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• 아동 체력측정 시장 퍼스트 무버</li>
                      <li>• 의료진-부모 신뢰 관계 구축</li>
                      <li>• 특허 출원을 통한 기술 보호</li>
                      <li>• B2B 채널 우선 확보</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* 시장 진입 전략 */}
        <ScrollReveal direction="up" delay={0.1}>
          <Card className="mb-16 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="text-2xl text-indigo-700 mb-4">🎯 시장 진입 전략</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg border-l-4 border-indigo-500">
                  <h3 className="text-lg font-bold mb-3 text-indigo-700">1단계: B2B 시장 진입</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>• <strong>타겟:</strong> 소아과, 재활의학과</p>
                    <p>• <strong>전략:</strong> 의료진 신뢰 기반 도입</p>
                    <p>• <strong>목표:</strong> 시장 검증 및 레퍼런스 확보</p>
                  </div>
                  <div className="mt-3 bg-indigo-50 p-2 rounded">
                    <p className="text-indigo-700 text-sm font-medium">예상 가격: 3,000만원/대</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500">
                  <h3 className="text-lg font-bold mb-3 text-purple-700">2단계: 교육기관 확산</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>• <strong>타겟:</strong> 초등학교, 교육청</p>
                    <p>• <strong>전략:</strong> 정부 정책과 연계</p>
                    <p>• <strong>목표:</strong> 대량 보급 기반 마련</p>
                  </div>
                  <div className="mt-3 bg-purple-50 p-2 rounded">
                    <p className="text-purple-700 text-sm font-medium">예상 가격: 2,500만원/대</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-lg font-bold mb-3 text-green-700">3단계: 민간 시장 진출</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>• <strong>타겟:</strong> 스포츠 아카데미</p>
                    <p>• <strong>전략:</strong> 재능 발굴 도구로 포지셔닝</p>
                    <p>• <strong>목표:</strong> 시장 점유율 확대</p>
                  </div>
                  <div className="mt-3 bg-green-50 p-2 rounded">
                    <p className="text-green-700 text-sm font-medium">예상 가격: 2,000만원/대</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg border border-yellow-200">
                <h3 className="text-xl font-bold text-orange-800 mb-4">📊 3년 매출 전망</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">1년차</div>
                    <p className="text-gray-600 text-sm mb-2">의료기관 중심</p>
                    <div className="text-lg font-semibold text-blue-700">12억원</div>
                    <p className="text-gray-500 text-xs">40대 × 3,000만원</p>
                  </div>
                  <div className="text-center bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">2년차</div>
                    <p className="text-gray-600 text-sm mb-2">교육기관 확산</p>
                    <div className="text-lg font-semibold text-purple-700">30억원</div>
                    <p className="text-gray-500 text-xs">120대 × 2,500만원</p>
                  </div>
                  <div className="text-center bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">3년차</div>
                    <p className="text-gray-600 text-sm mb-2">민간 시장 진출</p>
                    <div className="text-lg font-semibold text-green-700">50억원</div>
                    <p className="text-gray-500 text-xs">250대 × 2,000만원</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* 팀 소개 */}
        <ScrollReveal direction="up" delay={0.1}>
          <Card className="mb-16 bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 mb-4">👥 함께하는 팀</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">💪 우리가 가진 것</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-800">현장 경험 기반 문제 정의</p>
                        <p className="text-gray-600 text-sm">직접 부모로서, 트레이너로서 겪은 실제 문제</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-800">기술 개발 역량</p>
                        <p className="text-gray-600 text-sm">DC 모터 제어, 센서 융합, AI 분석 기술</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-800">시장 이해도</p>
                        <p className="text-gray-600 text-sm">의료진, 교육자, 부모의 니즈 파악</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">🤝 우리가 필요한 것</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-800">자금 지원</p>
                        <p className="text-gray-600 text-sm">양산 및 시장 진입을 위한 투자</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-800">네트워크 확장</p>
                        <p className="text-gray-600 text-sm">의료기관, 교육기관과의 연결</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-800">전문가 멘토링</p>
                        <p className="text-gray-600 text-sm">의료기기 인증, 시장 진입 전략</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* 투자 제안 */}
        <ScrollReveal direction="up" delay={0.1}>
          <Card className="mb-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">💡 함께 성장할 투자자를 찾습니다</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">🎯 투자 활용 계획</h3>
                  <div className="space-y-3">
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                      <p className="font-medium mb-1">제품 개발 완성 (40%)</p>
                      <p className="text-sm opacity-90">의료기기 인증, 양산 준비</p>
                    </div>
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                      <p className="font-medium mb-1">시장 진입 (35%)</p>
                      <p className="text-sm opacity-90">B2B 영업, 마케팅</p>
                    </div>
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                      <p className="font-medium mb-1">팀 확장 (25%)</p>
                      <p className="text-sm opacity-90">개발, 영업, 고객지원</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">📈 기대 성과</h3>
                  <div className="space-y-4">
                    <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2">92억원</div>
                        <p className="text-sm opacity-90">3년 누적 매출 목표</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white bg-opacity-20 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold">410대</div>
                        <p className="text-sm opacity-90">3년 판매 목표</p>
                      </div>
                      <div className="bg-white bg-opacity-20 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold">20%</div>
                        <p className="text-sm opacity-90">시장 점유율</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-lg opacity-90">
                <p>저희는 빠른 성공보다는 확실한 성장을 약속드립니다.</p>
                <p className="font-bold text-yellow-200 mt-4">
                  함께 아이들이 건강하게 자랄 수 있는 세상을 만들어주세요.
                </p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* 연락처 */}
        <ScrollReveal direction="up" delay={0.1}>
          <Card className="mb-16 bg-gradient-to-r from-slate-800 to-gray-800 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-6">📞 투자 및 파트너십 문의</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-2 text-left">
                    <p><strong>Company:</strong> 모션바이크</p>
                    <p><strong>Email:</strong> info@motionbike.co.kr</p>
                    <p><strong>Phone:</strong> +82-10-XXXX-XXXX</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Investment Deck</h3>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                    onClick={() => onNavigate?.('home')}
                  >
                    <MessageCircleQuestion className="w-4 h-4 mr-2" />
                    상세 자료 요청하기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
      
      <CommonFooter onNavigate={onNavigate} />
    </div>
  );
}