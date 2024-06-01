import React, { createContext, useReducer } from 'react';

// Reducer function
export const AppReducer = (state, action) => {
    let budget = 0;
    switch (action.type) {
        case 'ADD_EXPENSE':
            let total_budget = state.expenses.reduce((previousExp, currentExp) => previousExp + currentExp.cost, 0);
            total_budget += action.payload.cost;
            action.type = "DONE";
            if (total_budget <= state.budget) {
                state.expenses = state.expenses.map(currentExp => {
                    if (currentExp.name === action.payload.name) {
                        currentExp.cost += action.payload.cost;
                    }
                    return currentExp;
                });
                return { ...state };
            } else {
                alert("Cannot increase the allocation! Out of funds");
                return { ...state };
            }
        case 'RED_EXPENSE':
            const red_expenses = state.expenses.map(currentExp => {
                if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
                    currentExp.cost -= action.payload.cost;
                    budget = state.budget + action.payload.cost;
                }
                return currentExp;
            });
            action.type = "DONE";
            return {
                ...state,
                expenses: [...red_expenses],
            };
        case 'DELETE_EXPENSE':
            state.expenses = state.expenses.map(currentExp => {
                if (currentExp.name === action.payload) {
                    budget = state.budget + currentExp.cost;
                    currentExp.cost = 0;
                }
                return currentExp;
            });
            action.type = "DONE";
            return { ...state, budget };
        case 'SET_BUDGET':
            return { ...state, budget: action.payload };
        case 'CHG_CURRENCY':
            return { ...state, currency: action.payload };
        default:
            return state;
    }
};

// Initial state
const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '£'
};

// Creates the context
export const AppContext = createContext();

// Provider component
export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const remaining = state.budget - state.expenses.reduce((total, item) => total + item.cost, 0);

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining,
                dispatch,
                currency: state.currency
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
