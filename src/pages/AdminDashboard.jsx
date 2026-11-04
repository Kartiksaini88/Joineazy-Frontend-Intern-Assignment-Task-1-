
import React from "react";

function AdminDashboard() {
  const assignments = [
    {
      id: 1,
      title: "HTML & CSS Assignment",
      description: "Create a responsive webpage using HTML and CSS.",
      dueDate: "05 Nov 2026",
      students: 25,
      submitted: 18,
      pending: 7,
    },
    {
      id: 2,
      title: "JavaScript Project",
      description: "Build a calculator using JavaScript.",
      dueDate: "08 Nov 2026",
      students: 25,
      submitted: 20,
      pending: 5,
    },
    {
      id: 3,
      title: "React.js Assignment",
      description: "Create a React application using components.",
      dueDate: "12 Nov 2026",
      students: 25,
      submitted: 10,
      pending: 15,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      

      {/* Main Container */}
      <main className="max-w-7xl mx-auto p-6">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-indigo-600 font-semibold text-sm">
            ADMIN PANEL
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            Admin Dashboard
          </h2>

          <p className="text-gray-500 mt-2">
            Manage assignments and monitor student submissions.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Total Assignments</p>
            <h3 className="text-3xl font-bold mt-3">12</h3>
            <p className="text-sm text-indigo-600 mt-2">
              All created assignments
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Total Submissions</p>
            <h3 className="text-3xl font-bold text-green-600 mt-3">
              48
            </h3>
            <p className="text-sm text-green-600 mt-2">
              Student submissions received
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Pending Submissions</p>
            <h3 className="text-3xl font-bold text-orange-500 mt-3">
              27
            </h3>
            <p className="text-sm text-orange-500 mt-2">
              Awaiting student submissions
            </p>
          </div>

        </div>

        {/* Create Assignment */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">

          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Create New Assignment
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Add assignment details below.
              </p>
            </div>
          </div>

          <div className="space-y-5">

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Assignment Title
              </label>
              <input
                type="text"
                placeholder="Enter assignment title"
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows="4"
                placeholder="Enter assignment description"
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Google Drive Link
                </label>
                <input
                  type="url"
                  placeholder="Paste Google Drive URL"
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-3">
                Assign To Students
              </label>

              <div className="flex flex-wrap gap-5">

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  All Students
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Student 1
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Student 2
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Student 3
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Student 4
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Student 5
                </label>

              </div>
            </div>

            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold">
              Create Assignment
            </button>

          </div>
        </div>

        {/* Assignment Management */}
        <div className="mb-5">
          <h3 className="text-2xl font-bold text-gray-800">
            Manage Assignments
          </h3>
          <p className="text-gray-500 mt-1">
            View assignment details and student progress.
          </p>
        </div>

        {/* Assignment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {assignments.map((assignment) => {

            const progress = Math.round(
              (assignment.submitted / assignment.students) * 100
            );

            return (
              <div
                key={assignment.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >

                <h4 className="text-xl font-bold text-gray-800">
                  {assignment.title}
                </h4>

                <p className="text-gray-500 mt-3">
                  {assignment.description}
                </p>

                <p className="text-sm text-gray-500 mt-4">
                  Due Date: {assignment.dueDate}
                </p>

                <div className="grid grid-cols-3 gap-3 mt-6">

                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-gray-500 text-xs">Students</p>
                    <h4 className="font-bold text-xl">
                      {assignment.students}
                    </h4>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-green-600 text-xs">Submitted</p>
                    <h4 className="font-bold text-xl text-green-600">
                      {assignment.submitted}
                    </h4>
                  </div>

                  <div className="bg-orange-50 p-3 rounded-lg text-center">
                    <p className="text-orange-600 text-xs">Pending</p>
                    <h4 className="font-bold text-xl text-orange-600">
                      {assignment.pending}
                    </h4>
                  </div>

                </div>

                {/* Progress */}
                <div className="mt-6">

                  <div className="flex justify-between mb-2 text-sm">
                    <span className="font-semibold">
                      Submission Progress
                    </span>
                    <span className="text-indigo-600 font-bold">
                      {progress}%
                    </span>
                  </div>

                  <div className="bg-gray-200 h-3 rounded-full">
                    <div
                      className="bg-indigo-600 h-3 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">

                  <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg font-semibold">
                    Edit
                  </button>

                  <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg font-semibold">
                    Delete
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 mt-8">
        © 2026 JoinEazy | Admin Dashboard
      </footer>

    </div>
  );
}

export default AdminDashboard;
