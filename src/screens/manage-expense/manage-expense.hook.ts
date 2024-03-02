import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import type { NavigationProp } from "@react-navigation/native";
import type { StackParams } from "@routes/stack/stack-navigation";

export function useManageExpenseScreen() {
  const route = useRoute<RouteProp<StackParams, "ManageExpense">>();
  const navigation =
    useNavigation<NavigationProp<StackParams, "ManageExpense">>();

  const isEditing = !!route.params.expenseId;

  function deleteExpenseHandler() {
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    navigation.goBack();
  }

  return {
    isEditing,
    deleteExpenseHandler,
    cancelHandler,
    confirmHandler,
  };
}
