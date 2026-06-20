import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import { ENV } from "../_core/env";

const MessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string(),
});

export const aiRouter = router({
  chat: publicProcedure
    .input(z.object({ messages: z.array(MessageSchema).min(1) }))
    .mutation(async ({ input }) => {
      if (!ENV.forgeApiKey) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "AI chat is not available right now. Please try again later.",
        });
      }

      const result = await invokeLLM({ messages: input.messages });
      const content = result.choices[0]?.message?.content;

      if (typeof content !== "string" || !content) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No response from AI.",
        });
      }

      return { reply: content };
    }),
});
