import { text } from "node:stream/consumers";
import { z } from "zod/v4";

export const creatTipSchema = z.strictObject({
  title: z.string().min(1).max(40),
  text: z.string().min(5).max(300),
  minStars: z.number().min(0).int().optional(),
  moduleId: z.string().optional(),
  active: z.boolean().optional()
});
