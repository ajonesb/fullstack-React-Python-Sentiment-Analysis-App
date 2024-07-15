import React, { useState } from "react";
import { AnalysisResult } from "./types";
import SentimentResult from "./components/SentimentResult";
import SentimentForm from "./components/SentimentForm";

const App: React.FC = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-center">
              Sentiment Analysis
            </h1>
            <SentimentForm setResult={setResult} setError={setError} />
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {result && <SentimentResult result={result} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
