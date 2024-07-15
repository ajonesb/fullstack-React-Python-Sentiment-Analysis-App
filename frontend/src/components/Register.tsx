// src/components/Register.tsx
import React, { useState } from "react";
import axios from "axios";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        { username, password },
        {
          withCredentials: true,
        }
      );
      setMessage(response.data.msg);
    } catch (error) {
      setMessage("Registration failed");
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
        Register
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Register;
