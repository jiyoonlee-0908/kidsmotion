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
        labels: ["좌우밸런스", "순발력", "근력", "근지구력", "심폐지구력"],
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
            backgroundColor: "hsla(var(--primary), 0.2)",
            borderColor: "hsl(var(--primary))",
            borderWidth: 2,
            pointBackgroundColor: "hsl(var(--primary))",
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
