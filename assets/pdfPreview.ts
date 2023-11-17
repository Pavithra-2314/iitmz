const pdfPreview =
  "data:image/png;base64,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";

  export default pdfPreview;