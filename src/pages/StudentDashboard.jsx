
import React from "react";

function StudentDashboard() {
  const assignments = [
    {
      id: 1,
      title: "HTML & CSS Assignment",
      description: "Create a responsive webpage using HTML and CSS.",
      dueDate: "05 Nov 2026",
      status: "Pending",
      subject: "Frontend Development",
    },
    {
      id: 2,
      title: "JavaScript Project",
      description: "Build a simple calculator using JavaScript.",
      dueDate: "08 Nov 2026",
      status: "Submitted",
      subject: "JavaScript",
    },
    {
      id: 3,
      title: "React.js Assignment",
      description: "Create a React application using components and hooks.",
      dueDate: "12 Nov 2026",
      status: "Pending",
      subject: "React Development",
    },
    {
      id: 4,
      title: "UI/UX Design Task",
      description: "Design a modern and responsive dashboard interface.",
      dueDate: "15 Nov 2026",
      status: "Submitted",
      subject: "UI/UX Design",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}

      <main className="max-w-7xl mx-auto px-5 md:px-8 py-8">

        {/* Welcome Section */}
        <div className="mb-8">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
            Student Dashboard
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            Welcome Back, Student!
          </h2>

          <p className="text-gray-500 mt-2">
            Track your assignments and monitor your learning progress.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center">
              <p className="text-gray-500">Total Assignments</p>
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mt-3">08</h3>
            <p className="text-sm text-gray-400 mt-2">All assigned tasks</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center">
              <p className="text-gray-500">Submitted</p>
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="text-3xl font-bold text-green-600 mt-3">05</h3>
            <p className="text-sm text-gray-400 mt-2">Successfully submitted</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center">
              <p className="text-gray-500">Pending</p>
              <span className="text-2xl">⏳</span>
            </div>
            <h3 className="text-3xl font-bold text-orange-500 mt-3">03</h3>
            <p className="text-sm text-gray-400 mt-2">Waiting for submission</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center">
              <p className="text-gray-500">Completion Rate</p>
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-3xl font-bold text-indigo-600 mt-3">62%</h3>
            <p className="text-sm text-gray-400 mt-2">Overall performance</p>
          </div>

        </div>

        {/* Progress Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">

          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Overall Progress
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Your assignment completion status
              </p>
            </div>

            <span className="text-2xl font-bold text-indigo-600">
              62%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-indigo-600 h-3 rounded-full w-[62%]"></div>
          </div>

          <p className="text-sm text-gray-500 mt-3">
            5 out of 8 assignments completed
          </p>

        </div>

        {/* Assignment Heading */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-6">

          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              My Assignments
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              View your assigned tasks and submission status.
            </p>
          </div>

          <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold">
            08 Assignments
          </span>

        </div>

        {/* Assignment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {assignments.map((assignment) => (

            <div
              key={assignment.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
            >

              <div className="flex justify-between items-start gap-3">

                <div>
                  <span className="text-xs text-indigo-600 font-semibold uppercase">
                    {assignment.subject}
                  </span>

                  <h4 className="text-xl font-bold text-gray-800 mt-2">
                    {assignment.title}
                  </h4>
                </div>

                <span
                  className={`text-xs px-3 py-2 rounded-full font-semibold whitespace-nowrap ${
                    assignment.status === "Submitted"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {assignment.status}
                </span>

              </div>

              <p className="text-gray-500 text-sm mt-4 leading-6">
                {assignment.description}
              </p>

              <div className="border-t border-gray-100 mt-5 pt-4 flex justify-between items-center">

                <div>
                  <p className="text-xs text-gray-400">
                    Due Date
                  </p>

                  <p className="text-sm font-semibold text-gray-700 mt-1">
                    {assignment.dueDate}
                  </p>
                </div>

                <span className="text-gray-400 text-sm">
                  Assignment #{assignment.id}
                </span>

              </div>

              <div className="flex flex-wrap gap-3 mt-5">

                <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold">
                  View Assignment
                </button>

                <button className="flex-1 border border-indigo-600 text-indigo-600 py-3 rounded-lg font-semibold">
                  Submit Work
                </button>

              </div>

            </div>

          ))}

        </div>

      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 mt-8 border-t border-gray-200">
        © 2026 JoinEazy | Student Assignment Dashboard
      </footer>

    </div>
  );
}

export default StudentDashboard;
