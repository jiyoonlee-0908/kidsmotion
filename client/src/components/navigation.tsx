import { Link, useLocation } from "wouter";
import { ActivitySquare, Search, History, ChevronDown, BarChart3, Home, MessageCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <ActivitySquare className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">KidsMotion</h1>
              <p className="text-xs text-gray-500 font-medium">MotionBike</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex space-x-1">
            <Button variant="ghost" className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>홈</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant={location === "/" || location === "/records" ? "default" : "ghost"} 
                  className="flex items-center space-x-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>분석</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex items-center space-x-2 w-full cursor-pointer">
                    <Search className="w-4 h-4" />
                    <span>측정</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/records" className="flex items-center space-x-2 w-full cursor-pointer">
                    <History className="w-4 h-4" />
                    <span>기록</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" className="flex items-center space-x-2">
              <Info className="w-4 h-4" />
              <span>소개</span>
            </Button>

            <Button variant="ghost" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>문의</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}