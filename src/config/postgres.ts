
// import { Pool } from 'pg';

// export const pgPool = new Pool({
//   host: 'localhost',
//   port: 5432,
//   user: 'postgres',
//   password: 'postgres',
//   database: 'orders_db',
// });
// src/config/postgres.ts

import { Pool } from 'pg';

export const pgPool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  // **FIX: Replace 'YOUR_ACTUAL_PASSWORD' with the correct password**
  password: 'princelid', 
  // **VERIFY: Ensure 'orders_db' exists on your PostgreSQL server**
  database: 'orders_db', 
});