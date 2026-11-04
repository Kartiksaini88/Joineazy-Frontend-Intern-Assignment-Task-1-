import { useState } from "react";
import { Plus, Users, FileText, CheckCircle, Clock } from "lucide-react";

const AdminDashboard = () => {
  const [assignments, setAssignments] = useState([]);

  const stats = [
    {
      title: "Total Assignments",
      value: assignments.length,
      icon: FileText,
    },
    {
      title: "Total Students",
      value: 5,
      icon: Users,
    },
    {
      title: "Submitted",
      value: assignments.reduce(
        (total, assignment) => total + assignment.submissions.length,
        0
      ),
      icon: CheckCircle,
    },
    {
      title: "Pending",
      value: assignments.reduce(
        (total, assignment) =>
          total + assignment.assignedTo.length - assignment.submissions.length,
        0
      ),
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-gray-500">
              Manage assignments and student submissions
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
            <Plus size={20} />
            Create Assignment
          </button>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="rounded-xl bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <h2 className="mt-2 text-3xl font-bold text-gray-800">
                      {stat.value}
                    </h2>
                  </div>

                  <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Assignments Section */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            All Assignments
          </h2>

          {assignments.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="mx-auto mb-3 text-gray-400" size={40} />

              <h3 className="font-semibold text-gray-700">
                No assignments yet
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Create your first assignment to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <h3 className="font-semibold text-gray-800">
                    {assignment.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {assignment.description}
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    Assigned to: {assignment.assignedTo.length} students
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;