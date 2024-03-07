import React, { PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "@constants/styles";

import type { ViewStyle } from "react-native";

type ButtonProps = PropsWithChildren & {
  onPress: () => void;
  mode?: "flat" | "no-flat";
  style?: ViewStyle;
};

export function Button({
  children,
  onPress,
  mode = "no-flat",
  style,
}: ButtonProps) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text
            style={[styles.buttonText, mode === "flat" && styles.flatText]}
            testID="components.ui.button.text"
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});
