import { useMemo } from "react";
import { useLeaveStore } from "@/hooks/useLeaveStore";

export default function AllLeave() {
  const leaves = useLeaveStore((state) => state.leaves);

  const today = new Date().toISOString().split("T")[0];

  const filteredLeaves = useMemo(() => {
    return leaves.filter(
      (l) =>
        l.status === "Approved" &&
        l.startDate <= today &&
        l.endDate >= today
    );
  }, [leaves, today]);

  const formattedDate = new Date(today).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3">
      {/* HEADER */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">
          On Leave
        </h2>
        <span className="text-[11px] text-gray-500">{formattedDate}</span>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-200 border-t border-gray-200">
        {filteredLeaves.length > 0 ? (
          filteredLeaves.map((leave) => {
            const start = new Date(leave.startDate);
            const end = new Date(leave.endDate);
            const duration =
              Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

            return (
              <div
                key={leave.id}
                className="flex items-center justify-between py-2 px-2 hover:bg-gray-50"
              >
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate leading-tight">
                    {leave.employee}
                  </p>
                  <p className="text-[11px] text-gray-500 truncate">
                    {leave.type}
                  </p>
                </div>

                <span className="ml-2 shrink-0 text-[11px] font-medium text-gray-600">
                  {duration}d
                </span>
              </div>
            );
          })
        ) : (
          <div className="text-[11px] text-gray-400 text-center py-4">
            No employees on leave today
          </div>
        )}
      </div>
    </div>
  );
}
