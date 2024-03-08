import { act, renderHook } from "@testing-library/react-native";
import { useExpenseListItem } from "../expense-list-item.hook";

const mockId = "5";

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe("components/expenses-output/components/components/expense-list-item/useExpenseListItem", () => {
  beforeEach(() => jest.clearAllMocks());

  it("navigates to ManageExpense screen when expensePressHandler is called", () => {
    const { result } = renderHook(() => useExpenseListItem(mockId));

    act(() => result.current.expensePressHandler());

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("ManageExpense", {
      expenseId: mockId,
    });
  });
});
