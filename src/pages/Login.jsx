
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState("student");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

  
    const user = {
      name: name.trim(),
      role: role,
      id: name.trim().toLowerCase(),
    };

    localStorage.setItem("currentUser", JSON.stringify(user));

    
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/student");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="bg-indigo-600 text-white w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold mx-auto">
            J
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            JoinEazy
          </h1>

          <p className="text-gray-500 mt-2">
            Assignment Management Portal
          </p>

        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Your Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Login As
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;
