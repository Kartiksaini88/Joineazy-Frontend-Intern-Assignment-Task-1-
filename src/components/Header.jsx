import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">

      <div>
        <p className="text-sm text-gray-400">
          Workspace / Overview
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Search size={17} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2 text-sm w-32"
          />
        </div>

        <button className="relative text-gray-500">
          <Bell size={21} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
            AS
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
              Aarav Sharma
            </p>
            <p className="text-xs text-gray-400">
              Student
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}