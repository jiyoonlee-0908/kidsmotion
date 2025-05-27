import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  ChevronDown,
  ChevronUp,
  Clock,
  Users,
  Shield,
  Settings,
  Heart,
  AlertCircle,
  CheckCircle,
  Phone,
  Mail
} from "lucide-react";
import Navigation from "@/components/navigation";
import CommonFooter from "@/components/common-footer";

interface FAQProps {
  onNavigate?: (page: string) => void;
}

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
}

const faqData: FAQItem[] = [
  // 측정 관련
  {
    id: "1",
    category: "측정",
    question: "측정은 얼마나 걸리나요?",
    answer: "전체 측정 시간은 약 5분입니다. 기본 정보 입력 1분, 실제 측정 5분, 결과 분석 1분으로 총 7분 정도 소요됩니다.",
    keywords: ["시간", "측정", "소요", "걸리는"]
  },
  {
    id: "2",
    category: "측정",
    question: "아이가 몇 살부터 측정 가능한가요?",
    answer: "키 100cm 이상, 나이 4세 이상부터 측정 가능합니다. 안전을 위해 보호자와 함께 측정하는 것을 권장합니다.",
    keywords: ["나이", "연령", "키", "조건", "가능"]
  },
  {
    id: "3",
    category: "측정",
    question: "측정 전에 준비해야 할 것이 있나요?",
    answer: "편안한 운동복과 운동화를 착용해주세요. 측정 2시간 전 가벼운 식사를 하고, 충분한 휴식을 취한 상태로 오시면 됩니다.",
    keywords: ["준비", "준비물", "옷", "운동복", "신발"]
  },
  {
    id: "4",
    category: "측정",
    question: "측정 시 아프거나 힘들지 않나요?",
    answer: "스마트 사이클은 아이의 체력에 맞춰 자동으로 조절되므로 안전합니다. 언제든지 중단할 수 있으며, 전문 staff가 함께 합니다.",
    keywords: ["안전", "아픔", "힘듦", "중단", "보호"]
  },

  // 결과 분석
  {
    id: "5",
    category: "결과",
    question: "결과는 언제 받을 수 있나요?",
    answer: "측정 완료 즉시 AI 분석 결과를 확인할 수 있습니다. 상세한 PDF 리포트는 이메일로도 발송해드립니다.",
    keywords: ["결과", "언제", "즉시", "리포트", "PDF"]
  },
  {
    id: "6",
    category: "결과",
    question: "결과가 정확한가요?",
    answer: "의료급 정밀 센서와 AI 분석을 통해 95% 이상의 정확도를 보장합니다. 전국 1만명 이상의 데이터를 기반으로 비교 분석합니다.",
    keywords: ["정확", "정확도", "신뢰", "센서", "AI"]
  },
  {
    id: "7",
    category: "결과",
    question: "등급은 어떻게 나누나요?",
    answer: "매우우수(상위4%), 우수(상위20%), 보통(상위50%), 낮음(하위20%), 매우낮음(하위4%)로 5단계로 구분합니다.",
    keywords: ["등급", "구분", "백분위", "상위", "하위"]
  },



  // 서비스 이용
  {
    id: "10",
    category: "서비스",
    question: "측정 비용은 얼마인가요?",
    answer: "측정 비용은 기관마다 차이가 있을 수 있습니다. 정확한 비용은 전화(010-8445-0908)로 문의해 주세요.",
    keywords: ["비용", "가격", "요금", "할인", "단체"]
  },
  {
    id: "11",
    category: "서비스",
    question: "예약은 어떻게 하나요?",
    answer: "전화(010-8445-0908) 또는 홈페이지에서 예약 가능합니다. 평일 오전 9시-오후 6시, 토요일 오전 9시-오후 3시까지 운영합니다.",
    keywords: ["예약", "전화", "운영시간", "평일", "토요일"]
  },

  // 개인정보
  {
    id: "12",
    category: "개인정보",
    question: "개인정보는 안전하게 보관되나요?",
    answer: "개인정보보호법에 따라 암호화하여 안전하게 보관됩니다. 사용자가 직접 삭제 요청할 수 있으며, 마케팅 목적으로 사용하지 않습니다.",
    keywords: ["개인정보", "보호", "암호화", "삭제", "안전"]
  },
  {
    id: "13",
    category: "개인정보",
    question: "데이터는 누구와 공유되나요?",
    answer: "개인 식별이 불가능한 통계 데이터만 연구 목적으로 활용됩니다. 개인정보는 절대 제3자와 공유하지 않습니다.",
    keywords: ["공유", "데이터", "연구", "통계", "제3자"]
  },

  // 기술 지원
  {
    id: "14",
    category: "기술지원",
    question: "측정 중 문제가 생기면 어떻게 하나요?",
    answer: "즉시 전문 staff에게 알려주세요. 기술적 문제는 바로 해결하고, 필요시 재측정을 진행합니다.",
    keywords: ["문제", "오류", "기술", "재측정", "해결"]
  },
  {
    id: "15",
    category: "기술지원",
    question: "홈페이지 사용법을 모르겠어요",
    answer: "사용자 가이드를 참고하시거나, 고객센터(010-8445-0908)로 연락주시면 친절하게 안내해드립니다.",
    keywords: ["사용법", "홈페이지", "가이드", "고객센터", "안내"]
  }
];

const categories = ["전체", "측정", "결과", "서비스", "개인정보", "기술지원"];

export default function FAQ({ onNavigate }: FAQProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "전체" || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "측정": return Clock;
      case "결과": return CheckCircle;

      case "서비스": return Users;
      case "개인정보": return Shield;
      case "기술지원": return Settings;
      default: return AlertCircle;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "측정": return "bg-blue-100 text-blue-800 border-blue-200";
      case "결과": return "bg-green-100 text-green-800 border-green-200";

      case "서비스": return "bg-purple-100 text-purple-800 border-purple-200";
      case "개인정보": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "기술지원": return "bg-teal-100 text-teal-800 border-teal-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
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
                자주 묻는 질문
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              키즈모션에 대해 궁금한 점들을 한눈에 확인해보세요
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="궁금한 내용을 검색해보세요..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                  {category !== "전체" && (
                    <span className="ml-2 text-xs">
                      ({faqData.filter(item => item.category === category).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQ.length > 0 ? (
              filteredFAQ.map((item) => {
                const IconComponent = getCategoryIcon(item.category);
                const isExpanded = expandedItems.includes(item.id);
                
                return (
                  <Card key={item.id} className="border-gray-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="cursor-pointer" onClick={() => toggleExpanded(item.id)}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge className={`${getCategoryColor(item.category)} border`}>
                            <IconComponent className="w-3 h-3 mr-1" />
                            {item.category}
                          </Badge>
                          <h3 className="text-lg font-semibold text-gray-800 flex-1">
                            {item.question}
                          </h3>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </CardHeader>
                    {isExpanded && (
                      <CardContent className="pt-0">
                        <div className="pl-6 border-l-4 border-purple-200">
                          <p className="text-gray-700 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  검색 결과가 없습니다
                </h3>
                <p className="text-gray-500">
                  다른 키워드로 검색해보시거나 카테고리를 변경해보세요
                </p>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <Card className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-purple-800">
                더 궁금한 점이 있으신가요?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <p className="text-blue-700 font-medium">support@motionbike.co.kr</p>
                  <p className="text-sm text-blue-600 mt-1">24시간 접수</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              다른 도움말도 확인해보세요
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onNavigate && onNavigate('user-guide')}
                className="px-6 py-3 bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
              >
                📖 사용자 가이드
              </button>
              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="px-6 py-3 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
              >
                📞 문의하기
              </button>
              <button className="px-6 py-3 bg-white border border-teal-200 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors">
                🔧 기술 지원
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <CommonFooter onNavigate={onNavigate} />
    </div>
  );
}