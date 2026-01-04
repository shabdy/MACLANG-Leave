import { useState } from "react";
import LeaveRequest from "@/components/leave/LeaveRequest";
import LeaveBalance from "@/components/leave/LeaveBalance";
import { useLeaveStore } from "@/hooks/useLeaveStore";

export default function LeaveRequestPage({ isAdmin = false }) {
  const [activeTab, setActiveTab] = useState("leaveRequest"); // default tab

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 space-y-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          className={`flex-1 py-2 text-center font-medium transition-colors ${
            activeTab === "leaveRequest"
              ? "border-b-2 border-indigo-500 text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("leaveRequest")}
        >
          Leave Request
        </button>
        <button
          className={`flex-1 py-2 text-center font-medium transition-colors ${
            activeTab === "leaveBalance"
              ? "border-b-2 border-indigo-500 text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("leaveBalance")}
        >
          Leave Balance
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4 space-y-4">
        {activeTab === "leaveRequest" && <LeaveRequest />}
        {activeTab === "leaveBalance" && <LeaveBalance isAdmin={isAdmin} />}
      </div>
    </div>
  );
}
