import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name: 'expense',
    initialState: null,
    reducers: {
        initialiseExpense: (state, action) => {
            return action.payload;
        },
        addExpense: (state, action) => {
            return [action.payload, ...state];
        },
        clearExpense: (state, action) => {
            return null;
        },
        removeExpense: (state, action) => {
            const { id } = action.payload;
            const updatedExpenses = state.filter(expense => expense.id !== id);
            return [...updatedExpenses];
        },
        updateExpense: (state, action) => {
            const { id, data } = action.payload;
            const existingExpense = state.find(expense => expense.id === id);
            if (existingExpense) {
                existingExpense.title = data.title;
                existingExpense.amount = data.amount;
                existingExpense.date = data.date;
                existingExpense.category = data.category;
                existingExpense.description = data.description;
            }
        }

    }
});

export const { initialiseExpense, addExpense, clearExpense, removeExpense, updateExpense } = expenseSlice.actions;

export default expenseSlice.reducer;