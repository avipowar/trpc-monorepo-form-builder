import {
  createUserWitEmailAndPasswordInput,
  GenerateUserTokenPayloadType,
  generateUserTokenPayload,
  type CreateUserWitEmailAndPasswordInputType,
} from "./model";
import { createHmac, randomBytes } from "node:crypto";

import * as JWT from "jsonwebtoken";

import { db, eq } from "@repo/database";
import { usersTable } from "@repo/database/models/user";
import { th } from "zod/v4/locales";
import { pathToFileURL } from "node:url";
import { env } from "../env";

class UserService {
  private async getUserByEmail(email: string) {
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (!result || result.length === 0) return null;
    return result[0];
  }

  private async genrateUserToken(payload: GenerateUserTokenPayloadType) {
    const { id } = await generateUserTokenPayload.parseAsync(payload);

    const token = JWT.sign({ id }, env.JWT_SECRET);
    return { token };
  }

  public async createUserWitEmailAndPassword(payload: CreateUserWitEmailAndPasswordInputType) {
    const { fullName, email, password } =
      await createUserWitEmailAndPasswordInput.parseAsync(payload);

    // check if user already exist or not
    const existingUserWithEmail = await this.getUserByEmail(email);
    if (existingUserWithEmail) throw new Error(`user with email ${email} already exists`);

    const salt = randomBytes(16).toString("hex");
    const hash = createHmac("sha256", salt).update(password).digest("hex");

    const userInsertResult = await db
      .insert(usersTable)
      .values({
        email,
        fullName,
        password: hash,
        salt,
      })
      .returning({ id: usersTable.id });

    if (!userInsertResult || userInsertResult.length === 0 || !userInsertResult[0]?.id)
      throw new Error("something went wrong while creating the user");

    const userId = userInsertResult[0].id;

    const { token } = await this.genrateUserToken({ id: userId });

    return {
      id: userId,
    };
  }
}

export default UserService;
