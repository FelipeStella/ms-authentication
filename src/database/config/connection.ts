import 'dotenv/config';
import { Pool } from 'pg';

const connectionString = process.env.CONNECTION_STRING_PG

const db = new Pool({ connectionString });

export default db;