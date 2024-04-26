const Sequelize = require('sequelize');
const db = require('../config/database');


const Employee = db.define('employee', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['active', 'inactive']]
    }
  },
  role: {
    type: Sequelize.STRING
  },
  team: {
    type: Sequelize.STRING
  },
  hireDate: {
    type: Sequelize.DATE
  }
},{
  tableName: 'employee' 
});


Employee.sync().then(() => {
  console.log('Employee table created');
});

module.exports = Employee ;