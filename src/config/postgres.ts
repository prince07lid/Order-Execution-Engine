import { Pool } from 'pg';

export const pgPool = new Pool({
   host: 'localhost',
   port: 5432,
   user: 'postgres',
   password: 'princelid', 
   database: 'orders_db', 
});