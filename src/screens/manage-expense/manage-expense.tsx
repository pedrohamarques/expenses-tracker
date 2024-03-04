import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Error, IconButton, Loading } from "@components/ui";
import { GlobalStyles } from "@constants/styles";
import ExpenseForm from "@components/expense-form";

import { useManageExpenseScreen } from "./manage-expense.hook";

import { NavigationProp } from "@react-navigation/native";
import type { StackParams } from "@routes/stack/stack-navigation";

export function ManageExpenseScreen() {
  const {
    expense,
    isEditing,
    isSubmitting,
    error,
    deleteExpenseHandler,
    cancelHandler,
    confirmHandler,
  } = useManageExpenseScreen();

  const navigation =
    useNavigation<NavigationProp<StackParams, "ManageExpense">>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  if (isSubmitting) {
    return <Loading />;
  }

  if (error && !isSubmitting) {
    return <Error message={error} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={expense}
      />

      {isEditing ? (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
