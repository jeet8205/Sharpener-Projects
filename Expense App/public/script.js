const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

// Base API URL
const API_URL = '/expenses';

// Fetch and display all expenses
async function fetchExpenses() {
  try {
    const response = await axios.get(API_URL);
    const expenses = response.data;

    expenseList.innerHTML = ''; // Clear the list
    expenses.forEach(expense => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${expense.title} - Rs ${expense.amount} - ${expense.category}
        <button onclick="deleteExpense(${expense.id})">Delete</button>
        <button onclick="editExpense(${expense.id}, '${expense.title}', ${expense.amount}, '${expense.description}', '${expense.category}')">Edit</button>
      `;
      expenseList.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching expenses:', error);
  }
}

// Add a new expense
expenseForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  try {
    await axios.post(API_URL, { title, amount, description, category });
    fetchExpenses();
    expenseForm.reset(); 
  } catch (error) {
    console.error('Error adding expense:', error);
  }
});

// Delete an expense
async function deleteExpense(id) {
  try {
    await axios.delete(`${API_URL}/${id}`);
    fetchExpenses();
  } catch (error) {
    console.error('Error deleting expense:', error);
  }
}

// Edit an expense
function editExpense(id, title, amount, description, category) {
  document.getElementById('title').value = title;
  document.getElementById('amount').value = amount;
  document.getElementById('description').value = description;
  document.getElementById('category').value = category;

  expenseForm.onsubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_URL}/${id}`, {
        title: document.getElementById('title').value,
        amount: document.getElementById('amount').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
      });

      fetchExpenses();
      expenseForm.onsubmit = null; // Reset to default
      expenseForm.reset();
    } catch (error) {
      console.error('Error editing expense:', error);
    }
  };
}

// Initial fetch
fetchExpenses();
