import React from "react";
import { View } from "react-native";

import { ExpensesSummary } from "./components";
import { ExpensesList } from "./components";

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
    <View>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList />
    </View>
  );
}
