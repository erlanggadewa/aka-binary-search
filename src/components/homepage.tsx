"use client";
import {
  CategoryScale,
  Chart as ChartJS,
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

async function getData() {
  const res = await fetch("http://localhost:3000/api/aka");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

function HomePage() {
  const [labels, setLabels] = useState<any[]>();
  const [time, setTime] = useState<any[]>();

  useEffect(() => {
    fetch("/api/aka")
      .then((res) => res.json())
      .then((res) => {
        const { data } = res;
        // Extracting 'totalData' from 'data' and creating new arrays for labels and time
        const updatedLabels = data.map((x: any) => x.totalData);
        const updatedTime = data.map((x: any) => x.time);

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };
  // const labels = dataFetch.map((x: any) => x.totalData);
  const data = {
    labels: labels,
    datasets: [
      // {
      //   label: "Dataset 1",
      //   data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      //   borderColor: "rgb(255, 99, 132)",
      //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      //   fill: false,
      //   tension: 0.4,
      // },
      {
        label: "Iteration Binary Search",
        data: time,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        fill: false,
        tension: 0.4,
      },
    ],
  };
  // const posts = await fetch("http://localhost:3000/").then((res) => res.json());
  // console.log("🚀 ~ file: homepage.tsx:3 ~ HomePage ~ posts:", posts);
  return (
    <div className="h-96">
      <Line options={options} data={data} className="h-20" />
    </div>
  );
}

export default HomePage;
