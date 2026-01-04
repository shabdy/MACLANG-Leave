import { create } from "zustand";
import { nanoid } from "nanoid";

const initialBalance = {
  "Vacation Leave": 10,
  "Sick Leave": 7,
  "Wellness Leave": 3,
};

export const useLeaveStore = create((set, get) => ({
  leaves: [],
  leaveBalance: initialBalance,

  // Employee submits leave
  requestLeave: (leave) =>
    set((state) => ({
      leaves: [
        {
          id: nanoid(),
          ...leave,
          status: "Pending",
        },
        ...state.leaves,
      ],
    })),

  // Admin approves / rejects
  updateStatus: (id, status) => {
    const { leaves, leaveBalance } = get();
    const targetLeave = leaves.find((l) => l.id === id);
    if (!targetLeave) return;

    if (status === "Approved") {
      const start = new Date(targetLeave.startDate);
      const end = new Date(targetLeave.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

      if (leaveBalance[targetLeave.type] < days) {
        alert("Not enough leave balance");
        return;
      }

      set({
        leaveBalance: {
          ...leaveBalance,
          [targetLeave.type]: leaveBalance[targetLeave.type] - days,
        },
      });
    }

    set({
      leaves: leaves.map((l) =>
        l.id === id ? { ...l, status } : l
      ),
    });
  },

  // Cancel leave
  cancelLeave: (id) => {
    set((state) => ({
      leaves: state.leaves.filter((l) => l.id !== id),
    }));
  },
}));
