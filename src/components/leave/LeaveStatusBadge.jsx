export default function LeaveStatusBadge({ status }) {
  const colors = {
    Pending: "text-orange-800 bg-orange-100 px-2 py-1 rounded-full",
    Approved: "text-green-800 bg-green-100 px-2 py-1 rounded-full",
    Rejected: "text-red-800 bg-red-100 px-2 py-1 rounded-full",
  };
  return <span className={colors[status] || "text-gray-800 bg-gray-100"}>{status}</span>;
}
