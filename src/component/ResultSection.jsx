import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
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

function ResultSection({ result }) {
  const [tab, setTab] = useState("accuracy");

  const confidence = result.confidence_scores;
  const modelComparison = Object.entries(result.comparison_metrics).map(
    ([model, metrics]) => ({
      model,
      accuracy: metrics.accuracy,
      precision: metrics.precision,
      recall: metrics.recall,
      f1_score: metrics.f1_score,
    })
  );

  const confidenceChartData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        label: "Confidence",
        data: [
          confidence.positive,
          confidence.negative,
          confidence.neutral,
        ],
        backgroundColor: ["#3B82F6", "#EF4444", "#F59E0B"],
      },
    ],
  };

  const modelChartData = {
    labels: modelComparison.map((m) => m.model),
    datasets: [
      {
        label: tab.charAt(0).toUpperCase() + tab.slice(1),
        data: modelComparison.map((m) => m[tab]),
        backgroundColor: "#6366F1",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {/* Left Card: Sentiment Result */}
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between h-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-black-700">
          Sentiment Analysis Result
        </h2>

        {/* Primary Sentiment + Chart Side by Side */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
          <div className="flex-1 text-center md:text-left">
            <p
              className={`text-xl font-bold ${
                result.primary_sentiment === "Positive"
                  ? "text-green-600"
                  : result.primary_sentiment === "Negative"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              Primary Sentiment:
            </p>
            <p className="text-3xl font-bold">
              {result.primary_sentiment}{" "}
              {confidence[result.primary_sentiment.toLowerCase()].toFixed(1)}%
            </p>
          </div>

          <div className="flex-1 w-full h-64">
            <Bar
              data={confidenceChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                devicePixelRatio: 2,
                plugins: {
                  legend: { display: true, position: "top" },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { stepSize: 20 },
                    grid: { color: "#e5e7eb" },
                  },
                  x: {
                    grid: { display: false },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Technical Details */}
        <div className="text-gray-700 text-sm mt-2">
          <h3 className="font-bold text-md mb-2">Technical Details</h3>
          <p>
            <strong>Model:</strong> {result.technical_details.model}
          </p>
          <p>
            <strong>Type:</strong> {result.technical_details.type}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {result.technical_details.description}
          </p>
          <div className="mt-3">
            <p className="font-semibold">Raw Confidence Scores:</p>
            <ul className="list-disc ml-5">
              <li>Positive: {confidence.positive.toFixed(2)}%</li>
              <li>Negative: {confidence.negative.toFixed(2)}%</li>
              <li>Neutral: {confidence.neutral.toFixed(2)}%</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Card: Model Comparison */}
      <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col justify-between">
        <h2 className="text-2xl font-bold mb-4 text-center text-black-700">
          Model Comparison
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-4">
          {["accuracy", "precision", "recall", "f1_score"].map((metric) => (
            <button
              key={metric}
              onClick={() => setTab(metric)}
              className={`px-4 py-2 rounded-full ${
                tab === metric ? "bg-indigo-500 text-white" : "bg-gray-300"
              }`}
            >
              {metric.charAt(0).toUpperCase() + metric.slice(1)}
            </button>
          ))}
        </div>

        {/* Model Bar Chart */}
        <div className="h-64">
          <Bar
            data={modelChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              devicePixelRatio: 2,
              plugins: {
                legend: { display: false },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  ticks: { stepSize: 20 },
                },
              },
            }}
          />
        </div>

        {/* Metrics Table */}
        <div className="mt-6 overflow-x-auto">
          <h2 className="font-semibold text-md mb-2 text-center text-black-700">
            Model Metrics Table
          </h2>
          <table className="min-w-full border border-gray-300 text-sm text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Model</th>
                <th className="py-2 px-4 border-b">Accuracy</th>
                <th className="py-2 px-4 border-b">Precision</th>
                <th className="py-2 px-4 border-b">Recall</th>
                <th className="py-2 px-4 border-b">F1 Score</th>
              </tr>
            </thead>
            <tbody>
              {modelComparison.map((m, idx) => (
                <tr key={idx}>
                  <td className="py-2 px-4 border-b">{m.model}</td>
                  <td className="py-2 px-4 border-b">
                    {m.accuracy.toFixed(1)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {m.precision.toFixed(1)}
                  </td>
                  <td className="py-2 px-4 border-b">{m.recall.toFixed(1)}</td>
                  <td className="py-2 px-4 border-b">
                    {m.f1_score.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResultSection;
