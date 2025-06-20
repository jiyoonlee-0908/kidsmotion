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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [fallbackMethod, setFallbackMethod] = useState(0);
  const [useIframe, setUseIframe] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(null);
    console.log("Video loaded successfully:", "/videos/kidsmotion.mp4");
  };

  const handleVideoError = (e: any) => {
    console.error("Video error:", e);
    setVideoError("영상 로드에 실패했습니다.");
    
    if (fallbackMethod < 2) {
      setFallbackMethod(prev => prev + 1);
    } else {
      setUseIframe(true);
    }
  };

  // 강제로 영상 로드 시도
  useEffect(() => {
    if (videoRef.current && fallbackMethod > 0) {
      const video = videoRef.current;
      
      if (fallbackMethod === 1) {
        // Blob URL로 시도
        fetch('/videos/kidsmotion.mp4')
          .then(response => response.blob())
          .then(blob => {
            const url = URL.createObjectURL(blob);
            setBlobUrl(url);
            video.src = url;
          })
          .catch(() => {
            setFallbackMethod(2);
          });
      }
      
      if (fallbackMethod === 2) {
        // 강제 리로드
        video.load();
      }
    }
  }, [fallbackMethod]);

  // cleanup blob URL
  useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl]);

  // 스크롤 감지로 영상 재생/정지 제어
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (videoRef.current) {
          if (entry.isIntersecting) {
            // 영상이 화면에 보이면 재생
            videoRef.current.play().catch(() => {
              console.log("Auto-play prevented by browser");
            });
          } else {
            // 영상이 화면에서 벗어나면 정지
            videoRef.current.pause();
          }
        }
      },
      {
        threshold: 0.5, // 영상의 50% 이상이 보일 때 재생
        rootMargin: "0px"
      }
    );

    observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
    };
  }, [videoLoaded]);

  // 강제로 영상 표시 시도
  useEffect(() => {
    if (videoLoaded && videoRef.current) {
      const video = videoRef.current;
      
      // CSS 강제 적용
      video.style.cssText = `
        width: 100% !important;
        height: auto !important;
        min-height: 300px !important;
        background: #000 !important;
        display: block !important;
        object-fit: contain !important;
      `;
    }
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
          // 로드 완료 후 소리와 함께 재생 시도
          if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.play().catch(() => {
              // 자동재생 실패 시 사용자 클릭 유도
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
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// PROBLEM 섹션
function ProblemSection() {
  return (
    <AnimatedSection className="mb-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">부모들의 진짜 고민</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-red-500 pl-6 bg-red-50 p-4 rounded-r-lg">
              <p className="text-gray-800 mb-3">"아이 좌우가 심하게 틀어진 것 같은데..."</p>
              <p className="text-green-700 font-medium">→ 좌우 밸런스 정확한 수치로 측정</p>
            </div>
            <div className="border-l-4 border-red-500 pl-6 bg-red-50 p-4 rounded-r-lg">
              <p className="text-gray-800 mb-3">"운동시켜도 될까? 상위 1%도 살아남지 못하는데..."</p>
              <p className="text-green-700 font-medium">→ 1등급 달성 시 상위 1% 재능 확인</p>
            </div>
            <div className="border-l-4 border-red-500 pl-6 bg-red-50 p-4 rounded-r-lg">
              <p className="text-gray-800 mb-3">"정확히 얼마나 뒤처지는 거지?"</p>
              <p className="text-green-700 font-medium">→ 1~5등급 체제로 정확한 위치 확인</p>
            </div>
            <div className="border-l-4 border-red-500 pl-6 bg-red-50 p-4 rounded-r-lg">
              <p className="text-gray-800 mb-3">"병원에서 '괜찮다'고만 하고..."</p>
              <p className="text-green-700 font-medium">→ 5등급, 하위 4% 즉시 확인</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <img 
            src="/kidsmotion.png" 
            alt="KidsMotion 장비" 
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </AnimatedSection>
  );
}

// 현재 시스템 한계 섹션
function LimitationsSection() {
  return (
    <AnimatedSection className="mb-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">현재 검진의 구조적 한계</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
          <h3 className="text-xl font-bold text-yellow-700 mb-4">영유아검진</h3>
          <p className="text-gray-700 mb-4">"닭싸움 자세로 3번 점프" → ①②③④</p>
          <p className="text-red-600 font-medium">주관적 판단, 일관성 없음</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
          <h3 className="text-xl font-bold text-red-700 mb-4">초등체력장</h3>
          <p className="text-gray-700 mb-4">아날로그 측정으로 정확도 한계</p>
          <p className="text-red-600 font-medium">날씨, 공간에 따른 편차</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-xl font-bold text-blue-700 mb-4">국가 체력측정</h3>
          <p className="text-gray-700 mb-4">악력기로 부분근력만 측정</p>
          <p className="text-red-600 font-medium">정량 데이터 제공 안됨</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

// SOLUTION 섹션
function SolutionSection() {
  return (
    <AnimatedSection className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">KidsMotion의 차별점</h2>
        <p className="text-xl text-gray-600">정량적 데이터로 아이의 진짜 실력을 측정합니다</p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
        <div>
          <img 
            src="/dsfaaf.PNG" 
            alt="KidsMotion 인터페이스" 
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-6">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-purple-800 mb-3">유동성 프레임</h3>
            <p className="text-gray-700">키 100-150cm 대응, 성장하는 아동에게 지속 사용</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-800 mb-3">6가지 체력 평가</h3>
            <p className="text-gray-700">순발력, 파워지속력, 근력, 근지구력, 심폐지구력</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-green-800 mb-3">DC 모터 정밀 측정</h3>
            <p className="text-gray-700">좌우 독립 측정으로 밸런스 분석</p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// STRATEGY 섹션
function StrategySection() {
  return (
    <AnimatedSection className="mb-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">249만 아이들이 기다리는 시장</h2>
      
      {/* 시장 규모 */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="text-center bg-emerald-50 p-8 rounded-lg">
          <div className="text-4xl font-bold text-emerald-600 mb-2">249만명</div>
          <p className="text-gray-600">전국 초등학생</p>
        </div>
        <div className="text-center bg-red-50 p-8 rounded-lg">
          <div className="text-4xl font-bold text-red-600 mb-2">3,302개소</div>
          <p className="text-gray-600">소아·청소년과</p>
        </div>
        <div className="text-center bg-blue-50 p-8 rounded-lg">
          <div className="text-4xl font-bold text-blue-600 mb-2">2만4천개+</div>
          <p className="text-gray-600">아동 스포츠 학원</p>
        </div>
      </div>

      {/* 3개 시장 전략 */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-500">
          <h3 className="text-xl font-bold text-red-700 mb-4">병원 시장</h3>
          <p className="text-gray-700 mb-4">영유아검진 프리미엄 서비스로 차별화</p>
          <div className="text-2xl font-bold text-green-600">550만원</div>
          <p className="text-sm text-gray-600">장비 판매</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500">
          <h3 className="text-xl font-bold text-blue-700 mb-4">스포츠 학원</h3>
          <p className="text-gray-700 mb-4">실력 향상 데이터로 학부모 만족도 증가</p>
          <div className="text-2xl font-bold text-blue-600">월 5만원</div>
          <p className="text-sm text-gray-600">구독 서비스</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-purple-500">
          <h3 className="text-xl font-bold text-purple-700 mb-4">보건소</h3>
          <p className="text-gray-700 mb-4">지역 아동 건강 빅데이터 구축</p>
          <div className="text-2xl font-bold text-purple-600">정부 지원</div>
          <p className="text-sm text-gray-600">정책 연계</p>
        </div>
      </div>

      {/* 웹 리포트 이미지 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-lg">
        <h3 className="text-2xl font-bold text-center text-purple-800 mb-6">전문가급 분석 리포트</h3>
        <div className="flex justify-center">
          <img 
            src="/report.png" 
            alt="KidsMotion 웹 리포트" 
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </AnimatedSection>
  );
}

// TRACTION 섹션
function TractionSection() {
  return (
    <AnimatedSection className="mb-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">정부 정책과 완벽한 타이밍</h2>
      
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="bg-blue-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-blue-800 mb-6">국민체력100의 한계</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded border-l-4 border-orange-500">
              <h4 className="font-bold text-orange-600">아날로그 측정</h4>
              <p className="text-gray-700">줄자, 수동 카운트, 수동 기록</p>
            </div>
            <div className="bg-white p-4 rounded border-l-4 border-red-500">
              <h4 className="font-bold text-red-600">결과</h4>
              <p className="text-gray-700">정확성 부족, 빅데이터 구축 불가</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-green-800 mb-6">우리의 해결책</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded border-l-4 border-green-500">
              <h4 className="font-bold text-green-600">디지털 측정</h4>
              <p className="text-gray-700">정밀 센서, 실시간 데이터 수집</p>
            </div>
            <div className="bg-white p-4 rounded border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-600">빅데이터 기여</h4>
              <p className="text-gray-700">국민체력 데이터베이스 구축 지원</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-lg">
        <h3 className="text-2xl font-bold text-indigo-800 mb-4">완벽한 타이밍</h3>
        <p className="text-xl text-gray-700 mb-6">
          정부의 국민건강 데이터화 정책과 부모들의 정량적 데이터 니즈가 만나는 지점
        </p>
        <div className="text-3xl font-bold text-purple-600">
          지금이 바로 투자 시점입니다
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function IRMaterials({ onNavigate }: IRMaterialsProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        
        if (!isVisible && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        
        {/* KidsMotion 영상 - 첫 인상 */}
        <div className="mb-20">
          <div className="relative w-full max-w-5xl mx-auto">
            <VideoPlayer />
          </div>
        </div>

        {/* 간단한 메인 메시지 */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            부모의 걱정을 <span className="text-purple-600">데이터</span>로 바꾸는 팀
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            정량적 측정으로 아이의 정확한 체력과 성장 상태를 파악합니다
          </p>
        </motion.div>

        <ProblemSection />
        <LimitationsSection />
        <SolutionSection />
        <StrategySection />
        <TractionSection />
      </div>

      <CommonFooter onNavigate={onNavigate} />
    </div>
  );
}