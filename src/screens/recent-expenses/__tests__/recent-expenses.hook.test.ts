import { act, renderHook, waitFor } from "@testing-library/react-native";

import { useRecentExpensesScreen } from "../recent-expenses.hook";
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

const mockSetExpenses = jest.fn();

const mockServiceFetchExpenses = jest.fn();

jest.mock("@services/http", () => ({
  useHttpRequests: () => ({
    fetchExpenses: mockServiceFetchExpenses,
  }),
}));

describe("screens/recent-expenses/UseRecentExpensesScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers().setSystemTime(new Date("2024-03-05 03:00"));

    mockUseContext.mockReturnValue({
      expenses: DUMMY_DATA,
      setExpenses: mockSetExpenses,
    });
  });

  it("navigates to manage expense when handleHeaderButtonPress is called", () => {
    const { result } = renderHook(() => useRecentExpensesScreen());

    act(() => result.current.handleHeaderButtonPress());

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("ManageExpense", {
      expenseId: null,
    });
  });

  it("returns an empty array when there are no expenses that happened less than 7 days ago", () => {
    const { result } = renderHook(() => useRecentExpensesScreen());

    expect(result.current.recentExpenses).toEqual([]);
  });

  it("returns an array with the expenses that happened less than 7 days ago", () => {
    const newDummyData = [
      ...DUMMY_DATA,
      {
        id: "3",
        description: "Description 3",
        amount: 555,
        date: new Date("2024-03-06 03:00"),
      },
    ];

    mockUseContext.mockReturnValueOnce({
      expenses: newDummyData,
    });

    const { result } = renderHook(() => useRecentExpensesScreen());

    expect(result.current.recentExpenses).toEqual([newDummyData[2]]);
  });

  it("calls http request and save the data to the context when the hook is called", async () => {
    mockServiceFetchExpenses.mockResolvedValue(DUMMY_DATA);
    renderHook(() => useRecentExpensesScreen());

    await waitFor(() => expect(mockSetExpenses).toHaveBeenCalledTimes(2));
  });

  it("throws an error when http request fails", async () => {
    mockServiceFetchExpenses.mockRejectedValue("Error");

    const { result, rerender } = renderHook(() => useRecentExpensesScreen());

    await act(() => rerender(2));

    expect(mockSetExpenses).not.toHaveBeenCalledTimes(1);

    expect(result.current.error).toBe("Could not fetch expenses!");
  });
});
