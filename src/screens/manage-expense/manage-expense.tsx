import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { useManageExpenseScreen } from "./manage-expense.hook";
import { StackParams } from "@routes/stack/stack-navigation";
import { IconButton } from "@components/ui";
import { GlobalStyles } from "@constants/styles";
import { Button } from "@components/ui/button";

export function ManageExpenseScreen() {
  const { isEditing, deleteExpenseHandler, cancelHandler, confirmHandler } =
    useManageExpenseScreen();

  const navigation =
    useNavigation<NavigationProp<StackParams, "ManageExpense">>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
