import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, Book, MessageCircle, Wrench, Bell, FileText, Shield } from "lucide-react";

interface HelpCenterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate?: (page: string) => void;
}

export default function HelpCenterModal({ open, onOpenChange, onNavigate }: HelpCenterModalProps) {
  const handleNavigateAndClose = (page: string) => {
    onOpenChange(false);
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <HelpCircle className="w-6 h-6 text-purple-600" />
            <span>도움말 센터</span>
          </DialogTitle>
          <DialogDescription>
            궁금한 사항이나 도움이 필요한 내용을 선택하세요.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4">
          {/* 사용자 가이드 */}
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-300"
            onClick={() => handleNavigateAndClose('user-guide')}
          >
            <Book className="w-8 h-8 text-purple-600" />
            <span className="font-semibold">사용자 가이드</span>
            <span className="text-xs text-gray-500">기본 사용법 안내</span>
          </Button>

          {/* FAQ */}
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-300"
            onClick={() => handleNavigateAndClose('faq')}
          >
            <MessageCircle className="w-8 h-8 text-blue-600" />
            <span className="font-semibold">자주 묻는 질문</span>
            <span className="text-xs text-gray-500">FAQ</span>
          </Button>

          {/* 기술 지원 */}
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-green-50 hover:border-green-300"
            onClick={() => handleNavigateAndClose('tech-support')}
          >
            <Wrench className="w-8 h-8 text-green-600" />
            <span className="font-semibold">기술 지원</span>
            <span className="text-xs text-gray-500">문제 해결 도움</span>
          </Button>

          {/* 업데이트 안내 */}
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-orange-50 hover:border-orange-300"
            onClick={() => handleNavigateAndClose('updates')}
          >
            <Bell className="w-8 h-8 text-orange-600" />
            <span className="font-semibold">업데이트 안내</span>
            <span className="text-xs text-gray-500">최신 소식</span>
          </Button>

          {/* 개인정보처리방침 */}
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50 hover:border-gray-300"
            onClick={() => handleNavigateAndClose('privacy-policy')}
          >
            <Shield className="w-8 h-8 text-gray-600" />
            <span className="font-semibold">개인정보처리방침</span>
            <span className="text-xs text-gray-500">개인정보 보호</span>
          </Button>

          {/* 이용약관 */}
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50 hover:border-gray-300"
            onClick={() => handleNavigateAndClose('terms-of-service')}
          >
            <FileText className="w-8 h-8 text-gray-600" />
            <span className="font-semibold">이용약관</span>
            <span className="text-xs text-gray-500">서비스 약관</span>
          </Button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">직접 문의</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p>📞 전화: 010-8445-0908</p>
            <p>✉️ 이메일: dayinj@naver.com</p>
            <p>⏰ 운영시간: 평일 09:00 - 18:00</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}