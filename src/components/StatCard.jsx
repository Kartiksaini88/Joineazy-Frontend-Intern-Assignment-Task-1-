export default function StatCard({ title, value, subtitle, icon, color }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">

      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>

      <p className="text-sm text-gray-500 mt-4">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-gray-800 mt-1">
        {value}
      </h2>

      <p className="text-xs text-gray-400 mt-2">
        {subtitle}
      </p>

    </div>
  );
}