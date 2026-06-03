import { z } from "zod";

export const createFormInput = z.object({
  title: z.string().max(55).describe("Title of the form"),
  description: z.string().max(300).optional().describe("Description of the form"),
  createdBy: z.string().uuid().describe("UUID of the user created by form"),
});

export type CreateFormInputType = z.infer<typeof createFormInput>;

export const listFromsByUserIdInput = z.object({
  userId: z.string().describe("UUID of the user"),
});

export type ListFromsByUserIdInput = z.infer<typeof listFromsByUserIdInput>;

export const listFormsOu
