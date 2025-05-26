import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, MessageCircle, Users, HelpCircle, Settings } from "lucide-react";
import Navigation from "@/components/navigation";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="mb-8">
              <span className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full text-base font-bold shadow-lg">
                언제든 연락하세요
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 leading-none tracking-tight">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                문의하기
              </span>
            </h1>
            
            <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 leading-relaxed">
              궁금한 것이 있으시나요?<br/>
              <span className="text-purple-600">전문팀</span>이 도와드릴게요
            </div>
            
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-50 to-purple-50 rounded-3xl p-10 shadow-2xl border border-gray-100">
              <p className="text-2xl text-gray-700 font-semibold mb-6 leading-relaxed">
                빠른 답변을 원하시면 전화로,<br/>
                자세한 상담을 원하시면 방문으로 연락해보세요
              </p>
              
              <div className="flex justify-center items-center text-lg text-gray-600">
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                  📞 평균 응답시간: 2분 이내
                </span>
              </div>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">전화 상담</h3>
                <p className="text-gray-600 mb-4">빠른 상담을 원하시면 언제든 전화주세요</p>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-purple-600">010-8445-0908</p>
                  <p className="text-sm text-gray-500">평일 09:00 - 18:00</p>
                  <p className="text-sm text-gray-500">토요일 09:00 - 13:00</p>
                  <p className="text-sm text-red-500">일요일 및 공휴일 휴무</p>
                </div>
                <Button className="mt-6 w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  <Phone className="w-4 h-4 mr-2" />
                  지금 전화하기
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">이메일 문의</h3>
                <p className="text-gray-600 mb-4">자세한 문의사항을 남겨주시면</p>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-blue-600">info@motionbike.co.kr</p>
                  <p className="text-sm text-gray-500">24시간 내 답변 보장</p>
                  <p className="text-sm text-gray-500">상세한 자료 첨부 가능</p>
                </div>
                <Button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                  <Mail className="w-4 h-4 mr-2" />
                  이메일 보내기
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">방문 상담</h3>
                <p className="text-gray-600 mb-4">직접 방문하여 상담을 받으실 수 있습니다</p>
                <div className="space-y-2">
                  <p className="text-lg font-medium text-teal-600">서울시 강서구</p>
                  <p className="text-lg font-medium text-teal-600">금낭화로 234, GX2</p>
                  <p className="text-sm text-gray-500">지하철 9호선 가양역 3번 출구</p>
                  <p className="text-sm text-red-500">사전 예약 필수</p>
                </div>
                <Button className="mt-6 w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  방문 예약하기
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Business Hours */}
          <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl mb-12">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Clock className="w-8 h-8 text-purple-600 mr-4" />
                <h3 className="text-2xl font-bold text-gray-800">운영 시간</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">상담 시간</h4>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>평일 (월-금)</span>
                      <span className="font-semibold">09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>토요일</span>
                      <span className="font-semibold">09:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>일요일 및 공휴일</span>
                      <span className="font-semibold text-red-500">휴무</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">측정 및 방문 상담</h4>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>평일 (월-금)</span>
                      <span className="font-semibold">10:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>토요일</span>
                      <span className="font-semibold">10:00 - 12:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>일요일 및 공휴일</span>
                      <span className="font-semibold text-red-500">휴무</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-none shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <MessageCircle className="w-8 h-8 text-purple-600 mr-4" />
                  <h3 className="text-xl font-bold text-gray-800">일반 문의</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li>• 서비스 소개 및 기능 안내</li>
                  <li>• 측정 절차 및 준비사항</li>
                  <li>• 가격 정책 및 할인 혜택</li>
                  <li>• 기관 및 단체 서비스 문의</li>
                  <li>• 파트너십 및 제휴 문의</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-none shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Users className="w-8 h-8 text-blue-600 mr-4" />
                  <h3 className="text-xl font-bold text-gray-800">기술 지원</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li>• 측정 결과 해석 및 상담</li>
                  <li>• 운동 처방 관련 질문</li>
                  <li>• 시스템 사용법 안내</li>
                  <li>• 데이터 관리 및 백업</li>
                  <li>• 기타 기술적 문제 해결</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl mb-12">
            <CardContent className="p-8">
              <div className="flex items-center mb-8">
                <HelpCircle className="w-8 h-8 text-purple-600 mr-4" />
                <h3 className="text-2xl font-bold text-gray-800">자주 묻는 질문</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Q. 측정 시간은 얼마나 걸리나요?</h4>
                    <p className="text-gray-600 text-sm">A. 기본 측정은 10-15분, AI 분석 및 상담까지 포함하여 총 30분 정도 소요됩니다.</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Q. 몇 세부터 측정 가능한가요?</h4>
                    <p className="text-gray-600 text-sm">A. 만 4세부터 12세까지 측정 가능하며, 키 100cm 이상, 체중 15kg 이상이면 정확한 측정이 가능합니다.</p>
                  </div>
                  
                  <div className="border-l-4 border-teal-500 pl-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Q. 예약은 어떻게 하나요?</h4>
                    <p className="text-gray-600 text-sm">A. 전화(010-8445-0908) 또는 이메일(info@motionbike.co.kr)로 사전 예약 가능합니다.</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Q. 측정 결과는 언제 받을 수 있나요?</h4>
                    <p className="text-gray-600 text-sm">A. 측정 직후 즉시 AI 분석 결과를 확인하실 수 있으며, 상세 리포트는 이메일로 전송됩니다.</p>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Q. 비용은 어떻게 되나요?</h4>
                    <p className="text-gray-600 text-sm">A. 측정 프로그램별로 상이하니 전화 상담을 통해 자세한 안내를 받으실 수 있습니다.</p>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Q. 주차 공간이 있나요?</h4>
                    <p className="text-gray-600 text-sm">A. 건물 내 주차 공간이 제한적이니 대중교통 이용을 권장하며, 방문 예약 시 안내해드립니다.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 border-none shadow-xl">
            <CardContent className="p-8 text-center text-white">
              <Settings className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">긴급 상황 또는 시스템 장애</h3>
              <p className="mb-6 text-orange-100">
                측정 중 시스템 문제가 발생하거나 긴급한 도움이 필요하시면
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="font-semibold">긴급 연락처</p>
                  <p className="text-xl font-bold">010-8445-0908</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="font-semibold">기술 지원</p>
                  <p className="text-xl font-bold">support@motionbike.co.kr</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}