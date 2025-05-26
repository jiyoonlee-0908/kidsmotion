import { useEffect, useState } from "react";

interface BalanceChartProps {
  leftBalance: number;
  rightBalance: number;
  status: string;
}

export default function BalanceChart({ leftBalance, rightBalance, status }: BalanceChartProps) {
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    // 컴포넌트가 마운트되면 애니메이션 시작
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // 밸런스 차이 계산
  const balanceDiff = Math.abs(leftBalance - rightBalance);
  const isLeftHeavy = leftBalance > rightBalance;
  
  // 시소 기울기 각도 계산 (최대 25도)
  const tiltAngle = Math.min(balanceDiff * 0.5, 25);
  const rotation = isLeftHeavy ? -tiltAngle : tiltAngle;

  // 상태에 따른 색상
  const getStatusColor = () => {
    if (balanceDiff <= 5) return "text-green-600";
    if (balanceDiff <= 10) return "text-yellow-600";
    return "text-red-600";
  };

  const getBalanceBarColor = (side: 'left' | 'right') => {
    if (balanceDiff <= 5) return "bg-green-500"; // 균형 상태
    if (side === 'left' && isLeftHeavy) return "bg-red-500"; // 왼쪽이 무거움
    if (side === 'right' && !isLeftHeavy) return "bg-red-500"; // 오른쪽이 무거움
    return "bg-blue-400"; // 가벼운 쪽
  };

  return (
    <div className="relative w-64 h-48 flex items-center justify-center">
      {/* 시소 받침대 */}
      <div className="absolute bottom-8">
        <div className="w-4 h-16 bg-gray-600 rounded-t-lg relative">
          {/* 받침대 상단 삼각형 */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-600"></div>
        </div>
      </div>

      {/* 시소 막대 */}
      <div 
        className={`absolute w-48 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full shadow-lg transition-transform duration-1000 ease-out ${isAnimated ? '' : 'rotate-0'}`}
        style={{ 
          transform: isAnimated ? `rotate(${rotation}deg)` : 'rotate(0deg)',
          bottom: '88px'
        }}
      >
        {/* 시소 중심점 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-700 rounded-full"></div>
        
        {/* 왼쪽 무게 표시 */}
        <div 
          className={`absolute -top-8 left-4 transform transition-all duration-1000 ease-out ${getBalanceBarColor('left')} rounded-lg shadow-lg`}
          style={{ 
            width: '20px',
            height: `${Math.max(leftBalance * 0.8, 10)}px`,
            transform: isAnimated ? `translateY(${isLeftHeavy ? '10px' : '0px'})` : 'translateY(0px)'
          }}
        >
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700">
            {leftBalance}%
          </div>
        </div>

        {/* 오른쪽 무게 표시 */}
        <div 
          className={`absolute -top-8 right-4 transform transition-all duration-1000 ease-out ${getBalanceBarColor('right')} rounded-lg shadow-lg`}
          style={{ 
            width: '20px',
            height: `${Math.max(rightBalance * 0.8, 10)}px`,
            transform: isAnimated ? `translateY(${!isLeftHeavy ? '10px' : '0px'})` : 'translateY(0px)'
          }}
        >
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700">
            {rightBalance}%
          </div>
        </div>
      </div>

      {/* 상태 텍스트 */}
      <div className="absolute bottom-0 text-center">
        <div className={`text-lg font-bold ${getStatusColor()}`}>
          {status}
        </div>
        <div className="text-sm text-gray-600">
          차이: {balanceDiff.toFixed(1)}%
        </div>
      </div>

      {/* 왼쪽/오른쪽 라벨 */}
      <div className="absolute bottom-20 left-0 text-xs text-gray-600 font-medium">
        왼쪽
      </div>
      <div className="absolute bottom-20 right-0 text-xs text-gray-600 font-medium">
        오른쪽
      </div>
    </div>
  );
}
