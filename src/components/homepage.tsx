"use client";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
// ESM
import { Line } from "react-chartjs-2";

function HomePage() {
  const [labels, setLabels] = useState<any>();
  const [time, setTime] = useState<any>();

  useEffect(() => {
    fetch("/api/aka")
      .then((res) => res.json())
      .then((res) => {
        const { data } = res;
        // Extracting 'totalData' from 'data' and creating new arrays for labels and time
        const updatedLabels = data.iteration.map((x: any) => x.totalData);

        const updatedTime = {
          iteration: data.iteration.map((x: any) => x.time).reverse(),
          recursive: data.recursive.map((x: any) => x.time).reverse(),
        };

        // Updating the state once after all transformations
        setLabels(updatedLabels);
        setTime(updatedTime);
      });
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        display: true,
        weight: 10,
        title: {
          display: true,
          text: "Size Input (n)",
        },
      },
      y: {
        display: true,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Binary Search",
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Recursive Binary Search",
        data: time?.recursive,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: false,
        tension: 0.4,
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Iteration Binary Search",
        data: time?.iteration,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        fill: false,
        tension: 0.4,
        cubicInterpolationMode: "monotone",
      },
    ],
  };

  return (
    <div className="w-full h-full p-2">
      {/* @ts-ignore */}
      <Line options={options} data={data} />
    </div>
  );
}

export default HomePage;
