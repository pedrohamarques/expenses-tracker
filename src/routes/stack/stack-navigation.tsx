import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ManageExpenseScreen from "@screens/manage-expense";

import { GlobalStyles } from "@constants/styles";

import { BottomNavigation } from "../bottom/bottom-navigation";

export type StackParams = {
  ManageExpense: { expenseId: string | null };
  ExpensesOverview: undefined;
};

const Stack = createNativeStackNavigator<StackParams>();

export function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="ExpensesOverview"
        component={BottomNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ManageExpense"
        component={ManageExpenseScreen}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}
