import React from 'react';
import { AnalysisResult } from '../types';


interface SentimentResultProps {
  result: AnalysisResult;
}

const SentimentResult: React.FC<SentimentResultProps> = ({ result }) => {
  const getSentimentColor = (sentiment: number): string => {
    if (sentiment > 0.5) return 'bg-green-500';
    if (sentiment > 0) return 'bg-green-300';
    if (sentiment < -0.5) return 'bg-red-500';
    if (sentiment < 0) return 'bg-red-300';
    return 'bg-gray-300';
  };

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-semibold">Analysis Result:</h2>
      <p><strong>Text:</strong> {result.text}</p>
      <p><strong>Sentiment:</strong> {result.sentiment_label}</p>
      <p>
        <strong>Score:</strong> 
        <span className={`ml-2 px-2 py-1 rounded ${getSentimentColor(result.sentiment)}`}>
          {result.sentiment.toFixed(2)}
        </span>
      </p>
      <div className="relative pt-1">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: `${(result.sentiment + 1) * 50}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getSentimentColor(result.sentiment)}`}
          ></div>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span>Negative</span>
          <span>Neutral</span>
          <span>Positive</span>
        </div>
      </div>
    </div>
  );
};

export default SentimentResult;