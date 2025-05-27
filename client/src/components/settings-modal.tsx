import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Settings, Info, Database, Cpu, Brain } from "lucide-react";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <Settings className="w-6 h-6 text-purple-600" />
            <span>시스템 설정</span>
          </DialogTitle>
          <DialogDescription>
            시스템 정보와 설정을 확인하세요.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* System Info */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">시스템 정보</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">버전:</span>
                <span className="ml-2 font-semibold">v0.1</span>
              </div>
              <div>
                <span className="text-gray-600">최종 업데이트:</span>
                <span className="ml-2 font-semibold">2025.05.26</span>
              </div>
              <div>
                <span className="text-gray-600">측정 엔진:</span>
                <span className="ml-2 font-semibold">MotionBike v0.1</span>
              </div>
              <div>
                <span className="text-gray-600">AI 모델:</span>
                <span className="ml-2 font-semibold">GPT-4o</span>
              </div>
            </div>
          </div>

          {/* Feature Status */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Cpu className="w-5 h-5 mr-2 text-blue-600" />
              기능 상태
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>실시간 측정</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">활성</span>
              </div>
              <div className="flex justify-between">
                <span>AI 분석</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">활성</span>
              </div>
              <div className="flex justify-between">
                <span>클라우드 동기화</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">대기</span>
              </div>
            </div>
          </div>

          {/* Storage Info */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-purple-600" />
              저장소 정보
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>사용된 공간</span>
                <span className="font-semibold">2.4 MB / 1 GB</span>
              </div>
              <div className="flex justify-between">
                <span>측정 기록 수</span>
                <span className="font-semibold">0개</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{width: '0.24%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}