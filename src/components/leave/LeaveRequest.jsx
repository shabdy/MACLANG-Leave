import { useState, useMemo, useEffect } from "react";
import LeaveForm from "@/components/leave/LeaveForm";
import LeaveTable from "@/components/leave/LeaveTable";
import LeaveCalendar from "@/components/leave/LeaveCalendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useLeaveStore } from "@/hooks/useLeaveStore";
import { Pagination } from "@/components/ui/pagination";
import { leaveTypes } from "@/data/leaveTypes";

const leaveTypeMap = Object.fromEntries(leaveTypes.map((lt) => [lt.code, lt]));

export default function LeaveRequest() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [month, setMonth] = useState(new Date());

  const leaves = useLeaveStore((state) => state.leaves);
  const cancelLeave = useLeaveStore((state) => state.cancelLeave);

  const employeeLeaves = leaves.filter((l) => l.employee === "Ransh Dy");

  // Pagination
  const paginatedLeaves = useMemo(() => {
    const start = (page - 1) * pageSize;
    return employeeLeaves.slice(start, start + pageSize);
  }, [employeeLeaves, page, pageSize]);

  useEffect(() => {
    if ((page - 1) * pageSize >= employeeLeaves.length && page > 1) {
      setPage(page - 1);
    }
  }, [employeeLeaves.length, page, pageSize]);

  const leaveTypeColors = {
    VL: "bg-green-400",
    SL: "bg-purple-400",
    MFL: "bg-blue-400",
    SPL: "bg-yellow-400",
    SOPL: "bg-pink-400",
    SECL: "bg-indigo-400",
    ML: "bg-pink-500",
    PL: "bg-teal-400",
    SLD: "bg-gray-400",
    VAWC: "bg-red-400",
    RL: "bg-cyan-400",
    SPLW: "bg-amber-400",
    MLC: "bg-gray-500",
    TL: "bg-gray-700",
    AL: "bg-green-600",
  };

  return (
    <div className="space-y-4">
      {/* Request Leave */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Request Leave</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <LeaveForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* 2-Pane Layout */}
      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        {/* Left Pane: Leave Table + Pagination */}
        <div className="lg:w-2/3">
          <LeaveTable leaves={paginatedLeaves} cancelLeave={cancelLeave} />

          {employeeLeaves.length > pageSize && (
            <div className="flex justify-end mt-2">
              <Pagination
                page={page}
                pageSize={pageSize}
                total={employeeLeaves.length}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>

        {/* Right Pane: Calendar */}
        <div className="lg:w-1/3 bg-white p-4 rounded-xl shadow-md">
          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-4">
            <button
              className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
            >
              &lt;
            </button>
            <h2 className="text-sm font-semibold text-center">
              {month.toLocaleString("default", { month: "long", year: "numeric" })}
            </h2>
            <button
              className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
            >
              &gt;
            </button>
          </div>

          {/* Calendar Component */}
          <LeaveCalendar
            month={month}
            employeeLeaves={employeeLeaves}
            leaveTypeColors={leaveTypeColors}
            leaveTypeMap={leaveTypeMap}
            compact // optional prop to reduce cell height/size
          />
        </div>
      </div>
    </div>
  );
}
