import React, { useState } from "react";
import axios from "axios";
import { AnalysisResult } from "../types";

interface SentimentFormProps {
  setResult: React.Dispatch<React.SetStateAction<AnalysisResult | null>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  token: string | null;
}

const SentimentForm: React.FC<SentimentFormProps> = ({
  setResult,
  setError,
  token,
}) => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const analyzeSentiment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      console.log("Sending request with token:", token); // Debug log
      const response = await axios.post<AnalysisResult>(
        "http://localhost:5000/analyze",
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Received response:", response.data); // Debug log
      setResult(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data); // Debug log
        if (error.response?.status === 401) {
          setError("Authentication failed. Please log in again.");
        } else {
          setError(
            `Failed to analyze sentiment: ${
              error.response?.data.message || error.message
            }`
          );
        }
      } else {
        console.error("Unexpected error:", error); // Debug log
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={analyzeSentiment} className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to analyze"
        rows={4}
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        required
      />
      <button
        type="submit"
        disabled={isLoading || !text}
        className={`w-full px-3 py-2 text-white bg-blue-500 rounded-lg focus:outline-none ${
          isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
      >
        {isLoading ? "Analyzing..." : "Analyze"}
      </button>
    </form>
  );
};

export default SentimentForm;
