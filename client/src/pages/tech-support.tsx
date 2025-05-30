import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Monitor,
  Smartphone,
  Wifi,
  Download,
  Upload,
  RefreshCw,
  Phone,
  Mail,
  MessageCircle,
  HelpCircle,
  User,
  Bug,
  Zap,
  Shield,
  Globe
} from "lucide-react";

import CommonFooter from "@/components/common-footer";

interface TechSupportProps {
  onNavigate?: (page: string) => void;
}

interface SupportTicket {
  category: string;
  issue: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  contactMethod: string;
  contactInfo: string;
}

export default function TechSupport({ onNavigate }: TechSupportProps) {
  const [activeTab, setActiveTab] = useState<'troubleshooting' | 'submit-ticket' | 'system-status'>('troubleshooting');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [ticketForm, setTicketForm] = useState<SupportTicket>({
    category: '',
    issue: '',
    description: '',
    priority: 'medium',
    contactMethod: 'email',
    contactInfo: ''
  });

  const troubleshootingGuides = [
    {
      category: '측정 장비',
      icon: Monitor,
      issues: [
        {
          title: '와트바이크가 켜지지 않아요',
          solution: '1. 전원 케이블 연결 확인\n2. 전원 버튼 3초간 길게 누르기\n3. 전원 콘센트 교체해보기\n4. 지속되면 고객센터 연락',
          status: 'common'
        },
        {
          title: '페달이 움직이지 않아요',
          solution: '1. 안전장치 해제 확인\n2. 저항 레벨 조정\n3. 페달 주변 이물질 제거\n4. 체중 설정 재확인',
          status: 'common'
        },
        {
          title: '측정값이 이상해요',
          solution: '1. 장비 재시작\n2. 보정 모드 실행\n3. 센서 청소\n4. 재측정 진행',
          status: 'frequent'
        }
      ]
    },
    {
      category: '소프트웨어',
      icon: Smartphone,
      issues: [
        {
          title: '앱이 실행되지 않아요',
          solution: '1. 앱 완전 종료 후 재시작\n2. 스마트폰 재부팅\n3. 앱 업데이트 확인\n4. 앱 재설치',
          status: 'common'
        },
        {
          title: '데이터가 저장되지 않아요',
          solution: '1. 인터넷 연결 확인\n2. 앱 권한 설정 확인\n3. 저장공간 확인\n4. 로그인 상태 확인',
          status: 'frequent'
        },
        {
          title: '화면이 멈춰요',
          solution: '1. 5초간 대기\n2. 화면 터치해보기\n3. 앱 재시작\n4. 기기 재부팅',
          status: 'rare'
        }
      ]
    },
    {
      category: '네트워크',
      icon: Wifi,
      issues: [
        {
          title: '인터넷에 연결되지 않아요',
          solution: '1. Wi-Fi 연결 상태 확인\n2. 다른 네트워크로 변경\n3. 모바일 데이터 사용\n4. 라우터 재시작',
          status: 'common'
        },
        {
          title: '데이터 동기화가 안 돼요',
          solution: '1. 인터넷 속도 확인\n2. 앱 재시작\n3. 수동 동기화 시도\n4. 계정 재로그인',
          status: 'frequent'
        }
      ]
    },
    {
      category: '계정',
      icon: User,
      issues: [
        {
          title: '로그인이 안 돼요',
          solution: '1. 아이디/비밀번호 확인\n2. 대소문자 구분 확인\n3. 비밀번호 재설정\n4. 고객센터 문의',
          status: 'common'
        },
        {
          title: '비밀번호를 잊었어요',
          solution: '1. 비밀번호 찾기 클릭\n2. 등록된 이메일 확인\n3. 인증번호 입력\n4. 새 비밀번호 설정',
          status: 'frequent'
        }
      ]
    }
  ];

  const systemStatus = [
    { service: '측정 시스템', status: 'operational', lastUpdate: '2025-05-28 09:00' },
    { service: '데이터베이스', status: 'operational', lastUpdate: '2025-05-28 09:00' },
    { service: '모바일 앱', status: 'maintenance', lastUpdate: '2025-05-28 08:30' },
    { service: '웹 서비스', status: 'operational', lastUpdate: '2025-05-28 09:00' },
    { service: '백업 시스템', status: 'operational', lastUpdate: '2025-05-28 09:00' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'maintenance': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'issue': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <HelpCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational': return '정상 운영';
      case 'maintenance': return '점검 중';
      case 'issue': return '장애 발생';
      default: return '확인 중';
    }
  };

  const getIssueStatusColor = (status: string) => {
    switch (status) {
      case 'common': return 'bg-red-100 text-red-800 border-red-200';
      case 'frequent': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rare': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSubmitTicket = () => {
    // 실제로는 서버로 전송
    alert('지원 요청이 접수되었습니다. 24시간 내에 연락드리겠습니다.');
    setTicketForm({
      category: '',
      issue: '',
      description: '',
      priority: 'medium',
      contactMethod: 'email',
      contactInfo: ''
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                기술 지원
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              기술적인 문제가 발생했나요? 빠르고 정확한 해결 방법을 찾아보세요
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-12 bg-gray-100 rounded-lg p-2">
            <button
              onClick={() => setActiveTab('troubleshooting')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                activeTab === 'troubleshooting'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>문제 해결</span>
            </button>
            <button
              onClick={() => setActiveTab('submit-ticket')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                activeTab === 'submit-ticket'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              <span>지원 요청</span>
            </button>
            <button
              onClick={() => setActiveTab('system-status')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                activeTab === 'system-status'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Globe className="w-5 h-5" />
              <span>시스템 상태</span>
            </button>
          </div>

          {/* Troubleshooting Tab */}
          {activeTab === 'troubleshooting' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {troubleshootingGuides.map((guide) => {
                  const IconComponent = guide.icon;
                  return (
                    <button
                      key={guide.category}
                      onClick={() => setSelectedCategory(selectedCategory === guide.category ? '' : guide.category)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedCategory === guide.category
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <IconComponent className="w-8 h-8 text-purple-600 mb-3" />
                      <h3 className="font-semibold text-gray-800">{guide.category}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {guide.issues.length}개 가이드
                      </p>
                    </button>
                  );
                })}
              </div>

              {selectedCategory && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    {selectedCategory} 문제 해결
                  </h3>
                  {troubleshootingGuides
                    .find(guide => guide.category === selectedCategory)
                    ?.issues.map((issue, index) => (
                      <Card key={index} className="border-gray-200">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{issue.title}</CardTitle>
                            <Badge className={`${getIssueStatusColor(issue.status)} border`}>
                              {issue.status === 'common' && '자주 발생'}
                              {issue.status === 'frequent' && '종종 발생'}
                              {issue.status === 'rare' && '드물게 발생'}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2">해결 방법:</h4>
                            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                              {issue.solution}
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* Submit Ticket Tab */}
          {activeTab === 'submit-ticket' && (
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-center">지원 요청 접수</CardTitle>
                <p className="text-center text-gray-600">
                  문제를 해결하지 못하셨나요? 상세한 정보를 알려주시면 빠르게 도움을 드리겠습니다.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      문제 유형
                    </label>
                    <select
                      value={ticketForm.category}
                      onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">선택해주세요</option>
                      <option value="equipment">측정 장비 문제</option>
                      <option value="software">소프트웨어 문제</option>
                      <option value="network">네트워크 문제</option>
                      <option value="account">계정 문제</option>
                      <option value="data">데이터/결과 문제</option>
                      <option value="other">기타</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      우선순위
                    </label>
                    <select
                      value={ticketForm.priority}
                      onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value as any})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="low">낮음 - 일반적인 문의</option>
                      <option value="medium">보통 - 업무에 지장</option>
                      <option value="high">높음 - 측정 불가</option>
                      <option value="urgent">긴급 - 서비스 중단</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    문제 제목
                  </label>
                  <Input
                    value={ticketForm.issue}
                    onChange={(e) => setTicketForm({...ticketForm, issue: e.target.value})}
                    placeholder="문제를 간단히 요약해주세요"
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    상세 설명
                  </label>
                  <Textarea
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                    placeholder="문제가 발생한 상황, 에러 메시지, 시도한 해결 방법 등을 자세히 설명해주세요"
                    className="min-h-32"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      연락 방법
                    </label>
                    <select
                      value={ticketForm.contactMethod}
                      onChange={(e) => setTicketForm({...ticketForm, contactMethod: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="email">이메일</option>
                      <option value="phone">전화</option>
                      <option value="sms">문자메시지</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      연락처
                    </label>
                    <Input
                      value={ticketForm.contactInfo}
                      onChange={(e) => setTicketForm({...ticketForm, contactInfo: e.target.value})}
                      placeholder={
                        ticketForm.contactMethod === 'email' 
                          ? 'example@email.com' 
                          : '010-0000-0000'
                      }
                      className="h-12"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSubmitTicket}
                  className="w-full h-12 bg-purple-600 hover:bg-purple-700"
                  disabled={!ticketForm.category || !ticketForm.issue || !ticketForm.contactInfo}
                >
                  지원 요청 제출
                </Button>
              </CardContent>
            </Card>
          )}

          {/* System Status Tab */}
          {activeTab === 'system-status' && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">모든 시스템 정상 운영 중</span>
                </div>
                <p className="text-gray-600">마지막 업데이트: 2025년 5월 28일 09:00</p>
              </div>

              <div className="grid gap-4">
                {systemStatus.map((system, index) => (
                  <Card key={index} className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(system.status)}
                          <div>
                            <h3 className="font-semibold text-gray-800">{system.service}</h3>
                            <p className="text-sm text-gray-600">
                              상태: {getStatusText(system.status)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">마지막 확인</p>
                          <p className="text-sm font-medium text-gray-700">
                            {system.lastUpdate}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-2">예정된 점검 안내</h3>
                      <p className="text-blue-700">
                        <strong>일시:</strong> 2025년 5월 30일 (금) 02:00 - 04:00<br />
                        <strong>대상:</strong> 모바일 앱 업데이트<br />
                        <strong>내용:</strong> 새로운 기능 추가 및 성능 개선
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Contact Section */}
          <Card className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-purple-800">
                추가 도움이 필요하신가요?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Phone className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-purple-800 mb-2">전화 지원</h4>
                  <p className="text-purple-700 font-medium text-lg">010-8445-0908</p>
                  <p className="text-sm text-purple-600 mt-1">평일 09:00 - 18:00</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-blue-800 mb-2">이메일 지원</h4>
                  <p className="text-blue-700 font-medium">dayinj@naver.com</p>
                  <p className="text-sm text-blue-600 mt-1">24시간 접수</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <RefreshCw className="w-8 h-8 text-teal-600" />
                  </div>
                  <h4 className="font-semibold text-teal-800 mb-2">원격 지원</h4>
                  <p className="text-teal-700 font-medium">화면 공유 가능</p>
                  <p className="text-sm text-teal-600 mt-1">예약 후 진행</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <CommonFooter onNavigate={onNavigate} />
    </div>
  );
}