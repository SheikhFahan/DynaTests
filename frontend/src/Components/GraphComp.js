import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

const GraphComp = ({ data }) => {
    const dateLabels = data.map((entry) => new Date(entry.timestamp).toLocaleDateString());
  const scores = data.map((entry) => entry.score);

  // Set up chartData for the Line component
  const chartData = {
    labels: dateLabels,
    datasets: [
      {
        label: "Scores Over Time",
        data: scores,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };
  return (
    <div>
      <h2>Graph Component</h2>
      <Line data={chartData} />
    </div>
  );
};

export default GraphComp;