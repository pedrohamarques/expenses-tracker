import React from "react";
import { GlobalStyles } from "@constants/styles";
import { ActivityIndicator, StyleSheet, View } from "react-native";

type LoadingProps = {
  testID?: string;
};

export function Loading({
  testID = "components.ui.loading.activity-indicator",
}: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" testID={testID} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
