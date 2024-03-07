import React from "react";
import { render, screen } from "@testing-library/react-native";

import { Error } from "../error";

const mockValues = {
  message: "Error",
};

describe("components/ui/button/<Button />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders component properly", () => {
    render(<Error {...mockValues} />);

    expect(screen.getByText("An error occurred!")).toBeTruthy();
    expect(screen.getByText("Error")).toBeTruthy();
  });
});
