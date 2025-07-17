import { defineConfig } from "drizzle-kit";
import { Pool } from "pg";

// Создаем кастомный Pool с SSL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL + "?sslmode=require",
  ssl: { rejectUnauthorized: false }
});

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL + "?sslmode=require",
    ssl: true  // Явно включаем SSL
  },
  // Переопределяем драйвер для использования кастомного Pool
  driver: "custom",
  custom: {
    connection: async () => await pool.connect()  // Используем Pool с SSL
  }
});
