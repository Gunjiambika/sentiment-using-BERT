import React, { useState } from "react";
import axios from "axios";

function InputSection({ setResult }) {
  const [inputText, setInputText] = useState("");
  const [model, setModel] = useState("BERT");
  const [loading, setLoading] = useState(false);

  const sampleTexts = [
    "The movie was fantastic! Highly recommend it.",
    "Terrible acting and boring storyline.",
    "An average film, could have been better.",
    "Absolutely loved the visual effects and music!",
  ];

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      alert("Please enter some text!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("https://sentiment-using-bert.onrender.com/analyze/", {
        text: inputText,
        model: model,
      });
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong! Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-10 bg-[#fdf6e3] p-6 rounded-2xl shadow-md font-serif text-gray-800">
      {/* Textarea */}
      <label className="block text-lg font-bold mb-2">
        Enter text for sentiment analysis
      </label>
      <textarea
        className="w-full p-4 border border-gray-400 rounded-lg shadow-inner focus:ring-2 focus:ring-yellow-400 transition bg-white bg-opacity-80"
        rows="4"
        placeholder="Type or paste text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>

      {/* Model + Button Row */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">
            Select Model
          </label>
          <select
            className="w-full p-3 border border-yellow-600 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 transition bg-white bg-opacity-90 text-xl font-bold"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option className="text-xl font ">BERT</option>
            <option className="text-xl font">ALBERT</option>
            <option className="text-xl font">DistilBERT</option>
            <option className="text-xl font">Naive Bayes</option>
            <option className="text-xl font">SVM</option>
          </select>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-700 transition"
          style={{ marginTop: "28px" }}
        >
          {loading ? "Analyzing..." : "Analyze Sentiment"}
        </button>
      </div>

      {/* Sample Texts */}
      <div>
        <p className="font-semibold mb-2">Sample texts:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sampleTexts.map((text, idx) => (
            <button
              key={idx}
              onClick={() => setInputText(text)}
              className="bg-white bg-opacity-90 border border-gray-300 text-left p-3 rounded-lg shadow-sm hover:bg-gray-100 transition"
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InputSection;

