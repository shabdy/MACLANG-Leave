import { startOfMonth, endOfMonth, eachDayOfInterval, getDay, format, isWithinInterval, parseISO } from "date-fns";

export default function LeaveCalendar({ month, employeeLeaves, leaveTypeColors, leaveTypeMap }) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const leadingEmptyDays = Array(getDay(monthStart)).fill(null);

  const getLeaveForDay = (day) =>
    employeeLeaves.find((l) =>
      isWithinInterval(day, {
        start: parseISO(l.startDate),
        end: parseISO(l.endDate),
      })
    );

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200 min-w-[600px]">
        <thead>
          <tr className="bg-gray-50">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <th
                key={d}
                className="border border-gray-200 text-gray-600 py-1 text-center text-xs font-medium"
              >
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(Math.ceil((leadingEmptyDays.length + daysInMonth.length) / 7))].map((_, weekIndex) => (
            <tr key={weekIndex}>
              {[...Array(7)].map((__, dayIndex) => {
                const dayIndexInMonth = weekIndex * 7 + dayIndex;
                let dayToShow = null;
                if (dayIndexInMonth >= leadingEmptyDays.length) {
                  const dayNumber = dayIndexInMonth - leadingEmptyDays.length;
                  dayToShow = daysInMonth[dayNumber];
                }

                if (!dayToShow) return <td key={dayIndex} className="border border-gray-200 p-1"></td>;

                const leave = getLeaveForDay(dayToShow);
                let colorClass = "";
                if (leave) {
                  if (leave.status === "Pending") colorClass = "bg-gray-300 text-gray-800";
                  else if (leave.status === "Approved")
                    colorClass = `${leaveTypeColors[leave.type] || "bg-green-400"} text-white rounded shadow-sm`;
                  else if (leave.status === "Rejected") colorClass = "bg-red-400 text-white rounded shadow-sm";
                }

                return (
                  <td
                    key={dayIndex}
                    className={`border border-gray-200 text-center p-1 rounded cursor-default select-none ${colorClass} hover:shadow-md transition-shadow`}
                    title={
                      leave
                        ? `${leaveTypeMap[leave.type]?.name} (${leave.status}): ${leave.startDate} → ${leave.endDate}`
                        : ""
                    }
                  >
                    <span className="text-xs font-medium">{format(dayToShow, "d")}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
