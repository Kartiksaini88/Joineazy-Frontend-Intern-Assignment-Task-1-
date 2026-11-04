import { CalendarDays, ExternalLink, CheckCircle2 } from "lucide-react";

export default function AssignmentCard({ assignment, onSubmit }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

      <div className="flex justify-between items-start gap-3">

        <div>
          <h3 className="font-bold text-gray-800">
            {assignment.title}
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            {assignment.description}
          </p>
        </div>

        <span className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${
          assignment.submitted
            ? "bg-green-100 text-green-700"
            : "bg-orange-100 text-orange-700"
        }`}>
          {assignment.submitted ? "Submitted" : "Pending"}
        </span>

      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mt-5">

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays size={16} />
          Due: {assignment.dueDate}
        </div>

        <div className="flex gap-2">

          <a
            href={assignment.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-sm text-violet-600 font-semibold px-3 py-2"
          >
            Open link <ExternalLink size={14} />
          </a>

          <button
            onClick={() => onSubmit(assignment.id)}
            disabled={assignment.submitted}
            className="bg-violet-600 hover:bg-violet-700 disabled:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            {assignment.submitted ? (
              <span className="flex items-center gap-1">
                <CheckCircle2 size={15} /> Done
              </span>
            ) : "Submit"}
          </button>

        </div>
      </div>
    </div>
  );
}