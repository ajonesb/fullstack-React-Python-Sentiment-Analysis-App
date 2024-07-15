import React, { useState } from "react";
import axios from "axios";

interface LoginProps {
  setToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setToken(token);
      console.log("Token received and stored:", token);
      setMessage("Login successful");
    } catch (error) {
      setMessage("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full px-3 py-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full px-3 py-2 text-white bg-blue-500 rounded"
      >
        Login
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Login;
