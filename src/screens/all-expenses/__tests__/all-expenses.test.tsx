import React from "react";
import { render, screen } from "@testing-library/react-native";

import { AllExpensesScreen } from "../all-expenses";
import { DUMMY_DATA } from "@constants/fixture";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    setOptions: jest.fn(),
  }),
}));

const mockExpenses = DUMMY_DATA;

jest.mock("../all-expenses.hook", () => ({
  useAllExpensesScreen: () => ({
    handleHeaderButtonPress: jest.fn(),
    expenses: mockExpenses,
  }),
}));

describe("screens/all-expenses/<AllExpensesScreen />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders screen properly", () => {
    render(<AllExpensesScreen />);

    expect(screen.getByText("Total")).toBeTruthy();

    expect(screen.queryByText("No expenses registered.")).toBeNull();
  });
});
