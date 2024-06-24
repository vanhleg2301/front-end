import React from "react";
import { useParams } from "react-router-dom";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import "@react-pdf-viewer/core/lib/styles/index.css"; // Import styles

const TEST_PDF_URL = "https://example.com/sample.pdf"; // Replace with a known valid PDF URL
const TEST_DOCX_URL = "https://example.com/sample.docx"; // Replace with a known valid DOCX URL

const getFileType = (url) => {
  const extension = url.split('.').pop().toLowerCase();
  if (['pdf'].includes(extension)) return 'pdf';
  if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'].includes(extension)) return 'image';
  if (['doc', 'docx'].includes(extension)) return 'docx';
  return 'unknown';
};

export default function CvDetail() {
  const { fileUrl } = useParams();
  const decodedFileUrl = decodeURIComponent(fileUrl);

  const fileType = getFileType(decodedFileUrl);

  return (
    <div style={{ height: "100vh" }}>
      {fileType === 'pdf' && (
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}>
          <Viewer fileUrl={decodedFileUrl || TEST_PDF_URL} />
        </Worker>
      )}
      {fileType === 'image' && (
        <img src={decodedFileUrl} alt="Document" style={{ width: '100%', height: 'auto' }} />
      )}
      {fileType === 'docx' && (
        <DocViewer
          documents={[{ uri: decodedFileUrl || TEST_DOCX_URL }]}
          pluginRenderers={DocViewerRenderers}
          style={{ width: '100%', height: '100%' }}
        />
      )}
      {fileType === 'unknown' && (
        <p>Unsupported file type.</p>
      )}
    </div>
  );
}
