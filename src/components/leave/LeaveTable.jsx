import { useState } from "react";
import LeaveStatusBadge from "./LeaveStatusBadge";
import LeaveDetailsDialog from "../common/LeaveDetailsDialog";
import AlertModal from "@/components/common/AlertModal";
import TablePagination from "@/components/common/Pagination";
import { Minus } from "lucide-react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

export default function LeaveTable({
  isAdmin = false,
  leaves = [],
  page = 1,
  pageSize = 10,
  total = 0,
  onPageChange,
  updateStatus,
  cancelLeave,
}) {
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [open, setOpen] = useState(false);
  const [cancelLeaveId, setCancelLeaveId] = useState(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const openDetails = (leave) => {
    if (!isAdmin) return;
    setSelectedLeave(leave);
    setOpen(true);
  };

  const handleCancelRequest = (leaveId) => {
    setCancelLeaveId(leaveId);
    setCancelModalOpen(true);
  };

  const confirmCancel = () => {
    if (cancelLeaveId && cancelLeave) cancelLeave(cancelLeaveId);
    setCancelLeaveId(null);
    setCancelModalOpen(false);
  };

  return (
    <div className="rounded-2xl border bg-background p-4">
      <Table className="border border-gray-200 rounded-lg">
        <TableHeader>
          <TableRow className="bg-gray-100 border-b border-gray-200">
            <TableHead className="border-r border-gray-200">Employee</TableHead>
            <TableHead className="border-r border-gray-200">Type</TableHead>
            <TableHead className="border-r border-gray-200">Dates</TableHead>
            <TableHead className="border-r border-gray-200">Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {leaves.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-32 text-center text-muted-foreground border-t border-gray-200"
              >
                No leave requests found
              </TableCell>
            </TableRow>
          ) : (
            leaves.map((leave) => (
              <TableRow
                key={leave.id}
                className="hover:bg-muted/20 border-b border-gray-200"
              >
                <TableCell className="py-2 px-2 font-medium border-r border-gray-200">
                  {leave.employee}
                </TableCell>
                <TableCell className="py-2 px-2 text-muted-foreground border-r border-gray-200">
                  {leave.type}
                </TableCell>
                <TableCell className="py-2 px-2 text-muted-foreground border-r border-gray-200">
                  {leave.startDate} – {leave.endDate}
                </TableCell>
                <TableCell className="py-2 px-2 border-r border-gray-200">
                  <LeaveStatusBadge status={leave.status} />
                </TableCell>
                <TableCell className="py-2 px-2 text-right">
                  {isAdmin ? (
                    <Button size="sm" onClick={() => openDetails(leave)}>
                      Review
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={leave.status !== "Pending"}
                      className="rounded-full p-2"
                      onClick={() => handleCancelRequest(leave.id)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination with padding top */}
      <div className="pt-4 flex justify-end">
        <TablePagination
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={onPageChange}
        />
      </div>

      {/* Modals */}
      {selectedLeave && (
        <LeaveDetailsDialog
          open={open}
          onOpenChange={setOpen}
          leave={selectedLeave} // Employee ID will be visible here
          isAdmin={isAdmin}
          updateStatus={updateStatus}
        />
      )}

      <AlertModal
        open={cancelModalOpen}
        onOpenChange={setCancelModalOpen}
        title="Cancel Leave Request"
        description="Are you sure you want to cancel this leave request? This action cannot be undone."
        confirmText="Yes, Cancel"
        cancelText="No"
        onConfirm={confirmCancel}
      />
    </div>
  );
}


