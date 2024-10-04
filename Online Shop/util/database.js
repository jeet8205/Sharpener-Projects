const Sequelize = require ('sequelize');

const sequelize = new Sequelize('node_course','root', 'jeet@mysql98', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize