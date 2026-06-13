import { pgTable, uuid, varchar, timestamp, boolean, text } from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const formsTable = pgTable("forms", {
  id: uuid("id").primaryKey().defaultRandom(),

  title: varchar("title", { length: 45 }).notNull(),
  description: varchar("discription", { length: 300 }),

  status: varchar("status", { length: 20 }).default("draft").notNull(),

  createdBy: uuid("created_by").references(() => usersTable.id),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
