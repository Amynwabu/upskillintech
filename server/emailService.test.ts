import { describe, it, expect } from "vitest";
import { validateSendGridConfig } from "./emailService";

const hasSendGridCredentials =
  process.env.RUN_SENDGRID_INTEGRATION_TESTS === "true" &&
  Boolean(process.env.SENDGRID_API_KEY);

describe.skipIf(!hasSendGridCredentials)(
  "SendGrid Email Service integration",
  () => {
    it("should validate SendGrid API key configuration", async () => {
      const result = await validateSendGridConfig();

      expect(result.valid).toBe(true);
      if (!result.valid) {
        console.error("SendGrid validation error:", result.error);
      }
    }, 10000); // 10 second timeout for API call

    it("should have SendGrid API key configured", () => {
      expect(process.env.SENDGRID_API_KEY).toBeDefined();
      expect(process.env.SENDGRID_API_KEY).not.toBe("");
    });
  }
);
