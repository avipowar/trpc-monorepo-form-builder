import db, { eq } from "@repo/database";
import {
  createFormInput,
  CreateFormInputType,
  listFromsByUserIdInput,
  ListFromsByUserIdInput,
} from "./model";
import { formsTable } from "@repo/database/models/form";
import { title } from "node:process";

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

  public async listFormsByUserId(payload: ListFromsByUserIdInput) {
    const { userId } = await listFromsByUserIdInput.parseAsync(payload);

    const forms = await db
      .select({
        id: formsTable.id,
        title: formsTable.title,
        description: formsTable.description,
        createdAt: formsTable.createdAt,
        updatedAt: formsTable.updatedAt,
      })
      .from(formsTable)
      .where(eq(formsTable.createdBy, userId));

    return forms;
  }
}

export default FormService;
