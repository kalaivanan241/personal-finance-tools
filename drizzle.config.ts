// import type { Config } from "drizzle-kit";
// export default {
//   schema: "./src/schema.ts",
//   out: "./drizzle",
//   driver: "d1", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
//   dbCredentials: {
//     wranglerConfigPath: "DB",
//     dbName: "prod-d1-tutorial",
//   },
// } satisfies Config;

// drizzle.config.ts
import type { Config } from "drizzle-kit";

const {
  LOCAL_DB_PATH,
  WRANGLER_CONFIG,
  DB_NAME = "personal-fin",
  D1_HTTP_ACCOUNT_ID,
  D1_HTTP_DATABASE_ID,
  D1_HTTP_TOKEN,
} = process.env;

// Use better-sqlite driver for local development
export default LOCAL_DB_PATH
  ? ({
      schema: "./src/schema.ts",
      out: "./drizzle",
      dialect: "sqlite",
      dbCredentials: {
        url: LOCAL_DB_PATH,
      },
    } satisfies Config)
  : ({
      schema: "./src/schema.ts",
      out: "./drizzle",
      dialect: "sqlite",
      driver: "d1-http",
      dbCredentials: {
        accountId: D1_HTTP_ACCOUNT_ID ?? "",
        databaseId: D1_HTTP_DATABASE_ID ?? "",
        token: D1_HTTP_TOKEN ?? "",
      },
    } satisfies Config);
