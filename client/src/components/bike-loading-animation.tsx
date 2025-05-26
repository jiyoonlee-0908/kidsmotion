import { useEffect, useState } from "react";

interface BikeLoadingAnimationProps {
  isVisible: boolean;
  onAnimationComplete?: () => void;
}

export default function BikeLoadingAnimation({ isVisible, onAnimationComplete }: BikeLoadingAnimationProps) {
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
          clearInterval(interval);
          setTimeout(() => {
            onAnimationComplete?.();
          }, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [isVisible, onAnimationComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="max-w-4xl w-full px-8">
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

        {/* Animation Container */}
        <div className="relative h-40 mb-12 overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
          {/* Road */}
          <div className="absolute bottom-8 left-0 right-0 h-2 bg-gray-300 rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full"></div>
            {/* Road markings */}
            <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-white opacity-60">
              <div className="flex justify-between h-full">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-4 h-full bg-white animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Bike and Rider */}
          <div 
            className="absolute bottom-4 transition-all duration-100 ease-out"
            style={{ 
              left: `${Math.min(progress * 0.85, 85)}%`,
              transform: 'translateX(-50%)'
            }}
          >
            {/* Bike SVG */}
            <svg width="100" height="80" viewBox="0 0 100 80" className="transform scale-x-100">
              {/* Rider */}
              <g className="animate-bounce" style={{ animationDuration: '0.6s' }}>
                {/* Head */}
                <circle cx="45" cy="25" r="8" fill="#FFB84D" />
                {/* Helmet */}
                <path d="M37 25 Q45 15 53 25 Q50 20 45 20 Q40 20 37 25" fill="#FF6B6B" />
                
                {/* Body */}
                <ellipse cx="45" cy="40" rx="6" ry="12" fill="#4ECDC4" />
                
                {/* Arms */}
                <line x1="40" y1="35" x2="30" y2="45" stroke="#FFB84D" strokeWidth="3" strokeLinecap="round" />
                <line x1="50" y1="35" x2="60" y2="45" stroke="#FFB84D" strokeWidth="3" strokeLinecap="round" />
                
                {/* Legs */}
                <line x1="42" y1="50" x2="35" y2="65" stroke="#FFB84D" strokeWidth="3" strokeLinecap="round" />
                <line x1="48" y1="50" x2="55" y2="65" stroke="#FFB84D" strokeWidth="3" strokeLinecap="round" />
              </g>

              {/* Bike Frame */}
              <g fill="none" stroke="#333" strokeWidth="2">
                {/* Main frame */}
                <path d="M20 65 L45 45 L60 45 L70 65" />
                <path d="M45 45 L35 65" />
                <path d="M60 45 L60 65" />
                
                {/* Handlebars */}
                <path d="M25 45 L35 45" strokeWidth="3" strokeLinecap="round" />
                <circle cx="30" r="2" cy="45" fill="#333" />
              </g>

              {/* Wheels */}
              <g>
                {/* Front wheel */}
                <circle cx="20" cy="65" r="12" fill="none" stroke="#333" strokeWidth="3" />
                <g className="animate-spin" style={{ transformOrigin: '20px 65px', animationDuration: '0.3s' }}>
                  <line x1="20" y1="53" x2="20" y2="77" stroke="#666" strokeWidth="1" />
                  <line x1="8" y1="65" x2="32" y2="65" stroke="#666" strokeWidth="1" />
                  <line x1="12" y1="57" x2="28" y2="73" stroke="#666" strokeWidth="1" />
                  <line x1="12" y1="73" x2="28" y2="57" stroke="#666" strokeWidth="1" />
                </g>
                
                {/* Rear wheel */}
                <circle cx="70" cy="65" r="12" fill="none" stroke="#333" strokeWidth="3" />
                <g className="animate-spin" style={{ transformOrigin: '70px 65px', animationDuration: '0.3s' }}>
                  <line x1="70" y1="53" x2="70" y2="77" stroke="#666" strokeWidth="1" />
                  <line x1="58" y1="65" x2="82" y2="65" stroke="#666" strokeWidth="1" />
                  <line x1="62" y1="57" x2="78" y2="73" stroke="#666" strokeWidth="1" />
                  <line x1="62" y1="73" x2="78" y2="57" stroke="#666" strokeWidth="1" />
                </g>
              </g>

              {/* Speed lines */}
              <g opacity="0.6">
                {[...Array(5)].map((_, i) => (
                  <line 
                    key={i}
                    x1={5 + i * 3} 
                    y1={30 + i * 8} 
                    x2={15 + i * 3} 
                    y2={30 + i * 8} 
                    stroke="#9CA3AF" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </g>
            </svg>
          </div>

          {/* Finish line */}
          {progress >= 85 && (
            <div className="absolute right-8 top-4 bottom-4 w-2 bg-gradient-to-b from-red-500 via-white to-blue-500 animate-pulse">
              <div className="absolute -top-2 -left-8 text-xs font-bold text-gray-700">FINISH</div>
            </div>
          )}

          {/* Clouds */}
          <div className="absolute top-4 left-10 opacity-30 animate-float">
            <svg width="40" height="20" viewBox="0 0 40 20">
              <path d="M10 15 Q5 10 10 8 Q15 5 20 8 Q25 5 30 8 Q35 10 30 15 Z" fill="white" />
            </svg>
          </div>
          <div className="absolute top-6 right-20 opacity-30 animate-float" style={{ animationDelay: '1s' }}>
            <svg width="30" height="15" viewBox="0 0 30 15">
              <path d="M7 12 Q3 8 7 6 Q12 3 17 6 Q22 3 25 6 Q28 8 25 12 Z" fill="white" />
            </svg>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-8 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-100 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
          </div>
        </div>

        {/* Progress Text */}
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">{Math.round(progress)}%</div>
          <div className="text-lg text-gray-700 h-8 transition-all duration-500">
            {messages[currentMessage]}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mt-12 text-center">
          <div className="inline-block px-6 py-3 bg-blue-50 rounded-full">
            <span className="text-blue-600 text-sm font-medium">
              💡 재미있는 사실: 자전거는 가장 효율적인 운동 기구 중 하나입니다!
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}