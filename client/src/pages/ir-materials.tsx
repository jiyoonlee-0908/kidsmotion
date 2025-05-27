import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Target, Building2, BarChart3, Zap, MessageCircleQuestion } from "lucide-react";
import Navigation from "@/components/navigation";

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
            MotionBike 투자 제안서
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            부모의 최대 관심사인 '아이 성장'과 정부의 '국민건강' 정책을 연결하는<br/>
            <span className="text-purple-600 font-semibold">아동 운동발달 정량화 혁신 기업</span>
          </p>
        </div>

        {/* 시장 기회 - 부모 니즈 */}
        <Card className="mb-16 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-2xl text-red-700 mb-4">🚨 부모의 고민 VS 현실: 정확한 측정의 부재</CardTitle>
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

        {/* 정부 정책 기회 */}
        <Card className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-700 mb-4">🏛️ 정부 정책: 국민건강 데이터화 추진</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">국민체력100의 한계</h3>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                    <p className="text-red-600 mb-2">현재 측정 방식 (아날로그)</p>
                    <p className="text-gray-700">• 제자리 멀리뛰기 → 줄자로 측정</p>
                    <p className="text-gray-700">• 윗몸말아올리기 → 사람이 카운트</p>
                    <p className="text-gray-700">• 왕복오래달리기 → 수동 기록</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-gray-400">
                    <p className="text-gray-600 mb-2">결과</p>
                    <p className="text-gray-700">• 정확성 부족</p>
                    <p className="text-gray-700">• 데이터 축적 어려움</p>
                    <p className="text-gray-700">• 국민건강 빅데이터 구축 불가</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">정부가 원하는 것</h3>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                    <p className="text-green-600 mb-2">디지털 전환 필요성</p>
                    <p className="text-gray-700">• <strong>정량적 데이터</strong> 수집 시스템</p>
                    <p className="text-gray-700">• <strong>국민체력 빅데이터</strong> 구축</p>
                    <p className="text-gray-700">• <strong>객관적 평가</strong>로 정책 수립</p>
                    <p className="text-gray-700">• <strong>비만 예방</strong> 조기 개입</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                    <p className="text-green-600 mb-2">해결책</p>
                    <p className="text-gray-700">• KidsMotion으로 디지털 체력측정 실현</p>
                    <p className="text-gray-700">• 정확한 데이터로 정책 수립 지원</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 💰 시장 규모 및 투자 기회 - 정부 정책 바로 다음 */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <TrendingUp className="w-6 h-6 mr-3 text-green-600" />
              시장 규모 및 투자 기회
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center bg-green-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">249만명</div>
                <p className="text-gray-600 mb-4">전국 초등학생 수 (2024년 기준)</p>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-sm text-green-700">연간 영유아 건강검진 수검인원</p>
                  <p className="text-lg font-bold text-green-800">177만명 (2023년 기준)</p>
                </div>
              </div>
              <div className="text-center bg-red-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-red-600 mb-2">3,302개소</div>
                <p className="text-gray-600 mb-4">전국 소아·청소년과 전문 진료기관</p>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-sm text-red-700">의원급(1차 의료기관): 2,147개소</p>
                  <p className="text-sm text-red-700">전국 보건소: 261개소</p>
                </div>
              </div>
              <div className="text-center bg-purple-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-purple-600 mb-2">24,000개+</div>
                <p className="text-gray-600 mb-4">전국 아동 스포츠 학원</p>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-sm text-purple-700">축구교실, 수영장, 체조교실, 태권도장 등</p>
                  <p className="text-sm text-purple-700">체력 측정 및 맞춤 훈련 수요</p>
                </div>
              </div>
            </div>

            {/* 해외 시장 기회 */}
            <div className="mt-8 bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-lg border border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-4">🌍 글로벌 시장 기회</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center bg-white p-4 rounded-lg shadow">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$218억</div>
                  <p className="text-gray-600 mb-2">글로벌 아동 스포츠 장비 시장 (2022년)</p>
                  <p className="text-sm text-blue-700">약 29조 원 규모</p>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">$306억</div>
                  <p className="text-gray-600 mb-2">2030년 전망 시장 규모</p>
                  <p className="text-sm text-indigo-700">약 41조 원 (CAGR 4.4%)</p>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow">
                  <div className="text-3xl font-bold text-teal-600 mb-2">5.5%</div>
                  <p className="text-gray-600 mb-2">피트니스 장비 부문 연평균 성장률</p>
                  <p className="text-sm text-teal-700">가장 빠른 성장세</p>
                </div>
              </div>
              
              {/* 출처 정보 */}
              <div className="mt-4 bg-white/50 p-3 rounded-lg border border-blue-200">
                <p className="text-xs text-gray-600">
                  <strong>출처:</strong> Grand View Research, "Kids Sports Equipment Market Size & Share Analysis Report 2023-2030"<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Research And Markets, "Global Youth Sports Equipment Market Report 2023"
                </p>
              </div>
            </div>

            {/* 투자 포인트 */}
            <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg border border-purple-200">
              <h3 className="text-xl font-bold text-purple-800 mb-4">💡 투자 포인트</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-purple-700 mb-3">시장 성장 동력</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• 저출산으로 한 자녀당 투자 증가</li>
                    <li>• 부모들의 성장 관련 민감도 증가</li>
                    <li>• 정부의 국민건강 데이터화 정책</li>
                    <li>• 디지털 헬스케어 확산</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-700 mb-3">선점 효과</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• 아동 운동발달 정량화 최초 시스템</li>
                    <li>• B2B/B2G 시장 진입 용이성</li>
                    <li>• 데이터 누적으로 AI 성능 향상</li>
                    <li>• 의료기관 표준화 가능성</li>
                  </ul>
                </div>
              </div>

              {/* 부유층 트렌드세팅 효과 */}
              <div className="mt-6 bg-gradient-to-r from-amber-100 to-yellow-100 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-3">🥇 부유층 트렌드세팅 전략</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg">
                    <h5 className="font-semibold text-amber-700 mb-2">조기 어답터 타겟</h5>
                    <ul className="space-y-1 text-gray-700 text-xs">
                      <li>• <strong>프리미엄 스포츠 학원:</strong> 하키, 펜싱, 골프</li>
                      <li>• <strong>사립 체육시설:</strong> 강남, 분당, 일산 등</li>
                      <li>• <strong>국제학교 연계:</strong> 해외 진학 준비생</li>
                      <li>• <strong>전문 운동선수 양성:</strong> 조기 재능 발굴</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <h5 className="font-semibold text-amber-700 mb-2">확산 효과 기대</h5>
                    <ul className="space-y-1 text-gray-700 text-xs">
                      <li>• <strong>SNS 확산:</strong> "우리 아이 체력 측정 결과"</li>
                      <li>• <strong>학부모 커뮤니티:</strong> 입소문 마케팅</li>
                      <li>• <strong>교육열 확산:</strong> 일반 가정으로 전파</li>
                      <li>• <strong>표준화 인식:</strong> "체력측정은 필수"</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-3 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>💡 전략적 시사점:</strong> 부유층이 먼저 도입하면 "프리미엄 육아 트렌드"가 되어 
                    일반 가정으로 확산됩니다. 명품 유모차, 프리미엄 분유처럼 "우리 아이에게 최고를" 심리를 자극할 수 있어요.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 하드웨어 혁신 */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Zap className="w-6 h-6 mr-3 text-purple-600" />
              🎯 우리의 솔루션: KidsMotion
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
            
            {/* 과학적 근거 */}
            <div className="mt-8 bg-gradient-to-r from-cyan-100 to-blue-100 p-6 rounded-lg border border-cyan-200">
              <h3 className="text-xl font-bold text-cyan-800 mb-4">🔬 측정의 과학적 근거</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-cyan-700 mb-3">⚡ 5분 측정의 신뢰성</h4>
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
                  <h4 className="font-semibold text-cyan-700 mb-3">📊 데이터 수집 정확도</h4>
                  <div className="bg-white p-4 rounded-lg">
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• <strong>샘플링 주파수:</strong> 초당 50회 데이터 수집</li>
                      <li>• <strong>총 데이터 포인트:</strong> 5분 = 15,000개 데이터</li>
                      <li>• <strong>좌우 밸런스:</strong> 실시간 독립 측정</li>
                      <li>• <strong>심박수 연동:</strong> 운동 강도 정확 측정</li>
                      <li>• <strong>RPE 보정:</strong> 주관적 피로도 객관화</li>
                      <li>• <strong>환경 보정:</strong> 온도/습도 자동 보정</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-white p-4 rounded-lg border-l-4 border-cyan-500">
                <h4 className="font-semibold text-cyan-700 mb-2">🏆 스포츠과학 검증</h4>
                <p className="text-gray-700 text-sm">
                  사이클링은 국제적으로 인정받는 체력 측정 방법입니다. 
                  <strong>와트(W) 단위의 파워 측정</strong>은 스포츠과학에서 가장 정확한 운동 능력 평가 지표로 사용되며, 
                  올림픽 선수들도 동일한 방식으로 체력을 측정합니다.
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
                    <h4 className="font-semibold text-gray-800 mb-2">⚡ 에어 저항 시스템</h4>
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

        {/* 실제 검증 사례 & 타겟별 가치 제안 */}
        <Card className="mb-16 bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <BarChart3 className="w-6 h-6 mr-3 text-green-600" />
              🔬 실제 검증 계획 & 차별화 가치
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* 파일럿 테스트 */}
            <div className="mb-8 bg-white p-6 rounded-lg border border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4">2025년 파일럿 테스트</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">검증 계획</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>사이클아카데미</strong>에서 100명 아동 데이터 수집</li>
                    <li>• 기존 운영 중인 유소년 스포츠단 대상</li>
                    <li>• 1년간 무료 제공 후 성과 측정</li>
                    <li>• 실제 체력 개선 효과 검증</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">기대 성과</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 한국 아동 체력 기준 데이터 최초 구축</li>
                    <li>• AI 분석 정확도 개선</li>
                    <li>• 실제 운동 효과 사례 확보</li>
                    <li>• 기관별 수요 검증</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 타겟별 가치 제안 */}
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* 스포츠학원 */}
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🏃‍♂️</div>
                  <h3 className="font-bold text-lg text-blue-800">스포츠학원</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded">
                    <h4 className="font-semibold text-blue-700 text-sm">핵심 가치</h4>
                    <p className="text-blue-600 text-xs">"우리 학원 효과 수치로 증명"</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <h4 className="font-semibold text-blue-700 text-sm">차별화 포인트</h4>
                    <p className="text-blue-600 text-xs">• 학생 실력 향상 데이터 제공<br/>• 학부모 만족도 증가<br/>• 타 학원 대비 경쟁력 확보</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <h4 className="font-semibold text-blue-700 text-sm">제공 서비스</h4>
                    <p className="text-blue-600 text-xs">월 5만원으로 무제한 측정<br/>성장 리포트 자동 생성</p>
                  </div>
                </div>
              </div>

              {/* 병원 */}
              <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🏥</div>
                  <h3 className="font-bold text-lg text-red-800">소아과/병원</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded">
                    <h4 className="font-semibold text-red-700 text-sm">핵심 가치</h4>
                    <p className="text-red-600 text-xs">"영유아검진 프리미엄 서비스"</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <h4 className="font-semibold text-red-700 text-sm">차별화 포인트</h4>
                    <p className="text-red-600 text-xs">• 다른 병원과 차별화<br/>• 환자 만족도 향상<br/>• 재방문율 증가</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <h4 className="font-semibold text-red-700 text-sm">제공 서비스</h4>
                    <p className="text-red-600 text-xs">체력 현황 의료진 리포트<br/>성장 발달 추적 서비스</p>
                  </div>
                </div>
              </div>

              {/* 보건소 */}
              <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🏛️</div>
                  <h3 className="font-bold text-lg text-purple-800">보건소/공공기관</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded">
                    <h4 className="font-semibold text-purple-700 text-sm">핵심 가치</h4>
                    <p className="text-purple-600 text-xs">"지역 아동 건강 빅데이터"</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <h4 className="font-semibold text-purple-700 text-sm">차별화 포인트</h4>
                    <p className="text-purple-600 text-xs">• 정부 정책 데이터 제공<br/>• 지역 건강 통계 구축<br/>• 예산 효율성 증명</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <h4 className="font-semibold text-purple-700 text-sm">제공 서비스</h4>
                    <p className="text-purple-600 text-xs">지역별 아동 체력 통계<br/>정책 수립 기초 자료</p>
                  </div>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* 시장 진입 전략 */}
        <Card className="mb-16 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700 mb-4">💰 B2B/B2G 시장 진입 전략</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* 의료기관 */}
              <div className="bg-white p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold mb-4 text-red-700">🏥 의료기관</h3>
                <div className="space-y-3">
                  <div className="bg-red-50 p-3 rounded">
                    <h4 className="font-semibold text-red-800">소아청소년과</h4>
                    <p className="text-sm text-red-700">성장클리닉 진료용</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <h4 className="font-semibold text-red-800">재활의학과</h4>
                    <p className="text-sm text-red-700">운동발달 진단용</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <h4 className="font-semibold text-red-800">발달센터</h4>
                    <p className="text-sm text-red-700">조기 개입 치료용</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-100 rounded">
                  <p className="text-sm font-medium text-green-800">부모 심리: "의사가 정확한 수치로 설명해주니 신뢰할 수 있다"</p>
                </div>
              </div>

              {/* 스포츠 학원 */}
              <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-bold mb-4 text-blue-700">⚽ 스포츠 학원</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded">
                    <h4 className="font-semibold text-blue-800">축구교실</h4>
                    <p className="text-sm text-blue-700">개인별 체력 맞춤 훈련</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <h4 className="font-semibold text-blue-800">태권도장</h4>
                    <p className="text-sm text-blue-700">우리 아이 실력 정확히 파악</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <h4 className="font-semibold text-blue-800">키즈 피트니스</h4>
                    <p className="text-sm text-blue-700">과학적 운동 처방</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-100 rounded">
                  <p className="text-sm font-medium text-green-800">부모 심리: "우리 아이 부족한 부분을 정확히 알고 운동시켜준다"</p>
                </div>
              </div>

              {/* 정부기관 */}
              <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold mb-4 text-purple-700">🏛️ 정부기관</h3>
                <div className="space-y-3">
                  <div className="bg-purple-50 p-3 rounded">
                    <h4 className="font-semibold text-purple-800">보건소</h4>
                    <p className="text-sm text-purple-700">영유아검진 정량화</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <h4 className="font-semibold text-purple-800">초등학교</h4>
                    <p className="text-sm text-purple-700">체력장 디지털화</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <h4 className="font-semibold text-purple-800">국민체력센터</h4>
                    <p className="text-sm text-purple-700">국민체력100 고도화</p>
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
            {/* 운영 가이드 상세화 */}
            <div className="mt-8 bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg border border-yellow-200">
              <h3 className="text-xl font-bold text-orange-800 mb-4">🛠️ 완벽한 운영 지원 시스템</h3>
              <div className="grid md:grid-cols-3 gap-6">
                
                {/* 설치 & 교육 */}
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-700 mb-3">📦 설치 & 교육</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• <strong>3시간 교육:</strong> 장비 사용법 완전 숙지</li>
                    <li>• <strong>시연은 동영상 제공:</strong> 실제 아동으로 체험</li>
                    <li>• <strong>매뉴얼 제공:</strong> 단계별 가이드북</li>
                  </ul>
                </div>

                {/* A/S & 유지보수 */}
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-700 mb-3">🔧 A/S & 유지보수</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• <strong>고장접수하면 1-5일내 수리:</strong> 전국 어디든 방문</li>
                    <li>• <strong>무료 업데이트:</strong> 소프트웨어 자동 업데이트</li>
                    <li>• <strong>백업 장비:</strong> 고장 시 임시 대체품 제공</li>
                  </ul>
                </div>

                {/* 공간 & 환경 */}
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-700 mb-3">🏢 공간 & 환경</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• <strong>최소 공간:</strong> 2m × 1.5m (3㎡)</li>
                    <li>• <strong>전력 불필요:</strong> 자가충전으로 운영</li>
                    <li>• <strong>이동 가능:</strong> 바퀴 달린 이동형</li>
                  </ul>
                </div>
              </div>

              {/* 기관별 맞춤 솔루션 */}
              <div className="mt-6 bg-white p-6 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-700 mb-4">🎯 기관별 맞춤 패키지</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center bg-red-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🏥</div>
                    <h5 className="font-semibold text-red-700">병원 패키지</h5>
                    <ul className="text-xs text-gray-600 mt-2">
                      <li>• 의료진 전용 교육</li>
                      <li>• 진료 연계 매뉴얼</li>
                      <li>• 환자 상담 가이드</li>
                      <li>• 의료용 리포트 양식</li>
                    </ul>
                  </div>
                  <div className="text-center bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🏃‍♂️</div>
                    <h5 className="font-semibold text-blue-700">학원 패키지</h5>
                    <ul className="text-xs text-gray-600 mt-2">
                      <li>• 코치 교육 프로그램</li>
                      <li>• 학부모 상담 템플릿</li>
                      <li>• 월간 성장 리포트</li>
                      <li>• 마케팅 지원 자료</li>
                    </ul>
                  </div>
                  <div className="text-center bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🏛️</div>
                    <h5 className="font-semibold text-purple-700">보건소 패키지</h5>
                    <ul className="text-xs text-gray-600 mt-2">
                      <li>• 지역 통계 리포트</li>
                      <li>• 정책 수립 자료</li>
                      <li>• 예산 효과 분석</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 학부모 불안감 해소 */}
        <Card className="mb-16 bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Users className="w-6 h-6 mr-3 text-pink-600" />
              🏢 기관 운영자님, 이런 고민 해결됩니다!
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
            <CardTitle className="flex items-center text-2xl">
              <Target className="w-6 h-6 mr-3 text-orange-600" />
              ❓ 투자자 예상 질문 & 답변
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
                    <p className="text-gray-700 text-sm">A: 직접 수익보다는 브랜딩 효과가 핵심입니다. '최신 아동 체력 측정 도입 병원'으로 차별화되며, 영유아검진 질 향상으로 환자 만족도와 재방문율이 증가합니다. 정부지원 50% 시 실질 부담은 275만원입니다.</p>
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
                      <p className="text-gray-700">단계별 진출 계획: 2026년 스포츠학원 시작 → 2027년 의료기기 신청 → 2028년 인증완료 → 2029년 의료기관 진출</p>
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
            <CardTitle className="text-2xl text-center">🚀 투자 제안</CardTitle>
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
                    <h4 className="font-semibold">2026년: 스포츠학원 진입</h4>
                    <p className="text-sm">파일럿 검증 완료 후 100개 학원 × 월 5만원 = 연 6억 매출<br/>
                    <span className="text-xs opacity-90">+ 하드웨어 판매 100대 × 550만원 = 5.5억</span></p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">2027년: 의료기기 신청</h4>
                    <p className="text-sm">임상시험 진행, 하드웨어 판매 확대</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">2028년: 인증 완료</h4>
                    <p className="text-sm">의료기기 인증 취득, 신뢰도 확보</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">2029년: 의료기관 진출</h4>
                    <p className="text-sm">병원 + 보건소 진입으로 100억 매출</p>
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
                <h4 className="font-semibold mb-3">💰 하드웨어 투자 회수 계산</h4>
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
                <p>📧 투자제안서 요청 가능</p>
                <p>📍 서울시 강서구 금낭화로 234, GX2</p>
                <p className="text-sm opacity-75 mt-4">지하철 5호선 방화역 4번 출구</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}