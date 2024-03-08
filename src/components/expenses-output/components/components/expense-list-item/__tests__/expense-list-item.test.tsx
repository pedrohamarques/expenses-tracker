import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { ExpenseListItem } from "../expense-list-item";

const mockValues = {
  description: "Some description",
  amount: 10,
  date: new Date("2020-10-10 03:00"),
  id: "15",
};

const mockExpensePressHandler = jest.fn();

jest.mock("../expense-list-item.hook", () => ({
  useExpenseListItem: () => ({
    expensePressHandler: mockExpensePressHandler,
  }),
}));

describe("components/expense-output/components/components/expense-list-item/<ExpenseListItem />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders component properly", () => {
    render(<ExpenseListItem {...mockValues} />);

    expect(screen.getByText("Some description")).toBeTruthy();
    expect(screen.getByText("10 / October / 2020")).toBeTruthy();
    expect(screen.getByText("10.00")).toBeTruthy();
  });

  it("calls expensePressHandler when component is pressed", () => {
    render(<ExpenseListItem {...mockValues} />);

    fireEvent.press(
      screen.getByTestId(
        "expenses-output.components.components.expense-list-item.pressable",
      ),
    );

    expect(mockExpensePressHandler).toHaveBeenCalledTimes(1);
  });
});
