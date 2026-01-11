import { useState } from "react";
import { useLeaveStore } from "@/hooks/useLeaveStore";
import { leaveTypes, leaveGeneralNote } from "@/data/leaveTypes";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LeaveForm from "@/components/leave/LeaveForm";

export default function LeaveBalance({ employeeName = "Ransh Dy" }) {
  const leaveBalance = useLeaveStore((s) => s.leaveBalance);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [defaultLeaveType, setDefaultLeaveType] = useState(null);

  const leaveTypeColors = {
    VL: "bg-green-400",
    SL: "bg-purple-400",
    MFL: "bg-blue-400",
    SPL: "bg-yellow-400",
    SOPL: "bg-pink-400",
    SECL: "bg-indigo-400",
    ML: "bg-pink-500",
    PL: "bg-teal-400",
    SLD: "bg-gray-400",
    VAWC: "bg-red-400",
    RL: "bg-cyan-400",
    SPLW: "bg-amber-400",
    MLC: "bg-gray-500",
    TL: "bg-gray-700",
    AL: "bg-green-600",
  };

  const handleApplyLeave = (code) => {
    setDefaultLeaveType(code); // pre-fill the LeaveForm
    setOpenForm(true);          // open the LeaveForm
    setSelectedLeave(null);     // close the card dialog
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">Leave Balance</h2>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {leaveTypes.map((leave) => {
          const remaining = leaveBalance[leave.code] ?? 0;

          return (
            <Dialog
              key={leave.code}
              open={selectedLeave?.code === leave.code}
              onOpenChange={(open) => !open && setSelectedLeave(null)}
            >
              <DialogTrigger asChild>
                <div
                  className="flex flex-col items-center justify-center p-5 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedLeave(leave)}
                >
                  <div
                    className={`h-12 w-12 flex items-center justify-center rounded-full font-semibold text-lg ${
                      leaveTypeColors[leave.code] || "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {leave.code}
                  </div>
                  <p className="text-sm text-gray-600 text-center truncate mt-3">{leave.name}</p>

                  <div className="w-full mt-3">
                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`${leaveTypeColors[leave.code] || "bg-gray-400"} h-3 rounded-full transition-all duration-300`}
                        style={{ width: `${Math.min((remaining / 15) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-gray-700 mt-3">{remaining} days</p>
                </div>
              </DialogTrigger>

              <DialogContent className="sm:max-w-lg">
                <h3 className="text-lg font-bold mb-2">
                  {selectedLeave?.name} ({selectedLeave?.code})
                </h3>
                <p className="text-gray-700 mb-2 font-medium">{selectedLeave?.description}</p>

                <ul className="list-disc list-inside text-gray-600 mb-4">
                  {selectedLeave?.instructions?.map((inst, idx) => (
                    <li key={idx}>{inst}</li>
                  ))}
                </ul>

                <p className="text-gray-500 mb-4 italic">{leaveGeneralNote}</p>

                <Button onClick={() => handleApplyLeave(selectedLeave?.code)}>
                  Apply Leave
                </Button>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>

      {/* LeaveForm dialog */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="sm:max-w-xl">
          <LeaveForm
            defaultLeaveType={defaultLeaveType} // pre-filled
            onSuccess={() => setOpenForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
