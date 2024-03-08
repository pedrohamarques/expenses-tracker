import { renderHook } from "@testing-library/react-native";
import { useExpensesSummary } from "../expenses-summary.hook";

import { DUMMY_DATA } from "@constants/fixture";

describe("components/expenses-output/components/expenses-summary/useExpensesSummary", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returnes the sum of expenses", () => {
    const { result } = renderHook(() => useExpensesSummary(DUMMY_DATA));

    expect(result.current.expensesSum).toBe(25);
  });
});
