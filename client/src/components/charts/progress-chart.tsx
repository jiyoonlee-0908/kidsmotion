import { useEffect, useRef } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ProgressChartProps {
  currentData: number[];
}

export default function ProgressChart({ currentData }: ProgressChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  // Mock previous data for comparison
  const previousData = [85, 70, 58, 50];

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["순발력", "근력", "근지구력", "심폐지구력"],
        datasets: [
          {
            label: "이전 평균",
            data: previousData,
            backgroundColor: "hsl(var(--muted))",
          },
          {
            label: "현재 측정",
            data: currentData,
            backgroundColor: "hsl(var(--primary))",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [currentData]);

  return (
    <div className="h-64">
      <canvas ref={chartRef} />
    </div>
  );
}
