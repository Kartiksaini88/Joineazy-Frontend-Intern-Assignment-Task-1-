import { useState } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

function App() {

 const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-indigo-700 text-white px-8 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold">JoinEazy</h1>

        <div className="flex items-center gap-5">
          <span>Dashboard</span>

         <select
  onChange={(e) => navigate(e.target.value)}
  className="bg-white text-gray-800 px-4 py-2 rounded-lg"
>
  <option value="/">Student</option>
  <option value="/admin">Admin</option>
</select>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<StudentDashboard></StudentDashboard>}></Route>
        <Route
          path="/admin"
          element={<AdminDashboard></AdminDashboard>}
        ></Route>
      </Routes>
      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 mt-8">
        © 2026 JoinEazy | Assignment & Review Dashboard
      </footer>
    </div>
  );
}

export default App;
