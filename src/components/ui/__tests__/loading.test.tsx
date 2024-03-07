import React from "react";
import { render, screen } from "@testing-library/react-native";

import { Loading } from "../loading";

describe("components/ui/loading/<Loading />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders component properly", () => {
    render(<Loading />);

    expect(
      screen.getByTestId("components.ui.loading.activity-indicator"),
    ).toBeTruthy();
  });
});
