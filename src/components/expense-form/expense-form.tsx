import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@components/ui";

import Input from "./components";
import { useExpenseForm } from "./expense-form.hook";
import { GlobalStyles } from "@constants/styles";

import type { ExpenseDataProps } from "@typings/data";

type ExpenseFormProps = {
  onCancel: () => void;
  onSubmit: ({ amount, date, description }: ExpenseDataProps) => void;
  isEditing: boolean;
  defaultValues?: ExpenseDataProps;
  testID?: string;
};

export function ExpenseForm({
  onCancel,
  onSubmit,
  isEditing,
  defaultValues,
  testID,
}: ExpenseFormProps) {
  const { inputChangeHandler, inputValues, submitHandler } = useExpenseForm({
    onSubmit,
    defaultValues,
  });

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.form} testID={testID}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          keyboardType="decimal-pad"
          onChangeText={(text) => inputChangeHandler("amount", text)}
          style={styles.rowInput}
          value={inputValues.amount.value}
          isValid={inputValues.amount.isValid}
          testID="amount"
        />
        <Input
          label="Date"
          placeholder="YYYY-MM-DD"
          maxLength={10}
          onChangeText={(text) => inputChangeHandler("date", text)}
          style={styles.rowInput}
          value={inputValues.date.value}
          isValid={inputValues.date.isValid}
        />
      </View>
      <Input
        label="Description"
        multiline
        value={inputValues.description.value}
        onChangeText={(text) => inputChangeHandler("description", text)}
        isValid={inputValues.description.isValid}
      />

      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values. Please check your entered data!{" "}
        </Text>
      )}
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
    fontWeight: "bold",
  },
});
