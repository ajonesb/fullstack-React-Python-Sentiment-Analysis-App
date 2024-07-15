import React, { useState, useEffect } from "react";
import SentimentForm from "./components/SentimentForm";
import SentimentResult from "./components/SentimentResult";
import Register from "./components/Register";
import Login from "./components/Login";
import { AnalysisResult } from "./types";
import { jwtDecode } from "jwt-decode";

const App: React.FC = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      try {
        const decoded = jwtDecode<{ sub: string }>(token);
        setUsername(decoded.sub);
      } catch (error) {
        console.error("Error decoding token:", error);
        setToken(null);
        setUsername(null);
      }
    } else {
      localStorage.removeItem("token");
      setUsername(null);
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-center">
              Sentiment Analysis
            </h1>
            {username ? (
              <>
                <p className="mb-4">Welcome, {username}!</p>
                <SentimentForm
                  setResult={setResult}
                  setError={setError}
                  token={token}
                />
                {error && <p className="mt-4 text-red-500">{error}</p>}
                {result && <SentimentResult result={result} />}
                <button
                  onClick={handleLogout}
                  className="mt-4 w-full px-3 py-2 text-white bg-red-500 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-6">
                <Register />
                <Login setToken={setToken} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
