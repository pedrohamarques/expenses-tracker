import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { ExpensesOutput } from "@components/expenses-output";
import { IconButton } from "@components/ui";

import { type NavigationProp } from "@react-navigation/native";
import type { BottomTabsParams } from "@routes/bottom/bottom-navigation";

import { useAllExpensesScreen } from "./all-expenses.hook";

export function AllExpensesScreen() {
  const navigation =
    useNavigation<NavigationProp<BottomTabsParams, "AllExpenses">>();

  const { handleHeaderButtonPress, expenses } = useAllExpensesScreen();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="add"
          color="white"
          size={24}
          onPress={handleHeaderButtonPress}
        />
      ),
    });
  }, [navigation]);
  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expenses}
      text="No expenses registered."
    />
  );
}
