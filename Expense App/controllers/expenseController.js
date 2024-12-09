const Expense = require('../models/expense');


exports.getAllExpenses = async(req, res) => {
    try{
        const expenses = await Expense.findAll();
        res.status(200).json(expenses);
    }catch(err){
        console.log('Error fetching expenses', err);
        res.status(500).json({error: 'Error fetching expenses'});
    }
};

exports.addExpense = async(req, res) => {
    const { title, amount, description,category } = req.body;
    
    if (!title || !amount) {
        return res.status(400).json({ error: 'Title and amount are required' });
    }    

    try{
        const newExpense = await Expense.create({ title, amount, description, category});
        res.status(201).json(newExpense);
    }catch(err){
        console.log('Error adding expense', err);
        res.status(500).json({error: 'Error adding expense'});
    }
};

exports.updateExpense = async(req, res) => {
    const { id } = req.params;
    const { amount, description, category } = req.body;

    try{
        const expense = await Expense.findByPk(id);
        if(!expense){
            return res.status(404).json({error: 'Expense not found'});
        }
        expense.amount = amount;
        expense.description = description;
        expense.category = category;
        await expense.save();
        res.status(200).json(expense);
    }catch(err){
        console.log('Error updating expense', err);
        res.status(500).json({error: 'Error updating expense'});
    }
};

exports.deleteExpense = async(req, res) => {    
    const { id } = req.params;
    try{
        const expense = await Expense.findByPk(id);
        if(!expense){
            return res.status(404).json({error: 'Expense not found'});
        }
        await expense.destroy();
        res.status(200).json({message: 'Expense deleted successfully'});
    }catch(err){
        console.log('Error deleting expense', err);
        res.status(500).json({error: 'Error deleting expense'});
    }
};