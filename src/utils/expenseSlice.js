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
        }

    }
});

export const { initialiseExpense, addExpense, clearExpense, removeExpense } = expenseSlice.actions;

export default expenseSlice.reducer;