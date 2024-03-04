import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { ExpensesContext } from "@store/expenses-context";

import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { BottomTabsParams } from "@routes/bottom/bottom-navigation";
import type { StackParams } from "@routes/stack/stack-navigation";

export type ManageExpenseNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsParams, "AllExpenses">,
  NativeStackNavigationProp<StackParams>
>;

export function useAllExpensesScreen() {
  const navigation = useNavigation<ManageExpenseNavigationProp>();

  const { expenses } = useContext(ExpensesContext);

  function handleHeaderButtonPress() {
    navigation.navigate("ManageExpense", { expenseId: null });
  }

  return {
    handleHeaderButtonPress,
    expenses,
  };
}
