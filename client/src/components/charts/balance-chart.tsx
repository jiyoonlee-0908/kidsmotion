import { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

interface BalanceChartProps {
  leftBalance: number;
  rightBalance: number;
  status: string;
}

export default function BalanceChart({ leftBalance, rightBalance, status }: BalanceChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["왼쪽", "오른쪽"],
        datasets: [
          {
            data: [leftBalance, rightBalance],
            backgroundColor: ["hsl(var(--primary))", "hsl(var(--chart-2))"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `${context.label}: ${context.parsed}%`;
              },
            },
          },
        },
        cutout: "70%",
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [leftBalance, rightBalance]);

  const getStatusColor = () => {
    switch (status) {
      case "이상적": return "text-green-600";
      case "주의": return "text-yellow-600";
      case "경고": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="relative w-48 h-48">
      <canvas ref={chartRef} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-600">밸런스 상태</p>
          <p className={`font-bold ${getStatusColor()}`}>{status}</p>
        </div>
      </div>
    </div>
  );
}
