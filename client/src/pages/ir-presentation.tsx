import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Target, Building2, BarChart3, Zap, Activity, Heart, Timer, Award, Shield, CheckCircle, Settings, ArrowRight, Lightbulb, Users2, Trophy, Brain } from "lucide-react";
import { useState } from "react";

import CommonFooter from "@/components/common-footer";

interface IRPresentationProps {
  onNavigate?: (page: string) => void;
}

export default function IRPresentation({ onNavigate }: IRPresentationProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-12 pt-24">
        
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">모션바이크 IR 발표자료</h1>
          <p className="text-2xl text-gray-600 mb-8">"아이 몸속 '힘'을 측정하는 팀"</p>
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={() => onNavigate?.('ir-materials')} 
              variant="outline" 
              className="text-lg px-8 py-3"
            >
              기존 IR 자료 보기
            </Button>
          </div>
        </div>

        {/* 섹션 1: 현재 문제점 */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="text-lg px-6 py-2 mb-4 bg-red-100 text-red-800">Section 1</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">아이들의 체력은 어떻게 측정되고 있을까요?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              하루가 다르게 기술이 진화하는 요즘, 정작 우리 아이들의 체력은 어떤 장비로 어떻게 재고 있을까요?
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-12">
            {/* 체내분석 */}
            <div className="text-center bg-blue-50 p-8 rounded-3xl shadow-lg">
              <Activity className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-blue-800 mb-4">체내분석</h3>
              <p className="text-lg text-gray-700">인바디가 담당</p>
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mt-4" />
            </div>

            {/* 관절 각도 */}
            <div className="text-center bg-green-50 p-8 rounded-3xl shadow-lg">
              <Settings className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-800 mb-4">관절 각도</h3>
              <p className="text-lg text-gray-700">모션캡쳐 장비가 담당</p>
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mt-4" />
            </div>

            {/* 근력·지구력·순발력 */}
            <div className="text-center bg-red-50 p-8 rounded-3xl shadow-lg border-4 border-red-300">
              <Zap className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-red-800 mb-4">근력·지구력·순발력</h3>
              <p className="text-lg text-red-700 font-bold">❓ 어디서도 스마트하게 측정되지 않습니다</p>
              <div className="w-8 h-8 text-red-500 mx-auto mt-4 text-3xl">❌</div>
            </div>
          </div>

          {/* 현재 측정 방식의 한계 */}
          <div className="bg-yellow-50 p-8 rounded-3xl shadow-lg">
            <h3 className="text-3xl font-bold text-center text-yellow-800 mb-8">현재 아동 체력 측정의 현실</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white p-6 rounded-2xl shadow-md">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">영유아 검진</h4>
                  <p className="text-gray-600">줄자와 스톱워치 중심의 아날로그 방식</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-6 rounded-2xl shadow-md">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">국민체력100</h4>
                  <p className="text-gray-600">디지털 기기 일부 있지만 결과는 시간/거리 단위</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-6 rounded-2xl shadow-md">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">체력장</h4>
                  <p className="text-gray-600">아이 몸에서 언제 얼마나 강한 힘을 썼는지 알 수 없음</p>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-2xl font-bold text-red-700">민간도 비슷합니다. 성인은 윙게이트 같은 파워 측정 장비가 있지만, 아동용 힘 측정 장비는 전무합니다.</p>
            </div>
          </div>
        </div>

        {/* 섹션 2: 키즈모션 솔루션 */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="text-lg px-6 py-2 mb-4 bg-blue-100 text-blue-800">Section 2</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">그래서 저희가 만들었습니다</h2>
            <p className="text-2xl text-blue-600 font-bold max-w-4xl mx-auto">
              아이의 힘을 와트로 수치화하는 첫 장비, 키즈모션
            </p>
          </div>

          {/* 키즈모션 기기 이미지 */}
          <div className="text-center mb-12">
            <div className="max-w-2xl mx-auto">
              <img 
                src="/kidsmotion.png" 
                alt="키즈모션 기기" 
                className="w-full object-contain bg-gray-50 rounded-3xl shadow-2xl cursor-pointer hover:shadow-3xl transition-shadow"
                onClick={() => setSelectedImage('/kidsmotion.png')}
              />
            </div>
          </div>

          {/* 측정 항목들 */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            {/* 왼쪽: 측정 항목 */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">실시간 정밀 측정</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500 flex items-center">
                  <Timer className="w-8 h-8 text-blue-600 mr-4" />
                  <div>
                    <p className="text-xl font-bold text-blue-800">5초 순발력</p>
                    <p className="text-blue-600">기존: 제자리 멀리뛰기 → 5초 순발력 파워 측정</p>
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-2xl border-l-4 border-green-500 flex items-center">
                  <Zap className="w-8 h-8 text-green-600 mr-4" />
                  <div>
                    <p className="text-xl font-bold text-green-800">15초 근력</p>
                    <p className="text-green-600">기존: 단거리달리기 → 15초 근력 파워 측정</p>
                  </div>
                </div>
                <div className="bg-purple-50 p-6 rounded-2xl border-l-4 border-purple-500 flex items-center">
                  <Heart className="w-8 h-8 text-purple-600 mr-4" />
                  <div>
                    <p className="text-xl font-bold text-purple-800">360초 심폐지구력</p>
                    <p className="text-purple-600">기존: 오래달리기 → 360초 심폐지구력 테스트</p>
                  </div>
                </div>
                <div className="bg-orange-50 p-6 rounded-2xl border-l-4 border-orange-500 flex items-center">
                  <BarChart3 className="w-8 h-8 text-orange-600 mr-4" />
                  <div>
                    <p className="text-xl font-bold text-orange-800">좌우 밸런스</p>
                    <p className="text-orange-600">실시간 좌우 균형 측정 및 분석</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 기술적 특징 */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">어떻게 가능할까요?</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">🚴‍♂️ 사이클 기반 측정</h4>
                  <p className="text-gray-700">전신에서 발생하는 힘을 정밀하게 측정하고, 좌우 불균형까지 정확히 잡아냅니다</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">📊 파워센서 내장</h4>
                  <p className="text-gray-700"><span className="font-bold text-blue-600">오차율 ±1%</span>의 정밀한 파워센서로 객관적 데이터 확보</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">⚙️ 가변형 구조</h4>
                  <p className="text-gray-700">성장기 아이 체형에 맞게 조절 가능 (키 100-150cm, 만4-12세)</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">📱 실시간 연동</h4>
                  <p className="text-gray-700">시공간 제약 없이 실시간 데이터를 정확하게 반복 수집</p>
                </div>
              </div>
            </div>
          </div>

          {/* 측정 후 결과 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-3xl shadow-lg">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">측정 완료 즉시 제공되는 것들</h3>
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center bg-white p-6 rounded-2xl shadow-md">
                <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-gray-800">와트 단위 차트</h4>
              </div>
              <div className="text-center bg-white p-6 rounded-2xl shadow-md">
                <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-gray-800">백분위 등급</h4>
              </div>
              <div className="text-center bg-white p-6 rounded-2xl shadow-md">
                <Brain className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-gray-800">AI 해설 리포트</h4>
              </div>
              <div className="text-center bg-white p-6 rounded-2xl shadow-md">
                <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-gray-800">맞춤 가이드</h4>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-xl text-gray-700">
                <span className="font-bold text-green-600">상위 1% 아이는 영재 육성의 근거</span>, 
                <span className="font-bold text-red-600 ml-2">하위 5% 아이는 조기 개입으로 성장 격차를 줄일 수 있습니다</span>
              </p>
            </div>
          </div>
        </div>

        {/* 섹션 3: 시장 및 로드맵 */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="text-lg px-6 py-2 mb-4 bg-green-100 text-green-800">Section 3</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">시장도 큽니다</h2>
          </div>

          {/* 시장 규모 */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="text-center bg-blue-50 p-8 rounded-3xl shadow-lg">
              <div className="text-5xl font-bold text-blue-600 mb-4">249만명</div>
              <div className="text-xl font-medium text-gray-700">전국 초등학생 수</div>
            </div>
            <div className="text-center bg-green-50 p-8 rounded-3xl shadow-lg">
              <div className="text-5xl font-bold text-green-600 mb-4">50만명</div>
              <div className="text-xl font-medium text-gray-700">전국 유치원생 수</div>
            </div>
            <div className="text-center bg-purple-50 p-8 rounded-3xl shadow-lg">
              <div className="text-5xl font-bold text-purple-600 mb-4">4만+곳</div>
              <div className="text-xl font-medium text-gray-700">태권도 학원 수</div>
            </div>
          </div>

          {/* 추가 시장 인사이트 */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-3xl shadow-lg mb-12">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-6">시장 기회</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-orange-800 mb-4">📊 국민의 80% 이상</h4>
                <p className="text-lg text-gray-700">과학적 체력 관리를 원한다 (통계청 자료)</p>
                <p className="text-orange-600 font-semibold mt-2">→ 제일 먼저 선행되어야 하는 것은 정확한 측정</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-green-800 mb-4">📈 센터 등록률 향상</h4>
                <p className="text-lg text-gray-700">키즈모션이 있는 센터는 등록과 재등록율이 높을 것</p>
                <p className="text-green-600 font-semibold mt-2">→ 차별화된 서비스로 경쟁력 확보</p>
              </div>
            </div>
          </div>

          {/* 로드맵 */}
          <div>
            <h3 className="text-4xl font-bold text-center text-gray-900 mb-8">로드맵은 명확합니다</h3>
            <div className="grid grid-cols-3 gap-8">
              {/* 2026년 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-blue-500">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2026년</div>
                  <h4 className="text-2xl font-bold text-gray-900">출장형 구독 (B2B)</h4>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>• 2개월 주기로 측정</p>
                  <p>• 센터 50곳 × 회당 20만원</p>
                  <p className="font-bold text-green-600">→ 목표 매출 6천만원</p>
                  <p>• 알고리즘 고도화</p>
                </div>
              </div>

              {/* 2027년 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-green-500">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">2027년</div>
                  <h4 className="text-2xl font-bold text-gray-900">B2G 진입</h4>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>• KC인증 후 나라장터 입점</p>
                  <p>• 기기 550만원 + SaaS 월5만원</p>
                  <p className="font-bold text-green-600">→ B2G로만 1억 2천만원 목표</p>
                  <p>• B2B 사업 확산</p>
                </div>
              </div>

              {/* 2028년 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-purple-500">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">2028년</div>
                  <h4 className="text-2xl font-bold text-gray-900">디지털 체력 기준</h4>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>• 전국 확산</p>
                  <p>• 데이터 플랫폼화로 디지털 체력 기준 정착</p>
                  <p>• 의료기기 인증 목표</p>
                  <p className="font-bold text-purple-600">→ 시장 표준 확립</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 섹션 4: 팀 & 실행력 */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="text-lg px-6 py-2 mb-4 bg-purple-100 text-purple-800">Section 4</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">팀도 실행력으로 증명했습니다</h2>
          </div>

          {/* 팀 구성 */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            {/* 대표자 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">대표자</h3>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>• 사이클아카데미 어시스트, 현장 전문성 보유</p>
                <p>• 키즈모션 기획</p>
                <p>• 웹과 앱 리포트 MVP 개발</p>
                <p>• 상표, 실용신안 출원완료</p>
              </div>
            </div>

            {/* CTO */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-blue-200">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">CTO 박주혁</h3>
              </div>
              <div className="space-y-3 text-gray-700">
                <p className="font-bold text-green-600">• 국가대표 사이클 선수출신</p>
                <p className="font-bold text-green-600">• 운동역학 석사</p>
                <p>• 30년 엘리트 경력 + 13년 아카데미 운영</p>
                <p>• 측정 로직 및 백분위 알고리즘 설계</p>
                <p>• Vicon 기반 동작분석 연구 경험</p>
              </div>
            </div>

            {/* HW 파트너 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">HW 파트너 서달원</h3>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>• 플러스텍 대표</p>
                <p>• 자전거 부품 특허 다수 보유</p>
                <p>• 2024, 2025 우수특허 대상</p>
                <p>• 키즈모션 기기 공동 제작</p>
              </div>
            </div>
          </div>

          {/* MOU 및 파일럿 테스트 */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-3xl shadow-lg">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">MOU 체결 & 파일럿 테스트 확정</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-green-800 mb-4">🏢 IYC 유소년 스포츠 센터</h4>
                <div className="space-y-2 text-gray-700">
                  <p>• 위치: 서울 강서구</p>
                  <p>• 기간: 2025년 7월부터 2년간</p>
                  <p>• 대상: 100명 이상의 아동</p>
                  <p>• 측정: 6가지 체력 지표 TEST</p>
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-blue-800 mb-4">🎯 목표 성과</h4>
                <div className="space-y-2 text-gray-700">
                  <p>• 시장 검증 및 개선점 도출</p>
                  <p>• 유아 전용 체력 기준 정립</p>
                  <p>• 기기, 알고리즘, AI서비스 고도화</p>
                  <p>• 데이터 기반 분석 시스템 완성</p>
                </div>
              </div>
            </div>
          </div>

          {/* 마무리 메시지 */}
          <div className="text-center mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-3xl shadow-lg">
            <h3 className="text-4xl font-bold mb-6">모션바이크는</h3>
            <p className="text-2xl mb-4">줄자와 스톱워치 시대를 넘어,</p>
            <p className="text-2xl mb-6">아이의 힘을 보여주는 디지털 체력 표준을 만듭니다.</p>
            <div className="flex justify-center items-center space-x-4">
              <p className="text-2xl font-bold">프라이머와 함께</p>
              <ArrowRight className="w-8 h-8" />
              <p className="text-2xl font-bold">전국 학교와 민간 체육시설에 이 기준을 심겠습니다.</p>
            </div>
            <p className="text-3xl font-bold mt-8">감사합니다.</p>
          </div>
        </div>

        {/* 이미지 모달 */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img 
                src={selectedImage} 
                alt="확대 이미지" 
                className="max-w-full max-h-full object-contain"
              />
              <button 
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
                onClick={() => setSelectedImage(null)}
              >
                <div className="w-6 h-6 flex items-center justify-center">✕</div>
              </button>
            </div>
          </div>
        )}

        <CommonFooter />
      </div>
    </div>
  );
}