import { act, renderHook } from "@testing-library/react-native";
import { useAllExpensesScreen } from "../all-expenses.hook";
import { DUMMY_DATA } from "@constants/fixture";

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const mockUseContext = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: () => mockUseContext(),
}));

describe("screens/all-expenses/useAllExpensesScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseContext.mockReturnValue({ expenses: DUMMY_DATA });
  });

  it("navigates to ManageExpenses without parameters when handleHeaderButtonPress is called", () => {
    const { result } = renderHook(() => useAllExpensesScreen());

    act(() => result.current.handleHeaderButtonPress());

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("ManageExpense", {
      expenseId: null,
    });
  });

  it("returns expenses from context", () => {
    const { result } = renderHook(() => useAllExpensesScreen());

    expect(result.current.expenses).toEqual(DUMMY_DATA);
  });
});
