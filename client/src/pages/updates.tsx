import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  CheckCircle,
  Clock,
  Star,
  Zap,
  Bug,
  Shield,
  Smartphone,
  Monitor,
  Database,
  Settings,
  Users,
  BarChart3,
  Heart,
  AlertCircle,
  Download,
  Bell,
  Sparkles,
  Rocket
} from "lucide-react";
import Navigation from "@/components/navigation";

interface UpdatesProps {
  onNavigate?: (page: string) => void;
}

interface UpdateItem {
  version: string;
  date: string;
  title: string;
  description: string;
  type: 'major' | 'minor' | 'patch' | 'hotfix';
  status: 'released' | 'beta' | 'coming-soon' | 'in-development';
  features: {
    icon: any;
    title: string;
    description: string;
    category: 'new' | 'improvement' | 'fix' | 'security';
  }[];
}

export default function Updates({ onNavigate }: UpdatesProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'major' | 'minor' | 'patch'>('all');

  const updates: UpdateItem[] = [
    {
      version: "v2.1.0",
      date: "2025-07-15",
      title: "AI 분석 고도화 및 신체균형 3D 시각화",
      description: "AI 분석 엔진을 업그레이드하고 신체균형을 3D로 시각화하는 기능을 추가했습니다.",
      type: "major",
      status: "coming-soon",
      features: [
        {
          icon: Sparkles,
          title: "AI 분석 엔진 2.0",
          description: "더욱 정확하고 개인화된 운동 처방과 코칭 제공",
          category: "new"
        },
        {
          icon: Monitor,
          title: "3D 균형 시각화",
          description: "좌우 균형을 3D 아바타로 직관적으로 확인",
          category: "new"
        },
        {
          icon: BarChart3,
          title: "성장 예측 그래프",
          description: "개인별 체력 성장 패턴 분석 및 미래 예측",
          category: "new"
        },
        {
          icon: Heart,
          title: "심박수 연동",
          description: "웨어러블 기기와 연동하여 심박수 데이터 통합 분석",
          category: "new"
        }
      ]
    },
    {
      version: "v2.0.5",
      date: "2025-05-26",
      title: "사용자 지원 시스템 대폭 개선",
      description: "사용자 가이드, FAQ, 기술 지원 페이지를 새롭게 구성했습니다.",
      type: "minor",
      status: "released",
      features: [
        {
          icon: Users,
          title: "종합 사용자 가이드",
          description: "측정부터 결과 해석까지 단계별 상세 안내",
          category: "new"
        },
        {
          icon: Settings,
          title: "기술 지원 시스템",
          description: "문제 해결 가이드 및 실시간 지원 요청",
          category: "new"
        },
        {
          icon: CheckCircle,
          title: "FAQ 검색 기능",
          description: "카테고리별 필터링 및 키워드 검색으로 빠른 답변 찾기",
          category: "improvement"
        }
      ]
    },
    {
      version: "v2.0.4",
      date: "2025-05-20",
      title: "성능 최적화 및 안정성 향상",
      description: "측정 정확도를 높이고 시스템 안정성을 개선했습니다.",
      type: "patch",
      status: "released",
      features: [
        {
          icon: Zap,
          title: "측정 속도 개선",
          description: "측정 시간을 30% 단축하고 응답성 향상",
          category: "improvement"
        },
        {
          icon: Shield,
          title: "데이터 보안 강화",
          description: "개인정보 암호화 및 보안 프로토콜 업데이트",
          category: "security"
        },
        {
          icon: Bug,
          title: "버그 수정",
          description: "PDF 내보내기 및 QR 코드 생성 오류 해결",
          category: "fix"
        }
      ]
    },
    {
      version: "v2.0.3",
      date: "2025-05-15",
      title: "모바일 최적화 및 접근성 개선",
      description: "모바일 환경에서의 사용성을 크게 개선했습니다.",
      type: "minor",
      status: "released",
      features: [
        {
          icon: Smartphone,
          title: "반응형 디자인",
          description: "모든 화면 크기에서 최적화된 사용자 경험",
          category: "improvement"
        },
        {
          icon: Users,
          title: "접근성 향상",
          description: "시각 장애인을 위한 스크린 리더 지원",
          category: "improvement"
        },
        {
          icon: Download,
          title: "오프라인 모드",
          description: "인터넷 연결 없이도 이전 결과 확인 가능",
          category: "new"
        }
      ]
    },
    {
      version: "v2.0.2",
      date: "2025-05-10",
      title: "AI 코칭 시스템 도입",
      description: "개인별 맞춤 운동 처방 및 AI 코칭 기능을 추가했습니다.",
      type: "major",
      status: "released",
      features: [
        {
          icon: Sparkles,
          title: "AI 개인 코치",
          description: "측정 결과 기반 맞춤형 운동 프로그램 제공",
          category: "new"
        },
        {
          icon: BarChart3,
          title: "성과 추적",
          description: "운동 효과 분석 및 진전 상황 모니터링",
          category: "new"
        },
        {
          icon: Bell,
          title: "알림 시스템",
          description: "운동 시간 알림 및 목표 달성 축하 메시지",
          category: "new"
        }
      ]
    }
  ];

  const upcomingFeatures = [
    {
      title: "팀 관리 시스템",
      description: "학급/팀 단위 관리 및 집단 분석 기능",
      timeline: "2025년 8월",
      priority: "high"
    },
    {
      title: "게이미피케이션",
      description: "성취 배지, 리더보드, 도전과제 시스템",
      timeline: "2025년 10월",
      priority: "medium"
    },
    {
      title: "부모/교사 대시보드",
      description: "아이들의 체력 변화 모니터링 전용 인터페이스",
      timeline: "2025년 12월",
      priority: "high"
    },
    {
      title: "영양 관리 연동",
      description: "체력 데이터와 연계한 영양 상태 분석",
      timeline: "2026년 2월",
      priority: "low"
    }
  ];

  const filteredUpdates = updates.filter(update => 
    selectedFilter === 'all' || update.type === selectedFilter
  );

  const getVersionTypeColor = (type: string) => {
    switch (type) {
      case 'major': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'minor': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'patch': return 'bg-green-100 text-green-800 border-green-200';
      case 'hotfix': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'released': return 'bg-green-100 text-green-800';
      case 'beta': return 'bg-yellow-100 text-yellow-800';
      case 'coming-soon': return 'bg-blue-100 text-blue-800';
      case 'in-development': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'released': return '출시됨';
      case 'beta': return '베타 테스트';
      case 'coming-soon': return '출시 예정';
      case 'in-development': return '개발 중';
      default: return '알 수 없음';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'new': return 'text-purple-600';
      case 'improvement': return 'text-blue-600';
      case 'fix': return 'text-green-600';
      case 'security': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation onNavigate={onNavigate} />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                업데이트 안내
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              키즈모션의 최신 업데이트와 향후 계획을 확인하세요
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setSelectedFilter('major')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === 'major'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              주요 업데이트
            </button>
            <button
              onClick={() => setSelectedFilter('minor')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === 'minor'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              기능 개선
            </button>
            <button
              onClick={() => setSelectedFilter('patch')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === 'patch'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              버그 수정
            </button>
          </div>

          {/* Updates List */}
          <div className="space-y-8 mb-16">
            {filteredUpdates.map((update, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge className={`${getVersionTypeColor(update.type)} border`}>
                          {update.version}
                        </Badge>
                        <Badge className={getStatusColor(update.status)}>
                          {getStatusText(update.status)}
                        </Badge>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {update.date}
                        </span>
                      </div>
                      <CardTitle className="text-xl mb-2">{update.title}</CardTitle>
                      <p className="text-gray-600">{update.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {update.features.map((feature, featureIndex) => {
                      const IconComponent = feature.icon;
                      return (
                        <div key={featureIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <IconComponent className={`w-5 h-5 mt-0.5 ${getCategoryColor(feature.category)}`} />
                          <div>
                            <h4 className="font-medium text-gray-800">{feature.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upcoming Features */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-purple-800 flex items-center justify-center space-x-2">
                <Rocket className="w-6 h-6" />
                <span>향후 계획</span>
              </CardTitle>
              <p className="text-center text-purple-700">
                곧 출시될 새로운 기능들을 미리 확인해보세요
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingFeatures.map((feature, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-purple-100">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                      <Badge className={getPriorityColor(feature.priority)}>
                        {feature.priority === 'high' && '높음'}
                        {feature.priority === 'medium' && '보통'}
                        {feature.priority === 'low' && '낮음'}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                    <div className="flex items-center text-purple-600 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {feature.timeline}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Signup */}
          <Card className="mt-12 border-blue-200 bg-blue-50">
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                업데이트 알림 받기
              </h3>
              <p className="text-blue-700 mb-6">
                새로운 기능과 업데이트 소식을 가장 먼저 받아보세요
              </p>
              <div className="max-w-md mx-auto flex space-x-2">
                <input
                  type="email"
                  placeholder="이메일 주소를 입력하세요"
                  className="flex-1 px-4 py-2 border border-blue-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">
                  구독하기
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              다른 페이지도 확인해보세요
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onNavigate && onNavigate('user-guide')}
                className="px-6 py-3 bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
              >
                📖 사용자 가이드
              </button>
              <button
                onClick={() => onNavigate && onNavigate('faq')}
                className="px-6 py-3 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
              >
                ❓ FAQ
              </button>
              <button
                onClick={() => onNavigate && onNavigate('tech-support')}
                className="px-6 py-3 bg-white border border-teal-200 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors"
              >
                🔧 기술 지원
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}