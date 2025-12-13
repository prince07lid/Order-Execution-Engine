import { Pool } from 'pg';

export const pgPool = new Pool({
  // Use the single connectionString format from the environment variable
  connectionString: process.env.DATABASE_URL,
  
  // Add the SSL option, often required for cloud database connections
  ssl: { rejectUnauthorized: false },

  // You can remove host, port, user, password, and database when using connectionString
});
// import { Pool } from 'pg';

// export const pgPool = new Pool({
//   host: 'localhost',
//   port: 5432,
//   user: 'postgres',
//   password: 'postgres',
//   database: 'orders_db',
// });
// src/config/postgres.ts

// import { Pool } from 'pg';

// export const pgPool = new Pool({
//   host: 'localhost',
//   port: 5432,
//   user: 'postgres',
//   // **FIX: Replace 'YOUR_ACTUAL_PASSWORD' with the correct password**
//   password: 'iforgotpassword', 
//   // **VERIFY: Ensure 'orders_db' exists on your PostgreSQL server**
//   database: 'orders_db', 
// });