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
} = process.env;

// Use better-sqlite driver for local development
export default LOCAL_DB_PATH
  ? ({
      schema: "./src/schema.ts",
      out: "./migrations",
      driver: "better-sqlite",
      dbCredentials: {
        url: LOCAL_DB_PATH,
      },
    } satisfies Config)
  : ({
      schema: "./src/schema.ts",
      out: "./migrations",
      driver: "d1",
      dbCredentials: {
        wranglerConfigPath:
          new URL("wrangler.toml", import.meta.url).pathname +
          // This is a hack to inject additional cli flags to wrangler
          // since drizzle-kit doesn't support specifying environments
          WRANGLER_CONFIG
            ? ` ${WRANGLER_CONFIG}`
            : "",
        dbName: DB_NAME,
      },
    } satisfies Config);
