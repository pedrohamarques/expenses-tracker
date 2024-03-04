import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "@constants/styles";

import { ExpensesSummary, ExpensesList } from "./components";

import type { ExpensesProps } from "@typings/data";

export type ExpensesOutputProps = {
  expenses: ExpensesProps[];
  expensesPeriod: string;
  text: string;
};

export function ExpensesOutput({
  expenses,
  expensesPeriod,
  text,
}: ExpensesOutputProps) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {expenses.length > 0 ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <Text style={styles.infoText}>{text}</Text>
      )}
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
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
