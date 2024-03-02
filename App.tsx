import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "@routes/stack/stack-navigation";
import ExpensesContextProvider from "src/store/expenses.context";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
