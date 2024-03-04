import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { GlobalStyles } from "@constants/styles";

import type { TextInputProps, ViewStyle } from "react-native";

type InputProps = TextInputProps & {
  label: string;
  style?: ViewStyle;
};

export function Input({
  label,
  style,
  multiline = false,
  ...props
}: InputProps) {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={[styles.input, multiline && styles.inputMultiline]}
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
});
