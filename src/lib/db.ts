import * as schema from "@/schema";
import { drizzle } from "drizzle-orm/d1";

import { getRequestContext } from "@cloudflare/next-on-pages";

export function getDBInstance() {
  const DB =
    process.env.NODE_ENV === "development"
      ? getRequestContext().env.MY_PERSONAL_FIN_DB
      : (process.env as unknown as CloudflareEnv).MY_PERSONAL_FIN_DB;
  return drizzle(DB, { schema });
}

export const db = getDBInstance();
