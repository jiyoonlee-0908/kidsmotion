import { useState } from "react";
import { Bike, HelpCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter"; // SPA 라우팅을 위해 Link 사용
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SettingsModal from "@/components/settings-modal";
import HelpCenterModal from "@/components/help-center-modal";

interface NavigationProps {
  /**
   * 상위 컴포넌트가 페이지 이동을 추적하고 싶을 때 사용.
   * 실제 URL 변경은 <Link> 가 담당하므로, 여기서는 콜백만 호출해 준다.
   */
  onNavigate?: (page: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps = {}) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpCenterOpen, setHelpCenterOpen] = useState(false);

  /**
   * Link 로 이동하면서 동시에 상위에 페이지 정보를 알림.
   */
  const notifyParent = (page: string) => onNavigate && onNavigate(page);

  return (
    <header className="glass-effect border-b border-white/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* ▶ 로고 & 브랜드 */}
          <div className="flex items-center space-x-5">
            <Link
              href="/"
              onClick={() => notifyParent("home")}
              className="flex items-center space-x-5 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-xl">
                <Bike className="text-white w-8 h-8" />
              </div>
              <div className="flex items-baseline space-x-2">
                <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  KidsMotion
                </h1>
                <span className="text-lg font-medium text-gray-500 tracking-wide">
                  MotionBike
                </span>
              </div>
            </Link>
            <Link
              href="/ir-materials"
              onClick={() => notifyParent("ir-materials")}
              className="text-lg font-medium text-purple-600 tracking-wide cursor-pointer hover:text-purple-800 transition-colors border-2 border-purple-400 px-3 py-1 rounded-lg hover:border-purple-600 hover:bg-purple-50"
            >
              IR자료
            </Link>
          </div>

          {/* ▶ 메인 네비게이션 + 우측 버튼들 */}
          <div className="flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {/* 홈 */}
              <Link
                href="/"
                onClick={() => notifyParent("home")}
                className="text-xl font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5"
              >
                홈
              </Link>

              {/* 분석 ▼ */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-xl font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5 flex items-center space-x-1">
                    <span>분석</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-white/95 backdrop-blur-sm border border-white/20 shadow-xl">
                  <DropdownMenuItem asChild>
                    {/* 체력 측정 */}
                    <Link
                      href="/#analysis"
                      onClick={() => notifyParent("measurement")}
                      className="w-full cursor-pointer text-lg font-semibold text-gray-700 hover:text-primary hover:bg-primary/10 transition-colors px-3 py-2 rounded-lg"
                    >
                      체력 측정
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    {/* 측정 기록 */}
                    <Link
                      href="/records"
                      onClick={() => notifyParent("records")}
                      className="w-full cursor-pointer text-lg font-semibold text-gray-700 hover:text-primary hover:bg-primary/10 transition-colors px-3 py-2 rounded-lg"
                    >
                      측정 기록
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* 소개 & 문의 */}
              <Link
                href="/about"
                onClick={() => notifyParent("about")}
                className="text-xl font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5"
              >
                소개
              </Link>
              <Link
                href="/contact"
                onClick={() => notifyParent("contact")}
                className="text-xl font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5"
              >
                문의
              </Link>
            </nav>

            {/* 도움말 & 설정 버튼 */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setHelpCenterOpen(true)}
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-100/80"
              >
                <HelpCircle className="w-10 h-10" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSettingsOpen(true)}
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-100/80"
              >
                <Settings className="w-8 h-8" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 모달들 */}
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
      <HelpCenterModal open={helpCenterOpen} onOpenChange={setHelpCenterOpen} onNavigate={onNavigate} />
    </header>
  );
}