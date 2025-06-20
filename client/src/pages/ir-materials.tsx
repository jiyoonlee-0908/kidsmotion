import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Target, Building2, BarChart3, Zap, MessageCircleQuestion, Play, Activity, Heart, Timer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

import CommonFooter from "@/components/common-footer";

interface IRMaterialsProps {
  onNavigate?: (page: string) => void;
}

function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    console.log("Video loaded successfully:", "/videos/kidsmotion.mp4");
  };

  const handleVideoError = (e: any) => {
    console.error("Video error:", e);
  };

  // 스크롤 감지로 영상 재생/정지 제어
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {
              console.log("Auto-play prevented by browser");
            });
          } else {
            videoRef.current.pause();
          }
        }
      },
      {
        threshold: 0.5,
        rootMargin: "0px"
      }
    );

    observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
    };
  }, [videoLoaded]);

  return (
    <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
      <video
        ref={videoRef}
        key={`video-latest-${Date.now()}`}
        src={`/videos/kidsmotion.mp4?v=${Date.now()}`}
        controls
        autoPlay
        loop
        playsInline
        preload="metadata"
        className="w-full h-full rounded-lg shadow-lg"
        style={{ 
          backgroundColor: '#000',
          display: 'block'
        }}
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.play().catch(() => {
              console.log("자동재생을 위해 영상을 클릭해주세요");
            });
          }
        }}
        onEnded={() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
          }
        }}
      >
        <source src={`/videos/kidsmotion.mp4?v=${Date.now()}`} type="video/mp4" />
        브라우저에서 영상을 재생할 수 없습니다.
      </video>
    </div>
  );
}

// 애니메이션 컴포넌트
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// PROBLEM 섹션 - 시장 문제점과 기회
function ProblemSection() {
  return (
    <AnimatedSection className="mb-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          <span className="text-red-600">Problem</span> | 명확한 시장 문제
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          현재 아동 체력 측정 시스템의 구조적 한계와 부모들의 절실한 니즈
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        {/* 왼쪽: 부모들의 고민 */}
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-8">부모들의 현실적 고민</h3>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-red-500 to-orange-500 p-8 rounded-2xl shadow-lg text-white">
              <div className="mb-4">
                <div className="text-2xl font-bold mb-4">"아이 좌우가 심하게 틀어진 것 같은데..."</div>
                <div className="text-lg opacity-90">"혹시 성장에 문제가 생기는 건 아니겠지?"</div>
              </div>
              <div className="bg-white/20 p-4 rounded-xl">
                <div className="text-lg font-bold text-yellow-200">→ 좌우 밸런스 정확한 수치로 측정</div>
                <div className="text-lg font-bold text-yellow-200">→ 개선방안 제시</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-8 rounded-2xl shadow-lg text-white">
              <div className="mb-4">
                <div className="text-2xl font-bold mb-4">"아이 운동시키고 싶은데 이 정도면 운동시켜도 될까?"</div>
                <div className="text-lg opacity-90">"상위 1%도 살아남지 못하는데..."</div>
              </div>
              <div className="bg-white/20 p-4 rounded-xl">
                <div className="text-lg font-bold text-yellow-200">→ 1등급 달성 시 상위 1% 재능 확인</div>
                <div className="text-lg font-bold text-yellow-200">→ 운동 투자 가치 명확 판단</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-8 rounded-2xl shadow-lg text-white">
              <div className="mb-4">
                <div className="text-2xl font-bold mb-4">"다른 아이들보다 체력이 많이 떨어지는 것 같은데..."</div>
                <div className="text-lg opacity-90">"정확히 얼마나 뒤처지는 거지?"</div>
              </div>
              <div className="bg-white/20 p-4 rounded-xl">
                <div className="text-lg font-bold text-yellow-200">→ 1~5등급 체제와 백분위 퍼센트 제공</div>
                <div className="text-lg font-bold text-yellow-200">→ 우리 아이의 정확한 위치 확인</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-8 rounded-2xl shadow-lg text-white">
              <div className="mb-4">
                <div className="text-2xl font-bold mb-4">"아이 운동발달이 늦는 것 같아서 병원에 갔는데"</div>
                <div className="text-lg opacity-90">"'괜찮다'고만 하고... 정말 괜찮은 건지 불안해!"</div>
              </div>
              <div className="bg-white/20 p-4 rounded-xl">
                <div className="text-lg font-bold text-yellow-200">→ 조기 개입 가능: 5등급, 하위 4% 바로 확인</div>
                <div className="text-lg font-bold text-yellow-200">→ 즉시 대응</div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 제품 이미지 */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-200 to-blue-200 rounded-2xl opacity-30"></div>
            <img 
              src="/kidsmotion.png" 
              alt="KidsMotion 스마트 사이클" 
              className="relative w-full max-w-md rounded-xl shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3">
              <p className="text-xs font-bold text-purple-600">정밀 측정 장비</p>
            </div>
          </div>
        </div>
      </div>

      {/* 현재 시스템의 치명적 한계 */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-white">
        <h3 className="text-4xl font-bold text-center mb-12">현재 검진의 한계</h3>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-yellow-500/20 rounded-2xl p-8 border-2 border-yellow-400">
            <h4 className="text-3xl font-bold text-yellow-400 mb-6">영유아검진의 대근육운동발달 항목의 한계</h4>
            <div className="space-y-4 text-lg">
              <div className="bg-yellow-400/20 p-4 rounded-xl">
                <p className="font-bold">"두 손으로 한 발을 잡고, 닭싸움 자세로 세번이상 점프한다"</p>
                <p className="text-yellow-200">→ ①②③④ (54-60개월 검진에서 실시)</p>
              </div>
              <div className="bg-yellow-400/20 p-4 rounded-xl">
                <p className="font-bold">"아무것도 붙잡지 않고 한발로 3초 이상 서있는다"</p>
                <p className="text-yellow-200">→ ①②③④ (42-48개월 검진에서 실시)</p>
              </div>
              <div className="bg-red-500/30 p-4 rounded-xl">
                <p className="text-2xl font-bold text-red-300">"①②③④의 기준이 뭔가요?"</p>
                <p className="text-xl font-bold text-red-200">→ 주관적 판단, 일관성 없음</p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-500/20 rounded-2xl p-8 border-2 border-red-400">
            <h4 className="text-3xl font-bold text-red-400 mb-6">초등체력장의 한계</h4>
            <div className="space-y-4 text-lg">
              <div className="bg-red-400/20 p-4 rounded-xl">
                <p className="font-bold">아날로그식 측정으로 정확도 한계</p>
              </div>
              <div className="bg-red-400/20 p-4 rounded-xl">
                <p className="font-bold">날씨, 공간에 따른 측정 편차 발생</p>
              </div>
              <div className="bg-red-400/20 p-4 rounded-xl">
                <p className="font-bold">측정자에 따른 주관적 판단 개입 가능</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-500/20 rounded-2xl p-8 border-2 border-blue-400">
            <h4 className="text-3xl font-bold text-blue-400 mb-6">국가 아동대상 체력측정의 한계</h4>
            <div className="space-y-4 text-lg">
              <div className="bg-blue-400/20 p-4 rounded-xl">
                <p className="font-bold">악력기로 근력 체크</p>
                <p className="text-blue-200">→ 전신근력이 아닌 부분근력만 측정</p>
              </div>
              <div className="bg-blue-400/20 p-4 rounded-xl">
                <p className="font-bold">국가 주관 평가임에도 정량 데이터 제공 안됨</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 종합 결과 */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8">
          <h4 className="text-3xl font-bold text-center mb-8">종합 결과</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">정량적 데이터 부재로</div>
              <div className="text-xl">조기발견 실패</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">부모의 불안감 증가 및</div>
              <div className="text-xl">적절한 대응 시기 놓침</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">개인별 맞춤</div>
              <div className="text-xl">개선 방안 제시 불가</div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// SOLUTION 섹션 - 우리만의 기술적 해결책
function SolutionSection() {
  return (
    <AnimatedSection className="mb-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          <span className="text-blue-600">Solution</span> | 독점 기술 솔루션
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          정밀 측정 하드웨어와 AI 분석으로 완전히 새로운 아동 체력 평가 경험
        </p>
      </div>

      {/* 핵심 솔루션 소개 */}
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
        {/* 왼쪽: 인터페이스 이미지 */}
        <div className="order-2 lg:order-1">
          <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
            <img 
              src="/dsfaaf.PNG" 
              alt="KidsMotion 실시간 측정 인터페이스" 
              className="w-full rounded-xl shadow-2xl"
            />
            <div className="absolute -top-4 -left-4 bg-blue-600 text-white rounded-lg px-4 py-2 font-bold text-sm">
              실시간 UI/UX
            </div>
            <div className="absolute -bottom-4 -right-4 bg-purple-600 text-white rounded-lg px-4 py-2 font-bold text-sm">
              아동 친화적 설계
            </div>
          </div>
        </div>

        {/* 오른쪽: 핵심 기술 특징 */}
        <div className="order-1 lg:order-2 space-y-8">
          <h3 className="text-3xl font-bold text-gray-900">혁신적 측정 기술</h3>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold">1</div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">유동성 프레임 설계</h4>
                <p className="text-gray-600">키 100-150cm 완벽 대응, 성장하는 아동을 위한 조절 가능한 구조</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold">2</div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">DC 모터 정밀 측정</h4>
                <p className="text-gray-600">좌우 독립 센서로 0.1W 단위 정확도, 실시간 밸런스 분석</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold">3</div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">6가지 체력 지표</h4>
                <p className="text-gray-600">순발력・파워지속력・근력・근지구력・심폐지구력・밸런스</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 기술적 우위성 */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12 text-white">
        <h3 className="text-3xl font-bold text-center mb-12">기존 대비 압도적 우위성</h3>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">VS</span>
            </div>
            <h4 className="text-xl font-bold mb-3">기존: 주관적 판단</h4>
            <p className="text-gray-300 text-sm">영유아검진 ①②③④ 체크</p>
            <div className="mt-4 h-1 bg-red-500 rounded"></div>
            <p className="text-red-400 font-bold mt-2">신뢰도 낮음</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">AI</span>
            </div>
            <h4 className="text-xl font-bold mb-3">KidsMotion: 정량 분석</h4>
            <p className="text-gray-300 text-sm">0.1W 단위 정밀 측정</p>
            <div className="mt-4 h-1 bg-green-500 rounded"></div>
            <p className="text-green-400 font-bold mt-2">과학적 신뢰성</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">+</span>
            </div>
            <h4 className="text-xl font-bold mb-3">추가 혜택</h4>
            <p className="text-gray-300 text-sm">AI 맞춤 운동 처방</p>
            <div className="mt-4 h-1 bg-blue-500 rounded"></div>
            <p className="text-blue-400 font-bold mt-2">개인별 솔루션</p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// STRATEGY 섹션 - 시장 진출 전략
function StrategySection() {
  return (
    <AnimatedSection className="mb-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          <span className="text-green-600">Strategy</span> | 시장 진출 전략
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          검증된 시장 규모와 명확한 고객 세그먼트를 통한 체계적 진출 계획
        </p>
      </div>
      
      {/* 시장 규모 */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center bg-gradient-to-br from-emerald-50 to-green-100 p-8 rounded-2xl shadow-lg">
          <div className="text-5xl font-bold text-emerald-600 mb-4">249만명</div>
          <p className="text-gray-700 font-medium">전국 초등학생 수</p>
          <p className="text-gray-500 text-sm">(2024년 기준)</p>
        </div>
        <div className="text-center bg-gradient-to-br from-red-50 to-pink-100 p-8 rounded-2xl shadow-lg">
          <div className="text-5xl font-bold text-red-600 mb-4">3,302개소</div>
          <p className="text-gray-700 font-medium">소아·청소년과</p>
          <p className="text-gray-500 text-sm">전문 진료기관</p>
        </div>
        <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg">
          <div className="text-5xl font-bold text-blue-600 mb-4">2만4천개+</div>
          <p className="text-gray-700 font-medium">아동 스포츠 학원</p>
          <p className="text-gray-500 text-sm">(축구·태권도·수영 등)</p>
        </div>
      </div>

      {/* 3개 시장 진출 전략 */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-red-500 hover:shadow-2xl transition-shadow">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-red-700 mb-2">병원 시장</h3>
            <p className="text-gray-600">영유아검진 프리미엄 서비스</p>
          </div>
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-bold text-red-800 mb-2">핵심 가치</h4>
              <p className="text-red-700 text-sm">차별화된 진단 서비스로 환자 만족도 향상</p>
            </div>
            <div className="text-center py-4">
              <div className="text-3xl font-bold text-green-600">550만원</div>
              <p className="text-sm text-gray-600">장비 판매 + 설치</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-500 hover:shadow-2xl transition-shadow">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-blue-700 mb-2">스포츠 학원</h3>
            <p className="text-gray-600">실력 향상 데이터 제공</p>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2">핵심 가치</h4>
              <p className="text-blue-700 text-sm">학부모 신뢰도 증가와 경쟁력 확보</p>
            </div>
            <div className="text-center py-4">
              <div className="text-3xl font-bold text-blue-600">월 5만원</div>
              <p className="text-sm text-gray-600">구독 서비스</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-purple-500 hover:shadow-2xl transition-shadow">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-purple-700 mb-2">보건소</h3>
            <p className="text-gray-600">지역 아동 건강 데이터</p>
          </div>
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-bold text-purple-800 mb-2">핵심 가치</h4>
              <p className="text-purple-700 text-sm">정책 수립을 위한 빅데이터 구축</p>
            </div>
            <div className="text-center py-4">
              <div className="text-3xl font-bold text-purple-600">정부 지원</div>
              <p className="text-sm text-gray-600">정책 연계 사업</p>
            </div>
          </div>
        </div>
      </div>

      {/* 웹 리포트 이미지 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-center text-purple-800 mb-8">전문가급 분석 리포트</h3>
        <div className="flex justify-center">
          <div className="relative">
            <img 
              src="/report.png" 
              alt="KidsMotion 웹 리포트" 
              className="max-w-full h-auto rounded-xl shadow-2xl"
            />
            <div className="absolute -top-4 -left-4 bg-purple-600 text-white rounded-lg px-4 py-2 font-bold text-sm">
              AI 자동 생성
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// TRACTION 섹션 - 팀빌딩과 파일럿 성과
function TractionSection() {
  return (
    <AnimatedSection className="mb-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          <span className="text-purple-600">Traction</span> | 팀빌딩과 검증된 성과
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          탄탄한 팀 구성과 파일럿 테스트로 입증된 시장 검증과 확실한 성장 기회
        </p>
      </div>

      {/* 팀빌딩 */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-purple-800 mb-6">전문가 팀 구성</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-bold text-purple-600 mb-2">체육학박사 (CSCS)</h4>
              <p className="text-gray-700 text-sm">아동 체력 측정 및 분석 전문가</p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-600 mb-2">개발팀</h4>
              <p className="text-gray-700 text-sm">하드웨어·소프트웨어 통합 솔루션</p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-bold text-green-600 mb-2">의료진 자문</h4>
              <p className="text-gray-700 text-sm">소아청소년과 전문의 협력</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-green-800 mb-6">파일럿 테스트 성과</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-emerald-500">
              <h4 className="font-bold text-emerald-600 mb-2">초등학교 3곳</h4>
              <p className="text-gray-700 text-sm">총 150명 아동 측정 완료</p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-600 mb-2">학부모 만족도</h4>
              <p className="text-gray-700 text-sm">95% "매우 유용" 평가</p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-bold text-orange-600 mb-2">교사 피드백</h4>
              <p className="text-gray-700 text-sm">"객관적 데이터로 아이 이해도 향상"</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 정부 정책 연계 - 현재 정부정책: 국민건강 데이터화 추진 */}
      <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-12 text-white mb-16">
        <div className="text-center mb-12">
          <div className="text-5xl font-bold mb-4">🏛️ 현재 정부정책</div>
          <div className="text-3xl font-bold text-blue-300">국민건강 데이터화 추진</div>
          <div className="text-xl text-blue-200 mt-4">국민체육진흥공단 국민체력100과의 연결점</div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-red-500/20 rounded-2xl p-8 border-2 border-red-400">
            <h3 className="text-3xl font-bold text-red-400 mb-8">국민체육진흥공단 국민체력100의 한계</h3>
            
            <div className="mb-8">
              <h4 className="text-2xl font-bold text-red-300 mb-6">현재 측정 방식 (아날로그)</h4>
              <div className="space-y-4">
                <div className="bg-red-400/20 p-6 rounded-xl">
                  <div className="text-xl font-bold">제자리 멀리뛰기</div>
                  <div className="text-lg text-red-200">→ 줄자로 측정</div>
                </div>
                <div className="bg-red-400/20 p-6 rounded-xl">
                  <div className="text-xl font-bold">윗몸말아올리기</div>
                  <div className="text-lg text-red-200">→ 사람이 카운트</div>
                </div>
                <div className="bg-red-400/20 p-6 rounded-xl">
                  <div className="text-xl font-bold">왕복오래달리기</div>
                  <div className="text-lg text-red-200">→ 수동 기록</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 rounded-xl">
              <h4 className="text-2xl font-bold text-center mb-4">결과</h4>
              <div className="space-y-2 text-lg">
                <div>• 정확성 부족</div>
                <div>• 데이터 축적 어려움</div>
                <div>• 국민건강 빅데이터 구축 불가</div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-500/20 rounded-2xl p-8 border-2 border-green-400">
            <h3 className="text-3xl font-bold text-green-400 mb-8">디지털 전환 필요성</h3>
            
            <div className="mb-8">
              <h4 className="text-2xl font-bold text-green-300 mb-6">정부 추진 방향</h4>
              <div className="space-y-4">
                <div className="bg-green-400/20 p-6 rounded-xl">
                  <div className="text-xl font-bold">정량적 데이터 수집 시스템</div>
                </div>
                <div className="bg-green-400/20 p-6 rounded-xl">
                  <div className="text-xl font-bold">국민체력 빅데이터 구축</div>
                </div>
                <div className="bg-green-400/20 p-6 rounded-xl">
                  <div className="text-xl font-bold">객관적 평가로 정책 수립</div>
                </div>
                <div className="bg-green-400/20 p-6 rounded-xl">
                  <div className="text-xl font-bold">비만 예방 조기 개입</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 rounded-xl">
              <h4 className="text-2xl font-bold text-center mb-4">우리의 해결책</h4>
              <div className="space-y-2 text-lg">
                <div>• KidsMotion으로 디지털 체력측정 실현</div>
                <div>• 정확한 데이터로 정책 수립 지원</div>
                <div>• 국민체력 빅데이터 구축에 기여</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-12">
        <h3 className="text-3xl font-bold text-indigo-800 mb-6">함께 만들어가요</h3>
        <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
          이 팀에게 손을 내밀어주시면,<br/>
          <span className="font-bold text-purple-700">아이들의 미래가 달라집니다</span>
        </p>
        <div className="inline-flex items-center space-x-4 bg-white rounded-xl p-6 shadow-lg">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <div className="text-2xl font-bold text-purple-600">투자가 아닌 동반자로서,</div>
            <p className="text-gray-600">함께 아이들의 성장을 지켜봐 주세요</p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function IRMaterials({ onNavigate }: IRMaterialsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        
        {/* KidsMotion 영상 - 첫 인상 */}
        <div className="mb-20">
          <div className="relative w-full max-w-5xl mx-auto">
            <VideoPlayer />
          </div>
        </div>

        {/* 투자자 친화적 메인 메시지 */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            아동 체력 측정의 <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">디지털 혁신</span>
          </h1>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
            249만 초등학생과 3만여 의료·교육기관이 기다리는<br/>
            <span className="font-semibold text-purple-700">정량적 아동 체력 분석 솔루션</span>
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
              정부 정책과 완벽 연계
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              검증된 시장 니즈
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              독점 기술 보유
            </div>
          </div>
        </motion.div>

        <ProblemSection />
        <SolutionSection />
        <StrategySection />
        <TractionSection />
      </div>

      <CommonFooter onNavigate={onNavigate} />
    </div>
  );
}