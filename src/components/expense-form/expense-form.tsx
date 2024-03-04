import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Input from "./components";

import { useExpenseForm } from "./expense-form.hook";

export function ExpenseForm() {
  const { inputChangeHandler, inputValues } = useExpenseForm();

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          keyboardType="decimal-pad"
          onChangeText={() => inputChangeHandler("amount", inputValues.amount)}
          style={styles.rowInput}
          value={inputValues.amount}
        />
        <Input
          label="Date"
          placeholder="YYYY-MM-DD"
          maxLength={10}
          onChangeText={() => inputChangeHandler("date", inputValues.date)}
          style={styles.rowInput}
          value={inputValues.date}
        />
      </View>
      <Input
        label="Description"
        multiline
        value={inputValues.description}
        onChangeText={() =>
          inputChangeHandler("description", inputValues.description)
        }
      />
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
});
