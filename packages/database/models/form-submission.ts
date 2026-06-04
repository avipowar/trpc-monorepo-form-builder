import { pgTable, uuid, json, timestamp } from "drizzle-orm/pg-core";
import { formsTable } from "./form";

export interface FormSubmissionVlaue {
  formFieldId: string;
  value: string;
}

export type FomrSubmissionValueRow = FormSubmissionVlaue[];

export const formSubmissionTable = pgTable("form_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),

  formId: uuid("form_id").references(() => formsTable.id),

  values: json("values").$type<FomrSubmissionValueRow>(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
