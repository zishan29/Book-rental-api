import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
config({ path: '.env' });
import * as schema from '../schemas';

const client = postgres(process.env.DB_URL!);
export const db = drizzle(client, { schema, logger: true });
