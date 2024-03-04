import { useContext } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { ExpensesContext } from "@store/expenses.context";

import type { NavigationProp } from "@react-navigation/native";
import type { StackParams } from "@routes/stack/stack-navigation";

export function useManageExpenseScreen() {
  const route = useRoute<RouteProp<StackParams, "ManageExpense">>();
  const navigation =
    useNavigation<NavigationProp<StackParams, "ManageExpense">>();

  const { deleteExpense, expenses, updateExpense, addExpense } =
    useContext(ExpensesContext);

  const { expenseId } = route.params;

  const expense = expenses.filter((expense) => expense.id === expenseId);

  const isEditing = !!route.params.expenseId;

  function deleteExpenseHandler() {
    deleteExpense(expense[0]);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing && expenseId) {
      updateExpense({
        amount: 29.99,
        date: new Date("2023-08-88"),
        description: "TestUpdate",
        id: expenseId,
      });
    } else {
      addExpense({
        amount: 19.99,
        date: new Date("2023-05-05"),
        description: "Test",
        id: String(Math.random()),
      });
    }
    navigation.goBack();
  }

  return {
    isEditing,
    deleteExpenseHandler,
    cancelHandler,
    confirmHandler,
  };
}
