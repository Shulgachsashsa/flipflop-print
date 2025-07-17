import { defineConfig } from "drizzle-kit";
import { Pool } from "pg";

// Проверка переменной окружения
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

export default defineConfig({
  schema: "./shared/schema.ts",
  out: "./migrations",
  dialect: "postgresql", // Явно указываем диалект
  
  // Стандартная конфигурация для PostgreSQL
  dbCredentials: {
    connectionString: process.env.DATABASE_URL + "?sslmode=require",
  },
  
  // Указываем стандартный драйвер для PostgreSQL
  driver: "pg", // Важно: используйте "pg", а не "custom"
  
  // Для SSL (только если нужно отключить проверку сертификата)
  ssl: process.env.NODE_ENV === "production" 
    ? { rejectUnauthorized: false }
    : false
});
