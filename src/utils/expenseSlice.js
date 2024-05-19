import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name: 'expense',
    initialState: null,
    reducers: {
        initialiseExpense: (state, action) => {
            return action.payload;
        },
        addExpense: (state, action) => {
            return [...state, action.payload];
        },
        clearExpense: (state, action) => {
            return null;
        }
    }
});

export const { initialiseExpense, addExpense, clearExpense } = expenseSlice.actions;

export default expenseSlice.reducer;