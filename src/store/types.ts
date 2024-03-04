import { ExpensesProps } from "@typings/data";

export type ExpenseContextProps = {
  expenses: ExpensesProps[];
  addExpense: ({ description, amount, date, id }: ExpensesProps) => void;
  deleteExpense: ({ description, amount, date, id }: ExpensesProps) => void;
  updateExpense: ({ description, amount, date, id }: ExpensesProps) => void;
  setExpenses: ({ description, amount, date, id }: ExpensesProps) => void;
};

export type ExpenseFunctionParams = Omit<ExpensesProps, "id">;

export enum ReducerActionsCases {
  ADD = "ADD",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  SET = "SET",
}

export type ReducerActions = {
  type: ReducerActionsCases;
  payload: ExpensesProps;
};
