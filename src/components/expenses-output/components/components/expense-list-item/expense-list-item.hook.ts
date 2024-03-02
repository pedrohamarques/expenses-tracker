import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParams } from "@routes/stack/stack-navigation";

export function useExpenseListItem() {
  const navigation =
    useNavigation<NavigationProp<StackParams, "ManageExpense">>();

  function expensePressHandler() {
    navigation.navigate("ManageExpense");
  }
  return {
    expensePressHandler,
  };
}
