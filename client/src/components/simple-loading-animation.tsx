import { useEffect, useState } from "react";

interface SimpleLoadingAnimationProps {
  isVisible: boolean;
  onAnimationComplete?: () => void;
}

export default function SimpleLoadingAnimation({ isVisible, onAnimationComplete }: SimpleLoadingAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "체력 데이터를 분석하고 있습니다...",
    "AI가 개인 맞춤 운동을 처방하고 있습니다...",
    "또래 대비 체력 수준을 계산하고 있습니다...",
    "전문가급 리포트를 생성하고 있습니다...",
    "분석이 거의 완료되었습니다!"
  ];

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      setCurrentMessage(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        // 0-70%는 빠르게, 70-100%는 천천히 진행
        const increment = prev < 70 ? 1 : 0.25;
        return Math.min(prev + increment, 100);
      });
    }, 300);

    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [isVisible, onAnimationComplete]);

  // 외부에서 애니메이션 완료를 호출할 수 있도록
  useEffect(() => {
    if (progress >= 100 && !isVisible) {
      onAnimationComplete?.();
    }
  }, [isVisible, progress, onAnimationComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="max-w-2xl w-full px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              체력 분석 중
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            잠시만 기다려주세요. 정확한 분석을 위해 열심히 계산하고 있습니다!
          </p>
        </div>

        {/* Simple Loading Container */}
        <div className="relative h-32 mb-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center">
          {/* Loading Spinner */}
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-lg font-bold text-purple-600">AI</div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="text-center space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white bg-opacity-30 animate-pulse"></div>
            </div>
          </div>

          {/* Progress Percentage */}
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(progress)}%
          </div>

          {/* Status Message */}
          <div className="text-lg text-gray-700 font-medium min-h-[28px] transition-all duration-500">
            {messages[currentMessage]}
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}