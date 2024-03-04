import type { ExpensesProps } from "@typings/data";

export function useExpensesSummary(expenses: ExpensesProps[]) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return {
    expensesSum,
  };
}
