import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { Button } from "../button";

const mockValues = {
  onPress: jest.fn(),
};

const component = <Button {...mockValues}>Teste</Button>;

describe("components/ui/button/<Button />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders component properly", () => {
    render(component);

    expect(screen.getByText("Teste")).toBeTruthy();
  });

  it("calls onPress function when it is pressed", () => {
    render(component);

    fireEvent.press(screen.getByText("Teste"));

    expect(mockValues.onPress).toHaveBeenCalledTimes(1);
  });
});
