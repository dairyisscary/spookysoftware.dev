import type { Plugin } from "vite";

export default function resumePdf(): Plugin {
  const virtualId = "virtual:pdf-resume";
  const resolvedId = "\0" + virtualId;

  return {
    name: "sps-resume-pdf",
    resolveId(source) {
      return source === virtualId ? resolvedId : null;
    },
    load(id) {
      if (id !== resolvedId) {
        return null;
      }

      const pdfFilePath = process.env.RESUME_PDF_FILE;
      const pdfUrlSetup = pdfFilePath
        ? `import pdfUrl from "${pdfFilePath}";`
        : "const pdfUrl = '';";

      return `${pdfUrlSetup}export default pdfUrl;`;
    },
  };
}
