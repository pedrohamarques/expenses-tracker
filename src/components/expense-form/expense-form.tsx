import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@components/ui";

import Input from "./components";
import { ExpenseDataProps, useExpenseForm } from "./expense-form.hook";

type ExpenseFormProps = {
  onCancel: () => void;
  onSubmit: ({ amount, date, description }: ExpenseDataProps) => void;
  isEditing: boolean;
  defaultValues?: ExpenseDataProps;
};

export function ExpenseForm({
  onCancel,
  onSubmit,
  isEditing,
  defaultValues,
}: ExpenseFormProps) {
  const { inputChangeHandler, inputValues, submitHandler } = useExpenseForm({
    onSubmit,
    defaultValues,
  });

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          keyboardType="decimal-pad"
          onChangeText={(text) => inputChangeHandler("amount", text)}
          style={styles.rowInput}
          value={inputValues.amount}
        />
        <Input
          label="Date"
          placeholder="YYYY-MM-DD"
          maxLength={10}
          onChangeText={(text) => inputChangeHandler("date", text)}
          style={styles.rowInput}
          value={inputValues.date}
        />
      </View>
      <Input
        label="Description"
        multiline
        value={inputValues.description}
        onChangeText={(text) => inputChangeHandler("description", text)}
      />

      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
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
