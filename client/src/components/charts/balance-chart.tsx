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
  // 차이가 5% 이하면 완전히 수평
  const tiltAngle = balanceDiff <= 5 ? 0 : Math.min(balanceDiff * 0.4, 20);
  const rotation = isLeftHeavy ? -tiltAngle : tiltAngle;

  // 상태에 따른 색상
  const getStatusColor = () => {
    if (balanceDiff <= 5) return "text-green-600";
    if (balanceDiff <= 10) return "text-yellow-600";
    return "text-red-600";
  };

  const getBalanceBarColor = (side: 'left' | 'right') => {
    if (side === 'left' && isLeftHeavy) return "bg-gradient-to-t from-red-500 to-red-400 shadow-red-200"; 
    if (side === 'right' && !isLeftHeavy) return "bg-gradient-to-t from-red-500 to-red-400 shadow-red-200"; 
    return "bg-gradient-to-t from-blue-500 to-blue-400 shadow-blue-200"; 
  };

  return (
    <div className="relative w-80 h-56 flex items-center justify-center">
      {/* 시소 받침대 - 더 세련되게 */}
      <div className="absolute bottom-12">
        <div className="w-6 h-20 bg-gradient-to-t from-gray-700 to-gray-600 rounded-t-xl relative shadow-lg">
          {/* 받침대 상단 삼각형 */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-6 border-transparent border-b-gray-600"></div>
        </div>
      </div>

      {/* 시소 막대 - 더 길고 두껍게 */}
      <div 
        className={`absolute w-72 h-4 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 rounded-full shadow-2xl transition-transform duration-1000 ease-out border-2 border-purple-300`}
        style={{ 
          transform: isAnimated ? `rotate(${rotation}deg)` : 'rotate(0deg)',
          bottom: '112px'
        }}
      >
        {/* 시소 중심점 - 더 크고 세련되게 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full border-2 border-white shadow-lg"></div>
        
        {/* 왼쪽 무게 표시 - 더 큰 원형 무게추 */}
        <div 
          className={`absolute -top-12 left-8 transform transition-all duration-1000 ease-out`}
          style={{ 
            transform: isAnimated ? `translateY(${balanceDiff <= 5 ? '0px' : (isLeftHeavy ? '8px' : '-4px')})` : 'translateY(0px)'
          }}
        >
          <div className={`w-8 h-8 ${getBalanceBarColor('left')} rounded-full shadow-xl border-2 border-white flex items-center justify-center`}>
            <div className="text-xs font-bold text-white">L</div>
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-700 bg-white px-2 py-1 rounded-full shadow-md">
            {leftBalance}%
          </div>
        </div>

        {/* 오른쪽 무게 표시 - 더 큰 원형 무게추 */}
        <div 
          className={`absolute -top-12 right-8 transform transition-all duration-1000 ease-out`}
          style={{ 
            transform: isAnimated ? `translateY(${balanceDiff <= 5 ? '0px' : (!isLeftHeavy ? '8px' : '-4px')})` : 'translateY(0px)'
          }}
        >
          <div className={`w-8 h-8 ${getBalanceBarColor('right')} rounded-full shadow-xl border-2 border-white flex items-center justify-center`}>
            <div className="text-xs font-bold text-white">R</div>
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-700 bg-white px-2 py-1 rounded-full shadow-md">
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
