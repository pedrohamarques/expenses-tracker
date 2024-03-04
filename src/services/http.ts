import axios from "axios";

import type { ExpenseDataProps } from "@typings/data";

const firebaseApiUrl = process.env.EXPO_PUBLIC_FIREBASE_API_URL;

export async function storeExpense(expenseData: ExpenseDataProps) {
  const response = await axios.post(
    `${firebaseApiUrl}expenses.json`,
    expenseData,
  );

  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get<ExpenseDataProps[]>(
    `${firebaseApiUrl}expenses.json`,
  );

  const expenses = [];

  for (const key in response.data) {
    const expenseObject = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(expenseObject);
  }

  return expenses;
}

export function updateExpense(id: string, expenseData: ExpenseDataProps) {
  axios.put(`${firebaseApiUrl}expenses/${id}.json`, expenseData);
}

export function deleteExpense(id: string) {
  return axios.delete(`${firebaseApiUrl}expenses/${id}.json`);
}
