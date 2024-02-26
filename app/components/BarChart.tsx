'use client';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, BarController } from 'chart.js';
import { useEffect } from 'react';

export default function BarChart({
  data,
  title,
  keyField,
  valueField,
}: {
  data: any[];
  title: string;
  keyField: string;
  valueField: string;
}) {
  useEffect(() => {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    Chart.register(BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend);
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((item) => item[keyField]),
        datasets: [
          {
            label: title,
            data: data.map((item) => item[valueField]),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
    return () => {
      chart.destroy();
    };
  }, []);

  return <canvas id="barChart"></canvas>;
}
