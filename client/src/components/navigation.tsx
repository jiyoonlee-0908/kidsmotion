import { Bike, HelpCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationProps {
  onNavigate?: (page: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps = {}) {
  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <header className="glass-effect border-b border-white/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            {/* 로고 */}
            <div 
              onClick={() => handleNavigation('home')}
              className="flex items-center space-x-5 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-xl">
                <Bike className="text-white w-8 h-8" />
              </div>
              <div className="flex items-baseline space-x-2">
                <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  KidsBike
                </h1>
                <span className="text-lg font-medium text-gray-500 tracking-wide">
                  MotionBike
                </span>
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation('ir-materials');
                  }}
                  className="text-lg font-medium text-purple-600 tracking-wide ml-4 cursor-pointer hover:text-purple-800 transition-colors border-2 border-purple-400 px-3 py-1 rounded-lg hover:border-purple-600 hover:bg-purple-50"
                >
                  IR자료
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            {/* 메인 네비게이션 */}
            <nav className="flex items-center space-x-8">
              <span 
                onClick={() => handleNavigation('home')}
                className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5 cursor-pointer"
              >
                홈
              </span>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5 flex items-center space-x-1">
                    <span>분석</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-white/95 backdrop-blur-sm border border-white/20 shadow-xl">
                  <DropdownMenuItem 
                    onClick={() => handleNavigation('measurement')}
                    className="cursor-pointer hover:bg-primary/10"
                  >
                    📊 체력 측정
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleNavigation('measurement-history')}
                    className="cursor-pointer hover:bg-primary/10"
                  >
                    📈 측정 기록
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <span 
                onClick={() => handleNavigation('about')}
                className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5 cursor-pointer"
              >
                소개
              </span>
              
              <span 
                onClick={() => handleNavigation('contact')}
                className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5 cursor-pointer"
              >
                문의
              </span>
            </nav>

            {/* 우측 버튼들 */}
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleNavigation('help')}
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-100/80"
              >
                <HelpCircle className="w-5 h-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleNavigation('settings')}
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-100/80"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}