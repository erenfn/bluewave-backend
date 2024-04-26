// const express = require('express');
// const { Pool, Client } = require('pg');
// const dotenv = require('dotenv');
// dotenv.config();

// const app = express();
// const port = 3000;

// const DB_NAME = process.env.DB_NAME || 'bluewave';
// const DB_USER = process.env.DB_USER || 'db_user';
// const DB_HOST = process.env.DB_HOST || 'localhost';
// const DB_PASSWORD = process.env.DB_PASSWORD || 'password';

// // Middleware to parse JSON request bodies
// app.use(express.json());

// // PostgreSQL configuration
// const pool = new Pool({
//     host: DB_HOST,
//     user: DB_USER,
//     password: DB_PASSWORD,
//     database: DB_NAME,
//     port: 5432,
// });

// // Create database and tables
// async function createDatabaseAndTables() {
//     try {
//         const client = new Client({
//             host: DB_HOST,
//             user: DB_USER,
//             password: DB_PASSWORD,
//             port: 5432,
//         });
        
//         await client.connect();
        
//         const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_NAME}'`);
        
//         if (res.rowCount === 0) {
//             console.log(`${DB_NAME} database not found, creating it.`);
//             await client.query(`CREATE DATABASE "${DB_NAME}";`);
//             console.log(`created database ${DB_NAME}.`);
//         } else {
//             console.log(`${DB_NAME} database already exists.`);
//         }

//         // Connect to the newly created database
//         const dbPool = new Pool({
//             host: DB_HOST,
//             user: DB_USER,
//             password: DB_PASSWORD,
//             database: DB_NAME,
//             port: 5432,
//         });

//         // Create tables
//         await dbPool.query(`
//             CREATE TABLE IF NOT EXISTS users (
//                 id SERIAL PRIMARY KEY,
//                 name VARCHAR(255) NOT NULL,
//                 password VARCHAR(255) NOT NULL
//             )
//         `);

//         await dbPool.query(`
//             CREATE TABLE IF NOT EXISTS employers (
//                 id SERIAL PRIMARY KEY,
//                 name VARCHAR(255) NOT NULL,
//                 status VARCHAR(255),
//                 role VARCHAR(255),
//                 team VARCHAR(255),
//                 hire_date DATE
//             )
//         `);

//         console.log('Database and tables created successfully');
//     } catch (err) {
//         console.error('Error creating database and tables', err);
//     }
// }

// // Routes for adding entries to the database
// app.post('/users', async (req, res) => {
//     const { name, password } = req.body;
//     try {
//         const result = await pool.query('INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *', [name, password]);
//         res.json(result.rows[0]);
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// });

// app.post('/employers', async (req, res) => {
//     const { name, status, role, team, hire_rate } = req.body;
//     try {
//         const result = await pool.query('INSERT INTO employers (name, status, role, team, hire_rate) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, status, role, team, hire_rate]);
//         res.json(result.rows[0]);
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// });

// // Routes for getting entries from the database
// app.get('/users', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM users');
//         res.json(result.rows);
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// });

// app.get('/employers', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM employers');
//         res.json(result.rows);
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// });

// // Start server and create database and tables
// app.listen(port, async () => {
//     console.log(`Server is running on http://localhost:${port}`);
//     await createDatabaseAndTables();
// });
