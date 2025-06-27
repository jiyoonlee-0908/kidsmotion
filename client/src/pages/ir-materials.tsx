import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Target, Building2, BarChart3, Zap, MessageCircleQuestion, Play, Activity, Heart, Timer, Award, Shield, CheckCircle } from "lucide-react";
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
        
        {/* 영상 */}
        <div className="mb-16">
          <div className="relative w-full max-w-5xl mx-auto">
            <VideoPlayer />
          </div>
        </div>

        {/* 창업자 편지 */}
        <div className="mb-20 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-purple-800 mb-4">💝 창업자 편지</h1>
            <p className="text-2xl text-purple-600">"엄마로서의 걱정이, 창업으로 이어졌습니다."</p>
          </div>
          
          <div className="max-w-4xl mx-auto text-lg leading-relaxed text-gray-700 space-y-6">
            <p>아이를 자전거에 태웠을 때였습니다. 자꾸 허리가 한쪽으로 기울고, 자세가 불안정해 보였습니다. 제가 척추측만증이 있다 보니 더 민감하게 느꼈는지도 모르겠습니다. 하지만 분명 어딘가 불편해 보였고, 걱정이 되었습니다.</p>
            
            <p>병원에 갔습니다. <span className="font-bold text-red-600">"아이들은 원래 그래요. 괜찮아요." "MRI까지 찍을 필요는 없고, 엑스레이로도 잘 안 나와요."</span> 그렇게 말하더군요.</p>
            
            <p className="font-bold text-purple-700">그 순간 알았습니다. "괜찮다"는 말은 근거가 없으면 안심이 되지 않는다는 걸요. 정확히 어디가, 얼마나, 어떤 이유로 괜찮은지 설명해주는 수치는 없었습니다.</p>
            
            <p>저는 남편의 사이클 아카데미에서 어시스트 업무를 맡고 있습니다. 남편은 국가대표 선수 출신이며 24년간 사이클 선수로 활동했고, 저는 그 곁에서 10년 넘게 수많은 사이클 선수를 희망하는 아이들과 부모들을 가까이에서 지켜봤습니다.</p>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-purple-500">
              <p className="text-xl font-bold text-purple-800 mb-4">그래서 저는 만들었습니다.</p>
              <ul className="space-y-2 text-purple-700">
                <li>• 운동 자질을 데이터로 확인할 수 있는 장비</li>
                <li>• 운동에 소질이 있는 아이를 조기에 발견할 수 있는 시스템</li>
                <li>• 눈으로 확인할 수 있는 성장 데이터</li>
                <li>• 부모가 납득할 수 있는 해석 리포트</li>
              </ul>
            </div>
            
            <p className="text-center text-2xl font-bold text-purple-800">이제는 '괜찮을 거예요'가 아니라<br/>"지금 어떤 상태고, 앞으로 무엇을 해야 할지"를 말할 수 있어야 할 때입니다.</p>
            
            <p className="text-right text-lg font-medium text-purple-600">– 모션바이크 대표</p>
          </div>
        </div>

        {/* 핵심 문제와 해결책 */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">부모의 걱정을 데이터로 바꾸는 솔루션</h2>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* 왼쪽: 문제 */}
            <div>
              <h3 className="text-3xl font-bold text-red-700 mb-8 text-center">부모들의 현실적 걱정</h3>
              <div className="space-y-4">
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 h-24 flex items-center">
                  <p className="text-lg font-bold text-red-800">"아이 좌우가 심하게 틀어진 것 같은데... 혹시 성장에 문제가 생기는 건 아니겠지?"</p>
                </div>
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 h-24 flex items-center">
                  <p className="text-lg font-bold text-red-800">"운동시키고 싶은데 이 정도면 괜찮을까? 상위 1%도 살아남지 못하는데..."</p>
                </div>
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 h-24 flex items-center">
                  <p className="text-lg font-bold text-red-800">"다른 아이들보다 체력이 떨어지는 것 같은데... 정확히 얼마나 뒤처지는 거지?"</p>
                </div>
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 h-24 flex items-center">
                  <p className="text-lg font-bold text-red-800">"병원에서 '괜찮다'고만 하고... 정말 괜찮은 건지 불안해!"</p>
                </div>
              </div>
            </div>

            {/* 오른쪽: 해결책 */}
            <div>
              <h3 className="text-3xl font-bold text-blue-700 mb-8 text-center">우리의 데이터 기반 해결책</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 h-24 flex flex-col justify-center">
                  <p className="text-lg font-bold text-blue-800 mb-1">좌우 밸런스 정확한 수치로 측정</p>
                  <p className="text-blue-600">→ 개선방안 제시</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 h-24 flex flex-col justify-center">
                  <p className="text-lg font-bold text-blue-800 mb-1">1등급 달성 시 상위 1% 재능 확인</p>
                  <p className="text-blue-600">→ 운동 투자 가치 명확 판단</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 h-24 flex flex-col justify-center">
                  <p className="text-lg font-bold text-blue-800 mb-1">1~5등급 체제와 백분위 제공</p>
                  <p className="text-blue-600">→ 우리 아이의 정확한 위치 확인</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 h-24 flex flex-col justify-center">
                  <p className="text-lg font-bold text-blue-800 mb-1">5등급, 하위 4% 바로 확인</p>
                  <p className="text-blue-600">→ 조기 개입으로 즉시 대응</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 기술력과 차별점 */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* 왼쪽: 기술 */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">혁신적 측정 기술</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">유동성 프레임 설계</h3>
                    <p className="text-gray-600">키 100-150cm 대응, 성장하는 아동을 위한 조절 가능한 구조</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">2</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">DC 모터 정밀 측정</h3>
                    <p className="text-gray-600">정밀한 분석, 기계의 정밀도 향상</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">3</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">6가지 체력 지표</h3>
                    <p className="text-gray-600">순발력・파워지속력・근력・근지구력・심폐지구력・밸런스</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 이미지 */}
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src="/kidsmotion.png" 
                  alt="KidsMotion 스마트 사이클" 
                  className="w-full max-w-lg rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 시장 규모 */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">249만 아이들이 기다리는 시장</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
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
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-red-500">
              <h3 className="text-2xl font-bold text-red-700 mb-6 text-center">병원 시장</h3>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-xl">
                  <p className="font-bold text-red-800 mb-2">✓ 영유아검진 프리미엄 서비스</p>
                  <p className="text-gray-600 text-sm">차별화된 진단 서비스로 환자 만족도 향상</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-500">
              <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">스포츠 학원</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="font-bold text-blue-800 mb-2">✓ 실력 향상 데이터 제공</p>
                  <p className="text-gray-600 text-sm">학부모 신뢰도 증가와 경쟁력 확보</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-purple-500">
              <h3 className="text-2xl font-bold text-purple-700 mb-6 text-center">보건소/공공기관</h3>
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-xl">
                  <p className="font-bold text-purple-800 mb-2">✓ 지역 아동 건강 빅데이터</p>
                  <p className="text-gray-600 text-sm">정책 수립을 위한 데이터 구축</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 통합 솔루션 가격 */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-3xl p-8 mb-12">
            <div className="text-center mb-8">
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
              <div className="mt-6 text-blue-600">
                AI 분석 + 누적 데이터 통계 + 백분위 업데이트 + 분석 리포트
              </div>
            </div>
          </div>
        </div>

        {/* 팀 구성 */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">핵심 역량 기반 팀 구성</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-8">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  CEO
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">대표이사</h3>
                  <p className="text-blue-600">사업 기획 및 기술 실현 전문성</p>
                </div>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>• <strong>10년+ 아카데미 운영</strong>으로 유소년 체력측정·훈련 현장 전문성 보유</p>
                <p>• <strong>웹 리포트 MVP, 스마트사이클 모니터 앱, 측정 프로토콜 개발</strong> 완료</p>
                <p>• 현장 피드백 기반 <strong>B2B 제품 설계</strong> 및 <strong>병원·보건소·체육시설 네트워크</strong> 확보</p>
                <p>• 기획부터 개발, 시장 검증까지 <strong>end-to-end 실현 역량</strong> 보유</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  CTO
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">기술공동창업자</h3>
                  <p className="text-green-600">운동역학 및 데이터 분석 전문성</p>
                </div>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>• 운동역학 석사 + 전 국가대표 선수 (<strong>30년 엘리트 경력</strong> + <strong>13년 아카데미 운영</strong>)</p>
                <p>• 아동 체형 맞춤 <strong>커스텀 피팅 설계</strong> 및 <strong>운동 데이터 해석 알고리즘</strong> 기획</p>
                <p>• <strong>측정-분석-훈련 연결</strong> 데이터 기반 사이클링 교육 시스템 운영 경험</p>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  HW
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">하드웨어 개발 파트너</h3>
                  <p className="text-purple-600">하드웨어 개발 파트너십</p>
                </div>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>• <strong>자전거 부품 설계 특허 보유</strong> 기업과 협력</p>
                <p>• 현재 <strong>MVP 시제품 공동 개발 진행 중</strong></p>
                <p>• 검증된 기술력으로 <strong>제품 실현 가능성 확보</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* 파일럿 테스트 */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">지금, 이 시장을 증명하고 있습니다</h2>
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold text-center mb-8">2025년 파일럿 테스트 확정</h3>
            <div className="grid lg:grid-cols-2 gap-12">
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
                  <div>🎯 한국 유아 전용 체력 기준선 생성</div>
                  <div>🤖 AI 피드백 알고리즘 개발</div>
                  <div>📈 데이터 기반 분석 시스템 완성</div>
                  <div>💡 시장 검증 및 개선점 도출</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 정부 정책 연계 */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-indigo-800 mb-4">🏛️ 정부 정책과 완벽한 연계</h2>
              <p className="text-2xl text-indigo-600">국민건강 데이터화 추진</p>
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
          
          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-lg font-bold text-gray-800 mb-2">📱 전화</div>
              <div className="text-blue-600">010-8445-0908</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-lg font-bold text-gray-800 mb-2">📧 이메일</div>
              <div className="text-blue-600">dayinj@naver.com</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-lg font-bold text-gray-800 mb-2">🏢 주소</div>
              <div className="text-blue-600">서울시 강서구 금낭화로 234, GX2</div>
            </div>
          </div>
        </div>
      </div>

      <CommonFooter onNavigate={onNavigate} />
    </div>
  );
}