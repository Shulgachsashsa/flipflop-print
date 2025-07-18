import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '..shared/schema';

const connectionString = process.env.DATABASE_URL + "?sslmode=require";

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  },
  max: 5
});

export const db = drizzle(pool, { schema });

// Тест подключения при старте
pool.query('SELECT 1')
  .then(() => console.log('✅ Database connected'))
  .catch(err => console.error('❌ Database connection error:', err));
