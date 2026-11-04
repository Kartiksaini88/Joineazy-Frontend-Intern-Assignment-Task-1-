
import React, { useEffect, useState } from "react";

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
    status:"pending"
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
    status:"pending"
  },
];
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

useEffect(() => {
  localStorage.setItem(
    "assignments",
    JSON.stringify(assignments)
  );
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


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
  const handleAllStudents = (e) => {
    if (e.target.checked) {
      setSelectedStudents(studentsList.map((s) => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleStudentChange = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

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

    if (editId) {
      setAssignments((prev) =>
        prev.map((assignment) =>
          assignment.id === editId
            ? {
                ...assignment,
                ...formData,
                assignedTo: selectedStudents,
                students: selectedStudents.length,
                pending: Math.max(
                  0,
                  selectedStudents.length - assignment.submitted
                ),
              }
            : assignment
        )
      );

      alert("Assignment updated successfully!");
      setEditId(null);
    } else {
      const newAssignment = {
        id: Date.now(),
        ...formData,
        assignedTo: selectedStudents,
        students: selectedStudents.length,
        submitted: 0,
        pending: selectedStudents.length,
        status:"pending"
      };

      setAssignments((prev) => [...prev, newAssignment]);

      alert("Assignment created successfully!");
    }

    
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      driveLink: "",
    });

    setSelectedStudents([]);
  };

  
  const handleEdit = (assignment) => {
    setEditId(assignment.id);

    setFormData({
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      driveLink: assignment.driveLink,
    });

    setSelectedStudents(assignment.assignedTo);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

 
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (confirmDelete) {
      setAssignments((prev) =>
        prev.filter((assignment) => assignment.id !== id)
      );

      if (editId === id) {
        setEditId(null);
        setFormData({
          title: "",
          description: "",
          dueDate: "",
          driveLink: "",
        });
        setSelectedStudents([]);
      }
    }
  };

  const totalAssignments = assignments.length;

  const totalSubmissions = assignments.reduce(
    (total, assignment) => total + assignment.submitted,
    0
  );

  const pendingSubmissions = assignments.reduce(
    (total, assignment) => total + assignment.pending,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">

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
            <h3 className="text-3xl font-bold mt-3">
              {totalAssignments}
            </h3>
            <p className="text-sm text-indigo-600 mt-2">
              All created assignments
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Total Submissions</p>
            <h3 className="text-3xl font-bold text-green-600 mt-3">
              {totalSubmissions}
            </h3>
            <p className="text-sm text-green-600 mt-2">
              Student submissions received
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Pending Submissions</p>
            <h3 className="text-3xl font-bold text-orange-500 mt-3">
              {pendingSubmissions}
            </h3>
            <p className="text-sm text-orange-600 mt-2">
              Awaiting student submissions
            </p>
          </div>

        </div>

        {/* Create Assignment Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              {editId ? "Edit Assignment" : "Create New Assignment"}
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Add assignment details and select students.
            </p>
          </div>

          <form onSubmit={handleCreateAssignment} className="space-y-5">

            {/* Title */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Assignment Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter assignment title"
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Enter assignment description"
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Date and Drive Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Due Date
                </label>

                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Google Drive Link
                </label>

                <input
                  type="url"
                  name="driveLink"
                  value={formData.driveLink}
                  onChange={handleChange}
                  placeholder="Paste Google Drive URL"
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

            </div>

            {/* Assign Students */}
            <div>

              <label className="block font-medium text-gray-700 mb-3">
                Assign To Students
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

                {/* All Students */}
                <label className="flex items-center gap-2 bg-indigo-50 p-3 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={
                      selectedStudents.length === studentsList.length
                    }
                    onChange={handleAllStudents}
                    className="accent-indigo-600"
                  />

                  <span className="font-semibold text-indigo-700">
                    All Students
                  </span>
                </label>

                {/* Individual Students */}
                {studentsList.map((student) => (
                  <label
                    key={student.id}
                    className="flex items-center gap-2 border border-gray-200 p-3 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() =>
                        handleStudentChange(student.id)
                      }
                      className="accent-indigo-600"
                    />

                    <span className="text-gray-700">
                      {student.name}
                    </span>
                  </label>
                ))}

              </div>

              <p className="text-sm text-indigo-600 mt-3">
                {selectedStudents.length} students selected
              </p>

            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                {editId ? "Update Assignment" : "Create Assignment"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setFormData({
                      title: "",
                      description: "",
                      dueDate: "",
                      driveLink: "",
                    });
                    setSelectedStudents([]);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        </div>

        {/* Manage Assignments */}
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

          {assignments.length === 0 ? (

            <div className="bg-white p-8 rounded-xl text-center col-span-full">
              <h3 className="font-semibold text-gray-700">
                No Assignments Yet
              </h3>

              <p className="text-gray-500 text-sm mt-2">
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

              const assignedNames = assignment.assignedTo
                .map(
                  (id) =>
                    studentsList.find((student) => student.id === id)?.name
                )
                .filter(Boolean);

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

                  <p className="text-sm text-indigo-600 mt-2 break-words">
                    Assigned To: {assignedNames.join(", ")}
                  </p>

                  {assignment.driveLink && (
                    <a
                      href={assignment.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline mt-2 inline-block"
                    >
                      Open Google Drive Link
                    </a>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mt-6">

                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-gray-500 text-xs">
                        Students
                      </p>

                      <h4 className="font-bold text-xl">
                        {assignment.students}
                      </h4>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <p className="text-green-600 text-xs">
                        Submitted
                      </p>

                      <h4 className="font-bold text-xl text-green-600">
                        {assignment.submitted}
                      </h4>
                    </div>

                    <div className="bg-orange-50 p-3 rounded-lg text-center">
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

                      <span className="font-semibold">
                        Submission Progress
                      </span>

                      <span className="text-indigo-600 font-bold">
                        {progress}%
                      </span>

                    </div>

                    <div className="bg-gray-200 h-3 rounded-full overflow-hidden">

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
                      className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-lg font-semibold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(assignment.id)}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg font-semibold"
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

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 mt-8">
        © 2026 JoinEazy | Admin Dashboard
      </footer>

    </div>
  );
}

export default AdminDashboard;
