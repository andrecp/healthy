import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";
import type { IWeight } from "../services/Utils";

Chart.register(...registerables);

interface IWeightChart {
  weights: IWeight[];
}

function WeightChart(props: IWeightChart): JSX.Element {
  const { weights } = props;
  const labels = weights.map(({ date_time }) => date_time).reverse();
  const dataset = weights.map(({ weight_kg }) => weight_kg).reverse();

  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const chartCanvas = chartCanvasRef.current;
    if (!chartCanvas) return;

    const chartInstance = new Chart(chartCanvas, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "killograms",
            data: dataset,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return () => {
      chartInstance.destroy();
    };
  }, []);

  return (
    <div>
      <canvas ref={chartCanvasRef}></canvas>
    </div>
  );
}

export default WeightChart;
