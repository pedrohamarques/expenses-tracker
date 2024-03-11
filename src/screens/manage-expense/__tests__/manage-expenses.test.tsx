import React from "react";
import { render, screen } from "@testing-library/react-native";

import { ManageExpenseScreen } from "../manage-expense";
import { DUMMY_DATA } from "@constants/fixture";

jest.mock("@react-navigation/native", () => ({
  useRoute: () => ({
    params: jest.fn(),
  }),
  useNavigation: () => ({
    setOptions: jest.fn(),
  }),
}));

const mockHookValues = {
  deleteExpenseHandler: jest.fn(),
  cancelHandler: jest.fn(),
  confirmHandler: jest.fn(),
  isEditing: false,
  isSubmitting: false,
  expense: DUMMY_DATA[0],
};

const mockUseManageExpenseScreen = jest.fn();

jest.mock("../manage-expense.hook", () => ({
  useManageExpenseScreen: () => mockUseManageExpenseScreen(),
}));

describe("screens/manage-expenses/<ManageExpenses />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseManageExpenseScreen.mockReturnValue(mockHookValues);
  });

  it("renders screen properly when is not submitting, editing or there is an error", () => {
    render(<ManageExpenseScreen />);

    expect(
      screen.queryByTestId("components.ui.loading.activity-indicator"),
    ).toBeNull();
    expect(screen.queryByTestId("screens.manage-expense.error")).toBeNull();
    expect(
      screen.queryByTestId("screens.manage-expense.icon-button"),
    ).toBeNull();

    expect(
      screen.getByTestId("screens.manage-expense.expense-form"),
    ).toBeTruthy();
  });

  it("renders screen when is editing", () => {
    const mockValues = {
      ...mockHookValues,
      isEditing: true,
    };

    mockUseManageExpenseScreen.mockReturnValueOnce(mockValues);

    render(<ManageExpenseScreen />);

    expect(
      screen.queryByTestId("components.ui.loading.activity-indicator"),
    ).toBeNull();
    expect(screen.queryByTestId("screens.manage-expense.error")).toBeNull();

    expect(
      screen.getByTestId("screens.manage-expense.icon-button"),
    ).toBeTruthy();
    expect(
      screen.getByTestId("screens.manage-expense.expense-form"),
    ).toBeTruthy();
  });

  it("renders screen when is submitting", () => {
    const mockValues = {
      ...mockHookValues,
      isSubmitting: true,
    };

    mockUseManageExpenseScreen.mockReturnValueOnce(mockValues);

    render(<ManageExpenseScreen />);

    expect(
      screen.getByTestId("components.ui.loading.activity-indicator"),
    ).toBeTruthy();

    expect(screen.queryByTestId("screens.manage-expense.error")).toBeNull();
    expect(
      screen.queryByTestId("screens.manage-expense.icon-button"),
    ).toBeNull();
    expect(
      screen.queryByTestId("screens.manage-expense.expense-form"),
    ).toBeNull();
  });

  it("renders screen when there is an error", () => {
    const mockValues = {
      ...mockHookValues,
      error: "There's an error!",
    };

    mockUseManageExpenseScreen.mockReturnValueOnce(mockValues);

    render(<ManageExpenseScreen />);

    expect(
      screen.queryByTestId("components.ui.loading.activity-indicator"),
    ).toBeNull();

    expect(screen.getByTestId("screens.manage-expense.error")).toBeTruthy();

    expect(
      screen.queryByTestId("screens.manage-expense.icon-button"),
    ).toBeNull();
    expect(
      screen.queryByTestId("screens.manage-expense.expense-form"),
    ).toBeNull();
  });
});
