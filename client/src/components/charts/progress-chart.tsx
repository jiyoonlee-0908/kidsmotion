import { useEffect, useRef } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController);

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
        labels: ["순발력 (5초)", "스프린트 파워 (15초)", "파워 지속력 (30초)", "근력 (60초)"],
        datasets: [
          {
            label: "이전 평균",
            data: previousData,
            backgroundColor: "#E5E7EB",
            borderColor: "#9CA3AF",
            borderWidth: 2,
            borderRadius: 8,
          },
          {
            label: "현재 측정",
            data: currentData,
            backgroundColor: "#7B5CFF",
            borderColor: "#6D4CFF",
            borderWidth: 2,
            borderRadius: 8,
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
