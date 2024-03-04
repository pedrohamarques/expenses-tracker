import { useContext } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { ExpensesContext } from "@store/expenses.context";

import type { NavigationProp } from "@react-navigation/native";
import type { StackParams } from "@routes/stack/stack-navigation";
import type { ExpenseDataProps } from "./types";

export function useManageExpenseScreen() {
  const route = useRoute<RouteProp<StackParams, "ManageExpense">>();
  const navigation =
    useNavigation<NavigationProp<StackParams, "ManageExpense">>();

  const { deleteExpense, expenses, updateExpense, addExpense } =
    useContext(ExpensesContext);

  const { expenseId } = route.params;

  const expense = expenses.find((expense) => expense.id === expenseId);

  const isEditing = !!route.params.expenseId;

  function deleteExpenseHandler() {
    if (expense) {
      deleteExpense(expense);
    }
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData: ExpenseDataProps) {
    if (isEditing && expenseId) {
      updateExpense({ ...expenseData, id: expenseId });
    } else {
      addExpense({ ...expenseData, id: "" });
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
