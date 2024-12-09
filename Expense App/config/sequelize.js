const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('expense_app', 'root', 'jeet@mysql98', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;