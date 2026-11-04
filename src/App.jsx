import { useState } from "react";


function App() {
  const assignments = [
    {
      id: 1,
      title: "HTML & CSS Assignment",
      description: "Create a responsive webpage using HTML and CSS.",
      dueDate: "05 Nov 2026",
      status: "Pending",
    },
    {
      id: 2,
      title: "JavaScript Project",
      description: "Build a simple calculator using JavaScript.",
      dueDate: "08 Nov 2026",
      status: "Submitted",
    },
    {
      id: 3,
      title: "React.js Assignment",
      description: "Create a React application using components.",
      dueDate: "12 Nov 2026",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-indigo-700 text-white px-8 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold">JoinEazy</h1>

        <div className="flex items-center gap-5">
          <span>Dashboard</span>

          <select className="bg-white text-gray-800 px-4 py-2 rounded-lg">
            <option>Student</option>
            <option>Admin</option>
          </select>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-indigo-600 font-semibold">
            STUDENT PORTAL
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            My Dashboard
          </h2>

          <p className="text-gray-500 mt-2">
            Manage your assignments and track your progress.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Total Assignments</p>
            <h3 className="text-3xl font-bold mt-3">05</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Submitted</p>
            <h3 className="text-3xl font-bold text-green-600 mt-3">
              03
            </h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Pending</p>
            <h3 className="text-3xl font-bold text-orange-500 mt-3">
              02
            </h3>
          </div>

        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">

          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-bold">
              Overall Progress
            </h3>

            <span className="text-indigo-600 font-bold">
              60%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-indigo-600 h-3 rounded-full w-3/5"></div>
          </div>

          <p className="text-sm text-gray-500 mt-3">
            3 of 5 assignments submitted
          </p>

        </div>

        {/* Assignment Section */}
        <div className="flex justify-between items-center mb-5">

          <h3 className="text-2xl font-bold text-gray-800">
            My Assignments
          </h3>

          <span className="text-gray-500 text-sm">
            3 Assignments
          </span>

        </div>

        {/* Assignment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {assignments.map((assignment) => (

            <div
              key={assignment.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >

              <div className="flex justify-between items-center">

                <h4 className="text-xl font-bold text-gray-800">
                  {assignment.title}
                </h4>

                <span
                  className={`text-xs px-3 py-2 rounded-full font-semibold ${
                    assignment.status === "Submitted"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {assignment.status}
                </span>

              </div>

              <p className="text-gray-500 mt-4">
                {assignment.description}
              </p>

              <p className="text-sm text-gray-500 mt-4">
                Due Date: {assignment.dueDate}
              </p>

              <a
                href="#"
                className="inline-block text-indigo-600 font-semibold mt-4"
              >
                Open Drive Link ↗
              </a>

              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-5 font-semibold">
                Submit Assignment
              </button>

            </div>

          ))}

        </div>

      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 mt-8">
        © 2026 JoinEazy | Assignment & Review Dashboard
      </footer>

    </div>
  );
}

export default App;

