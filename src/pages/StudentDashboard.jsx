
import React, { useEffect, useState } from "react";

function StudentDashboard() {
  const [assignments, setAssignments] = useState([]);

  // Load Assignments from LocalStorage
  useEffect(() => {
    try {
      const storedAssignments = JSON.parse(
        localStorage.getItem("assignments") || "[]"
      );

      setAssignments(storedAssignments);
    } catch (error) {
      console.error("Error loading assignments:", error);
    }
  }, []);

  // Submit Assignment
  const handleSubmit = (id) => {
    const confirmSubmit = window.confirm(
      "Are you sure you want to submit this assignment?"
    );

    if (confirmSubmit) {
      const updatedAssignments = assignments.map((assignment) =>
        assignment.id === id
          ? {
              ...assignment,
              status: "Submitted",
            }
          : assignment
      );

      setAssignments(updatedAssignments);

      localStorage.setItem(
        "assignments",
        JSON.stringify(updatedAssignments)
      );
    }
  };

  // Statistics
  const totalAssignments = assignments.length;

  const completedAssignments = assignments.filter(
    (assignment) => assignment.status === "Submitted"
  ).length;

  const pendingAssignments = totalAssignments - completedAssignments;

  const completionRate =
    totalAssignments > 0
      ? Math.round(
          (completedAssignments / totalAssignments) * 100
        )
      : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-gray-800 dark:text-white transition-colors duration-300">

      <main className="max-w-7xl mx-auto px-5 md:px-8 py-8">

        {/* Welcome Section */}
        <div className="mb-8">
          <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wider">
            Student Dashboard
          </p>

          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
            Welcome Back, Student!
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Track your assignments and monitor your learning progress.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {/* Total Assignments */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <p className="text-gray-500 dark:text-gray-400">
                Total Assignments
              </p>
              <span className="text-2xl">📚</span>
            </div>

            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-3">
              {totalAssignments}
            </h3>

            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              All assigned tasks
            </p>
          </div>

          {/* Submitted */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <p className="text-gray-500 dark:text-gray-400">
                Submitted
              </p>
              <span className="text-2xl">✅</span>
            </div>

            <h3 className="text-3xl font-bold text-green-600 mt-3">
              {completedAssignments}
            </h3>

            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Successfully submitted
            </p>
          </div>

          {/* Pending */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <p className="text-gray-500 dark:text-gray-400">
                Pending
              </p>
              <span className="text-2xl">⏳</span>
            </div>

            <h3 className="text-3xl font-bold text-orange-500 mt-3">
              {pendingAssignments}
            </h3>

            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Waiting for submission
            </p>
          </div>

          {/* Completion Rate */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <p className="text-gray-500 dark:text-gray-400">
                Completion Rate
              </p>
              <span className="text-2xl">📈</span>
            </div>

            <h3 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-3">
              {completionRate}%
            </h3>

            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Overall performance
            </p>
          </div>

        </div>

        {/* Overall Progress */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 mb-8">

          <div className="flex justify-between items-center mb-4">

            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Overall Progress
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Your assignment completion status
              </p>
            </div>

            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {completionRate}%
            </span>

          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">

            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />

          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            {completedAssignments} out of {totalAssignments} assignments completed
          </p>

        </div>

        {/* Assignment Heading */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-6">

          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              My Assignments
            </h3>

            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              View your assigned tasks and submission status.
            </p>
          </div>

          <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-lg text-sm font-semibold">
            {assignments.length}
          </span>

        </div>

        {/* Assignment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {assignments.length === 0 ? (

            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl text-center col-span-full border border-gray-100 dark:border-slate-800">

              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                No Assignments Yet
              </h3>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Connect with your faculty if any error.
              </p>

            </div>

          ) : (

            assignments.map((assignment) => (

              <div
                key={assignment.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md dark:hover:border-slate-700 transition"
              >

                <div className="flex justify-between items-start gap-3">

                  <div>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase">
                      Assignment
                    </span>

                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mt-2">
                      {assignment.title}
                    </h4>
                  </div>

                  <span
                    className={`text-xs px-3 py-2 rounded-full font-semibold whitespace-nowrap ${
                      assignment.status === "Submitted"
                        ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400"
                        : "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400"
                    }`}
                  >
                    {assignment.status || "Pending"}
                  </span>

                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 leading-6">
                  {assignment.description}
                </p>

                <div className="border-t border-gray-100 dark:border-slate-700 mt-5 pt-4 flex justify-between items-center">

                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Due Date
                    </p>

                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-1">
                      {assignment.dueDate}
                    </p>
                  </div>

                  <span className="text-gray-400 dark:text-gray-500 text-sm">
                    Assignment #{assignment.id}
                  </span>

                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-5">

                  {assignment.driveLink && (
                    <a
                      href={assignment.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                      View Assignment
                    </a>
                  )}

                  <button
                    onClick={() => handleSubmit(assignment.id)}
                    disabled={assignment.status === "Submitted"}
                    className={`flex-1 border py-3 rounded-lg font-semibold transition ${
                      assignment.status === "Submitted"
                        ? "border-green-500 text-green-600 dark:text-green-400 cursor-not-allowed opacity-70"
                        : "border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                    }`}
                  >
                    {assignment.status === "Submitted"
                      ? "Submitted ✓"
                      : "Submit Work"}
                  </button>

                </div>

              </div>

            ))
          )}

        </div>

      </main>
    </div>
  );
}

export default StudentDashboard;
