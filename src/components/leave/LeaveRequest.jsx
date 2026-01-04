import { useState, useMemo, useEffect } from "react";
import LeaveForm from "@/components/leave/LeaveForm";
import LeaveTable from "@/components/leave/LeaveTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useLeaveStore } from "@/hooks/useLeaveStore";
import { Pagination } from "@/components/ui/pagination";

export default function LeaveRequest() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const leaves = useLeaveStore((state) => state.leaves);
  const cancelLeave = useLeaveStore((state) => state.cancelLeave);

  const employeeLeaves = leaves.filter((l) => l.employee === "Ransh Dy");

  // Slice the leaves for current page
  const paginatedLeaves = useMemo(() => {
    const start = (page - 1) * pageSize;
    return employeeLeaves.slice(start, start + pageSize);
  }, [employeeLeaves, page, pageSize]);

  // Adjust page if necessary
  useEffect(() => {
    if ((page - 1) * pageSize >= employeeLeaves.length && page > 1) {
      setPage(page - 1);
    }
  }, [employeeLeaves.length, page, pageSize]);

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

      {/* Leave Table */}
      <LeaveTable leaves={paginatedLeaves} cancelLeave={cancelLeave} />

      {/* Pagination */}
      {employeeLeaves.length > pageSize && (
        <div className="flex justify-end mt-2">
          <Pagination
            page={page}
            pageSize={pageSize}
            total={employeeLeaves.length} // Pass the full total
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
