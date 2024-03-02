import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ManageExpenseScreen from "@screens/manage-expense";

import { BottomNavigation } from "../bottom/bottom-navigation";

export type StackParams = {
  ManageExpense: undefined;
  ExpensesOverview: undefined;
};

const Stack = createNativeStackNavigator<StackParams>();

export function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExpensesOverview"
        component={BottomNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ManageExpense" component={ManageExpenseScreen} />
    </Stack.Navigator>
  );
}
