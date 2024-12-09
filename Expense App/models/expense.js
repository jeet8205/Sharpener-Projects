const  sequelize  = require('../config/sequelize');
const { DataTypes } = require('sequelize');


//console.log(sequelize);

const Expense = sequelize.define('expense_app', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Expense;