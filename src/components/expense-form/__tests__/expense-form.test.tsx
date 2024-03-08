import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { ExpenseForm } from "../expense-form";
import { returnInputValuesFormatted } from "./fixture";

const mockValues = {
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
  isEditing: false,
};

const mockUseExpenseFormValues = {
  inputValues: returnInputValuesFormatted,
  submitHandler: jest.fn(),
  inputChangeHandler: jest.fn(),
};

const mockUseExpenseForm = jest.fn();

jest.mock("../expense-form.hook", () => ({
  useExpenseForm: () => mockUseExpenseForm(),
}));

describe("components/expense-form/<ExpenseForm />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseExpenseForm.mockReturnValue(mockUseExpenseFormValues);
  });

  it("renders component properly when is not editing", () => {
    render(<ExpenseForm {...mockValues} />);

    expect(screen.getByText("Your Expense")).toBeTruthy();

    expect(screen.getByText("Amount")).toBeTruthy();

    expect(screen.getByText("Date")).toBeTruthy();
    expect(screen.getAllByPlaceholderText("YYYY-MM-DD")).toBeTruthy();

    expect(screen.getByText("Description")).toBeTruthy();

    expect(
      screen.queryByText(
        "Invalid input values. Please check your entered data!",
      ),
    ).toBeNull();

    expect(screen.getByText("Cancel")).toBeTruthy();

    expect(screen.getByText("Add")).toBeTruthy();
  });

  it("renders component properly when is editing", () => {
    render(<ExpenseForm {...mockValues} isEditing />);

    expect(screen.getByText("Your Expense")).toBeTruthy();

    expect(screen.getByText("Amount")).toBeTruthy();

    expect(screen.getByText("Date")).toBeTruthy();
    expect(screen.getAllByPlaceholderText("YYYY-MM-DD")).toBeTruthy();

    expect(screen.getByText("Description")).toBeTruthy();

    expect(
      screen.queryByText(
        "Invalid input values. Please check your entered data!",
      ),
    ).toBeNull();

    expect(screen.getByText("Cancel")).toBeTruthy();

    expect(screen.getByText("Update")).toBeTruthy();
  });

  it("calls inputChangeHandler when one of the inputs are typed", () => {
    render(<ExpenseForm {...mockValues} />);

    fireEvent.changeText(
      screen.getByTestId(
        "components.expense-form.components.input.text-input.amount",
      ),
      "24",
    );

    expect(mockUseExpenseFormValues.inputChangeHandler).toHaveBeenCalledTimes(
      1,
    );
  });

  it("calls onCancel when button is pressed", () => {
    render(<ExpenseForm {...mockValues} />);

    fireEvent.press(screen.getByText("Cancel"));

    expect(mockValues.onCancel).toHaveBeenCalledTimes(1);
  });

  it("calls submitHandler when confirmation button is pressed", () => {
    render(<ExpenseForm {...mockValues} />);

    fireEvent.press(screen.getByText("Add"));

    expect(mockUseExpenseFormValues.submitHandler).toHaveBeenCalledTimes(1);
  });

  it("shows text when one of the fields is not valid", () => {
    mockUseExpenseForm.mockReturnValue({
      ...mockUseExpenseFormValues,
      inputValues: {
        ...mockUseExpenseFormValues.inputValues,
        amount: {
          value: "10",
          isValid: false,
        },
      },
    });

    render(<ExpenseForm {...mockValues} />);

    expect(screen.getByText("Your Expense")).toBeTruthy();

    expect(screen.getByText("Amount")).toBeTruthy();

    expect(screen.getByText("Date")).toBeTruthy();
    expect(screen.getAllByPlaceholderText("YYYY-MM-DD")).toBeTruthy();

    expect(screen.getByText("Description")).toBeTruthy();

    expect(
      screen.getByText("Invalid input values. Please check your entered data!"),
    ).toBeTruthy();

    expect(screen.getByText("Cancel")).toBeTruthy();

    expect(screen.getByText("Add")).toBeTruthy();
  });
});
