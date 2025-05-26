import { useState } from "react";
import { Bike, HelpCircle, Settings, Search, History, ChevronDown, X, Book, Phone, Mail, MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Navigation() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <header className="glass-effect border-b border-white/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div 
            onClick={() => {
              console.log('Logo clicked - navigating to home');
              if (window.location.pathname === '/') {
                // 이미 홈 페이지라면 새로고침
                window.location.reload();
              } else {
                // 다른 페이지라면 홈으로 이동
                window.location.assign('/');
              }
            }} 
            className="flex items-center space-x-5 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-xl">
              <Bike className="text-white w-8 h-8" />
            </div>
            <div className="flex items-baseline space-x-2">
              <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                KidsBike
              </h1>
              <span className="text-lg font-medium text-gray-500 tracking-wide">
                MotionBike
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex items-center space-x-8">
              <span 
                onClick={() => window.location.href = '/'}
                className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5 cursor-pointer"
              >
                홈
              </span>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5 flex items-center space-x-1">
                    <span>분석</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem>
                    <div onClick={() => window.location.href = '/'} className="flex items-center space-x-2 w-full cursor-pointer">
                      <Search className="w-4 h-4" />
                      <span>측정</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div onClick={() => window.location.href = '/records'} className="flex items-center space-x-2 w-full cursor-pointer">
                      <History className="w-4 h-4" />
                      <span>기록</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <span 
                onClick={() => window.location.href = '/about'}
                className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5 cursor-pointer"
              >
                소개
              </span>
              <span 
                onClick={() => window.location.href = '/contact'}
                className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5 cursor-pointer"
              >
                문의
              </span>
            </nav>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setHelpOpen(true)}
                className="p-3 rounded-2xl bg-white/60 hover:bg-white/80 text-gray-700 hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setSettingsOpen(true)}
                className="p-3 rounded-2xl bg-white/60 hover:bg-white/80 text-gray-700 hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* Help Modal */}
            <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
                    <Book className="w-6 h-6 text-purple-600" />
                    <span>사용자 가이드 & FAQ</span>
                  </DialogTitle>
                  <DialogDescription>
                    MotionBike 사용법과 자주 묻는 질문들을 확인해보세요.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* 사용자 가이드 */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                        <Book className="w-5 h-5 text-blue-600" />
                        <span>사용자 가이드</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">1. 측정 준비</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• 편안한 운동복 착용</li>
                            <li>• 측정 2시간 전 과식 금지</li>
                            <li>• 충분한 수분 섭취</li>
                            <li>• 안전을 위한 보호장비 착용</li>
                          </ul>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">2. 측정 과정</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• 개인정보 정확히 입력</li>
                            <li>• 5초, 15초, 30초, 60초 순서로 측정</li>
                            <li>• 각 구간별 최대 파워로 페달링</li>
                            <li>• 심박수 데이터 함께 기록</li>
                          </ul>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-800 mb-2">3. 결과 해석</h4>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• 백분위로 또래 대비 위치 확인</li>
                            <li>• AI 분석으로 개선점 파악</li>
                            <li>• 균형 상태로 좌우 밸런스 점검</li>
                            <li>• 맞춤형 운동 처방 확인</li>
                          </ul>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-orange-800 mb-2">4. 데이터 관리</h4>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• PDF 리포트 다운로드</li>
                            <li>• QR 코드로 간편 공유</li>
                            <li>• 측정 기록 누적 관리</li>
                            <li>• 성장 추이 시각적 확인</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* FAQ */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">자주 묻는 질문 (FAQ)</h3>
                      <div className="space-y-4">
                        <div className="border-l-4 border-purple-500 pl-4">
                          <h4 className="font-semibold text-gray-800">Q. 몇 세부터 몇 세까지 측정할 수 있나요?</h4>
                          <p className="text-gray-600 text-sm mt-1">A. 만 4세부터 12세까지 측정 가능합니다. 키 100cm 이상, 체중 15kg 이상이면 정확한 측정이 가능합니다.</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-semibold text-gray-800">Q. 측정은 얼마나 걸리나요?</h4>
                          <p className="text-gray-600 text-sm mt-1">A. 기본 측정은 5-10분, AI 분석 및 리포트 생성까지 포함하여 총 15분 정도 소요됩니다.</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-semibold text-gray-800">Q. 얼마나 자주 측정하는 것이 좋나요?</h4>
                          <p className="text-gray-600 text-sm mt-1">A. 월 1회 정기 측정을 권장하며, 체력 향상 프로그램 시행 시에는 2주마다 측정하시면 좋습니다.</p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4">
                          <h4 className="font-semibold text-gray-800">Q. 데이터는 얼마나 보관되나요?</h4>
                          <p className="text-gray-600 text-sm mt-1">A. 개인정보보호법에 따라 안전하게 암호화되어 보관되며, 사용자가 직접 삭제 요청할 수 있습니다.</p>
                        </div>
                        <div className="border-l-4 border-red-500 pl-4">
                          <h4 className="font-semibold text-gray-800">Q. 측정 시 주의사항이 있나요?</h4>
                          <p className="text-gray-600 text-sm mt-1">A. 과도한 운동 후 2시간 이내, 식사 직후, 몸이 아픈 상태에서는 측정을 피해주세요.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 기술 지원 */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">기술 지원</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <Phone className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                          <h4 className="font-semibold text-gray-800">전화 지원</h4>
                          <p className="text-sm text-gray-600">010-8445-0908</p>
                          <p className="text-xs text-gray-500">평일 09:00-18:00</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <Mail className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                          <h4 className="font-semibold text-gray-800">이메일 지원</h4>
                          <p className="text-sm text-gray-600">info@motionbike.co.kr</p>
                          <p className="text-xs text-gray-500">24시간 내 답변</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <MapPin className="w-8 h-8 mx-auto mb-2 text-green-600" />
                          <h4 className="font-semibold text-gray-800">방문 지원</h4>
                          <p className="text-sm text-gray-600">서울시 강서구 금낭화로 234, GX2</p>
                          <p className="text-xs text-gray-500">사전 예약 필수</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DialogContent>
            </Dialog>

            {/* Settings Modal */}
            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
                    <Settings className="w-6 h-6 text-purple-600" />
                    <span>시스템 설정</span>
                  </DialogTitle>
                  <DialogDescription>
                    MotionBike 시스템 정보와 업데이트 안내를 확인하세요.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* 시스템 정보 */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">시스템 정보</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">버전:</span>
                          <span className="ml-2 font-semibold">v2.1.0</span>
                        </div>
                        <div>
                          <span className="text-gray-600">최종 업데이트:</span>
                          <span className="ml-2 font-semibold">2024.12.15</span>
                        </div>
                        <div>
                          <span className="text-gray-600">측정 엔진:</span>
                          <span className="ml-2 font-semibold">WattBike Pro</span>
                        </div>
                        <div>
                          <span className="text-gray-600">AI 모델:</span>
                          <span className="ml-2 font-semibold">GPT-4o</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 업데이트 안내 */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">업데이트 안내</h3>
                      <div className="space-y-3">
                        <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                          <h4 className="font-semibold text-green-800">v2.1.0 (2024.12.15)</h4>
                          <ul className="text-sm text-green-700 mt-1 space-y-1">
                            <li>• 체중 최소 기준 15kg으로 완화</li>
                            <li>• AI 분석 정확도 향상</li>
                            <li>• PDF 리포트 디자인 개선</li>
                            <li>• 모바일 반응형 최적화</li>
                          </ul>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                          <h4 className="font-semibold text-blue-800">v2.0.0 (2024.11.20)</h4>
                          <ul className="text-sm text-blue-700 mt-1 space-y-1">
                            <li>• 심박수 데이터 통합 분석</li>
                            <li>• 3D 균형 아바타 추가</li>
                            <li>• 성장 예측 기능 도입</li>
                            <li>• QR 코드 공유 기능</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 개인정보 및 약관 */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">개인정보 및 약관</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          개인정보처리방침 보기
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          서비스 이용약관 보기
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          데이터 삭제 요청
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
}