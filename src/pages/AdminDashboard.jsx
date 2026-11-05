
import React, { useEffect, useState } from "react";
import { notifySuccess } from "./Toast/Toast";

function AdminDashboard() {
  // Students List
  const studentsList = [
    { id: "s1", name: "Rahul" },
    { id: "s2", name: "Aman" },
    { id: "s3", name: "Priya" },
    { id: "s4", name: "Rohit" },
    { id: "s5", name: "Neha" },
  ];

  // Initial Assignments
  const initialAssignments = [
    {
      id: 1,
      title: "HTML & CSS Assignment",
      description: "Create a responsive webpage using HTML and CSS.",
      dueDate: "2026-11-05",
      driveLink: "",
      assignedTo: ["s1", "s2", "s3", "s4", "s5"],
      students: 5,
      submitted: 3,
      pending: 2,
      submittedBy: [],
      status: "pending",
    },
    {
      id: 2,
      title: "JavaScript Project",
      description: "Build a calculator using JavaScript.",
      dueDate: "2026-11-08",
      driveLink: "",
      assignedTo: ["s1", "s2", "s3"],
      students: 3,
      submitted: 2,
      pending: 1,
      submittedBy: [],
      status: "pending",
    },
  ];

  // Assignment State
  const [assignments, setAssignments] = useState(() => {
    try {
      const savedAssignments = localStorage.getItem("assignments");

      return savedAssignments !== null
        ? JSON.parse(savedAssignments)
        : initialAssignments;
    } catch (error) {
      console.error("Error loading assignments:", error);
      return initialAssignments;
    }
  });

  // Save Assignments to LocalStorage
  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    driveLink: "",
  });

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [editId, setEditId] = useState(null);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Select All Students
  const handleAllStudents = (e) => {
    if (e.target.checked) {
      setSelectedStudents(studentsList.map((s) => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  // Select Individual Student
  const handleStudentChange = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Reset Form
  const resetForm = () => {
    setEditId(null);
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      driveLink: "",
    });
    setSelectedStudents([]);
  };

  // Create / Update Assignment
  const handleCreateAssignment = (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.dueDate ||
      !formData.driveLink.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (selectedStudents.length === 0) {
      alert("Please select at least one student.");
      return;
    }

    if (new Date(formData.dueDate + "T23:59:59") < new Date()) {
      alert("Due date cannot be in the past.");
      return;
    }

    if (editId !== null) {
      setAssignments((prev) =>
        prev.map((assignment) =>
          assignment.id === editId
            ? {
                ...assignment,
                ...formData,
                assignedTo: selectedStudents,
                students: selectedStudents.length,
                submittedBy: assignment.submittedBy || [],
                submitted: Math.min(
                  assignment.submitted || 0,
                  selectedStudents.length
                ),
                pending: Math.max(
                  0,
                  selectedStudents.length -
                    Math.min(
                      assignment.submitted || 0,
                      selectedStudents.length
                    )
                ),
              }
            : assignment
        )
      );

      notifySuccess("Assignment updated successfully!");
    } else {
      const newAssignment = {
        id: Date.now(),
        ...formData,
        assignedTo: selectedStudents,
        students: selectedStudents.length,
        submitted: 0,
        pending: selectedStudents.length,
        submittedBy: [],
        status: "pending",
      };

      setAssignments((prev) => [...prev, newAssignment]);

      notifySuccess("Assignment created successfully!");
    }

    resetForm();
  };

  // Edit Assignment
  const handleEdit = (assignment) => {
    setEditId(assignment.id);

    setFormData({
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      driveLink: assignment.driveLink,
    });

    setSelectedStudents(assignment.assignedTo || []);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete Assignment
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (confirmDelete) {
      setAssignments((prev) =>
        prev.filter((assignment) => assignment.id !== id)
      );

      if (editId === id) {
        resetForm();
      }

      notifySuccess("Assignment deleted successfully!");
    }
  };

  // Statistics
  const totalAssignments = assignments.length;

  const totalSubmissions = assignments.reduce(
    (total, assignment) => total + (assignment.submitted || 0),
    0
  );

  const pendingSubmissions = assignments.reduce(
    (total, assignment) => total + (assignment.pending || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 text-gray-800 dark:text-white transition-colors duration-300">
      <main className="max-w-7xl mx-auto p-6">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-indigo-600 font-semibold text-sm">
            ADMIN PANEL
          </p>

          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
            Admin Dashboard
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Manage assignments and monitor student submissions.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
            <p className="text-gray-500 dark:text-gray-400">
              Total Assignments
            </p>
            <h3 className="text-3xl font-bold mt-3">
              {totalAssignments}
            </h3>
            <p className="text-sm text-indigo-600 mt-2">
              All created assignments
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
            <p className="text-gray-500 dark:text-gray-400">
              Total Submissions
            </p>
            <h3 className="text-3xl font-bold text-green-600 mt-3">
              {totalSubmissions}
            </h3>
            <p className="text-sm text-green-600 mt-2">
              Student submissions received
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
            <p className="text-gray-500 dark:text-gray-400">
              Pending Submissions
            </p>
            <h3 className="text-3xl font-bold text-orange-500 mt-3">
              {pendingSubmissions}
            </h3>
            <p className="text-sm text-orange-600 mt-2">
              Awaiting student submissions
            </p>
          </div>

        </div>

        {/* Create Assignment Form */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 mb-8">

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {editId !== null ? "Edit Assignment" : "Create New Assignment"}
            </h3>

            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Add assignment details and select students.
            </p>
          </div>

          <form onSubmit={handleCreateAssignment} className="space-y-5">

            {/* Title */}
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">
                Assignment Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter assignment title"
                className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Enter assignment description"
                className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Date and Drive Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Due Date
                </label>

                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Google Drive Link
                </label>

                <input
                  type="url"
                  name="driveLink"
                  value={formData.driveLink}
                  onChange={handleChange}
                  placeholder="Paste Google Drive URL"
                  className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg p-3"
                />
              </div>

            </div>

            {/* Assign Students */}
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-200 mb-3">
                Assign To Students
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

                {/* All Students */}
                <label className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/40 p-3 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={
                      selectedStudents.length === studentsList.length
                    }
                    onChange={handleAllStudents}
                    className="accent-indigo-600"
                  />

                  <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                    All Students
                  </span>
                </label>

                {/* Individual Students */}
                {studentsList.map((student) => (
                  <label
                    key={student.id}
                    className="flex items-center gap-2 border border-gray-200 dark:border-slate-700 p-3 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleStudentChange(student.id)}
                      className="accent-indigo-600"
                    />

                    <span className="text-gray-700 dark:text-gray-200">
                      {student.name}
                    </span>
                  </label>
                ))}

              </div>

              <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-3">
                {selectedStudents.length} students selected
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                {editId !== null ? "Update Assignment" : "Create Assignment"}
              </button>

              {editId !== null && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              )}

            </div>
          </form>
        </div>

        {/* Manage Assignments */}
        <div className="mb-5">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Manage Assignments
          </h3>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            View assignment details and student progress.
          </p>
        </div>

        {/* Assignment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {assignments.length === 0 ? (

            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl text-center col-span-full">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                No Assignments Yet
              </h3>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Create your first assignment using the form above.
              </p>
            </div>

          ) : (

            assignments.map((assignment) => {
              const progress =
                assignment.students > 0
                  ? Math.round(
                      (assignment.submitted / assignment.students) * 100
                    )
                  : 0;

              const assignedNames = (assignment.assignedTo || [])
                .map(
                  (id) =>
                    studentsList.find((student) => student.id === id)?.name
                )
                .filter(Boolean);

              return (
                <div
                  key={assignment.id}
                  className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800"
                >

                  <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                    {assignment.title}
                  </h4>

                  <p className="text-gray-500 dark:text-gray-400 mt-3">
                    {assignment.description}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Due Date: {assignment.dueDate}
                  </p>

                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-2 break-words">
                    Assigned To: {assignedNames.join(", ")}
                  </p>

                  {assignment.driveLink && (
                    <a
                      href={assignment.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 underline mt-2 inline-block"
                    >
                      Open Google Drive Link
                    </a>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mt-6">

                    <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-lg text-center">
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        Students
                      </p>

                      <h4 className="font-bold text-xl">
                        {assignment.students}
                      </h4>
                    </div>

                    <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg text-center">
                      <p className="text-green-600 text-xs">
                        Submitted
                      </p>

                      <h4 className="font-bold text-xl text-green-600">
                        {assignment.submitted}
                      </h4>
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-950/30 p-3 rounded-lg text-center">
                      <p className="text-orange-600 text-xs">
                        Pending
                      </p>

                      <h4 className="font-bold text-xl text-orange-600">
                        {assignment.pending}
                      </h4>
                    </div>

                  </div>

                  {/* Progress */}
                  <div className="mt-6">

                    <div className="flex justify-between mb-2 text-sm">
                      <span className="font-semibold text-gray-700 dark:text-gray-200">
                        Submission Progress
                      </span>

                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                        {progress}%
                      </span>
                    </div>

                    <div className="bg-gray-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-3 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">

                    <button
                      onClick={() => handleEdit(assignment)}
                      className="flex-1 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 py-2 rounded-lg font-semibold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(assignment.id)}
                      className="flex-1 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 py-2 rounded-lg font-semibold"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              );
            })
          )}

        </div>

      </main>
    </div>
  );
}

export default AdminDashboard;
