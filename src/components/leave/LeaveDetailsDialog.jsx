import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, X } from "lucide-react";
import PDFPreview from "../PDFReview"; // PDFPreview component pointing to CDN worker

export default function LeaveDetailsDialog({
  open,
  onOpenChange,
  leave,
  isAdmin,
  updateStatus,
  onSeeHistory
}) {
  const [remarks, setRemarks] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const documentFile = leave.document;

  const handleApprove = () => {
    updateStatus(leave.id, "Approved", remarks);
    onOpenChange(false);
    setPreviewMode(false);
  };

  const handleReject = () => {
    updateStatus(leave.id, "Rejected", remarks);
    onOpenChange(false);
    setPreviewMode(false);
  };

  const viewDocument = () => {
    if (documentFile) setPreviewMode(true);
  };

  const downloadDocument = () => {
    if (!documentFile) return;
    let url;
    if (documentFile instanceof File) url = URL.createObjectURL(documentFile);
    else url = documentFile.url;

    const link = document.createElement("a");
    link.href = url;
    link.download = documentFile?.name || "document";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (documentFile instanceof File) setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // Info item component
  const Info = ({ label, value }) => (
    <div className="space-y-1">
      <span className="text-muted-foreground">{label}</span>
      <p className="font-medium">{value}</p>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Leave Request Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-sm">
          {/* Employee Info */}
          <div className="grid grid-cols-2 gap-4">
            <Info label="Employee" value={leave.employee} />
            <Info label="Leave Type" value={leave.type} />
            <Info label="Start Date" value={leave.startDate} />
            <Info label="End Date" value={leave.endDate} />
          </div>

          <Separator />

          {/* Status & Reason */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge
                variant={
                  leave.status === "Approved"
                    ? "success"
                    : leave.status === "Rejected"
                    ? "destructive"
                    : "secondary"
                }
              >
                {leave.status}
              </Badge>
            </div>

            <div className="space-y-1">
              <span className="text-muted-foreground">Reason</span>
              <p className="rounded-md border bg-muted/40 p-3">{leave.reason || "No reason provided"}</p>
            </div>
          </div>

          {/* Document Section */}
          {documentFile ? (
            <div className="space-y-2">
              <span className="text-muted-foreground">Supporting Document</span>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{documentFile.name || "Document"}</p>
                    <p className="text-xs text-muted-foreground">{documentFile.type?.toUpperCase() || "FILE"}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={viewDocument}>
                    <Eye className="h-4 w-4 mr-1" />View
                  </Button>
                  <Button variant="ghost" size="sm" onClick={downloadDocument}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground italic">No document attached</p>
          )}

          {/* Admin Remarks */}
          {isAdmin && (
            <div className="space-y-2">
              <span className="text-muted-foreground">Remarks</span>
              <Textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add remarks for this request..."
              />
            </div>
          )}
        </div>

        {/* Footer */}
        {isAdmin && (
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={handleReject} className="text-destructive">
              Reject
            </Button>
            <Button onClick={handleApprove}>Approve</Button>
          </DialogFooter>
        )}

        {/* See Leave History */}
        <div
          className="mt-4 text-sm text-indigo-600 cursor-pointer hover:underline text-center"
          onClick={() => onSeeHistory && onSeeHistory(leave.employee)}
        >
          See Leave History
        </div>

        {/* Preview Modal */}
        {previewMode && documentFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative bg-white rounded-lg w-full max-w-4xl h-[80vh]">
              <button
                className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
                onClick={() => setPreviewMode(false)}
              >
                <X className="w-5 h-5" />
              </button>
              {documentFile.type === "application/pdf" || documentFile.name?.endsWith(".pdf") ? (
                <PDFPreview file={documentFile} height={600} />
              ) : (
                <iframe
                  src={documentFile instanceof File ? URL.createObjectURL(documentFile) : documentFile.url}
                  className="w-full h-full"
                  frameBorder="0"
                />
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
