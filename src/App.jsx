
import { useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Login from "./pages/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // User State
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser")) || null;
    } catch {
      return null;
    }
  });

  // Apply Theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  // Toggle Theme
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/login");
  };

  // Login Success
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 text-gray-800 dark:text-white transition-colors duration-300">

      {/* Navbar */}
      <nav className="bg-indigo-700 dark:bg-slate-900 text-white px-5 md:px-8 py-5 flex flex-wrap justify-between items-center gap-4 transition-colors">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-bold">
            JoinEazy
          </h1>
        </Link>

        <div className="flex flex-wrap items-center gap-3 md:gap-5">

          <span className="font-medium">
            Dashboard
          </span>

          {/* Dashboard Navigation */}
          <select
            onChange={(e) => navigate(e.target.value)}
            className="bg-white text-gray-800 px-3 py-2 rounded-lg outline-none"
            defaultValue="/"
          >
            <option value="/">Student</option>
            <option value="/admin">Admin</option>
          </select>

          {/* Login / User */}
          {user ? (
            <>
              <span className="font-semibold">
                {user.name} ({user.role})
              </span>

              <button
                onClick={handleLogout}
                className="bg-white text-indigo-700 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-indigo-700 px-5 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition"
            >
              Login
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="bg-white dark:bg-slate-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

        </div>
      </nav>

      {/* Routes */}
      <Routes>

        <Route
          path="/"
          element={<StudentDashboard />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

      </Routes>

      {/* Toast */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={darkMode ? "dark" : "light"}
      />

      {/* Footer */}
      <footer className="text-center text-gray-500 dark:text-gray-400 py-6 mt-8 border-t border-gray-200 dark:border-slate-800">
        © 2026 JoinEazy | Assignment & Review Dashboard
      </footer>

    </div>
  );
}

export default App;
