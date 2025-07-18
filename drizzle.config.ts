import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default {
  schema: "./shared/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL + "?sslmode=require"
  },
  dialect: "postgresql",
  verbose: true,
  strict: true
} satisfies Config;
