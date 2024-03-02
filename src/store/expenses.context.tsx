import React, { PropsWithChildren, createContext, useReducer } from "react";

import { DUMMY_EXPENSES } from "@constants/dummy-data";

import { ReducerActionsCases } from "./types";
import type { ExpenseContextProps, ReducerActions } from "./types";
import type { ExpensesProps } from "@components/expenses-output/types";

export const ExpensesContext = createContext<ExpenseContextProps>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
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
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }: PropsWithChildren) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense({ description, amount, date, id }: ExpensesProps) {
    dispatch({
      type: ReducerActionsCases.ADD,
      payload: { amount, description, date, id },
    });
  }

  function deleteExpense({ description, amount, date, id }: ExpensesProps) {
    dispatch({
      type: ReducerActionsCases.DELETE,
      payload: { amount, description, date, id },
    });
  }

  function updateExpense({ description, amount, date, id }: ExpensesProps) {
    dispatch({
      type: ReducerActionsCases.UPDATE,
      payload: { amount, description, date, id },
    });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
