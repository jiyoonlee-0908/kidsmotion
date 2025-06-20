import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Target, Building2, BarChart3, Zap, MessageCircleQuestion } from "lucide-react";

import CommonFooter from "@/components/common-footer";

interface IRMaterialsProps {
  onNavigate?: (page: string) => void;
}

// 스크롤 애니메이션 훅
function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

// 애니메이션 컴포넌트
function AnimatedSection({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-500 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function IRMaterials({ onNavigate }: IRMaterialsProps) {
  const scrollY = useScrollAnimation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        
        {/* 헤더 */}
        <AnimatedSection className="text-center mb-16">
          <div 
            className="transform"
            style={{ 
              transform: `translateY(${scrollY * 0.08}px)` 
            }}
          >
            <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
              Investor Relations
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              부모의 걱정을 데이터로 바꾸는 팀입니다
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              아이가 바르게 자라는지 알고 싶은 부모의 마음,<br/>
              <span className="text-purple-600 font-semibold">MotionBike에서 정량 데이터로 답해드릴게요</span>
            </p>
          </div>
        </AnimatedSection>

        {/* Founder Letter */}
        <AnimatedSection delay={150}>
          <Card className="mb-16 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200"
                style={{ 
                  transform: `translateY(${scrollY * 0.04}px)` 
                }}>
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
                  "괜찮을 거예요"라는 답변은, 사실 답이 아니라는 것을.<br/>
                  정확한 상태를 알고 싶은 부모에게 필요한 건 데이터라는 것을.</p>

                  <p>저는 7년 동안 운동 선수들을 봐왔습니다.<br/>
                  스포츠 현장에서도 마찬가지였습니다.<br/>
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
        </AnimatedSection>

        {/* 문제 정의 */}
        <AnimatedSection delay={300}>
          <Card className="mb-16 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 shadow-lg"
                style={{ 
                  transform: `translateY(${scrollY * 0.03}px)` 
                }}>
            <CardHeader>
              <CardTitle className="text-2xl text-red-700 mb-4">📋 우리가 해결하려는 문제</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">부모들의 고민</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      우리 아이가 운동에 재능이 있는지 알고 싶다
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      시간과 비용을 투자할 가치가 있는지 확신하고 싶다
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      아이의 신체 발달이 정상인지 궁금하다
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      객관적인 데이터로 아이 상태를 파악하고 싶다
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">현재 시장의 한계</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      주관적 판단에만 의존하는 평가 시스템
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      아동용 체력 측정 장비의 부재
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      정량적 데이터 없는 피드백
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      부모가 이해하기 어려운 전문적 평가
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* 솔루션 */}
        <AnimatedSection delay={450}>
          <Card className="mb-16 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 shadow-lg"
                style={{ 
                  transform: `translateY(${scrollY * 0.02}px)` 
                }}>
            <CardHeader>
              <CardTitle className="text-2xl text-green-700 mb-4">✨ MotionBike가 제시하는 해결책</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">정밀한 체력 측정</h3>
                  <p className="text-gray-600 text-sm">5초, 15초, 30초, 60초 구간별 파워 측정으로 폭발력, 근력, 근지구력, 심폐지구력을 정량화</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">AI 기반 분석</h3>
                  <p className="text-gray-600 text-sm">연령별, 성별 백분위 비교를 통한 객관적 평가와 개인 맞춤형 운동 처방</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">재능 발굴</h3>
                  <p className="text-gray-600 text-sm">상위 1% 수준의 아동을 조기에 발견하여 최적의 성장 기회 제공</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* 시장 기회 */}
        <AnimatedSection delay={600}>
          <Card className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 shadow-lg"
                style={{ 
                  transform: `translateY(${scrollY * 0.01}px)` 
                }}>
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700 mb-4">🎯 시장 기회</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">시장 규모</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">유소년 스포츠 시장</span>
                        <span className="text-2xl font-bold text-blue-600">1.2조원</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">한국 연간 규모 (2024)</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">체력측정 장비 시장</span>
                        <span className="text-2xl font-bold text-indigo-600">450억원</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">TAM (Total Addressable Market)</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">타겟 고객</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <span>스포츠 아카데미 (2,000개소)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span>초등학교 (6,100개교)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span>스포츠 의학센터 (300개소)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageCircleQuestion className="w-5 h-5 text-blue-600" />
                      <span>학부모 (4-12세 자녀 보유)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* 비즈니스 모델 */}
        <AnimatedSection delay={750}>
          <Card className="mb-16 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-yellow-700 mb-4">💰 비즈니스 모델</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">하드웨어 (B2B)</h3>
                  <div className="bg-white p-6 rounded-lg border border-yellow-200">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600 mb-2">550만원</div>
                      <p className="text-gray-600">MotionBike 장비 단가</p>
                      <div className="mt-4 pt-4 border-t">
                        <div className="text-lg font-semibold text-gray-800">목표 판매량</div>
                        <div className="text-2xl font-bold text-yellow-600">50대/년</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">소프트웨어 (SaaS)</h3>
                  <div className="bg-white p-6 rounded-lg border border-yellow-200">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600 mb-2">월 5만원</div>
                      <p className="text-gray-600">AI 분석 서비스 구독료</p>
                      <div className="mt-4 pt-4 border-t">
                        <div className="text-lg font-semibold text-gray-800">목표 구독자</div>
                        <div className="text-2xl font-bold text-yellow-600">50개소</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-lg">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">연간 매출 목표</h3>
                  <div className="text-4xl font-bold text-green-600 mb-2">3억원</div>
                  <p className="text-gray-600">하드웨어 2.75억원 + 소프트웨어 3,000만원</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={900} className="text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-6">
                아이들의 가능성을 데이터로 발견하는 여정에 함께하세요
              </h2>
              <p className="text-xl mb-8 opacity-90">
                MotionBike와 함께 유소년 스포츠의 새로운 표준을 만들어가겠습니다
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3"
                  onClick={() => onNavigate?.('measurements')}
                >
                  체험해보기
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-3"
                >
                  투자 문의
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

      </div>
      
      <CommonFooter onNavigate={onNavigate} />
    </div>
  );
}