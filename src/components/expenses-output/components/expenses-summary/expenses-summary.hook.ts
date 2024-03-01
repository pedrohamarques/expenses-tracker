import type { ExpensesProps } from "@components/expenses-output/types";

export function useExpensesSummary(expenses: ExpensesProps[]) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return {
    expensesSum,
  };
}
