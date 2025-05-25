import { Link, useLocation } from "wouter";
import { ActivitySquare, Search, History } from "lucide-react";
import { Button } from "@/components/ui/button";

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
              <p className="text-xs text-gray-500">체력 분석 시스템</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex space-x-2">
            <Link href="/">
              <Button 
                variant={location === "/" ? "default" : "ghost"} 
                className="flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>측정</span>
              </Button>
            </Link>
            
            <Link href="/records">
              <Button 
                variant={location === "/records" ? "default" : "ghost"} 
                className="flex items-center space-x-2"
              >
                <History className="w-4 h-4" />
                <span>기록</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}