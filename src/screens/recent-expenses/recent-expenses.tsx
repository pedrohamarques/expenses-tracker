import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { ExpensesOutput } from "@components/expenses-output";
import { IconButton } from "@components/ui";

import type { NavigationProp } from "@react-navigation/native";
import type { BottomTabsParams } from "@routes/bottom/bottom-navigation";

import { useRecentExpensesScreen } from "./recent-expenses.hook";

export function RecentExpensesScreen() {
  const navigation =
    useNavigation<NavigationProp<BottomTabsParams, "RecentExpenses">>();

  const { handleHeaderButtonPress, recentExpenses } = useRecentExpensesScreen();

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
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      text="No expenses registered for the past 7 days."
    />
  );
}
