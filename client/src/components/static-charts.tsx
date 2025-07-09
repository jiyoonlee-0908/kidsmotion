// 정적 SVG 차트 컴포넌트 - QR 코드 웹뷰에서 Chart.js 대신 사용
import React from 'react';

interface StaticRadarChartProps {
  data: {
    balance: number;
    power: number;
    strength: number;
    muscleEndurance: number;
    cardioEndurance: number;
  };
  width?: number;
  height?: number;
}

export function StaticRadarChart({ data, width = 320, height = 320 }: StaticRadarChartProps) {
  const center = { x: width / 2, y: height / 2 };
  const radius = Math.min(width, height) / 2 - 40;
  const labels = ["좌우밸런스", "순발력", "스프린트 파워", "파워 지속력", "근력"];
  const values = [data.balance, data.power, data.strength, data.muscleEndurance, data.cardioEndurance];
  
  // 5각형 정점 좌표 계산
  const getPoint = (index: number, value: number) => {
    const angle = (index * 2 * Math.PI) / 5 - Math.PI / 2; // -90도부터 시작
    const r = (radius * value) / 100;
    return {
      x: center.x + r * Math.cos(angle),
      y: center.y + r * Math.sin(angle)
    };
  };
  
  // 격자선 생성
  const generateGridLines = () => {
    const lines = [];
    const levels = [20, 40, 60, 80, 100];
    
    levels.forEach((level, levelIndex) => {
      const points = [];
      for (let i = 0; i < 5; i++) {
        const point = getPoint(i, level);
        points.push(`${point.x},${point.y}`);
      }
      lines.push(
        <polygon
          key={levelIndex}
          points={points.join(' ')}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="1"
        />
      );
    });
    
    // 중심에서 각 정점으로 향하는 선
    for (let i = 0; i < 5; i++) {
      const point = getPoint(i, 100);
      lines.push(
        <line
          key={`axis-${i}`}
          x1={center.x}
          y1={center.y}
          x2={point.x}
          y2={point.y}
          stroke="#E5E7EB"
          strokeWidth="1"
        />
      );
    }
    
    return lines;
  };
  
  // 데이터 영역 생성
  const dataPoints = values.map((value, index) => getPoint(index, value));
  const dataPath = dataPoints.map(p => `${p.x},${p.y}`).join(' ');
  
  return (
    <div className="w-80 h-80 flex items-center justify-center">
      <svg width={width} height={height} className="overflow-visible">
        {/* 격자선 */}
        {generateGridLines()}
        
        {/* 데이터 영역 */}
        <polygon
          points={dataPath}
          fill="rgba(123, 92, 255, 0.15)"
          stroke="#7B5CFF"
          strokeWidth="3"
        />
        
        {/* 데이터 포인트 */}
        {dataPoints.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="6"
            fill="#7B5CFF"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        ))}
        
        {/* 레이블 */}
        {labels.map((label, index) => {
          const labelPoint = getPoint(index, 110); // 약간 밖으로
          return (
            <text
              key={index}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm font-bold fill-gray-700"
            >
              {label}
            </text>
          );
        })}
        
        {/* 수치 표시 */}
        <text x={center.x} y={20} textAnchor="middle" className="text-xs fill-gray-500">100</text>
        <text x={center.x} y={40} textAnchor="middle" className="text-xs fill-gray-500">80</text>
        <text x={center.x} y={60} textAnchor="middle" className="text-xs fill-gray-500">60</text>
        <text x={center.x} y={80} textAnchor="middle" className="text-xs fill-gray-500">40</text>
        <text x={center.x} y={100} textAnchor="middle" className="text-xs fill-gray-500">20</text>
      </svg>
    </div>
  );
}

interface StaticProgressBarProps {
  value: number;
  maxValue?: number;
  color?: string;
  height?: number;
}

export function StaticProgressBar({ value, maxValue = 100, color = "#7B5CFF", height = 16 }: StaticProgressBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);
  
  return (
    <div className="w-full bg-gray-200 rounded-full overflow-hidden" style={{ height }}>
      <div 
        className="h-full transition-all duration-1000 rounded-full"
        style={{ 
          width: `${percentage}%`,
          backgroundColor: color
        }}
      />
    </div>
  );
}

interface StaticBalanceChartProps {
  leftBalance: number;
  rightBalance: number;
  width?: number;
  height?: number;
}

export function StaticBalanceChart({ leftBalance, rightBalance, width = 320, height = 200 }: StaticBalanceChartProps) {
  const balanceDiff = Math.abs(leftBalance - rightBalance);
  const isLeftHeavy = leftBalance > rightBalance;
  const tiltAngle = balanceDiff <= 5 ? 0 : Math.min(balanceDiff * 0.4, 20);
  const rotation = isLeftHeavy ? -tiltAngle : tiltAngle;
  
  const getStatusColor = () => {
    if (balanceDiff <= 5) return "#10B981"; // green
    if (balanceDiff <= 10) return "#F59E0B"; // yellow
    return "#EF4444"; // red
  };
  
  return (
    <div className="w-80 h-48 flex items-center justify-center">
      <svg width={width} height={height} className="overflow-visible">
        {/* 시소 받침대 */}
        <rect x={width/2 - 12} y={height - 80} width="24" height="60" fill="#4B5563" rx="12" />
        <polygon 
          points={`${width/2 - 12},${height - 80} ${width/2 + 12},${height - 80} ${width/2},${height - 92}`}
          fill="#4B5563"
        />
        
        {/* 시소 막대 */}
        <rect 
          x={width/2 - 144} 
          y={height - 88} 
          width="288" 
          height="16" 
          fill="#8B5CF6" 
          rx="8"
          transform={`rotate(${rotation} ${width/2} ${height - 80})`}
        />
        
        {/* 시소 중심점 */}
        <circle 
          cx={width/2} 
          cy={height - 80} 
          r="10" 
          fill="#374151" 
          stroke="#FFFFFF" 
          strokeWidth="2"
        />
        
        {/* 왼쪽 무게추 */}
        <circle 
          cx={width/2 - 64} 
          cy={height - 120 + (isLeftHeavy ? 8 : -4)} 
          r="16" 
          fill={isLeftHeavy ? "#EF4444" : "#3B82F6"} 
          stroke="#FFFFFF" 
          strokeWidth="2"
        />
        <text 
          x={width/2 - 64} 
          y={height - 115 + (isLeftHeavy ? 8 : -4)} 
          textAnchor="middle" 
          className="text-xs font-bold fill-white"
        >
          L
        </text>
        <text 
          x={width/2 - 64} 
          y={height - 80 + (isLeftHeavy ? 8 : -4)} 
          textAnchor="middle" 
          className="text-sm font-bold fill-gray-700"
        >
          {leftBalance}%
        </text>
        
        {/* 오른쪽 무게추 */}
        <circle 
          cx={width/2 + 64} 
          cy={height - 120 + (!isLeftHeavy ? 8 : -4)} 
          r="16" 
          fill={!isLeftHeavy ? "#EF4444" : "#3B82F6"} 
          stroke="#FFFFFF" 
          strokeWidth="2"
        />
        <text 
          x={width/2 + 64} 
          y={height - 115 + (!isLeftHeavy ? 8 : -4)} 
          textAnchor="middle" 
          className="text-xs font-bold fill-white"
        >
          R
        </text>
        <text 
          x={width/2 + 64} 
          y={height - 80 + (!isLeftHeavy ? 8 : -4)} 
          textAnchor="middle" 
          className="text-sm font-bold fill-gray-700"
        >
          {rightBalance}%
        </text>
        
        {/* 상태 표시 */}
        <text 
          x={width/2} 
          y={30} 
          textAnchor="middle" 
          className="text-lg font-bold"
          fill={getStatusColor()}
        >
          {balanceDiff <= 5 ? "이상적" : balanceDiff <= 10 ? "주의" : "불균형"}
        </text>
        <text 
          x={width/2} 
          y={50} 
          textAnchor="middle" 
          className="text-sm fill-gray-600"
        >
          차이: {balanceDiff.toFixed(1)}%
        </text>
      </svg>
    </div>
  );
}

interface StaticComparisonChartProps {
  currentData: {
    power5s: number;
    power15s: number;
    power30s: number;
    power60s: number;
  };
  previousData?: {
    power5s: number;
    power15s: number;
    power30s: number;
    power60s: number;
  };
  width?: number;
  height?: number;
}

export function StaticComparisonChart({ currentData, previousData, width = 400, height = 300 }: StaticComparisonChartProps) {
  const labels = ["5초", "15초", "30초", "60초"];
  const current = [currentData.power5s, currentData.power15s, currentData.power30s, currentData.power60s];
  const previous = previousData ? [previousData.power5s, previousData.power15s, previousData.power30s, previousData.power60s] : null;
  
  const maxValue = Math.max(...current, ...(previous || []));
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = chartWidth / labels.length / (previous ? 3 : 2);
  
  return (
    <div className="w-full h-72 flex items-center justify-center">
      <svg width={width} height={height}>
        {/* 배경 격자 */}
        {[0, 25, 50, 75, 100].map(percent => {
          const y = padding + chartHeight - (percent / 100) * chartHeight;
          return (
            <g key={percent}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#E5E7EB" strokeWidth="1" />
              <text x={padding - 5} y={y + 4} textAnchor="end" className="text-xs fill-gray-500">
                {Math.round(maxValue * percent / 100)}W
              </text>
            </g>
          );
        })}
        
        {/* 데이터 막대 */}
        {current.map((value, index) => {
          const x = padding + (index * chartWidth / labels.length);
          const barHeight = (value / maxValue) * chartHeight;
          const y = padding + chartHeight - barHeight;
          
          return (
            <g key={index}>
              {/* 현재 데이터 */}
              <rect
                x={x + barWidth / 4}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="#7B5CFF"
                rx="2"
              />
              
              {/* 이전 데이터 (있는 경우) */}
              {previous && (
                <rect
                  x={x + barWidth * 1.5}
                  y={padding + chartHeight - (previous[index] / maxValue) * chartHeight}
                  width={barWidth}
                  height={(previous[index] / maxValue) * chartHeight}
                  fill="#94A3B8"
                  rx="2"
                />
              )}
              
              {/* 레이블 */}
              <text
                x={x + chartWidth / labels.length / 2}
                y={height - 10}
                textAnchor="middle"
                className="text-sm font-medium fill-gray-700"
              >
                {labels[index]}
              </text>
              
              {/* 값 표시 */}
              <text
                x={x + barWidth * 0.75}
                y={y - 5}
                textAnchor="middle"
                className="text-xs fill-gray-600"
              >
                {Math.round(value)}W
              </text>
            </g>
          );
        })}
        
        {/* 범례 */}
        <g>
          <rect x={width - 150} y={20} width="12" height="12" fill="#7B5CFF" rx="2" />
          <text x={width - 130} y={30} className="text-sm fill-gray-700">현재 측정</text>
          
          {previous && (
            <>
              <rect x={width - 150} y={40} width="12" height="12" fill="#94A3B8" rx="2" />
              <text x={width - 130} y={50} className="text-sm fill-gray-700">이전 측정</text>
            </>
          )}
        </g>
      </svg>
    </div>
  );
}