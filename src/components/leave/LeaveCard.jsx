// LeaveCard.jsx
export default function LeaveCard({ startDate, endDate, duration }) {
  return (
    <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-2">
      <div className="flex items-center gap-2">
        {/* Calendar icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-indigo-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <div className="flex flex-col">
          <span className="text-xs text-gray-600">Leave Duration</span>
          <span className="text-[10px] text-gray-400">{startDate} → {endDate}</span>
        </div>
      </div>

      <div className="text-right">
        <span className="text-xl font-bold text-indigo-700">{duration}</span>
        <span className="text-xs text-gray-600 ml-1">{duration > 1 ? "days" : "day"}</span>
      </div>
    </div>
  );
}
