import { useContext } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { ExpensesContext } from "@store/expenses-context";

import {
  storeExpense,
  updateExpense as expenseUpdated,
  deleteExpense as expenseDeleted,
} from "@services/http";

import type { NavigationProp } from "@react-navigation/native";
import type { StackParams } from "@routes/stack/stack-navigation";
import type { ExpenseDataProps } from "@typings/data";

export function useManageExpenseScreen() {
  const route = useRoute<RouteProp<StackParams, "ManageExpense">>();
  const navigation =
    useNavigation<NavigationProp<StackParams, "ManageExpense">>();

  const { deleteExpense, expenses, updateExpense, addExpense } =
    useContext(ExpensesContext);

  const { expenseId } = route.params;

  const expense = expenses.find((expense) => expense.id === expenseId);

  const isEditing = !!route.params.expenseId;

  async function deleteExpenseHandler() {
    if (expense && expenseId) {
      await expenseDeleted(expenseId);
      deleteExpense(expense);
    }
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData: ExpenseDataProps) {
    if (isEditing && expenseId) {
      updateExpense({ ...expenseData, id: expenseId });
      await expenseUpdated(expenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      addExpense({ ...expenseData, id: id });
    }
    navigation.goBack();
  }

  return {
    isEditing,
    expense,
    deleteExpenseHandler,
    cancelHandler,
    confirmHandler,
  };
}
