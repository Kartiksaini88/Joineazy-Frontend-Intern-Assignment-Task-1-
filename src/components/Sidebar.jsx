import { LayoutDashboard, ClipboardList, Settings, HelpCircle, GraduationCap } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-6 hidden md:flex flex-col">

      <div className="flex items-center gap-2 mb-12">
        <div className="bg-violet-600 text-white p-2 rounded-xl">
          <GraduationCap size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          Joineazy
        </h1>
      </div>

      <p className="text-xs font-semibold text-gray-400 mb-4">
        WORKSPACE
      </p>

      <nav className="space-y-2">
        <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-violet-50 text-violet-700 font-semibold">
          <LayoutDashboard size={20} />
          Overview
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-500 hover:bg-gray-50">
          <ClipboardList size={20} />
          Assignments
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-500 hover:bg-gray-50">
          <Settings size={20} />
          Settings
        </button>
      </nav>

      <div className="mt-auto bg-violet-50 p-4 rounded-xl">
        <HelpCircle className="text-violet-600 mb-2" />
        <h3 className="font-semibold text-gray-800">
          Need help?
        </h3>
        <p className="text-xs text-gray-500 mt-2">
          Contact your professor if you have questions.
        </p>
      </div>

    </aside>
  );
}