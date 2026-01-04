import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LeaveRequestPage from "./pages/employee/LeaveRequestPage";
import LeaveApprovalPage from "./pages/admin/LeaveApprovalPage";


export default function App() {
  return (
    <Router>
      {/* Navigation */}
      <div className="p-4 space-x-4 bg-gray-100">
        <Link to="/leave/request" className="text-blue-600 font-medium">
          Request Leave
        </Link>
        <Link to="/leave/approval" className="text-blue-600 font-medium">
          Approve Leaves
        </Link>

      </div>

      <Routes>
        <Route path="leave/request" element={<LeaveRequestPage />} />
        <Route path="/leave/approval" element={<LeaveApprovalPage />} />

      </Routes>
    </Router>
  );
}
