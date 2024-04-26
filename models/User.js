const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
  
},{
  tableName: 'user' 
});

User.sync().then(() => {
    console.log('User table created');
  });

module.exports = User ;