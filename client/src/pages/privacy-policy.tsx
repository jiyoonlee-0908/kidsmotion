import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield,
  Lock,
  Eye,
  Database,
  Clock,
  Mail,
  Phone,
  FileText,
  AlertCircle,
  CheckCircle,
  UserCheck,
  Settings
} from "lucide-react";
import Navigation from "@/components/navigation";

interface PrivacyPolicyProps {
  onNavigate?: (page: string) => void;
}

export default function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
  const sections = [
    {
      id: "collection",
      title: "개인정보의 수집 및 이용목적",
      icon: Database,
      content: [
        {
          subtitle: "수집하는 개인정보 항목",
          items: [
            "필수항목: 성명, 생년월일, 성별, 신장, 체중, 연락처(학교/학급 정보)",
            "선택항목: 이메일 주소, 보호자 연락처",
            "자동 수집 항목: 접속 로그, 쿠키, 접속 IP 정보, 서비스 이용 기록"
          ]
        },
        {
          subtitle: "개인정보 수집 및 이용목적",
          items: [
            "체력 측정 및 분석 서비스 제공",
            "개인 맞춤형 운동 처방 및 건강 관리 서비스 제공",
            "측정 결과 리포트 생성 및 제공",
            "서비스 개선 및 신규 서비스 개발을 위한 통계 분석",
            "고객 상담 및 불만 처리"
          ]
        }
      ]
    },
    {
      id: "retention",
      title: "개인정보의 보유 및 이용기간",
      icon: Clock,
      content: [
        {
          subtitle: "보유기간",
          items: [
            "회원정보: 서비스 이용 종료 후 3년",
            "측정 데이터: 측정일로부터 5년 (의료기기법에 따른 보존의무)",
            "상담 기록: 상담 완료 후 1년",
            "로그 기록: 3개월"
          ]
        },
        {
          subtitle: "예외사항",
          items: [
            "관련 법령에 의해 보존이 필요한 경우 해당 법령에서 정한 기간",
            "수사기관의 요청이 있는 경우 수사 완료 시까지",
            "서비스 이용자가 동의한 경우 동의한 기간"
          ]
        }
      ]
    },
    {
      id: "provision",
      title: "개인정보의 제3자 제공",
      icon: UserCheck,
      content: [
        {
          subtitle: "제3자 제공 원칙",
          items: [
            "원칙적으로 개인정보를 제3자에게 제공하지 않습니다",
            "법령에 의해 요구되는 경우에만 제공합니다",
            "이용자의 별도 동의가 있는 경우에만 제공합니다"
          ]
        },
        {
          subtitle: "제3자 제공 현황",
          items: [
            "현재 제3자에게 개인정보를 제공하고 있지 않습니다",
            "향후 제3자 제공이 필요한 경우 사전에 동의를 받겠습니다"
          ]
        }
      ]
    },
    {
      id: "processing",
      title: "개인정보의 처리위탁",
      icon: Settings,
      content: [
        {
          subtitle: "위탁업체 현황",
          items: [
            "클라우드 서비스: Amazon Web Services (데이터 저장 및 관리)",
            "결제 서비스: 해당 없음 (현재 무료 서비스 제공)",
            "고객상담: 자체 처리"
          ]
        },
        {
          subtitle: "위탁 관리",
          items: [
            "개인정보 처리위탁 계약 체결 시 개인정보 보호 법규 준수 의무화",
            "위탁업체의 개인정보 처리 현황 점검 및 관리",
            "위탁 관계 종료 시 개인정보 반납 및 삭제"
          ]
        }
      ]
    },
    {
      id: "rights",
      title: "정보주체의 권리 및 의무",
      icon: Shield,
      content: [
        {
          subtitle: "정보주체의 권리",
          items: [
            "개인정보 처리현황 통지 요구권",
            "개인정보 열람 요구권",
            "개인정보 정정·삭제 요구권",
            "개인정보 처리정지 요구권",
            "손해배상청구권"
          ]
        },
        {
          subtitle: "권리 행사 방법",
          items: [
            "서면, 전화, 이메일을 통해 연락",
            "개인정보보호 담당자에게 요청",
            "법정대리인을 통한 권리 행사 가능 (만 14세 미만)"
          ]
        }
      ]
    },
    {
      id: "security",
      title: "개인정보의 안전성 확보조치",
      icon: Lock,
      content: [
        {
          subtitle: "기술적 보호조치",
          items: [
            "개인정보 암호화 저장 및 전송",
            "해킹 등에 대비한 기술적 대책 수립",
            "백신 소프트웨어 등의 설치 및 갱신",
            "개인정보처리시스템 등의 접근권한 관리"
          ]
        },
        {
          subtitle: "관리적 보호조치",
          items: [
            "개인정보 취급직원의 최소한 지정 및 교육",
            "개인정보 취급방침의 수립 및 시행",
            "개인정보처리시스템 접속기록 보관 및 위변조 방지",
            "개인정보취급 직원에 대한 정기적 교육"
          ]
        }
      ]
    },
    {
      id: "cookies",
      title: "쿠키 등 자동수집장치 운영",
      icon: Eye,
      content: [
        {
          subtitle: "쿠키의 목적",
          items: [
            "이용자의 서비스 이용 편의성 향상",
            "서비스 개선을 위한 통계 분석",
            "맞춤형 서비스 제공"
          ]
        },
        {
          subtitle: "쿠키 거부 방법",
          items: [
            "웹브라우저 설정에서 쿠키 허용 수준 조정 가능",
            "쿠키 거부 시 일부 서비스 이용에 제한이 있을 수 있음"
          ]
        }
      ]
    },
    {
      id: "contact",
      title: "개인정보보호 책임자",
      icon: Phone,
      content: [
        {
          subtitle: "개인정보보호 책임자",
          items: [
            "성명: 개인정보보호 담당자",
            "연락처: 010-8445-0908",
            "이메일: privacy@motionbike.co.kr",
            "주소: 서울시 강서구 금낭화로 234, GX2"
          ]
        },
        {
          subtitle: "개인정보 침해신고센터",
          items: [
            "개인정보 침해신고센터: privacy.go.kr (국번없이 182)",
            "개인정보 분쟁조정위원회: kopico.go.kr (국번없이 1833-6972)",
            "대검찰청 사이버범죄수사단: spo.go.kr (02-3480-3573)",
            "경찰청 사이버테러대응센터: ctrc.go.kr (국번없이 182)"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation onNavigate={onNavigate} />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                개인정보처리방침
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              키즈모션은 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고자 다음과 같은 처리방침을 수립·공개합니다.
            </p>
            <div className="mt-6 flex items-center justify-center space-x-4">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="w-4 h-4 mr-1" />
                2025.01.01 제정
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                <FileText className="w-4 h-4 mr-1" />
                최신 버전
              </Badge>
            </div>
          </div>

          {/* Important Notice */}
          <Card className="mb-12 border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-orange-800 mb-2">중요 안내사항</h3>
                  <p className="text-orange-700 text-sm leading-relaxed">
                    본 개인정보처리방침은 2025년 1월 1일부터 시행됩니다. 
                    만 14세 미만 아동의 경우 법정대리인의 동의가 필요하며, 
                    개인정보 수집·이용에 동의하지 않을 권리가 있습니다. 
                    다만, 동의 거부 시 서비스 이용이 제한될 수 있습니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Policy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Card key={section.id} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-purple-600" />
                      </div>
                      <span>{index + 1}. {section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <h4 className="font-semibold text-gray-800 mb-3">{item.subtitle}</h4>
                          <ul className="space-y-2">
                            {item.items.map((point, pointIndex) => (
                              <li key={pointIndex} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Section */}
          <Card className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-purple-800">
                개인정보 관련 문의
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Phone className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-purple-800 mb-2">전화 문의</h4>
                  <p className="text-purple-700 font-medium text-lg">010-8445-0908</p>
                  <p className="text-sm text-purple-600 mt-1">평일 09:00 - 18:00</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-blue-800 mb-2">이메일 문의</h4>
                  <p className="text-blue-700 font-medium">privacy@motionbike.co.kr</p>
                  <p className="text-sm text-blue-600 mt-1">24시간 접수</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-teal-600" />
                  </div>
                  <h4 className="font-semibold text-teal-800 mb-2">서면 신청</h4>
                  <p className="text-teal-700 font-medium text-sm">서울시 강서구 금낭화로 234, GX2</p>
                  <p className="text-sm text-teal-600 mt-1">우편 또는 방문</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Notice */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>본 개인정보처리방침은 법령·정책 또는 보안기술의 변경에 따라 내용의 추가·삭제 및 수정이 있을 시에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>
            <p className="mt-2">개인정보처리방침 버전번호: v1.0 | 공고일자: 2025년 1월 1일 | 시행일자: 2025년 1월 1일</p>
          </div>
        </div>
      </main>
    </div>
  );
}