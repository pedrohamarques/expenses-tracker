import { useNavigation } from "@react-navigation/native";

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

  function handleHeaderButtonPress() {
    navigation.navigate("ManageExpense", { expenseId: null });
  }

  return {
    handleHeaderButtonPress,
  };
}
