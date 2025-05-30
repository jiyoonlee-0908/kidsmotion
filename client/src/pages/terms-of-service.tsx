import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText,
  User,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Scale,
  Users,
  CreditCard,
  Gavel,
  RefreshCw
} from "lucide-react";


interface TermsOfServiceProps {
  onNavigate?: (page: string) => void;
}

export default function TermsOfService({ onNavigate }: TermsOfServiceProps) {
  const sections = [
    {
      id: "general",
      title: "총칙",
      icon: FileText,
      content: [
        {
          subtitle: "목적",
          items: [
            "본 약관은 MotionBike(이하 '회사')가 제공하는 키즈모션 서비스(이하 '서비스')의 이용조건 및 절차, 회사와 이용자 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다."
          ]
        },
        {
          subtitle: "용어의 정의",
          items: [
            "'서비스'란 회사가 제공하는 아동 체력 측정 및 분석, 운동 처방 서비스를 의미합니다.",
            "'이용자'란 본 약관에 따라 회사가 제공하는 서비스를 받는 개인 또는 법인을 의미합니다.",
            "'측정 데이터'란 서비스 이용 과정에서 수집되는 체력 측정 결과 및 관련 정보를 의미합니다.",
            "'법정대리인'이란 만 14세 미만 아동의 부모 또는 법적 보호자를 의미합니다."
          ]
        }
      ]
    },
    {
      id: "service",
      title: "서비스의 제공 및 변경",
      icon: RefreshCw,
      content: [
        {
          subtitle: "서비스의 내용",
          items: [
            "아동 체력 측정 서비스 (와트바이크를 이용한 체력 측정)",
            "측정 결과 분석 및 평가 서비스",
            "개인 맞춤형 운동 처방 서비스",
            "체력 변화 추적 및 관리 서비스",
            "측정 결과 리포트 제공 서비스"
          ]
        },
        {
          subtitle: "서비스 제공 시간",
          items: [
            "서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.",
            "다만, 시스템 정기점검, 증설 및 교체를 위해 당 회사가 정한 날이나 시간에는 서비스가 일시 중단될 수 있습니다.",
            "서비스 중단 시 사전에 공지하며, 긴급한 경우 사후 공지할 수 있습니다."
          ]
        }
      ]
    },
    {
      id: "membership",
      title: "서비스 이용신청 및 승낙",
      icon: User,
      content: [
        {
          subtitle: "이용신청",
          items: [
            "서비스 이용을 원하는 자는 회사가 정한 양식에 따라 이용신청을 해야 합니다.",
            "만 14세 미만 아동의 경우 법정대리인의 동의가 필요합니다.",
            "이용신청 시 실명 및 실제 정보를 기재해야 하며, 허위 정보 기재 시 서비스 이용이 제한될 수 있습니다."
          ]
        },
        {
          subtitle: "이용승낙",
          items: [
            "회사는 이용신청자가 다음 각 호에 해당하지 않는 한 이용신청을 승낙합니다.",
            "본인의 실명으로 신청하지 않은 경우",
            "타인의 명의를 사용하여 신청한 경우",
            "이용신청 시 필요사항을 허위로 기재한 경우",
            "사회의 안녕과 질서, 미풍양속을 저해할 목적으로 신청한 경우"
          ]
        }
      ]
    },
    {
      id: "obligations",
      title: "당사자의 의무",
      icon: Scale,
      content: [
        {
          subtitle: "회사의 의무",
          items: [
            "회사는 관련법과 본 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 지속적이고 안정적으로 서비스를 제공하기 위해 노력합니다.",
            "회사는 이용자가 안전하게 서비스를 이용할 수 있도록 개인정보보호를 위한 보안시스템을 구축합니다.",
            "회사는 서비스 이용과 관련하여 이용자로부터 제기된 의견이나 불만이 정당하다고 인정될 경우 이를 처리해야 합니다."
          ]
        },
        {
          subtitle: "이용자의 의무",
          items: [
            "이용자는 다음 행위를 해서는 안 됩니다:",
            "서비스 이용신청 또는 변경 시 허위내용을 등록하는 행위",
            "타인의 정보도용 행위",
            "회사가 게시한 정보를 변경하는 행위",
            "회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해",
            "회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위"
          ]
        }
      ]
    },
    {
      id: "fees",
      title: "서비스 이용료 및 결제",
      icon: CreditCard,
      content: [
        {
          subtitle: "이용료",
          items: [
            "기본 체력 측정 서비스: 별도 문의",
            "프리미엄 분석 서비스: 별도 문의",
            "단체 할인: 10명 이상 시 별도 협의",
            "재측정 할인: 3개월 내 재측정 시 50% 할인"
          ]
        },
        {
          subtitle: "결제방법",
          items: [
            "현금 결제",
            "계좌이체",
            "기타 회사가 정하는 방법"
          ]
        },
        {
          subtitle: "환불정책",
          items: [
            "측정 전 취소 시: 100% 환불",
            "측정 시작 후 이용자 사유로 중단 시: 환불 불가",
            "회사 사유로 서비스 제공 불가 시: 100% 환불"
          ]
        }
      ]
    },
    {
      id: "data",
      title: "측정 데이터의 관리 및 이용",
      icon: Shield,
      content: [
        {
          subtitle: "데이터 소유권",
          items: [
            "측정 데이터의 소유권은 이용자에게 있습니다.",
            "회사는 서비스 제공 목적 범위 내에서만 측정 데이터를 이용할 수 있습니다.",
            "개인 식별이 불가능한 통계 데이터는 서비스 개선 목적으로 활용할 수 있습니다."
          ]
        },
        {
          subtitle: "데이터 보관 및 삭제",
          items: [
            "측정 데이터는 의료기기법에 따라 5년간 보관됩니다.",
            "이용자는 언제든지 개인 데이터의 삭제를 요청할 수 있습니다.",
            "법령에 의한 보존 의무가 있는 경우 해당 기간까지 보관됩니다."
          ]
        }
      ]
    },
    {
      id: "liability",
      title: "책임의 제한",
      icon: Gavel,
      content: [
        {
          subtitle: "회사의 책임 제한",
          items: [
            "회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.",
            "회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.",
            "회사는 이용자가 서비스를 이용하여 얻은 정보 또는 자료 등에 대한 신뢰도, 정확성 등에 대해서는 보증하지 않으며 이로 인한 손해에 대해서는 책임을 지지 않습니다."
          ]
        },
        {
          subtitle: "측정 결과의 한계",
          items: [
            "측정 결과는 참고용이며 의학적 진단을 대체하지 않습니다.",
            "건강상 문제가 있는 경우 전문의와 상담하시기 바랍니다.",
            "측정 결과에 대한 해석은 개인차가 있을 수 있습니다."
          ]
        }
      ]
    },
    {
      id: "termination",
      title: "서비스 이용의 제한 및 중지",
      icon: AlertCircle,
      content: [
        {
          subtitle: "이용 제한 사유",
          items: [
            "이용신청 시 허위 내용을 등록한 경우",
            "타인의 서비스 이용을 방해하거나 정보를 도용한 경우",
            "서비스를 이용하여 법령과 본 약관이 금지하는 행위를 하는 경우",
            "기타 회사가 합리적인 판단에 의하여 서비스의 제공을 거부할 필요가 있다고 인정하는 경우"
          ]
        },
        {
          subtitle: "이용 제한 절차",
          items: [
            "회사는 이용 제한 시 그 사유와 일시, 기간을 정하여 이용자에게 통지합니다.",
            "이용자는 이용 제한에 대해 이의가 있을 경우 이의신청을 할 수 있습니다.",
            "회사는 이의신청에 대해 조사하고 결과를 통지합니다."
          ]
        }
      ]
    },
    {
      id: "misc",
      title: "기타",
      icon: Users,
      content: [
        {
          subtitle: "준거법 및 재판관할",
          items: [
            "본 약관은 대한민국 법령에 의하여 규정되고 이행됩니다.",
            "서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우 민사소송법상의 관할법원에 제기합니다."
          ]
        },
        {
          subtitle: "약관의 변경",
          items: [
            "회사는 약관의 변경이 필요하다고 인정되는 경우 변경된 약관을 적용하기 최소 7일 전에 공지합니다.",
            "변경된 약관에 동의하지 않는 이용자는 서비스 이용을 중단할 수 있습니다.",
            "변경 공지 후 서비스를 계속 이용하는 경우 변경된 약관에 동의한 것으로 간주됩니다."
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                서비스 이용약관
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              키즈모션 서비스 이용에 관한 조건 및 절차, 이용자와 회사 간의 권리·의무 및 책임사항을 안내합니다.
            </p>
            <div className="mt-6 flex items-center justify-center space-x-4">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="w-4 h-4 mr-1" />
                2025.01.01 시행
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                <Clock className="w-4 h-4 mr-1" />
                최신 버전
              </Badge>
            </div>
          </div>

          {/* Important Notice */}
          <Card className="mb-12 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">서비스 이용 안내</h3>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    본 서비스는 만 14세 미만 아동을 대상으로 하며, 법정대리인의 동의가 필요합니다. 
                    측정 결과는 참고용이며 의학적 진단을 대체하지 않습니다. 
                    건강상 문제가 있는 경우 반드시 전문의와 상담하시기 바랍니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Card key={section.id} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </div>
                      <span>제{index + 1}조 {section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <h4 className="font-semibold text-gray-800 mb-3">
                            {item.subtitle && `${index + 1}-${itemIndex + 1}. ${item.subtitle}`}
                          </h4>
                          <ul className="space-y-2">
                            {item.items.map((point, pointIndex) => (
                              <li key={pointIndex} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
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
          <Card className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-blue-800">
                약관 관련 문의
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-blue-800 mb-2">전화 상담</h4>
                  <p className="text-blue-700 font-medium text-lg">010-8445-0908</p>
                  <p className="text-sm text-blue-600 mt-1">평일 09:00 - 18:00</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-purple-800 mb-2">이메일 문의</h4>
                  <p className="text-purple-700 font-medium">support@motionbike.co.kr</p>
                  <p className="text-sm text-purple-600 mt-1">24시간 접수</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Notice */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>본 약관은 2025년 1월 1일부터 시행되며, 관련 법령이나 회사 정책 변경에 따라 수정될 수 있습니다.</p>
            <p className="mt-2">약관 변경 시 7일 전 사전 공지하며, 지속적인 서비스 이용 시 변경 약관에 동의한 것으로 간주됩니다.</p>
            <p className="mt-4 font-medium">MotionBike | 서울시 강서구 금낭화로 234, GX2 | 사업자등록번호: 000-00-00000</p>
          </div>
        </div>
      </main>
    </div>
  );
}