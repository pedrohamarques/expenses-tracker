import React from "react";
import { StyleSheet, View } from "react-native";

import { GlobalStyles } from "@constants/styles";

import { ExpensesSummary, ExpensesList } from "./components";

import { DUMMY_EXPENSES } from "./dummy-data";
import type { ExpensesProps } from "./types";

export type ExpensesOutputProps = {
  expenses: ExpensesProps[];
  expensesPeriod: string;
};

export function ExpensesOutput({
  expenses,
  expensesPeriod,
}: ExpensesOutputProps) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
