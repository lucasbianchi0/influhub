import pg from 'pg'
import { config } from 'dotenv';

config(); 
const { Pool } = pg; 
const pool = new Pool({
    host: process.env.HOST_DATABASE,
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    database: process.env.DATABASE_NAME,
    port: process.env.PORT_DATABASE
}) 

export default pool