import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import CommonFooter from "@/components/common-footer";

interface IRMaterialsProps {
  onNavigate?: (page: string) => void;
}

export default function IRMaterials({ onNavigate }: IRMaterialsProps) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // 애니메이션 컴포넌트
  const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 75 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 75 }}
        transition={{ duration: 0.4, delay: delay * 0.1 }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        
        {/* 비디오 섹션 */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="relative max-w-4xl mx-auto">
              <video 
                className="w-full rounded-2xl shadow-2xl"
                controls
                poster="/kidsmotion-preview.jpg"
                playsInline
              >
                <source src="/kidsmotion-demo.mp4" type="video/mp4" />
                브라우저가 비디오를 지원하지 않습니다.
              </video>
            </div>
          </div>
        </AnimatedSection>
        
        {/* 헤더 */}
        <AnimatedSection delay={0.2}>
          <div className="text-center mb-16">
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

        {/* KidsMotion 소개 */}
        <AnimatedSection delay={0.4}>
          <Card className="mb-16 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-700 mb-4">사업 내용 소개</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-8 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold mb-6 text-gray-800">성장기 어린이의 체력과 신체 균형을 5분 만에 정량 분석</h3>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p><span className="font-semibold text-purple-700">KidsMotion</span>은 성장기 어린이의 체력과 신체 균형을 5분 만에 정량 분석해주는 국내 최초의 아동 전용 동적 체력 분석 장비 및 리포트 시스템입니다.</p>

                  <p>기존 아동 체력 평가는 대부분 보호자 설문지(K-DST)나 줄자·초시계에 의존하는 방식으로, 발달 지연이나 운동 기능 저하를 조기에 파악하는 데 구조적 한계가 존재합니다. 저희는 이 문제를 해결하기 위해 실시간 측정, AI 리포트, 성장 피드백이 연결되는 통합형 솔루션을 개발했습니다.</p>

                  <div className="bg-purple-50 p-4 rounded-lg my-6">
                    <h4 className="font-semibold mb-2">측정 항목</h4>
                    <p>좌우 밸런스, 순발력, 무산소 파워, 유산소 파워, 근지구력 등 총 6가지</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">하드웨어</h4>
                      <p>DC 모터 기반 저항 장치 / 파워·케이던스·좌우 센서 내장</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">소프트웨어</h4>
                      <p>실시간 분석 Web 대시보드 + 보호자용 앱 / AI 기반 성장 리포트 및 운동 피드백</p>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">납품 구조</h4>
                    <p>병원, 보건소, 스포츠센터 등 B2B/B2G 기관 중심 설치 운영 구조 (1㎡ 설치 가능)</p>
                  </div>

                  <p className="font-medium text-purple-700">KidsMotion은 단순한 체력 측정 장비가 아니라, 운동 중 수집한 데이터를 기반으로 아이의 운동 기능과 성장 이상을 조기에 파악하고, 구체적인 개선 방향을 제시하는 플랫폼입니다.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* 사업 성과 */}
        <AnimatedSection delay={0.6}>
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl">사업 관련 성과</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-xl font-bold mb-4 text-green-700">하드웨어 MVP 개발 완료</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 키 95~140cm 아동 체형에 맞춘 커스텀 프레임 설계</li>
                      <li>• DC 모터 기반 저항 시스템 개발 및 부품 금형 확보</li>
                      <li>• 파워미터, 케이던스, 좌우 밸런스 센서 탑재</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold mb-4 text-blue-700">웹 리포트 MVP 및 앱 프로토타입 개발</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 실시간 그래프 및 파워 분석 기능 포함된 Web 대시보드 MVP 구축</li>
                      <li>• 안드로이드 앱 프로토타입 개발</li>
                      <li>• 보호자용 알림 기능 및 게이미피케이션 요소 탑재</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-bold mb-4 text-purple-700">1차 파일럿 확정 (2025년 7월~)</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 서울 강서구 IYC 유소년 스포츠센터와 협력</li>
                      <li>• 100명 아동 대상 실측 및 성장 리포트 생성 예정</li>
                      <li>• 국내 최초 아동 체력 기준선 구축의 출발점</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                    <h3 className="text-xl font-bold mb-4 text-orange-700">초기 자금 투입</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 사이클 아카데미 자체 수익 1천만 원 선투입</li>
                      <li>• 하드웨어 시제품 설계 및 부품 제작 실비 투입</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* 팀 구성 */}
        <AnimatedSection delay={0.8}>
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl">팀의 핵심 멤버 구성 및 역량</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500">
                  <h3 className="text-xl font-bold mb-4 text-pink-700">대표자 (기획 총괄)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 사이클 아카데미 운영 어시스트 경력 10년</li>
                    <li>• 유소년 선수 및 보호자 대상 장비 운영·커뮤니케이션 실무 경험</li>
                    <li>• 자녀의 체형 불균형 문제에서 출발한 문제의식</li>
                    <li>• 현장 중심 기획 역량</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold mb-4 text-blue-700">기술 총괄 (운동역학 석사 / 前 국가대표)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 엘리트 선수 경력 24년 / 국가대표 출신 사이클리스트</li>
                    <li>• DC 모터 기반 저항 제어 및 파워 분석 알고리즘 개발</li>
                    <li>• 아동 피팅·체력 측정 설계</li>
                    <li>• 페달링 분석 알고리즘 구현 경험</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-xl font-bold mb-4 text-green-700">외부 파트너</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 자전거 부품 특허 보유 기업과 하드웨어 공동 개발</li>
                    <li>• 실시간 데이터 분석 기반 헬스케어 앱 개발 전문 회사 협업 중</li>
                    <li>• 소아청소년과 전문의 자문단 참여</li>
                    <li>• 성장 기준 및 리포트 해석 구조 설계</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* 투자 유치 계획 */}
        <AnimatedSection delay={1.0}>
          <Card className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">투자 유치 계획</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-8 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-bold mb-6 text-gray-800">MVP 고도화 및 1차 파일럿 운영을 준비 중</h3>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="text-lg font-semibold mb-3 text-blue-700">희망 투자금</h4>
                      <p className="text-2xl font-bold text-blue-800">시드 단계 기준 약 2억 원</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="text-lg font-semibold mb-3 text-green-700">투자 유치 히스토리</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• 외부 투자 유치 이력 없음</li>
                        <li>• 자체 자금 1천만 원 투입</li>
                        <li>• 예비창업패키지, TIPS 등 정부 과제 신청 준비 중</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-3 text-purple-700">자금 사용 계획</h4>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-purple-600">25%</div>
                        <div className="text-sm text-gray-600">파일럿 운영 후 제품 고도화</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-purple-600">30%</div>
                        <div className="text-sm text-gray-600">성장 분석 SaaS 리포트 정식 출시</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-purple-600">25%</div>
                        <div className="text-sm text-gray-600">IRB 기반 임상 구조 설계</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-purple-600">20%</div>
                        <div className="text-sm text-gray-600">기관 납품 확대 기반 마련</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-3 text-gray-700">기업가치 산정</h4>
                    <p className="text-gray-700 italic">"현재 단계에서는 고정된 밸류를 주장하지 않으며, DHP 멘토링과 실증 결과를 바탕으로 현실적인 기준 수립 희망"</p>
                    <p className="text-purple-700 font-medium mt-2">"데이터로 증명하고, 시장성과 기술성을 검증한 후 밸류에이션을 정하겠습니다."</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Technology Advantage */}
        <AnimatedSection delay={1.2}>
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl">MotionBike만의 독점 기술</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">조절형 프레임 기술</h3>
                  <p className="text-gray-600">8단계 높이 조절로 모든 아동 체형에 최적화</p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">실시간 밸런스 측정</h3>
                  <p className="text-gray-600">좌우 다리 힘의 불균형을 정밀 측정</p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">AI 분석 엔진</h3>
                  <p className="text-gray-600">연령별 표준 데이터 기반 개인화 분석</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Business Model */}
        <AnimatedSection delay={1.4}>
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl">비즈니스 모델</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-purple-700">하드웨어 판매</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>제품 가격</span>
                      <span className="font-semibold">550만원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>목표 판매량</span>
                      <span className="font-semibold">50대/년</span>
                    </div>
                    <div className="flex justify-between">
                      <span>예상 매출</span>
                      <span className="font-semibold">2.75억원</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-green-700">소프트웨어 구독</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>월 구독료</span>
                      <span className="font-semibold">5만원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>목표 구독자</span>
                      <span className="font-semibold">50기관</span>
                    </div>
                    <div className="flex justify-between">
                      <span>연간 매출</span>
                      <span className="font-semibold">3억원</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Target Market */}
        <AnimatedSection delay={1.6}>
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl">타겟 시장</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">의료기관</h3>
                  <p className="text-gray-600">소아과, 재활의학과, 정형외과</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">교육기관</h3>
                  <p className="text-gray-600">초등학교, 유치원, 어린이집</p>
                </div>
                <div className="text-center p-6 bg-orange-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">스포츠 시설</h3>
                  <p className="text-gray-600">체육관, 피트니스센터, 스포츠클럽</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Investment Ask */}
        <AnimatedSection delay={1.8}>
          <Card className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">투자 제안</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-blue-800 mb-4">3억원 시드 투자 유치</h3>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div>
                    <h4 className="font-semibold mb-2">제품 개발 완료</h4>
                    <p className="text-gray-600">30%</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">마케팅 및 영업</h4>
                    <p className="text-gray-600">50%</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">팀 확장</h4>
                    <p className="text-gray-600">20%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Contact */}
        <AnimatedSection delay={2.0}>
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl text-center">함께 성장할 투자자를 기다립니다</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-6">
                  아이들의 건강한 성장을 위한 혁신적인 솔루션에 동참해주세요
                </p>
                <Button 
                  size="lg" 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => onNavigate?.('home')}
                >
                  홈으로 돌아가기
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