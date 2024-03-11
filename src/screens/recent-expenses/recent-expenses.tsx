import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { ExpensesOutput } from "@components/expenses-output";
import { Error, IconButton, Loading } from "@components/ui";

import type { NavigationProp } from "@react-navigation/native";
import type { BottomTabsParams } from "@routes/bottom/bottom-navigation";

import { useRecentExpensesScreen } from "./recent-expenses.hook";

export function RecentExpensesScreen() {
  const navigation =
    useNavigation<NavigationProp<BottomTabsParams, "RecentExpenses">>();

  const { handleHeaderButtonPress, recentExpenses, isFetchingData, error } =
    useRecentExpensesScreen();

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

  if (isFetchingData) {
    return <Loading testID="screens.recent-expenses.loading" />;
  }

  if (error && !isFetchingData) {
    return <Error message={error} testID="screens.recent-expenses.error" />;
  }

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      text="No expenses registered for the past 7 days."
    />
  );
}
