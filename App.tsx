import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "@routes/stack/stack-navigation";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </>
  );
}
