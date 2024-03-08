import React from "react";
import { render, screen } from "@testing-library/react-native";

import { ExpensesList } from "../expenses-list";
import { DUMMY_DATA } from "@constants/fixture";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("components/expenses-outputs/components/<ExpensesList />", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders component properly", () => {
    render(<ExpensesList expenses={DUMMY_DATA} />);

    expect(
      screen.getByTestId(
        "components.expenses-output.components.expenses-list.flatlist",
      ),
    ).toBeTruthy();
  });
});
