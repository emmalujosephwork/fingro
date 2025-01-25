// Load expenses and goals on page load
document.addEventListener('DOMContentLoaded', () => {
    loadExpenses();
    loadGoals();
});

// Fetch and load expenses
const loadExpenses = async () => {
    try {
        const response = await fetch('/api/expenses');
        if (response.ok) {
            const expenses = await response.json();
            const expenseList = document.getElementById('expense-list');
            expenseList.innerHTML = expenses.map(exp => `
                <tr>
                    <td>${exp.description}</td>
                    <td>${exp.amount}</td>
                    <td>${exp.category}</td>
                    <td>${new Date(exp.date).toLocaleDateString()}</td>
                    <td>
                        <button class="btn-small red" onclick="deleteExpense('${exp._id}')">Delete</button>
                    </td>
                </tr>
            `).join('');
        } else {
            console.error('Failed to fetch expenses');
        }
    } catch (err) {
        console.error('Error fetching expenses:', err);
    }
};

// Fetch and load goals
const loadGoals = async () => {
    try {
        const response = await fetch('/api/goals');
        if (response.ok) {
            const goals = await response.json();
            const goalList = document.getElementById('goal-list');
            goalList.innerHTML = goals.map(goal => `
                <tr>
                    <td>${goal.goalName}</td>
                    <td>${goal.targetAmount}</td>
                    <td>${goal.savedAmount || 0}</td>
                    <td>${new Date(goal.dueDate).toLocaleDateString()}</td>
                    <td>
                        <button class="btn-small red" onclick="deleteGoal('${goal._id}')">Delete</button>
                    </td>
                </tr>
            `).join('');
        } else {
            console.error('Failed to fetch goals');
        }
    } catch (err) {
        console.error('Error fetching goals:', err);
    }
};

// Add a new expense
document.getElementById('expense-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;

    try {
        const response = await fetch('/api/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description, amount, category }),
        });

        if (response.ok) {
            alert('Expense added successfully!');
            document.getElementById('expense-form').reset();
            loadExpenses();
        } else {
            console.error('Failed to add expense');
            alert('Error adding expense. Please try again.');
        }
    } catch (err) {
        console.error('Error adding expense:', err);
    }
});

// Add a new goal
document.getElementById('goal-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const goalName = document.getElementById('goalName').value;
    const targetAmount = document.getElementById('targetAmount').value;
    const dueDate = document.getElementById('dueDate').value;

    try {
        const response = await fetch('/api/goals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ goalName, targetAmount, dueDate }),
        });

        if (response.ok) {
            alert('Goal added successfully!');
            document.getElementById('goal-form').reset();
            loadGoals();
        } else {
            console.error('Failed to add goal');
            alert('Error adding goal. Please try again.');
        }
    } catch (err) {
        console.error('Error adding goal:', err);
    }
});

// Delete an expense
const deleteExpense = async (id) => {
    try {
        const response = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Expense deleted successfully!');
            loadExpenses();
        } else {
            console.error('Failed to delete expense');
            alert('Error deleting expense. Please try again.');
        }
    } catch (err) {
        console.error('Error deleting expense:', err);
    }
};

// Delete a goal
const deleteGoal = async (id) => {
    try {
        const response = await fetch(`/api/goals/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Goal deleted successfully!');
            loadGoals();
        } else {
            console.error('Failed to delete goal');
            alert('Error deleting goal. Please try again.');
        }
    } catch (err) {
        console.error('Error deleting goal:', err);
    }
};
