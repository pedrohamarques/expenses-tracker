import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Input } from "../input";

describe("components/expense-form/components/input/<Input />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders component properly", () => {
    render(<Input label="Label" />);

    expect(screen.getByText("Label")).toBeTruthy();
    expect(
      screen.getByTestId(
        "components.expense-form.components.input.text-input.",
      ),
    ).toBeTruthy();
  });
});
