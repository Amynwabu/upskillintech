import PDFDocument from "pdfkit";
import { Readable } from "stream";

export interface CertificateData {
  certificateId: string;
  studentName: string;
  courseName: string;
  instructorName?: string;
  completionDate: Date;
}

export async function generateCertificatePDF(data: CertificateData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
      });

      const chunks: Buffer[] = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // Page dimensions
      const pageWidth = doc.page.width;
      const pageHeight = doc.page.height;
      const centerX = pageWidth / 2;

      // Background gradient effect (using rectangles)
      doc.save();
      doc.rect(0, 0, pageWidth, pageHeight).fill("#f0fdf4"); // Light green background

      // Border with gradient colors
      doc.lineWidth(8);
      doc.strokeColor("#10b981"); // Primary green
      doc.rect(30, 30, pageWidth - 60, pageHeight - 60).stroke();

      doc.lineWidth(2);
      doc.strokeColor("#14b8a6"); // Teal accent
      doc.rect(40, 40, pageWidth - 80, pageHeight - 80).stroke();
      doc.restore();

      // Header - UpskillinTech
      doc.fontSize(32)
        .fillColor("#10b981")
        .font("Helvetica-Bold")
        .text("UpskillinTech", 0, 80, {
          align: "center",
          width: pageWidth,
        });

      doc.fontSize(14)
        .fillColor("#6b7280")
        .font("Helvetica")
        .text("Transform Skills. Power Growth. Live AI.", 0, 120, {
          align: "center",
          width: pageWidth,
        });

      // Certificate Title
      doc.fontSize(48)
        .fillColor("#047857")
        .font("Helvetica-Bold")
        .text("Certificate of Completion", 0, 180, {
          align: "center",
          width: pageWidth,
        });

      // Decorative line
      doc.moveTo(centerX - 150, 250)
        .lineTo(centerX + 150, 250)
        .lineWidth(2)
        .strokeColor("#14b8a6")
        .stroke();

      // "This is to certify that"
      doc.fontSize(16)
        .fillColor("#374151")
        .font("Helvetica")
        .text("This is to certify that", 0, 280, {
          align: "center",
          width: pageWidth,
        });

      // Student Name (prominent)
      doc.fontSize(36)
        .fillColor("#1f2937")
        .font("Helvetica-Bold")
        .text(data.studentName, 0, 320, {
          align: "center",
          width: pageWidth,
        });

      // Decorative underline for name
      doc.moveTo(centerX - 200, 365)
        .lineTo(centerX + 200, 365)
        .lineWidth(1)
        .strokeColor("#d1d5db")
        .stroke();

      // "has successfully completed"
      doc.fontSize(16)
        .fillColor("#374151")
        .font("Helvetica")
        .text("has successfully completed the course", 0, 385, {
          align: "center",
          width: pageWidth,
        });

      // Course Name
      doc.fontSize(24)
        .fillColor("#10b981")
        .font("Helvetica-Bold")
        .text(data.courseName, 0, 425, {
          align: "center",
          width: pageWidth,
        });

      // Completion Date
      const formattedDate = data.completionDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      doc.fontSize(14)
        .fillColor("#6b7280")
        .font("Helvetica")
        .text(`Completed on ${formattedDate}`, 0, 475, {
          align: "center",
          width: pageWidth,
        });

      // Footer section with signature
      const footerY = pageHeight - 150;

      // Instructor signature (if provided)
      if (data.instructorName) {
        doc.fontSize(12)
          .fillColor("#1f2937")
          .font("Helvetica-Bold")
          .text(data.instructorName, centerX - 150, footerY, {
            width: 150,
            align: "center",
          });

        doc.moveTo(centerX - 150, footerY - 10)
          .lineTo(centerX, footerY - 10)
          .lineWidth(1)
          .strokeColor("#374151")
          .stroke();

        doc.fontSize(10)
          .fillColor("#6b7280")
          .font("Helvetica")
          .text("Instructor", centerX - 150, footerY + 15, {
            width: 150,
            align: "center",
          });
      }

      // Certificate ID
      doc.fontSize(10)
        .fillColor("#9ca3af")
        .font("Helvetica")
        .text(`Certificate ID: ${data.certificateId}`, 0, pageHeight - 60, {
          align: "center",
          width: pageWidth,
        });

      // Verification text
      doc.fontSize(8)
        .fillColor("#d1d5db")
        .font("Helvetica")
        .text("Verify this certificate at upskillintech.com/verify", 0, pageHeight - 40, {
          align: "center",
          width: pageWidth,
        });

      // Decorative corner elements
      // Top left
      doc.circle(60, 60, 5).fill("#fbbf24"); // Yellow accent
      // Top right
      doc.circle(pageWidth - 60, 60, 5).fill("#14b8a6"); // Teal accent
      // Bottom left
      doc.circle(60, pageHeight - 60, 5).fill("#14b8a6"); // Teal accent
      // Bottom right
      doc.circle(pageWidth - 60, pageHeight - 60, 5).fill("#fbbf24"); // Yellow accent

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

export function generateCertificateId(userId: number, courseId: number): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CERT-${userId}-${courseId}-${random}-${timestamp}`;
}
