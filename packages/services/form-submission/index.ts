import { db, eq, desc } from "@repo/database";
import {
  getFormSubmissionsInput,
  GetFormSubmissionsInputType,
  submitFormInput,
  submitFormInputType,
} from "./model";
import { formSubmissionTable } from "@repo/database/models/form-submission";

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
    const result = await db
      .select({
        id: formSubmissionTable.id,
        formId: formSubmissionTable.formId,
        values: formSubmissionTable.values,
        createdAt: formSubmissionTable.createdAt,
      })
      .from(formSubmissionTable)
      .orderBy(desc(formSubmissionTable.createdAt));

    return result as unknown as {
      id: string;
      formId: string | null;
      createdAt: Date | null;
      values: { formFieldId: string; value: string }[] | null;
    }[];
  }
}
export default FormSubmissionService;
