import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface Balance3DAvatarProps {
  leftBalance: number;
  rightBalance: number;
  status: string;
}

export default function Balance3DAvatar({ leftBalance, rightBalance, status }: Balance3DAvatarProps) {
  const balanceDiff = Math.abs(leftBalance - rightBalance);
  const isLeftHeavy = leftBalance > rightBalance;
  
  const getStatusColor = () => {
    if (balanceDiff <= 5) return "text-green-600";
    if (balanceDiff <= 10) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusIcon = () => {
    if (balanceDiff <= 5) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (balanceDiff <= 10) return <Info className="w-5 h-5 text-yellow-600" />;
    return <AlertTriangle className="w-5 h-5 text-red-600" />;
  };

  // Calculate tilt angle based on balance difference
  const tiltAngle = Math.min(balanceDiff * 2, 30); // Max 30 degree tilt
  const tiltDirection = isLeftHeavy ? -tiltAngle : tiltAngle;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-purple-600" />
          3D 밸런스 분석
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 3D Avatar Display */}
          <div className="relative bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg p-8 min-h-[300px] flex items-center justify-center">
            {/* Background Grid */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#7B5CFF" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>

            {/* Center Reference Line */}
            <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-gray-300 transform -translate-x-0.5"></div>

            {/* 3D Avatar */}
            <div 
              className="relative transform-gpu transition-transform duration-1000 ease-out"
              style={{ transform: `rotate(${tiltDirection}deg)` }}
            >
              {/* Head */}
              <div className="w-16 h-16 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-full mx-auto mb-2 border-2 border-yellow-400 shadow-lg">
                <div className="w-3 h-3 bg-gray-800 rounded-full absolute top-4 left-5"></div>
                <div className="w-3 h-3 bg-gray-800 rounded-full absolute top-4 right-5"></div>
                <div className="w-6 h-2 bg-pink-400 rounded-full absolute bottom-3 left-1/2 transform -translate-x-1/2"></div>
              </div>

              {/* Body */}
              <div className="w-20 h-32 bg-gradient-to-b from-blue-400 to-blue-500 rounded-lg mx-auto border-2 border-blue-600 shadow-lg relative">
                {/* Arms */}
                <div className="absolute -left-6 top-4 w-12 h-4 bg-yellow-300 rounded-full border border-yellow-400 shadow transform rotate-12"></div>
                <div className="absolute -right-6 top-4 w-12 h-4 bg-yellow-300 rounded-full border border-yellow-400 shadow transform -rotate-12"></div>
              </div>

              {/* Legs */}
              <div className="flex justify-center gap-2 mt-1">
                <div className={`w-6 h-16 rounded-lg border-2 shadow-lg transition-colors duration-500 ${
                  isLeftHeavy ? 'bg-gradient-to-b from-red-400 to-red-500 border-red-600' : 'bg-gradient-to-b from-green-400 to-green-500 border-green-600'
                }`}>
                  <div className="w-8 h-3 bg-gray-800 rounded-b-lg -mx-1 mt-12"></div>
                </div>
                <div className={`w-6 h-16 rounded-lg border-2 shadow-lg transition-colors duration-500 ${
                  !isLeftHeavy ? 'bg-gradient-to-b from-red-400 to-red-500 border-red-600' : 'bg-gradient-to-b from-green-400 to-green-500 border-green-600'
                }`}>
                  <div className="w-8 h-3 bg-gray-800 rounded-b-lg -mx-1 mt-12"></div>
                </div>
              </div>

              {/* Balance Visualization Lines */}
              <div className="absolute -left-10 -right-10 top-1/2 flex items-center">
                <div className={`h-1 rounded transition-all duration-500 ${
                  isLeftHeavy ? 'bg-red-400' : 'bg-gray-300'
                }`} style={{ width: `${leftBalance}%` }}></div>
                <div className="w-4 h-4 bg-purple-600 rounded-full mx-2 shadow-lg"></div>
                <div className={`h-1 rounded transition-all duration-500 ${
                  !isLeftHeavy ? 'bg-red-400' : 'bg-gray-300'
                }`} style={{ width: `${rightBalance}%` }}></div>
              </div>
            </div>

            {/* Weight Distribution Indicators */}
            <div className="absolute bottom-4 left-4 text-center">
              <div className={`text-2xl font-bold ${isLeftHeavy ? 'text-red-600' : 'text-gray-500'}`}>
                {leftBalance}%
              </div>
              <div className="text-xs text-gray-600">왼쪽</div>
            </div>
            <div className="absolute bottom-4 right-4 text-center">
              <div className={`text-2xl font-bold ${!isLeftHeavy ? 'text-red-600' : 'text-gray-500'}`}>
                {rightBalance}%
              </div>
              <div className="text-xs text-gray-600">오른쪽</div>
            </div>
          </div>

          {/* Status Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon()}
                <span className={`font-medium ${getStatusColor()}`}>{status}</span>
              </div>
              <Badge variant={balanceDiff <= 5 ? "default" : balanceDiff <= 10 ? "secondary" : "destructive"}>
                차이: {balanceDiff.toFixed(1)}%
              </Badge>
            </div>

            {/* Balance Analysis */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">{leftBalance.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">왼쪽 하중</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">{balanceDiff.toFixed(1)}%</div>
                <div className="text-sm text-purple-700">균형 차이</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">{rightBalance.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">오른쪽 하중</div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">밸런스 개선 조언</h4>
              <div className="text-sm text-blue-700 space-y-1">
                {balanceDiff <= 5 ? (
                  <p>✅ 훌륭한 밸런스를 유지하고 있습니다!</p>
                ) : balanceDiff <= 10 ? (
                  <>
                    <p>⚠️ 약간의 불균형이 있습니다.</p>
                    <p>• {isLeftHeavy ? '오른쪽' : '왼쪽'} 다리 강화 운동을 추천합니다</p>
                    <p>• 한발 서기 연습을 해보세요</p>
                  </>
                ) : (
                  <>
                    <p>🚨 상당한 불균형이 감지되었습니다.</p>
                    <p>• {isLeftHeavy ? '오른쪽' : '왼쪽'} 다리 집중 훈련이 필요합니다</p>
                    <p>• 밸런스 보드 운동을 권장합니다</p>
                    <p>• 전문가 상담을 고려해보세요</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}