import 'dotenv/config';
import {drizzle} from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import {consola} from 'consola';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);
pool
  .connect()
  .then(() => consola.info('Database connected'))
  .catch(err => consola.error('Connection error', err))
  .finally(() => pool.end());
