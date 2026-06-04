import { db } from "@repo/database";
import { submitFormInput, submitFormInputType } from "./model";
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
}
export default FormSubmissionService;
