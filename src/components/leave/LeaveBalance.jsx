import { useState } from "react";
import { useLeaveStore } from "@/hooks/useLeaveStore";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  format,
  isWithinInterval,
  parseISO,
  addMonths,
  subMonths,
} from "date-fns";

const LeaveBalance = ({ employeeName = "Ransh Dy" }) => {
  const { leaveBalance, leaves } = useLeaveStore();
  const [month, setMonth] = useState(new Date());

  return (
    <div className="mt-6 space-y-8">
      {/* Leave Balance Cards */}
{Object.entries(leaveBalance).length > 0 && (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
    {Object.entries(leaveBalance).map(([type, remaining]) => {
      // Side border color per leave type
      const borderColor = {
        "Vacation Leave": "border-l-green-500",
        "Sick Leave": "border-l-purple-500",
        "Wellness Leave": "border-l-blue-500",
      };

      // Icon background color (subtle)
      const iconBg = {
        "Vacation Leave": "bg-green-100 text-green-700",
        "Sick Leave": "bg-purple-100 text-purple-700",
        "Wellness Leave": "bg-blue-100 text-blue-700",
      };

      return (
        <div
          key={type}
          className={`flex items-center gap-4 p-6 rounded-xl border border-gray-200 border-l-4 
          ${borderColor[type] || "border-l-gray-400"} 
          bg-white shadow-sm hover:shadow-md transition`}
        >
          <div
            className={`h-12 w-12 flex items-center justify-center rounded-full 
            ${iconBg[type] || "bg-gray-100 text-gray-700"} 
            font-bold`}
          >
            {type[0]}
          </div>

          <div>
            <p className="text-sm text-gray-500 font-medium">{type}</p>
            <p className="text-3xl font-semibold text-gray-900">{remaining}</p>
            <p className="text-xs text-gray-400">days remaining</p>
          </div>
        </div>
      );
    })}
  </div>
)}



      {/* Month Navigation */}
      <div className="flex justify-center items-center mt-6 mb-4 gap-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setMonth(subMonths(month, 1))}
          aria-label="Previous Month"
        >
          &lt;
        </button>
        <h2 className="text-xl font-bold tracking-wide">
          {format(month, "MMMM yyyy")}
        </h2>
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setMonth(addMonths(month, 1))}
          aria-label="Next Month"
        >
          &gt;
        </button>
      </div>

      {/* Single Month Calendar */}
      <LeaveMonthCalendar employeeName={employeeName} leaves={leaves} month={month} />
    </div>
  );
};

function LeaveMonthCalendar({ employeeName, leaves, month }) {
  const employeeLeaves = leaves.filter((l) => l.employee === employeeName);

  const leaveTypeColors = {
    "Vacation Leave": "bg-green-300",
    "Sick Leave": "bg-purple-300",
    "Wellness Leave": "bg-blue-300",
  };

  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Calculate empty days before first day to align weekdays
  const leadingEmptyDays = Array(getDay(monthStart)).fill(null);

  const getLeaveForDay = (day) => {
    return employeeLeaves.find((l) =>
      isWithinInterval(day, {
        start: parseISO(l.startDate),
        end: parseISO(l.endDate),
      })
    );
  };

  return (
  <div className="bg-white p-4 rounded-2xl shadow-lg w-full mx-auto overflow-x-auto">
    <table className="w-full border-collapse border border-gray-200 min-w-[600px]">
      <thead>
        <tr className="bg-gray-100">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <th
              key={d}
              className="border border-gray-300 text-gray-700 py-2 text-center font-semibold text-xs uppercase"
            >
              {d}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(Math.ceil((leadingEmptyDays.length + daysInMonth.length) / 7))].map(
          (_, weekIndex) => (
            <tr key={weekIndex}>
              {[...Array(7)].map((__, dayIndex) => {
                const dayIndexInMonth = weekIndex * 7 + dayIndex;
                let dayToShow = null;

                if (dayIndexInMonth < leadingEmptyDays.length) {
                  dayToShow = null;
                } else {
                  const dayNumber = dayIndexInMonth - leadingEmptyDays.length;
                  dayToShow = daysInMonth[dayNumber];
                }

                if (!dayToShow) {
                  return <td key={dayIndex} className="border border-gray-200 p-2"></td>;
                }

                const leave = getLeaveForDay(dayToShow);
                let colorClass = "";

                if (leave) {
                  if (leave.status === "Pending") {
                    colorClass = "bg-gray-300 text-gray-800";
                  } else if (leave.status === "Approved") {
                    colorClass = `${leaveTypeColors[leave.type] || "bg-green-400"} text-white shadow-md`;
                  } else if (leave.status === "Rejected") {
                    colorClass = "bg-red-400 text-white shadow-md";
                  }
                }

                return (
                  <td
                    key={dayIndex}
                    className={`border border-gray-200 text-center p-2 rounded cursor-default select-none ${colorClass} hover:shadow-md transition-shadow`}
                    title={leave ? `${leave.type} (${leave.status}): ${leave.startDate} → ${leave.endDate}` : ""}
                  >
                    {format(dayToShow, "d")}
                  </td>
                );
              })}
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
);

}

export default LeaveBalance;
