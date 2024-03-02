import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParams } from "@routes/stack/stack-navigation";

export function useExpenseListItem(id: string) {
  const navigation =
    useNavigation<NavigationProp<StackParams, "ManageExpense">>();

  function expensePressHandler() {
    navigation.navigate("ManageExpense", { expenseId: id });
  }
  return {
    expensePressHandler,
  };
}
