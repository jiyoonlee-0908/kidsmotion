import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Target, Building2, BarChart3, Zap, MessageCircleQuestion, Play, Activity, Heart, Timer, Award, Shield, CheckCircle, Settings } from "lucide-react";
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-12 pt-24">
        
        {/* 창업자 편지 */}
        <div className="mb-32 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-800 mb-4">체력측정의 패러다임을 바꾸다</h1>
          </div>
          
          <div className="text-lg leading-relaxed text-gray-700 space-y-6">
            <div className="space-y-5">
              <p><span className="font-bold text-blue-700">통계청 발표에 따르면, 국민의 80%가 과학적 체력관리가 필요하다고 합니다.</span></p>
              
              <p>하지만 현실은 어떨까요? 체내 측정은 인바디로, 관절가동범위는 모션캡처로 디지털화되었지만, 정작 체력의 핵심인 <span className="font-bold text-red-600">순발력, 근력, 지구력 측정은 여전히 아날로그</span>입니다.</p>
              
              <p>PAPS 장비가 디지털화되었다고 하지만, 여전히 '몇 분 몇 초', '몇 미터'로만 측정됩니다. <span className="font-bold text-red-600">힘의 단위인 W(와트)로 측정되지 않아 정확히 언제, 어떻게 힘을 썼는지 알 수 없습니다.</span></p>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                <h3 className="text-lg font-bold text-blue-800 mb-3">기존 3가지 vs 우리의 6단계 혁신 평가</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-red-700 mb-2">기존 방식:</h4>
                    <ul className="space-y-1 text-sm text-red-600">
                      <li>• 멀리뛰기 → 거리만 측정</li>
                      <li>• 근거리 달리기 → 시간만 측정</li>
                      <li>• 장거리 달리기 → 지속시간만 측정</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-blue-700 mb-2">KidsMotion의 6단계 과학적 평가:</h4>
                    <ul className="space-y-1 text-sm text-blue-600">
                      <li>• <span className="font-bold">5초 테스트</span> → 순발력을 W 단위로 정밀측정</li>
                      <li>• <span className="font-bold">15초 테스트</span> → 근력을 생체역학적으로 분석</li>
                      <li>• <span className="font-bold">30초 테스트</span> → 젖산 역치 정확한 파악</li>
                      <li>• <span className="font-bold">60초 테스트</span> → 근지구력 세밀한 평가</li>
                      <li>• <span className="font-bold">180초 테스트</span> → 유산소와 무산소의 경계 측정</li>
                      <li>• <span className="font-bold">360초 테스트</span> → 심폐지구력 종합 분석</li>
                      <li>• <span className="font-bold">좌우 밸런스</span> → 성장기 불균형 조기 발견</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <p className="font-bold text-purple-700">"달리기와 멀리뛰기는 체력을 측정하는 도구가 아닙니다. 체력을 증진시키는 훈련방법이어야 합니다."</p>
              
              <div className="bg-gray-50 p-5 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-2">왜 사이클인가?</h4>
                <p className="text-sm">사이클링은 다리만의 운동이 아닙니다. <span className="font-bold text-blue-600">진정한 파워를 내기 위해서는 전신의 힘을 통합적으로 사용</span>해야 합니다. 또한 대칭 기구의 특성상 <span className="font-bold text-blue-600">좌우 불균형을 0.01% 단위까지 정확하게 감지</span>할 수 있습니다.</p>
              </div>

              <div className="bg-blue-50 p-5 rounded-xl">
                <h4 className="font-bold text-blue-800 mb-2">데이터 기반 맞춤형 성장</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• <span className="font-bold">정밀 측정</span>: W(와트) 단위 파워 측정으로 정확한 체력 평가</li>
                  <li>• <span className="font-bold">AI 분석</span>: 개별 아동의 성장 패턴 예측 및 맞춤형 훈련 제안</li>
                  <li>• <span className="font-bold">추적 관리</span>: 측정-평가-훈련의 과학적 순환 체계 구축</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 mt-5">
              <p className="text-lg font-bold text-purple-800">"측정이 올바라야 평가가 정확하고, 평가가 정확해야 훈련이 효과적입니다."<br/><br/>KidsMotion으로 아이들의 체력을 과학적으로 측정하고, 데이터 기반 개인 맞춤형 성장을 지원하겠습니다.</p>
            </div>
            
            <p className="text-right text-base font-medium text-purple-600 mt-3">– 모션바이크 대표</p>
          </div>
        </div>

        {/* MotionBike 핵심 기술 */}
        <div className="mb-32 mt-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">MotionBike 핵심 기술</h2>
          
          {/* 깔끔한 좌우 분할 레이아웃 */}
          <div className="grid grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
            {/* 왼쪽: 3개 이미지 - 세로로 3줄 */}
            <div className="space-y-6">
              {/* 키즈모션 사이클 */}
              <div className="text-center">
                <div className="w-full max-w-lg mx-auto">
                  <img 
                    src="/kidsmotion.png" 
                    alt="MotionBike 스마트사이클" 
                    className="w-full object-contain bg-gray-50 rounded-2xl shadow-xl cursor-pointer hover:shadow-2xl transition-shadow"
                    onClick={() => setSelectedImage('/kidsmotion.png')}
                  />
                  <p className="mt-3 text-lg font-semibold text-gray-800">키즈모션 사이클</p>
                </div>
              </div>
              
              {/* 모니터 앱 */}
              <div className="text-center">
                <div className="w-full max-w-lg mx-auto">
                  <img 
                    src="/dsfaaf.PNG" 
                    alt="모니터 앱" 
                    className="w-full object-contain bg-gray-50 rounded-2xl shadow-xl cursor-pointer hover:shadow-2xl transition-shadow"
                    onClick={() => setSelectedImage('/dsfaaf.PNG')}
                  />
                  <p className="mt-3 text-lg font-semibold text-gray-800">모니터 앱</p>
                </div>
              </div>
              
              {/* 웹리포트 결과지 */}
              <div className="text-center">
                <div className="w-full max-w-lg mx-auto">
                  <img 
                    src="/report.png" 
                    alt="웹리포트 결과지" 
                    className="w-full object-contain bg-gray-50 rounded-2xl shadow-xl cursor-pointer hover:shadow-2xl transition-shadow"
                    onClick={() => setSelectedImage('/report.png')}
                  />
                  <p className="mt-3 text-lg font-semibold text-gray-800">웹리포트 결과지</p>
                </div>
              </div>
            </div>

            {/* 오른쪽: 6개 기술 리스트 */}
            <div className="space-y-8 flex flex-col justify-between h-full">
              {/* 기술 1: 유동성 프레임 설계 */}
              <div className="bg-white rounded-2xl p-10 shadow-lg border-l-4 border-blue-600 flex-1">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">유동성 프레임 설계</h3>
                    <div className="space-y-2 text-gray-700 text-lg">
                      <p>• 키 100-150cm 대응</p>
                      <p>• 성장하는 아동을 위한 조절 가능한 프레임과 파츠</p>
                      <p>• 단일 장비로 만4-12세 연령대 커버</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 기술 2: DC 모터 정밀 측정 시스템 */}
              <div className="bg-white rounded-2xl p-10 shadow-lg border-l-4 border-blue-600 flex-1">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">2</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">DC모터 기반 정밀 저항 시스템</h3>
                    <div className="space-y-2 text-gray-700 text-lg">
                      <p>• 아동 체형에 맞춘 맞춤형 부하 조절</p>
                      <p>• 기계의 정밀도 향상으로 신뢰할 수 있는 데이터 확보</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 기술 3: 파워 & 밸런스 센서 기술 */}
              <div className="bg-white rounded-2xl p-10 shadow-lg border-l-4 border-blue-600 flex-1">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">3</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">파워 & 밸런스 센서</h3>
                    <div className="space-y-2 text-gray-700 text-lg">
                      <p>• 실시간 파워 센서: 객관적 체력 데이터 측정</p>
                      <p>• 좌우 밸런스 센서: 페달링 중 불균형을 정량 측정</p>
                      <p>• 과학적 체력 데이터 확보</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 기술 4: 6단계 정밀 체력 측정 */}
              <div className="bg-white rounded-2xl p-10 shadow-lg border-l-4 border-blue-600 flex-1">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">4</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">6단계 정밀 체력 측정</h3>
                    <div className="space-y-1 text-gray-700 text-lg">
                      <p>• 5초 순발력: 순간 최대 파워 측정</p>
                      <p>• 15초 스프린트: 무산소 능력 평가</p>
                      <p>• 30초 지속력: 젖산 역치 확인</p>
                      <p>• 60초 근력: 근육 지구력 측정</p>
                      <p>• 180초 근지구력: 유산소-무산소 경계</p>
                      <p>• 360초 심폐지구력: 유산소 능력 평가</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 기술 5: AI 맞춤 리포트 */}
              <div className="bg-white rounded-2xl p-10 shadow-lg border-l-4 border-blue-600 flex-1">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">5</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">AI 맞춤 리포트</h3>
                    <div className="space-y-2 text-gray-700 text-lg">
                      <p>• 복잡한 체력 데이터를 보호자 눈높이에 맞게 해석</p>
                      <p>• GPT-4 기반 코멘트 + 개인 맞춤 피드백 제공</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 기술 6: 기술발전계획 */}
              <div className="bg-white rounded-2xl p-10 shadow-lg border-l-4 border-blue-600 flex-1">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">6</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">기술 고도화 로드맵</h3>
                    <div className="space-y-2 text-gray-700 text-lg">
                      <p>• 외장형 센서 → 내장형 센서 전환</p>
                      <p>• 의료기기 인증으로 신뢰성 확보</p>
                      <p>• 의료기관 진단용 장비로 확장</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 영상 */}
        <div className="mb-32">
          <div className="relative w-full max-w-5xl mx-auto">
            <VideoPlayer />
          </div>
        </div>

        {/* 핵심 문제와 해결책 */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">부모의 걱정을 정량 데이터로 해결합니다</h2>
          
          <div className="grid grid-cols-2 gap-8 mb-16">
            {/* 왼쪽: 문제 */}
            <div>
              <h3 className="text-3xl font-bold text-red-700 mb-8 text-center">부모의 걱정</h3>
              <div className="space-y-4">
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 h-24 flex items-center">
                  <p className="text-lg font-bold text-red-800">"아이 몸이 좌우로 틀어져 보이는데, 성장에 영향이 없을까?"</p>
                </div>
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 h-24 flex items-center">
                  <p className="text-lg font-bold text-red-800">"우리아이 운동 능력정도면, 엘리트 선수로 성장할 가능성이 있는 걸까?"</p>
                </div>
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 h-24 flex items-center">
                  <p className="text-lg font-bold text-red-800">"다른 아이들보다 체력이 약한 것 같은데, 정확히 얼마나 부족한 걸까?"</p>
                </div>
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 h-24 flex items-center">
                  <p className="text-lg font-bold text-red-800">"병원에서는 괜찮다지만, 근거 있는 수치를 보고 싶어요."</p>
                </div>
              </div>
            </div>

            {/* 오른쪽: 해결책 */}
            <div>
              <h3 className="text-3xl font-bold text-blue-700 mb-8 text-center">데이터 기반 해결책</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 h-24 flex flex-col justify-center">
                  <p className="text-lg font-bold text-blue-800 mb-1">페달링 중 좌우 밸런스를 실시간 수치화</p>
                  <p className="text-blue-600">→ 비대칭 조기 발견 및 교정 가이드</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 h-24 flex flex-col justify-center">
                  <p className="text-lg font-bold text-blue-800 mb-1">백분위에서 상위 1% 체력 소유</p>
                  <p className="text-blue-600">→ 운동 잠재력 객관적 판단 가능</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 h-24 flex flex-col justify-center">
                  <p className="text-lg font-bold text-blue-800 mb-1">5등급 체계 + 백분위 수치 제공</p>
                  <p className="text-blue-600">→ 우리 아이의 정확한 위치 파악</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 h-24 flex flex-col justify-center">
                  <p className="text-lg font-bold text-blue-800 mb-1">하위 4%(5등급) 확인 즉시 알림</p>
                  <p className="text-blue-600">→ 운동 개입 필요 시점 자동 안내</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 정부 정책과 완벽한 연계 */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🏛️ 정부 정책과 완벽한 연계</h2>
            <p className="text-2xl font-bold text-blue-800">국민건강 데이터화 추진</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            {/* 왼쪽: 문제 (국민체력100의 한계) */}
            <div>
              <h3 className="text-3xl font-bold text-red-700 mb-8 text-center">국민체력100의 한계</h3>
              <div className="space-y-6">
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 min-h-[120px] flex flex-col justify-center">
                  <p className="text-lg font-bold text-red-800 mb-2">제자리 멀리뛰기 → 줄자로 측정</p>
                  <p className="text-red-600">정확성 한계</p>
                </div>
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 min-h-[120px] flex flex-col justify-center">
                  <p className="text-lg font-bold text-red-800 mb-2">윗몸말아올리기 → 사람이 카운트</p>
                  <p className="text-red-600">주관적 오차 발생</p>
                </div>
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 min-h-[120px] flex flex-col justify-center">
                  <p className="text-lg font-bold text-red-800 mb-2">왕복오래달리기 → 수동 기록</p>
                  <p className="text-red-600">기록 오류 가능성</p>
                </div>
                <div className="bg-red-100 p-6 rounded-xl border border-red-400 min-h-[80px] flex items-center justify-center">
                  <p className="text-xl font-bold text-red-900 text-center">결과: 정확성 부족, 빅데이터 구축 불가</p>
                </div>
              </div>
            </div>
            
            {/* 오른쪽: 해결책 (우리의 디지털 혁신) */}
            <div>
              <h3 className="text-3xl font-bold text-blue-700 mb-8 text-center">우리의 디지털 혁신</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 min-h-[120px] flex flex-col justify-center">
                  <p className="text-lg font-bold text-blue-800">정량적 데이터 수집 시스템</p>
                  <p className="text-blue-600">0.01% 정밀도의 와트 단위 측정</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 min-h-[120px] flex flex-col justify-center">
                  <p className="text-lg font-bold text-blue-800">국민체력 빅데이터 구축</p>
                  <p className="text-blue-600">연령별, 지역별 체력 데이터 자동 수집</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 min-h-[120px] flex flex-col justify-center">
                  <p className="text-lg font-bold text-blue-800">객관적 평가로 정책 수립</p>
                  <p className="text-blue-600">정확한 데이터 기반 정책 결정 지원</p>
                </div>
                <div className="bg-blue-100 p-6 rounded-xl border border-blue-400 min-h-[80px] flex items-center justify-center">
                  <p className="text-xl font-bold text-blue-900 text-center">MotionBike로 디지털 체력측정 실현</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 핵심 역량 기반 팀 구성 */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">핵심 역량 기반 팀 구성</h2>
          
          <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* 대표자 */}
            <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">대표자</h3>
                <p className="text-lg text-blue-600 font-medium">"사업 기획 및 기술 실현 전문성"</p>
              </div>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">2018년부터 현재까지 사이클 아카데미 어시스트를 하며, 현장 전문성 보유</p>
                <p className="leading-relaxed">웹 리포트 MVP, 스마트사이클 모니터 앱, 측정 프로토콜 개발</p>
              </div>
            </div>

            {/* 팀원 */}
            <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">팀원</h3>
                <p className="text-lg text-green-600 font-medium">"운동역학 및 데이터 분석 전문성"</p>
              </div>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">국가대표 사이클 선수 출신으로 운동역학 석사 (30년 엘리트 경력 + 13년간 아카데미 운영)</p>
                <p className="leading-relaxed">아동 체형 맞춤 커스텀 피팅 설계 및 운동 데이터 해석 알고리즘 기획</p>
                <p className="leading-relaxed">측정-분석-훈련 연결 데이터 기반 사이클링 교육 시스템 운영 경험</p>
              </div>
            </div>

            {/* 파트너 */}
            <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">파트너</h3>
                <p className="text-lg text-purple-600 font-medium">"하드웨어 개발 파트너십"</p>
              </div>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">자전거 부품 특허 다수 보유</p>
                <p className="leading-relaxed">키즈모션 사이클 프레임 및 부품 공동 설계</p>
                <p className="leading-relaxed">현재 MVP 시제품 공동 개발 중</p>
              </div>
            </div>
          </div>
        </div>

        {/* 시장 규모 */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">249만 아이들이 기다리는 시장</h2>
          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="text-center bg-emerald-50 p-8 rounded-3xl shadow-lg">
              <div className="text-5xl font-bold text-emerald-600 mb-4">249만명</div>
              <div className="text-xl font-medium text-gray-700">전국 초등학생 수</div>
              <div className="text-gray-500">(2024년 기준)</div>
            </div>
            <div className="text-center bg-red-50 p-8 rounded-3xl shadow-lg">
              <div className="text-5xl font-bold text-red-600 mb-4">3,302개소</div>
              <div className="text-xl font-medium text-gray-700">소아·청소년과</div>
              <div className="text-gray-500">전문 진료기관</div>
            </div>
            <div className="text-center bg-blue-50 p-8 rounded-3xl shadow-lg">
              <div className="text-5xl font-bold text-blue-600 mb-4">2만4천개+</div>
              <div className="text-xl font-medium text-gray-700">아동 스포츠 학원</div>
              <div className="text-gray-500">(축구·태권도·수영 등)</div>
            </div>
          </div>

          {/* 3개 시장별 특화 서비스 */}
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-red-500">
              <h3 className="text-2xl font-bold text-red-700 mb-6 text-center">병원</h3>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-xl">
                  <p className="font-bold text-red-800 mb-2">✓ 프리미엄 성장검진 + 운동 능력 정량 평가</p>
                  <p className="text-gray-600 text-sm">차별화된 진단 서비스로 환자 만족도 향상</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-500">
              <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">스포츠 학원</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="font-bold text-blue-800 mb-2">✓ 실력 향상 데이터 제공</p>
                  <p className="text-gray-600 text-sm">학부모 신뢰도 증가와 경쟁력 확보로 등록 유도</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-purple-500">
              <h3 className="text-2xl font-bold text-purple-700 mb-6 text-center">보건소/공공기관</h3>
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-xl">
                  <p className="font-bold text-purple-800 mb-2">✓ 아동 체력 건강 빅데이터</p>
                  <p className="text-gray-600 text-sm">정책 수립을 위한 데이터 구축</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MotionBike 솔루션 가격 */}
        <div className="mb-32">
          <div className="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-3xl py-8 px-8 mb-12">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-indigo-800 mb-4">MotionBike 솔루션</h3>
              <div className="flex items-center justify-center space-x-4">
                <div className="bg-white rounded-2xl px-8 py-4 shadow-lg">
                  <div className="text-3xl font-bold text-indigo-600">550만원</div>
                  <p className="text-gray-600">장비 도입</p>
                </div>
                <div className="text-3xl text-indigo-500">+</div>
                <div className="bg-white rounded-2xl px-8 py-4 shadow-lg">
                  <div className="text-3xl font-bold text-blue-600">월 5만원</div>
                  <p className="text-gray-600">서비스 구독</p>
                </div>
              </div>
              
              {/* 서비스 구독 내용 */}
              <div className="mt-4 text-blue-600">
                AI 분석 리포트 제공 + 누적 데이터 기반 백분위 업데이트 + 성장 추이 분석 및 체력 변화 자동 기록
              <div>(향후 의료기관 전용 모드 포함 예정)</div>
              </div>
            </div>
          </div>
        </div>

        {/* 파일럿 테스트 */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">지금, 이 시장을 증명하고 있습니다</h2>
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold text-center mb-8">2025년 파일럿 테스트 확정</h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-12">
              <div className="bg-white/20 rounded-2xl p-8">
                <h4 className="text-2xl font-bold text-blue-300 mb-6">IYC 유소년 스포츠센터</h4>
                <div className="space-y-4 text-lg">
                  <div>📍 위치: 서울 강서구</div>
                  <div>📅 기간: 2025년 7월부터 1년간</div>
                  <div>👶 대상: 100명 아동</div>
                  <div>📊 측정: 6가지 체력 지표</div>
                </div>
              </div>
              <div className="bg-white/20 rounded-2xl p-8">
                <h4 className="text-2xl font-bold text-green-300 mb-6">목표 성과</h4>
                <div className="space-y-4 text-lg">
                  <div>🎯 한국 유아 전용 체력 기준 정립</div>
                  <div>🤖 AI 피드백 알고리즘 개발</div>
                  <div>📈 데이터 기반 분석 시스템 완성</div>
                  <div>💡 시장 검증 및 개선점 도출</div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* 투자 제안 */}
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-indigo-800 mb-6">함께 만들어가요</h2>
            <p className="text-2xl text-gray-700 leading-loose">
              이 팀에게 손을 내밀어주시면,<br/>
              <span className="font-bold text-purple-700">아이들의 미래가 달라집니다</span>
            </p>
          </div>
          
          <div className="bg-white rounded-3xl p-12 shadow-lg">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold text-purple-600 mb-3">투자가 아닌 동반자로서,</div>
                  <p className="text-xl text-gray-600 leading-relaxed">함께 아이들의 성장을 지켜봐 주세요</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl text-center">
                <div className="text-2xl font-bold text-gray-800 mb-4">📱 전화</div>
                <div className="text-lg text-blue-600">010-8445-0908</div>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl text-center">
                <div className="text-2xl font-bold text-gray-800 mb-4">📧 이메일</div>
                <div className="text-lg text-blue-600">dayinj@naver.com</div>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl text-center">
                <div className="text-2xl font-bold text-gray-800 mb-4">🏢 주소</div>
                <div className="text-lg text-blue-600">서울시 강서구 금낭화로 234, GX2</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CommonFooter onNavigate={onNavigate} />

      {/* 이미지 팝업 모달 */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl font-bold z-10"
            >
              ✕ 닫기
            </button>
            <img
              src={selectedImage}
              alt="원본 이미지"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}