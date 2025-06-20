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

export default function IRMaterials({ onNavigate }: IRMaterialsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        
        {/* KidsMotion 영상 - 첫 인상 */}
        <div className="mb-16">
          <div className="relative w-full max-w-5xl mx-auto">
            <VideoPlayer />
          </div>
        </div>

        {/* 메인 메시지 */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            부모의 걱정을 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">데이터로 바꾸는 팀</span>
          </h1>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
            아이가 바르게 자라는지 알고 싶은 부모의 마음,<br/>
            <span className="font-semibold text-blue-700">MotionBike에서 정량 데이터로 답해드릴게요</span>
          </p>
        </div>

        {/* 문제와 해결책 - 매칭된 좌우 배치 */}
        <div className="mb-20">
          <div className="grid grid-cols-2 gap-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center">부모들의 현실적 걱정</h2>
            <h2 className="text-3xl font-bold text-blue-800 text-center">우리의 데이터 기반 해결책</h2>
          </div>
          
          <div className="space-y-8">
            {/* 첫 번째 매칭 */}
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-gray-400">
                <div className="text-xl font-bold text-gray-800 mb-3">"아이 좌우가 심하게 틀어진 것 같은데..."</div>
                <div className="text-lg text-gray-600">"혹시 성장에 문제가 생기는 건 아니겠지?"</div>
              </div>
              <div className="bg-blue-50 p-8 rounded-2xl shadow-md border-l-4 border-blue-500">
                <div className="text-xl font-bold text-blue-700 mb-3">좌우 밸런스 정확한 수치로 측정</div>
                <div className="text-lg text-blue-600">→ 개선방안 제시</div>
              </div>
            </div>

            {/* 두 번째 매칭 */}
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-gray-400">
                <div className="text-xl font-bold text-gray-800 mb-3">"운동시키고 싶은데 이 정도면 괜찮을까?"</div>
                <div className="text-lg text-gray-600">"상위 1%도 살아남지 못하는데..."</div>
              </div>
              <div className="bg-green-50 p-8 rounded-2xl shadow-md border-l-4 border-green-500">
                <div className="text-xl font-bold text-green-700 mb-3">1등급 달성 시 상위 1% 재능 확인</div>
                <div className="text-lg text-green-600">→ 운동 투자 가치 명확 판단</div>
              </div>
            </div>

            {/* 세 번째 매칭 */}
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-gray-400">
                <div className="text-xl font-bold text-gray-800 mb-3">"다른 아이들보다 체력이 떨어지는 것 같은데..."</div>
                <div className="text-lg text-gray-600">"정확히 얼마나 뒤처지는 거지?"</div>
              </div>
              <div className="bg-purple-50 p-8 rounded-2xl shadow-md border-l-4 border-purple-500">
                <div className="text-xl font-bold text-purple-700 mb-3">1~5등급 체제와 백분위 제공</div>
                <div className="text-lg text-purple-600">→ 우리 아이의 정확한 위치 확인</div>
              </div>
            </div>

            {/* 네 번째 매칭 */}
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-gray-400">
                <div className="text-xl font-bold text-gray-800 mb-3">"병원에서 '괜찮다'고만 하고..."</div>
                <div className="text-lg text-gray-600">"정말 괜찮은 건지 불안해!"</div>
              </div>
              <div className="bg-orange-50 p-8 rounded-2xl shadow-md border-l-4 border-orange-500">
                <div className="text-xl font-bold text-orange-700 mb-3">5등급, 하위 4% 바로 확인</div>
                <div className="text-lg text-orange-600">→ 조기 개입으로 즉시 대응</div>
              </div>
            </div>
          </div>
        </div>

        {/* 기술력과 이미지 - 좌우 배치 */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20 items-center">
          {/* 왼쪽: 기술 특징 */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">혁신적 측정 기술</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">1</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">유동성 프레임 설계</h3>
                  <p className="text-lg text-gray-600">키 100-150cm 완벽 대응, 성장하는 아동을 위한 조절 가능한 구조</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">2</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">DC 모터 정밀 측정</h3>
                  <p className="text-lg text-gray-600">좌우 독립 센서로 0.1W 단위 정확도, 실시간 밸런스 분석</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">3</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">6가지 체력 지표</h3>
                  <p className="text-lg text-gray-600">순발력・파워지속력・근력・근지구력・심폐지구력・밸런스</p>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 키즈모션 사이클 이미지 */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-purple-200 to-blue-200 rounded-3xl opacity-40"></div>
              <img 
                src="/kidsmotion.png" 
                alt="KidsMotion 스마트 사이클" 
                className="relative w-full max-w-lg rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* 시장 규모 */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">필요한 곳에 닿고 있습니다</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-gradient-to-br from-emerald-50 to-green-100 p-10 rounded-3xl shadow-lg">
              <div className="text-6xl font-bold text-emerald-600 mb-4">249만명</div>
              <div className="text-xl font-medium text-gray-700">전국 초등학생 수</div>
              <div className="text-gray-500">(2024년 기준)</div>
            </div>
            <div className="text-center bg-gradient-to-br from-red-50 to-pink-100 p-10 rounded-3xl shadow-lg">
              <div className="text-6xl font-bold text-red-600 mb-4">3,302개소</div>
              <div className="text-xl font-medium text-gray-700">소아·청소년과</div>
              <div className="text-gray-500">전문 진료기관</div>
            </div>
            <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-100 p-10 rounded-3xl shadow-lg">
              <div className="text-6xl font-bold text-blue-600 mb-4">2만4천개+</div>
              <div className="text-xl font-medium text-gray-700">아동 스포츠 학원</div>
              <div className="text-gray-500">(축구·태권도·수영 등)</div>
            </div>
          </div>
        </div>

        {/* 팀 구성 */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">신뢰할 수 있는 전문가 팀</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-3xl p-10">
              <h3 className="text-3xl font-bold text-purple-800 mb-8">대표 & 창업자</h3>
              <div className="space-y-6">
                <div className="bg-white/80 p-6 rounded-2xl">
                  <h4 className="text-xl font-bold text-purple-600 mb-3">MotionBike 대표</h4>
                  <p className="text-gray-700">10년+ 사이클 아카데미 어시스트 경험</p>
                  <p className="text-gray-700">수많은 아동 선수와 부모들의 고민을 현장에서 직접 경험</p>
                </div>
                <div className="bg-white/80 p-6 rounded-2xl">
                  <h4 className="text-xl font-bold text-blue-600 mb-3">기술 공동창업자</h4>
                  <p className="text-gray-700">국가대표 선수 출신 (24년 경력)</p>
                  <p className="text-gray-700">사이클 전문 아카데미 운영</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-10">
              <h3 className="text-3xl font-bold text-green-800 mb-8">개발팀 & 기술진</h3>
              <div className="space-y-6">
                <div className="bg-white/80 p-6 rounded-2xl">
                  <h4 className="text-xl font-bold text-green-600 mb-3">하드웨어 개발팀</h4>
                  <p className="text-gray-700">DC 모터 기반 정밀 제어 시스템</p>
                  <p className="text-gray-700">아동 맞춤 하드웨어 설계 전문</p>
                </div>
                <div className="bg-white/80 p-6 rounded-2xl">
                  <h4 className="text-xl font-bold text-blue-600 mb-3">소프트웨어 개발팀</h4>
                  <p className="text-gray-700">AI 기반 분석 시스템</p>
                  <p className="text-gray-700">실시간 데이터 수집 및 분석</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 파일럿 테스트 성과 */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">지금, 이 시장을 증명하고 있습니다</h2>
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold text-center mb-8">2025년 파일럿 테스트 확정</h3>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-white/20 rounded-2xl p-8">
                <h4 className="text-2xl font-bold text-blue-300 mb-6">IYC 유소년 스포츠센터</h4>
                <div className="space-y-4">
                  <div className="text-lg">📍 위치: 서울 강서구</div>
                  <div className="text-lg">📅 기간: 2025년 7월부터 1년간</div>
                  <div className="text-lg">👶 대상: 100명 아동</div>
                  <div className="text-lg">📊 측정: 6가지 체력 지표</div>
                </div>
              </div>
              <div className="bg-white/20 rounded-2xl p-8">
                <h4 className="text-2xl font-bold text-green-300 mb-6">목표 성과</h4>
                <div className="space-y-4">
                  <div className="text-lg">🎯 한국 유아 전용 체력 기준선 생성</div>
                  <div className="text-lg">🤖 AI 피드백 알고리즘 개발</div>
                  <div className="text-lg">📈 데이터 기반 분석 시스템 완성</div>
                  <div className="text-lg">💡 시장 검증 및 개선점 도출</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 정부 정책 연계 */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-12">
            <div className="text-center mb-12">
              <div className="text-5xl font-bold mb-4">🏛️ 정부 정책과 완벽한 연계</div>
              <div className="text-3xl font-bold text-indigo-700">국민건강 데이터화 추진</div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-red-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-red-700 mb-6">국민체력100의 한계</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl">
                    <div className="font-bold text-red-600">제자리 멀리뛰기 → 줄자로 측정</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <div className="font-bold text-red-600">윗몸말아올리기 → 사람이 카운트</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <div className="font-bold text-red-600">왕복오래달리기 → 수동 기록</div>
                  </div>
                  <div className="bg-red-200 p-4 rounded-xl">
                    <div className="font-bold text-red-800">결과: 정확성 부족, 빅데이터 구축 불가</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-green-700 mb-6">우리의 디지털 혁신</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl">
                    <div className="font-bold text-green-600">정량적 데이터 수집 시스템</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <div className="font-bold text-green-600">국민체력 빅데이터 구축</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <div className="font-bold text-green-600">객관적 평가로 정책 수립</div>
                  </div>
                  <div className="bg-green-200 p-4 rounded-xl">
                    <div className="font-bold text-green-800">MotionBike로 디지털 체력측정 실현</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 투자 제안 */}
        <div className="text-center bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-indigo-800 mb-6">함께 만들어가요</h2>
          <p className="text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            이 팀에게 손을 내밀어주시면,<br/>
            <span className="font-bold text-purple-700">아이들의 미래가 달라집니다</span>
          </p>
          <div className="inline-flex items-center space-x-6 bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold text-purple-600">투자가 아닌 동반자로서,</div>
              <p className="text-xl text-gray-600">함께 아이들의 성장을 지켜봐 주세요</p>
            </div>
          </div>
        </div>
      </div>

      <CommonFooter onNavigate={onNavigate} />
    </div>
  );
}