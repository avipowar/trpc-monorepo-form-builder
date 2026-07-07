import { z } from "zod";

export const submitFormInput = z.object({
  formId: z.string().uuid().describe("UUID of the form being submitted"),
  values: z
    .array(
      z.object({
        formFieldId: z.string().uuid().describe("UUID of the form field"),
        value: z.string().describe("Answer value for this field"),
      }),
    )
    .min(1, "At least one field value is required"),
});

export type submitFormInputType = z.infer<typeof submitFormInput>;

export const getFormSubmissionsInput = z.object({
  formId: z.string().uuid().describe("UUID of the form"),
});

export type GetFormSubmissionsInputType = z.infer<typeof getFormSubmissionsInput>;

export const listAllSubmissionsOutput = z.array(
  z.object({
    id: z.string(),
    formId: z.string().uuid().nullable(),
    formTitle: z.string().nullable().optional(),
    createdAt: z.date().nullable(),
    values: z
      .array(
        z.object({
          formFieldId: z.string(),
          label: z.string().nullable().optional(),
          value: z.string(),
        }),
      )
      .nullable(),
  }),
);

export type ListAllSubmissionsOutputType = z.infer<typeof listAllSubmissionsOutput>;
