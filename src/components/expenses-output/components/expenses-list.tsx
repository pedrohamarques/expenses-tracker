import React from "react";
import { FlatList } from "react-native";

import { ExpenseListItem } from "./components";

import type { ExpensesProps } from "../types";

type ExpenseListProps = {
  expenses: ExpensesProps[];
};

export function ExpensesList({ expenses }: ExpenseListProps) {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => (
        <ExpenseListItem
          description={item.description}
          date={item.date}
          amount={item.amount}
          id={item.id}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
