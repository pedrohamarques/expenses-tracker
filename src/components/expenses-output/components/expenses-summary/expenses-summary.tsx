import React from "react";
import { StyleSheet, Text, View } from "react-native";

import type { ExpensesProps } from "@typings/data";
import { useExpensesSummary } from "./expenses-summary.hook";

import { GlobalStyles } from "@constants/styles";

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
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
