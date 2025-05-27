import { Phone, Mail, MapPin } from "lucide-react";

interface CommonFooterProps {
  onNavigate?: (page: string) => void;
}

export default function CommonFooter({ onNavigate }: CommonFooterProps) {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col h-full">
            <h4 className="text-xl font-bold mb-4">서비스</h4>
            <ul className="space-y-2 text-gray-300 flex-grow">
              <li 
                onClick={() => onNavigate && onNavigate('ai-exercise-prescription')}
                className="cursor-pointer hover:text-white transition-colors"
              >
                AI 기반 운동 처방
              </li>
              <li 
                onClick={() => onNavigate && onNavigate('growth-management')}
                className="cursor-pointer hover:text-white transition-colors"
              >
                지속적 성장 관리
              </li>
              <li 
                onClick={() => onNavigate && onNavigate('professional-report')}
                className="cursor-pointer hover:text-white transition-colors"
              >
                전문 리포트 생성
              </li>
              <li 
                onClick={() => onNavigate && onNavigate('easy-sharing')}
                className="cursor-pointer hover:text-white transition-colors"
              >
                간편한 결과 공유
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col h-full">
            <h4 className="text-xl font-bold mb-4">지원</h4>
            <ul className="space-y-2 text-gray-300 flex-grow">
              <li 
                onClick={() => onNavigate && onNavigate('user-guide')}
                className="cursor-pointer hover:text-white transition-colors"
              >
                사용자 가이드
              </li>
              <li 
                onClick={() => onNavigate && onNavigate('faq')}
                className="cursor-pointer hover:text-white transition-colors"
              >
                FAQ
              </li>
              <li 
                onClick={() => onNavigate && onNavigate('tech-support')}
                className="cursor-pointer hover:text-white transition-colors"
              >
                기술 지원
              </li>
              <li 
                onClick={() => onNavigate && onNavigate('updates')}
                className="cursor-pointer hover:text-white transition-colors"
              >
                업데이트 안내
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col h-full">
            <h4 className="text-xl font-bold mb-4">연락처</h4>
            <div className="space-y-3 text-gray-300 flex-grow">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4" />
                <span>010-8445-0908</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4" />
                <span>dayinj@naver.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4" />
                <span>서울시 강서구 금낭화로 234, GX2</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8">
          {/* MotionBike Section */}
          <div className="text-center mb-2 text-xs text-gray-500">
            <strong>MotionBike</strong> <strong>키즈모션</strong> - 아동 체력 분석 | <strong>실버모션</strong> - 시니어 건강관리 | <strong>휠모션</strong> - 장애인 재활
          </div>
          
          <div className="text-center text-gray-400">
            <p>&copy; 2025 MotionBike. All rights reserved. | 
              <span 
                onClick={() => onNavigate && onNavigate('privacy-policy')}
                className="cursor-pointer hover:text-white transition-colors"
              >
                개인정보처리방침
              </span> | 
              <span 
                onClick={() => onNavigate && onNavigate('terms-of-service')}
                className="cursor-pointer hover:text-white transition-colors"
              >
                이용약관
              </span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}