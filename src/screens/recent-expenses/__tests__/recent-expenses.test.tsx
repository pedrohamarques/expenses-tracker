import React from "react";
import { render, screen } from "@testing-library/react-native";

import { RecentExpensesScreen } from "../recent-expenses";
import { DUMMY_DATA } from "@constants/fixture";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    setOptions: jest.fn(),
  }),
}));

const mockHookValues = {
  recentExpenses: [],
  isFetchingData: false,
  handleHeaderButtonPress: jest.fn(),
};

const mockUseRecentExpensesScreen = jest.fn();

jest.mock("../recent-expenses.hook", () => ({
  useRecentExpensesScreen: () => mockUseRecentExpensesScreen(),
}));

describe("screens/all-expenses/<AllExpensesScreen />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRecentExpensesScreen.mockReturnValue(mockHookValues);
  });

  it("renders screen properly when there is no error, it is not fetching data and not having any data", () => {
    render(<RecentExpensesScreen />);

    expect(screen.queryByTestId("screens.recent-expenses.loading")).toBeNull();
    expect(screen.queryByTestId("screens.recent-expenses.error")).toBeNull();

    expect(
      screen.getByText("No expenses registered for the past 7 days."),
    ).toBeTruthy();
  });

  it("renders screen properly when there is no error, it is not fetching data and it has some data", () => {
    const mockNewHookValues = {
      ...mockHookValues,
      recentExpenses: DUMMY_DATA,
    };

    mockUseRecentExpensesScreen.mockReturnValueOnce(mockNewHookValues);

    render(<RecentExpensesScreen />);

    expect(screen.queryByTestId("screens.recent-expenses.loading")).toBeNull();
    expect(screen.queryByTestId("screens.recent-expenses.error")).toBeNull();

    expect(
      screen.queryByTestId("No expenses registered for the past 7 days."),
    ).toBeNull();

    expect(screen.getByText("Description 1")).toBeTruthy();
    expect(screen.getByText("Description 2")).toBeTruthy();
  });

  it("renders screen properly when it is fetching data", () => {
    const mockNewHookValues = {
      ...mockHookValues,
      isFetchingData: true,
    };
    mockUseRecentExpensesScreen.mockReturnValueOnce(mockNewHookValues);

    render(<RecentExpensesScreen />);

    expect(screen.getByTestId("screens.recent-expenses.loading")).toBeTruthy();
    expect(screen.queryByTestId("screens.recent-expenses.error")).toBeNull();

    expect(
      screen.queryByText("No expenses registered for the past 7 days."),
    ).toBeNull();
  });

  it("renders screen properly when there is an error", () => {
    const mockNewHookValues = {
      ...mockHookValues,
      error: "Some error",
    };
    mockUseRecentExpensesScreen.mockReturnValueOnce(mockNewHookValues);

    render(<RecentExpensesScreen />);

    expect(screen.queryByTestId("screens.recent-expenses.loading")).toBeNull();

    expect(screen.getByTestId("screens.recent-expenses.error")).toBeTruthy();
    expect(screen.getByText("Some error")).toBeTruthy();

    expect(
      screen.queryByText("No expenses registered for the past 7 days."),
    ).toBeNull();
  });
});
