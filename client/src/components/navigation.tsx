import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Settings, HelpCircle, Menu, Home, FileText, Users, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PageType } from "@/App";

interface NavigationProps {
  onNavigate: (page: PageType) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const [helpOpen, setHelpOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              onClick={() => {
                console.log('Logo clicked - navigating to home');
                onNavigate('home');
              }}
              className="flex items-center cursor-pointer"
            >
              <h1 className="text-2xl font-black">
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  KidsMotion
                </span>
                <span className="text-black ml-2 text-lg font-normal">
                  | MotionBike
                </span>
              </h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <nav className="flex items-center space-x-8">
              <span 
                onClick={() => onNavigate('home')}
                className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5 cursor-pointer"
              >
                홈
              </span>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5 cursor-pointer">
                    분석
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem 
                    onClick={() => onNavigate('home')}
                    className="cursor-pointer"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    새 측정하기
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onNavigate('records')}
                    className="cursor-pointer"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    기록 조회
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <span 
                onClick={() => {
                  console.log('소개 클릭됨');
                  onNavigate('about');
                }}
                className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5 cursor-pointer"
              >
                소개
              </span>
              <span 
                onClick={() => {
                  console.log('문의 클릭됨');
                  onNavigate('contact');
                }}
                className="text-lg font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5 cursor-pointer"
              >
                문의
              </span>
            </nav>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setHelpOpen(true)}
                className="p-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setSettingsOpen(true)}
                className="p-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onNavigate('home')}>
                  <Home className="mr-2 h-4 w-4" />
                  홈
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate('records')}>
                  <FileText className="mr-2 h-4 w-4" />
                  기록 조회
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate('about')}>
                  <Users className="mr-2 h-4 w-4" />
                  소개
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate('contact')}>
                  <Phone className="mr-2 h-4 w-4" />
                  문의
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Help Dialog */}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>도움말</DialogTitle>
            <DialogDescription>
              KidsMotion 사용법을 안내해드립니다.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">측정 방법</h4>
              <p className="text-sm text-gray-600">
                1. 학생 정보를 입력합니다<br/>
                2. 와트바이크에서 5분간 측정합니다<br/>
                3. AI가 자동으로 분석 리포트를 생성합니다
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">문의</h4>
              <p className="text-sm text-gray-600">
                전화: 010-8445-0908<br/>
                이메일: info@motionbike.co.kr
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>설정</DialogTitle>
            <DialogDescription>
              시스템 설정을 관리합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">버전 정보</h4>
              <p className="text-sm text-gray-600">
                KidsMotion v1.0<br/>
                MotionBike 2024
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}