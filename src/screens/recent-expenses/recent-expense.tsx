import React from "react";
import { ExpensesOutput } from "@components/expenses-output";

export function RecentExpensesScreen() {
  return <ExpensesOutput expensesPeriod="Last 7 days" />;
}
