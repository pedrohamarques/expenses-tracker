import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { GlobalStyles } from "@constants/styles";

import type { TextInputProps, ViewStyle } from "react-native";

type InputProps = TextInputProps & {
  label: string;
  isValid?: boolean;
  style?: ViewStyle;
};

export function Input({
  label,
  style,
  isValid,
  testID = "",
  multiline = false,
  ...props
}: InputProps) {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, !isValid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        {...props}
        testID={`components.expense-form.components.input.text-input.${testID}`}
        style={[
          styles.input,
          multiline && styles.inputMultiline,
          !isValid && styles.invalidInput,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
