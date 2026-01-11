import { create } from "zustand"
import { nanoid } from "nanoid"
import { leaveTypes } from "@/data/leaveTypes"

// Balance-based leaves only (from screenshot)
const initialBalance = {
  VL: 5,
  MFL: 5,
  SL: 7, // or unlimited?
  ML: 105,
  PL: 7,
  SPL: 3,
  SOPL: 7,
  SLD: 0, // unpaid, so balance 0 maybe
  VAWC: 10,
  RL: 180,
  SPLW: 5,
  SECL: 5,
  MLC: 0,
  TL: 0,
  AL: 0,
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
    const { leaves, leaveBalance } = get()
    const targetLeave = leaves.find((l) => l.id === id)
    if (!targetLeave) return

    const leaveType = leaveTypes.find(
      (lt) => lt.code === targetLeave.type
    )

    // Approve leave
    if (status === "Approved") {
      const days = targetLeave.duration

      // Deduct only if:
      // 1. Leave is paid
      // 2. Leave has a balance entry
      if (
        leaveType?.paid &&
        leaveBalance[targetLeave.type] !== undefined
      ) {
        if (leaveBalance[targetLeave.type] < days) {
          alert("Not enough leave balance")
          return
        }

        set({
          leaveBalance: {
            ...leaveBalance,
            [targetLeave.type]:
              leaveBalance[targetLeave.type] - days,
          },
        })
      }
    }

    // Update status
    set({
      leaves: leaves.map((l) =>
        l.id === id ? { ...l, status } : l
      ),
    })
  },

  // Cancel leave (only if pending)
  cancelLeave: (id) =>
    set((state) => ({
      leaves: state.leaves.filter((l) => l.id !== id),
    })),
}))
