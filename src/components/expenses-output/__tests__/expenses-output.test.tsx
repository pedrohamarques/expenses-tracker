import { render, screen } from "@testing-library/react-native";
import React from "react";
import { ExpensesOutput } from "../expenses-output";
import { DUMMY_DATA } from "./fixture";

const mockValues = {
  expenses: DUMMY_DATA,
  expensesPeriod: "Last 7 days",
  text: "Some text",
};

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("components/expenses-output/<ExpensesOutput />", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders component properly when there are items to show", () => {
    render(<ExpensesOutput {...mockValues} />);

    expect(screen.queryByText("Some text")).toBeNull();

    expect(
      screen.getByTestId(
        "components.expenses-output.components.expenses-list.flatlist",
      ),
    ).toBeTruthy();
  });

  it("renders component properly when there are no items to show", () => {
    const mockEmptyData = {
      ...mockValues,
      expenses: [],
    };

    render(<ExpensesOutput {...mockEmptyData} />);

    expect(screen.getByText("Some text")).toBeTruthy();

    expect(
      screen.queryByTestId(
        "components.expenses-output.components.expenses-list.flatlist",
      ),
    ).toBeNull();
  });
});
