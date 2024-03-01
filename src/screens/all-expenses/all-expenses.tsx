import React from "react";

import { ExpensesOutput } from "@components/expenses-output";

export function AllExpensesScreen() {
  return <ExpensesOutput expensesPeriod="Total" />;
}
