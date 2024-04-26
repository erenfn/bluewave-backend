const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const DB_NAME = process.env.DB_NAME || 'bluewave';
const DB_USER = process.env.DB_USER || 'db_user';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// async function initializeDatabase() {
//   try {
//     
//     await sequelize.authenticate();
//     console.log('Database connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//     throw error;
//   }

//   try {
//    
//     await sequelize.sync();
//     console.log('All models were synchronized successfully.');
//   } catch (error) {
//     console.error('Error synchronizing models:', error);
//     throw error;
//   }
// }

// 
// initializeDatabase()
//   .then(() => {
//     console.log('Database initialized successfully.');
//   })
//   .catch(err => {
//     console.error('Error initializing database:', err);
//   });

module.exports = sequelize;
