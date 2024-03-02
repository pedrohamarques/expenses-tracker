import { useNavigation } from "@react-navigation/native";

import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { BottomTabsParams } from "@routes/bottom/bottom-navigation";
import type { StackParams } from "@routes/stack/stack-navigation";
import { useContext } from "react";
import { ExpensesContext } from "@store/expenses.context";
import { getDayMinusDays } from "@utils/date";

export type ManageExpenseNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsParams, "RecentExpenses">,
  NativeStackNavigationProp<StackParams>
>;

export function useRecentExpensesScreen() {
  const navigation = useNavigation<ManageExpenseNavigationProp>();
  const { expenses } = useContext(ExpensesContext);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDayMinusDays(today, 7);

    return expense.date > date7daysAgo;
  });

  function handleHeaderButtonPress() {
    navigation.navigate("ManageExpense", { expenseId: null });
  }

  return {
    handleHeaderButtonPress,
    recentExpenses,
  };
}
