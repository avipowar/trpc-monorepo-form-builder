import { z } from "zod";

export const createUserWitEmailAndPasswordInput = z.object({
  fullName: z.string().describe("Full name of the user"),
  email: z.email().describe("email address of the user"),
  password: z.string().describe("password of the user"),
});

export type CreateUserWitEmailAndPasswordInputType = z.infer<
  typeof createUserWitEmailAndPasswordInput
>;
