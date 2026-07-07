import { db, eq, desc } from "@repo/database";
import {
  getFormSubmissionsInput,
  GetFormSubmissionsInputType,
  submitFormInput,
  submitFormInputType,
} from "./model";
import { formSubmissionTable } from "@repo/database/models/form-submission";
import { formFieldsTable } from "@repo/database/models/form-field";
import { formsTable } from "@repo/database/models/form";

class FormSubmissionService {
  public async submitForm(payload: submitFormInputType) {
    const { formId, values } = await submitFormInput.parseAsync(payload);
    console.log("vlaue of the from submisson: ", values);

    const result = await db
      .insert(formSubmissionTable)
      .values({ formId, values })
      .returning({ id: formSubmissionTable.id });

    if (!result || result.length === 0 || !result[0]?.id)
      throw new Error("Something went wrong while saving your submission");

    return { id: result[0].id };
  }

  public async getFormSubmissions(payload: GetFormSubmissionsInputType) {
    const { formId } = await getFormSubmissionsInput.parseAsync(payload);
    console.log("Submission Form Id:", formId);

    return await db
      .select({
        id: formSubmissionTable.id,
        values: formSubmissionTable.values,
        createdAt: formSubmissionTable.createdAt,
      })
      .from(formSubmissionTable)
      .where(eq(formSubmissionTable.formId, formId))
      .orderBy(desc(formSubmissionTable.createdAt));
  }

  public async listAllSubmissions() {
    const submissions = await db
      .select({
        id: formSubmissionTable.id,
        formId: formSubmissionTable.formId,
        values: formSubmissionTable.values,
        createdAt: formSubmissionTable.createdAt,
      })
      .from(formSubmissionTable)
      .orderBy(desc(formSubmissionTable.createdAt));

    const fields = await db
      .select({ id: formFieldsTable.id, label: formFieldsTable.label })
      .from(formFieldsTable);
    const forms = await db.select({ id: formsTable.id, title: formsTable.title }).from(formsTable);

    const fieldMap = new Map(fields.map((f) => [f.id, f.label]));
    const formMap = new Map(forms.map((f) => [f.id, f.title]));

    const mappedResult = submissions.map((sub) => {
      const rawValues = sub.values as { formFieldId: string; value: string }[] | null;

      const mappedValues = rawValues
        ? rawValues.map((v) => ({
            formFieldId: v.formFieldId,
            label: fieldMap.get(v.formFieldId) || "Field",
            value: v.value,
          }))
        : null;

      return {
        id: sub.id,
        formId: sub.formId,
        formTitle: sub.formId ? formMap.get(sub.formId) || "Untitled Form" : "Untitled Form",
        createdAt: sub.createdAt,
        values: mappedValues,
      };
    });

    return mappedResult as unknown as {
      id: string;
      formId: string | null;
      formTitle: string | null;
      createdAt: Date | null;
      values: { formFieldId: string; label: string | null; value: string }[] | null;
    }[];
  }
}
export default FormSubmissionService;
