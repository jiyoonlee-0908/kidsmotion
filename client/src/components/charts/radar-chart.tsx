import { useEffect, useRef } from "react";
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  RadarController,
} from "chart.js";

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, RadarController);

interface RadarChartProps {
  data: {
    balance: number;
    power: number;
    strength: number;
    muscleEndurance: number;
    cardioEndurance: number;
  };
}

export default function RadarChart({ data }: RadarChartProps) {
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
      type: "radar",
      data: {
        labels: ["좌우밸런스", "순발력", "스프린트 파워", "파워 지속력", "근력"],
        datasets: [
          {
            label: "현재 수준",
            data: [
              data.balance,
              data.power,
              data.strength,
              data.muscleEndurance,
              data.cardioEndurance,
            ],
            backgroundColor: "rgba(123, 92, 255, 0.15)",
            borderColor: "#7B5CFF",
            borderWidth: 3,
            pointBackgroundColor: "#7B5CFF",
            pointBorderColor: "#FFFFFF",
            pointBorderWidth: 2,
            pointRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              font: {
                size: 10,
              },
              color: '#6B7280',
            },
            pointLabels: {
              font: {
                size: 13,
                weight: 'bold',
              },
              color: '#374151',
              padding: 15,
            },
            grid: {
              color: '#E5E7EB',
            },
            angleLines: {
              color: '#E5E7EB',
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="w-80 h-80">
      <canvas ref={chartRef} />
    </div>
  );
}
