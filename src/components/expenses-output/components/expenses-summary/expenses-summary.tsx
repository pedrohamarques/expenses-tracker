import React from "react";
import { Text, View } from "react-native";
import { useExpensesSummary } from "./expenses-summary.hook";
import type { ExpensesProps } from "@components/expenses-output/types";

type ExpensesSummaryProps = {
  expenses: ExpensesProps[];
  periodName: string;
};

export function ExpensesSummary({
  periodName,
  expenses,
}: ExpensesSummaryProps) {
  const { expensesSum } = useExpensesSummary(expenses);
  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}
