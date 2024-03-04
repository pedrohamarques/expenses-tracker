import React, { PropsWithChildren, createContext, useReducer } from "react";

import { ReducerActionsCases } from "./types";
import type { ExpenseContextProps, ReducerActions } from "./types";
import type { ExpensesProps } from "@typings/data";

export const ExpensesContext = createContext<ExpenseContextProps>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
  setExpenses: () => {},
});

function expensesReducer(
  state: ExpensesProps[],
  action: ReducerActions,
): ExpensesProps[] {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id,
      );
      const updatableExpense = state[updatableExpenseIndex];

      const updatedItem = { ...updatableExpense, ...action.payload };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload.id);
    case "SET":
      const repetitiveIds = state.filter(
        (expense) => action.payload.id === expense.id,
      );

      if (repetitiveIds.length === 0) {
        return [...state, action.payload];
      }
      return state;
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }: PropsWithChildren) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData: ExpensesProps) {
    dispatch({
      type: ReducerActionsCases.ADD,
      payload: { ...expenseData },
    });
  }

  function deleteExpense(expenseData: ExpensesProps) {
    dispatch({
      type: ReducerActionsCases.DELETE,
      payload: { ...expenseData },
    });
  }

  function updateExpense(expenseData: ExpensesProps) {
    dispatch({
      type: ReducerActionsCases.UPDATE,
      payload: { ...expenseData },
    });
  }

  function setExpenses(expenseData: ExpensesProps) {
    dispatch({
      type: ReducerActionsCases.SET,
      payload: { ...expenseData },
    });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
    setExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
