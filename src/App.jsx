import React, { useState } from "react";
import InputSection from "./components/InputSection";
import ResultSection from "./components/ResultSection";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3] text-black p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Sentiment Analysis
        </h1>
        <div className="p-8 rounded-2xl shadow-2xl bg-white bg-opacity-95">
          <InputSection setResult={setResult} />
          {result && <ResultSection result={result} />}
        </div>
      </div>
    </div>
  );
}

export default App;
