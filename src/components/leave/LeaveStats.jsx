import React from 'react';
import { useLeaveStore } from '../hooks/useLeaveStore';

export default function LeaveStats() {
  const { availableLeaves, usedLeaves, overdueLeaves } = useLeaveStore();

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow text-center">
        <h3 className="text-gray-500">Available Leaves</h3>
        <p className="text-2xl font-bold">{availableLeaves}</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <h3 className="text-gray-500">Used Leaves</h3>
        <p className="text-2xl font-bold">{usedLeaves}</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <h3 className="text-gray-500">Overdue Leaves</h3>
        <p className="text-2xl font-bold">{overdueLeaves}</p>
      </div>
    </div>
  );
}
