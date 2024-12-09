const express = require('express');
const sequelize = require('./config/sequelize');
const Expense = require('./models/expense');
const expenseRoutes = require('./routes/expenseRoutes');
const path = require('path');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/expenses', expenseRoutes);

sequelize
    .sync()
    .then(() => {
        console.log('Connected to database');
        app.listen(3000, () => console.log('Server is running on port 3000'));
    })
    .catch(err => console.log('Database connection failed', err));