import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.12.313/pdf.worker.min.js";

export default function PDFPreview({ file, height = 500 }) {
  const canvasRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let url;

    if (file instanceof File) {
      url = URL.createObjectURL(file);
    } else {
      url = file;
    }

    const renderPDF = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: canvas.getContext("2d"),
          viewport,
        };

        await page.render(renderContext).promise;
      } catch (err) {
        setError("Unable to render PDF");
      }
    };

    renderPDF();

    return () => {
      if (file instanceof File) URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div
      style={{
        height,
        overflow: "auto",
        border: "1px solid #ccc",
        borderRadius: 4,
        padding: 4,
      }}
    >
      {error ? <p>{error}</p> : <canvas ref={canvasRef} />}
    </div>
  );
}
