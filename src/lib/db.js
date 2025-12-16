import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '4000'),
  
  ssl: process.env.DB_HOST === 'localhost' ? undefined : {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
  },
  
  waitForConnections: true,
  connectionLimit: 1,
  maxIdle: 0,      
  idleTimeout: 60000, 
  queueLimit: 0,
  enableKeepAlive: true,
});

export default db;