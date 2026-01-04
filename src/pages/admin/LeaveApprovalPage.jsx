import { useState, useMemo } from "react";
import LeaveTable from "@/components/leave/LeaveTable";
import AllLeave from "@/components/leave/AllLeave";
import { useLeaveStore } from "@/hooks/useLeaveStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function LeaveApprovalPage() {
  const [search, setSearch] = useState("");

  const leaves = useLeaveStore((state) => state.leaves);
  const updateStatus = useLeaveStore((state) => state.updateStatus);
  const cancelLeave = useLeaveStore((state) => state.cancelLeave);

  // Filter by search
  const filteredLeaves = useMemo(() => {
    return leaves.filter(
      (l) =>
        l.employee.toLowerCase().includes(search.toLowerCase()) ||
        l.type.toLowerCase().includes(search.toLowerCase())
    );
  }, [leaves, search]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredLeaves);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leave Requests");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "leave-requests.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-500 mt-1">Review and approve employee leaves</p>
        </div>

        <div className="flex gap-3 w-full lg:w-auto">
          <Input
            placeholder="Search employee or leave type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:w-[260px]"
          />
          <Button
            className="bg-green-500 hover:bg-green-300"
            onClick={exportToExcel}
          >
            Export to Excel
          </Button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT — Table */}
        <div className="xl:col-span-2 flex flex-col gap-2">
          <LeaveTable
            isAdmin
            leaves={filteredLeaves} // all filtered leaves
            updateStatus={updateStatus}
            cancelLeave={cancelLeave}
          />
        </div>

        {/* RIGHT — AllLeave summary */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <AllLeave />
        </div>
      </div>
    </div>
  );
}
