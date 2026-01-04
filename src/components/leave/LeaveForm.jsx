import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLeaveStore } from "@/hooks/useLeaveStore"
import { leaveTypes } from "@/data/leaveTypes"

export default function LeaveForm({ onSuccess }) {
  const { requestLeave } = useLeaveStore()

  const form = useForm({
    defaultValues: {
      type: "",
      startDate: "",
      endDate: "",
      reason: "",
      document: null,
    },
  })

  const type = form.watch("type")
  const startDate = form.watch("startDate")
  const endDate = form.watch("endDate")

  const calculateDuration = (start, end) => {
    if (!start || !end) return 0
    const s = new Date(start)
    const e = new Date(end)
    if (e < s) return 0
    return (e - s) / (1000 * 60 * 60 * 24) + 1
  }

  const duration = calculateDuration(startDate, endDate)

  const onSubmit = (data) => {
    if (duration <= 0) {
      alert("Invalid date range.")
      return
    }

    // Require document if sick leave
    if (type === "Sick Leave" && !data.document) {
      alert("Supporting document is required for Sick Leave.")
      return
    }

    requestLeave({
      ...data,
      duration,
      employee: "Ransh Dy",
      status: "Pending",
    })

    form.reset()
    if (onSuccess) onSuccess()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-xl p-4 space-y-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">Leave Request</h2>
          {duration > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              Duration: <span className="font-medium">{duration} {duration > 1 ? "days" : "day"}</span>
            </p>
          )}
        </div>

        {/* Leave Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Leave Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-10 rounded-md">
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    {leaveTypes.map((lt) => (
                      <SelectItem key={lt.code} value={lt.name}>
                        {lt.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} className="h-10 rounded-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} className="h-10 rounded-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Reason */}
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Reason (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter reason" {...field} className="h-20 rounded-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Upload Document */}
       <FormField
  control={form.control}
  name="document"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-sm">
        Supporting Document {type === "Sick Leave" && <span className="text-red-500">*</span>}
      </FormLabel>
      <FormControl>
        <Input
          type="file"
          className="h-10 rounded-md"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            field.onChange(file); // Set the file object properly
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


        <Button type="submit" className="w-full h-10 rounded-md">
          Submit Request
        </Button>
      </form>
    </Form>
  )
}
