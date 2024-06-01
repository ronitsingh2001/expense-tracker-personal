import { FILTER } from "./constants";

let EXPENSES = [];
let MONTHEXPENSES = null;
export const organizeExpensesByMonth = (expenses) => {
    EXPENSES = expenses;
    if (expenses?.length < 1) return expenses;
    const monthlyExpenses = [];
    expenses.forEach((expense) => {
        const monthYear = new Date(expense.date).toLocaleString("default", {
            month: "long",
            year: "numeric",
        });
        const index = monthlyExpenses.findIndex(
            (item) => item.key === monthYear
        );

        if (index === -1) {
            // If the monthYear is not found, create a new entry in the array
            monthlyExpenses.push({
                key: monthYear,
                expenses: [expense],
            });
        } else {
            // Add to the existing month's expenses array
            monthlyExpenses[index].expenses.push(expense);
        }
    });
    MONTHEXPENSES = monthlyExpenses;
    console.log(monthlyExpenses)
    return monthlyExpenses;
};

export const organizeExpensesByCategories = () => {
    let expense = EXPENSES;
    const categoriesExpense = [];
    expense.forEach(x => {
        let category = x.category;
        let index = categoriesExpense.findIndex(item => item.key === category);
        if (index !== -1) {
            categoriesExpense[index].expenses.push(x);
        } else {
            categoriesExpense.push({
                key: category,
                expenses: [x]
            });
        }
    });
    return categoriesExpense;
};
export const organizeExpensesByAmount = () => {
    let expense = EXPENSES;
    const amountExpense = [];
    expense = expense.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
    expense.forEach(x => {
        let amount = +x.amount;
        if (amount > 0 && amount < 200) {
            const index = amountExpense.findIndex(item => item.key === '0 - 199');
            if (index !== -1) {
                amountExpense[index].expenses.push(x);
            } else {
                amountExpense.push({
                    key: '0 - 199',
                    expenses: [x]
                });
            }
        } else if (amount > 200 && amount < 1000) {
            const index = amountExpense.findIndex(item => item.key === '200 - 999');
            if (index !== -1) {
                amountExpense[index].expenses.push(x);
            } else {
                amountExpense.push({
                    key: '200 - 999',
                    expenses: [x]
                });
            }
        } else if (amount > 1000 && amount < 2500) {
            const index = amountExpense.findIndex(item => item.key === '1000 - 2499');
            if (index !== -1) {
                amountExpense[index].expenses.push(x);
            } else {
                amountExpense.push({
                    key: '1000 - 2499',
                    expenses: [x]
                });
            }
        } else if (amount > 2500 && amount < 5000) {
            const index = amountExpense.findIndex(item => item.key === '2500 - 4999');
            if (index !== -1) {
                amountExpense[index].expenses.push(x);
            } else {
                amountExpense.push({
                    key: '2500 - 4999',
                    expenses: [x]
                });
            }
        } else if (amount > 5000) {
            const index = amountExpense.findIndex(item => item.key === '5000 or greater');
            if (index !== -1) {
                amountExpense[index].expenses.push(x);
            } else {
                amountExpense.push({
                    key: '5000 or greater',
                    expenses: [x]
                });
            }
        }

    });
    return amountExpense;
};

export const getSubFilter = (filter) => {
    if (filter === FILTER[0])
        return MONTHEXPENSES;
    else if (filter === FILTER[1])
        return organizeExpensesByCategories();
    else if (filter === FILTER[2])
        return organizeExpensesByAmount();
};


export const getIndividualExpenses = (expenseArray, key) => {
    let labels = [], amount = [];
    let index = expenseArray.findIndex(expense => expense.key === key);
    if (index === -1) {
        return { labels: null, amount: null };
    }
    expenseArray[index].expenses.map(item => {
        labels.push(item.title);
        amount.push(+item.amount);
    });
    return { labels: labels, amount: amount };
};

export const getAmount = (expenseArray) => {
    let amount = [];
    expenseArray?.map(expense => {
        let total = 0;
        expense?.expenses?.map(item => {
            total += +item.amount;
        });
        amount.push(total);
    });
    return amount;
};

export const addExpenseToFirestore = (expenseArray) => {
    return expenseArray.map(item => {
        item.date = convertDateFormat(item.date);
        return item;
    });
};

const convertDateFormat = (dateString) => {
    // Split the date string into day, month, and year
    const [day, month, year] = dateString.split('/');

    // If the year is in YY format, convert it to YYYY format
    const fullYear = parseInt(year) < 50 ? '20' + year : '19' + year;

    // Reconstruct the date string with the new year format
    return `${fullYear}-${month}-${day}`;
};