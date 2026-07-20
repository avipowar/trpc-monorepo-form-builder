import { db, eq, asc } from "@repo/database";
import {
  createFormInput,
  CreateFormInputType,
  GetFormByIdInputType,
  getFormByIdInput,
  listFromsByUserIdInput,
  ListFromsByUserIdInput,
  DeleteFormInputType,
  deleteFormInput,
  publishFormInput,
  PublishFormInputType,
} from "./model";
import { formsTable } from "@repo/database/models/form";
import { formFieldsTable } from "@repo/database/models/form-field";

class FormService {
  public async createForm(payload: CreateFormInputType) {
    const { createdBy, title, description } = await createFormInput.parseAsync(payload);

    const result = await db.insert(formsTable).values({ title, description, createdBy }).returning({
      id: formsTable.id,
    });

    if (!result || result.length === 0 || !result[0]?.id)
      throw new Error(`something went wrong while creating the form`);

    return { id: result[0]?.id };
  }

  public async deleteForm(payload: DeleteFormInputType) {
    const { id } = await deleteFormInput.parseAsync(payload);

    await db.delete(formFieldsTable).where(eq(formFieldsTable.formId, id));

    const result = await db.delete(formsTable).where(eq(formsTable.id, id)).returning({
      id: formsTable.id,
    });

    if (!result || result.length === 0 || !result[0]?.id)
      throw new Error(`something went wrong while deleting the form`);

    return { id: result[0]?.id };
  }
  public async publishForm(payload: PublishFormInputType) {
    const { id } = await publishFormInput.parseAsync(payload);

    const result = await db
      .update(formsTable)
      .set({
        status: "PUBLISHED",
      })
      .where(eq(formsTable.id, id))
      .returning({
        id: formsTable.id,
      });

    if (!result || result.length === 0 || !result[0]?.id)
      throw new Error(`something went wrong while publishing the form`);

    return { id: result[0]?.id };
  }
  public async listFormsByUserId(payload: ListFromsByUserIdInput) {
    const { userId } = await listFromsByUserIdInput.parseAsync(payload);

    const forms = await db
      .select({
        id: formsTable.id,
        title: formsTable.title,
        description: formsTable.description,
        status: formsTable.status,
        createdAt: formsTable.createdAt,
        updatedAt: formsTable.updatedAt,
      })
      .from(formsTable)
      .where(eq(formsTable.createdBy, userId));

    return forms;
  }

  public async getFormById(payload: GetFormByIdInputType) {
    const { formId } = await getFormByIdInput.parseAsync(payload);

    const rows = await db
      .select({
        id: formsTable.id,
        title: formsTable.title,
        description: formsTable.description,
        createdAt: formsTable.createdAt,
        updatedAt: formsTable.updatedAt,
        field: {
          id: formFieldsTable.id,
          label: formFieldsTable.label,
          labelKey: formFieldsTable.labelKey,
          type: formFieldsTable.type,
          description: formFieldsTable.description,
          placeholder: formFieldsTable.placeholder,
          isRequired: formFieldsTable.isRequired,
          index: formFieldsTable.index,
        },
      })
      .from(formsTable)
      .leftJoin(formFieldsTable, eq(formFieldsTable.formId, formsTable.id))
      .where(eq(formsTable.id, formId))
      .orderBy(asc(formFieldsTable.index));

    if (rows.length === 0) return null;

    const { id, title, description, createdAt, updatedAt } = rows[0]!;

    const fields = rows
      .filter((r) => r.field?.id != null)
      .map((r) => r.field as NonNullable<typeof r.field>);

    console.log(
      "hii i am here",
      JSON.stringify({ id, title, description, createdAt, updatedAt, fields }, null, 2),
    );

    return { id, title, description, createdAt, updatedAt, fields };
  }
}

export default FormService;
