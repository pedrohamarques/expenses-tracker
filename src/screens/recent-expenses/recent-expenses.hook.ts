import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { getDayMinusDays } from "@utils/date";
import { useHttpRequests } from "@services/http";
import { ExpensesContext } from "@store/expenses-context";

import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { BottomTabsParams } from "@routes/bottom/bottom-navigation";
import type { StackParams } from "@routes/stack/stack-navigation";

export type ManageExpenseNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsParams, "RecentExpenses">,
  NativeStackNavigationProp<StackParams>
>;

export function useRecentExpensesScreen() {
  const navigation = useNavigation<ManageExpenseNavigationProp>();
  const { expenses, setExpenses } = useContext(ExpensesContext);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchExpenses } = useHttpRequests();

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDayMinusDays(today, 7);

    return expense.date > date7daysAgo;
  });

  function handleHeaderButtonPress() {
    navigation.navigate("ManageExpense", { expenseId: null });
  }

  useEffect(() => {
    async function getExpenses() {
      setIsFetchingData(true);
      try {
        const expenses = await fetchExpenses();

        for (let i = 0; i < expenses.length; i++) {
          setExpenses(expenses[i]);
        }
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetchingData(false);
    }

    getExpenses();
  }, []);

  return {
    handleHeaderButtonPress,
    recentExpenses,
    isFetchingData,
    error,
  };
}
