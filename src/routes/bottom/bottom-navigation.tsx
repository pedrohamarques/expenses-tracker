import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecentExpensesScreen from "@screens/recent-expenses";
import AllExpensesScreen from "@screens/all-expenses";

export type BottomTabsParams = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
};

const BottomTabs = createBottomTabNavigator<BottomTabsParams>();

export function BottomNavigation() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpensesScreen}
      />
      <BottomTabs.Screen name="AllExpenses" component={AllExpensesScreen} />
    </BottomTabs.Navigator>
  );
}
