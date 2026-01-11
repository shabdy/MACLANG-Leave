import { useState, useMemo } from "react";
import LeaveTable from "@/components/leave/LeaveTable";
import AllLeave from "@/components/leave/AllLeave";
import { useLeaveStore } from "@/hooks/useLeaveStore";
import { Input } from "@/components/ui/input";

export default function LeaveApprovalPage() {
  const [search, setSearch] = useState("");

  const leaves = useLeaveStore((state) => state.leaves);
  const updateStatus = useLeaveStore((state) => state.updateStatus);
  const cancelLeave = useLeaveStore((state) => state.cancelLeave);

  const filteredLeaves = useMemo(() => {
    return leaves.filter(
      (l) =>
        l.employee.toLowerCase().includes(search.toLowerCase()) ||
        l.type.toLowerCase().includes(search.toLowerCase())
    );
  }, [leaves, search]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
        <p className="text-gray-500 mt-1">
          Review and approve employee leaves
        </p>
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Search employee or leave type..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-2xl"
      />

      {/* CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT — Table */}
        <div className="xl:col-span-2">
          <LeaveTable
            isAdmin
            leaves={filteredLeaves}
            updateStatus={updateStatus}
            cancelLeave={cancelLeave}
          />
        </div>

        {/* RIGHT — AllLeave (habaan vertically) */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col">
          <AllLeave />
        </div>
      </div>
    </div>
  );
}
