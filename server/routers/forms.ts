/**
 * Forms Router — handles all form submissions and sends email notifications
 * to info@upskillintech.com via the notifyOwner helper.
 */
import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";

export const formsRouter = router({
  /** Newsletter subscription */
  subscribe: publicProcedure
    .input(
      z.object({
        firstName: z.string().optional(),
        email: z.string().email("Please enter a valid email address"),
        role: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const name = input.firstName ? `${input.firstName}` : "New subscriber";
      const role = input.role ? `\nRole: ${input.role}` : "";

      await notifyOwner({
        title: `📧 New Newsletter Subscriber — ${input.email}`,
        content: `A new subscriber has joined the UpskillinTech newsletter.\n\nName: ${name}\nEmail: ${input.email}${role}\n\nPlease add them to the mailing list at info@upskillintech.com.`,
      });

      return { success: true };
    }),

  /** General contact form */
  contact: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "Please enter your name"),
        email: z.string().email("Please enter a valid email address"),
        inquiryType: z.string().optional(),
        subject: z.string().optional(),
        message: z.string().min(10, "Please enter a message (at least 10 characters)"),
        phone: z.string().optional(),
        organisation: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const lines = [
        `New contact form submission from the UpskillinTech website.`,
        ``,
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        input.phone ? `Phone: ${input.phone}` : null,
        input.organisation ? `Organisation: ${input.organisation}` : null,
        input.inquiryType ? `Inquiry Type: ${input.inquiryType}` : null,
        input.subject ? `Subject: ${input.subject}` : null,
        ``,
        `Message:`,
        input.message,
        ``,
        `Please reply to: ${input.email}`,
      ].filter(Boolean).join("\n");

      await notifyOwner({
        title: `📬 New Contact Inquiry — ${input.name} (${input.inquiryType || "General"})`,
        content: lines,
      });

      return { success: true };
    }),

  /** Lead magnet / free guide download */
  leadMagnet: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        email: z.string().email("Please enter a valid email address"),
        guide: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const guide = input.guide || "Free AI Productivity Guide";

      await notifyOwner({
        title: `📥 Free Guide Download — ${input.email}`,
        content: `Someone downloaded the "${guide}" from the UpskillinTech website.\n\nName: ${input.name || "Not provided"}\nEmail: ${input.email}\nGuide: ${guide}\n\nPlease send the guide to: ${input.email}`,
      });

      return { success: true };
    }),

  /** Enterprise consultation request */
  consultation: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "Please enter your name"),
        email: z.string().email("Please enter a valid email address"),
        organisation: z.string().min(2, "Please enter your organisation"),
        role: z.string().optional(),
        teamSize: z.string().optional(),
        challenge: z.string().optional(),
        phone: z.string().optional(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const lines = [
        `New enterprise consultation request from the UpskillinTech website.`,
        ``,
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        `Organisation: ${input.organisation}`,
        input.role ? `Role: ${input.role}` : null,
        input.teamSize ? `Team Size: ${input.teamSize}` : null,
        input.phone ? `Phone: ${input.phone}` : null,
        input.challenge ? `Main Challenge: ${input.challenge}` : null,
        input.message ? `\nAdditional Notes:\n${input.message}` : null,
        ``,
        `Please follow up with: ${input.email}`,
      ].filter(Boolean).join("\n");

      await notifyOwner({
        title: `🏢 Enterprise Consultation Request — ${input.name} at ${input.organisation}`,
        content: lines,
      });

      return { success: true };
    }),

  /** Program enrollment interest */
  programEnrollment: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "Please enter your name"),
        email: z.string().email("Please enter a valid email address"),
        program: z.string(),
        phone: z.string().optional(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await notifyOwner({
        title: `🎓 Program Enrollment Interest — ${input.name} → ${input.program}`,
        content: `New program enrollment interest from the UpskillinTech website.\n\nName: ${input.name}\nEmail: ${input.email}\nProgram: ${input.program}\n${input.phone ? `Phone: ${input.phone}\n` : ""}${input.message ? `\nMessage:\n${input.message}` : ""}\n\nPlease follow up with: ${input.email}`,
      });

      return { success: true };
    }),

  /** Community join request */
  communityJoin: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        email: z.string().email("Please enter a valid email address"),
        role: z.string().optional(),
        industry: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await notifyOwner({
        title: `🌍 New Community Join Request — ${input.email}`,
        content: `Someone wants to join the UpskillinTech community.\n\nName: ${input.name || "Not provided"}\nEmail: ${input.email}\n${input.role ? `Role: ${input.role}\n` : ""}${input.industry ? `Industry: ${input.industry}\n` : ""}\n\nPlease add them to the community at info@upskillintech.com.`,
      });

      return { success: true };
    }),
});
