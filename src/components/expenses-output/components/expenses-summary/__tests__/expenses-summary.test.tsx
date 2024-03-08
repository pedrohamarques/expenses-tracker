import React from "react";
import { render, screen } from "@testing-library/react-native";

import { ExpensesSummary } from "../expenses-summary";
import { DUMMY_DATA } from "@constants/fixture";

const mockValues = {
  expenses: DUMMY_DATA,
  periodName: "Last 7 days",
};

jest.mock("../expenses-summary.hook", () => ({
  useExpensesSummary: () => ({
    expensesSum: 25,
  }),
}));

describe("components/expenses-output/components/expenses-summary/<ExpensesSummary />", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders screen properly", () => {
    render(<ExpensesSummary {...mockValues} />);

    expect(screen.getByText("Last 7 days")).toBeTruthy();
    expect(screen.getByText("$25.00")).toBeTruthy();
  });
});
