import { act, renderHook } from "@testing-library/react-native";
import { useManageExpenseScreen } from "../manage-expense.hook";
import { DUMMY_DATA } from "@constants/fixture";

const mockGoBack = jest.fn();

const mockRouteParams = {
  params: {
    expenseId: "1",
  },
};

const mockUseRoute = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useRoute: () => mockUseRoute(),
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
}));

const mockUseContext = jest.fn();
const mockDeleteExpense = jest.fn();
const mockUpdateExpense = jest.fn();
const mockAddExpense = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: () => mockUseContext(),
}));

const mockServiceDeleteExpense = jest.fn();
const mockServiceUpdateExpense = jest.fn();
const mockServiceStoreExpense = jest.fn();

jest.mock("@services/http", () => ({
  useHttpRequests: () => ({
    deleteExpense: mockServiceDeleteExpense,
    updateExpense: mockServiceUpdateExpense,
    storeExpense: mockServiceStoreExpense,
  }),
}));

describe("screens/manage-expense/useManageExpenseScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseContext.mockReturnValue({
      deleteExpense: mockDeleteExpense,
      updateExpense: mockUpdateExpense,
      addExpense: mockAddExpense,
      expenses: DUMMY_DATA,
    });
    mockUseRoute.mockReturnValue(mockRouteParams);
  });

  it("deletes a expense when deleteExpenseHandler is called and there is an expense and expenseId", async () => {
    const { result } = renderHook(() => useManageExpenseScreen());

    await act(async () => result.current.deleteExpenseHandler());

    expect(mockServiceDeleteExpense).toHaveBeenCalledTimes(1);
    expect(mockDeleteExpense).toHaveBeenCalledTimes(1);
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it("does not do anything when deleteExpenseHandler is called and there is not an expense and/or expenseId", async () => {
    const mockRouteParams = {
      params: {
        expenseId: "3",
      },
    };
    mockUseRoute.mockReturnValueOnce(mockRouteParams);

    const { result } = renderHook(() => useManageExpenseScreen());

    await act(async () => result.current.deleteExpenseHandler());

    expect(mockServiceDeleteExpense).not.toHaveBeenCalled();
    expect(mockDeleteExpense).not.toHaveBeenCalled();
    expect(mockGoBack).not.toHaveBeenCalled();
  });

  it("throws an error when expenseDeleted cannot be called", async () => {
    mockServiceDeleteExpense.mockRejectedValueOnce("Error");

    const { result } = renderHook(() => useManageExpenseScreen());

    await act(async () => result.current.deleteExpenseHandler());

    expect(mockGoBack).not.toHaveBeenCalled();
    expect(mockDeleteExpense).not.toHaveBeenCalled();

    expect(result.current.error).toBe(
      "Could not delete expense - please try again later.",
    );
  });

  it("navigates to previous screen when cancelHandler is called", async () => {
    const { result } = renderHook(() => useManageExpenseScreen());

    await act(async () => result.current.cancelHandler());

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it("updates the expense when confirmHandler is called when it is editing an expense", async () => {
    const { result } = renderHook(() => useManageExpenseScreen());

    await act(async () => result.current.confirmHandler(DUMMY_DATA[0]));

    expect(mockServiceUpdateExpense).toHaveBeenCalledTimes(1);
    expect(mockUpdateExpense).toHaveBeenCalledTimes(1);

    expect(mockServiceStoreExpense).not.toHaveBeenCalled();
    expect(mockAddExpense).not.toHaveBeenCalled();

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it("add the expense when confirmHandler is called when it is not editing an expense", async () => {
    mockUseRoute.mockReturnValueOnce({ params: { expenseId: null } });

    const { result } = renderHook(() => useManageExpenseScreen());

    await act(async () => result.current.confirmHandler(DUMMY_DATA[0]));

    expect(mockServiceUpdateExpense).not.toHaveBeenCalled();
    expect(mockUpdateExpense).not.toHaveBeenCalled();

    expect(mockServiceStoreExpense).toHaveBeenCalledTimes(1);
    expect(mockAddExpense).toHaveBeenCalledTimes(1);
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it("throws an error when updateExpense or storeExpense cannot be called", async () => {
    mockServiceUpdateExpense.mockRejectedValueOnce("Error");

    const { result } = renderHook(() => useManageExpenseScreen());

    await act(async () => result.current.confirmHandler(DUMMY_DATA[0]));

    expect(mockGoBack).not.toHaveBeenCalled();
    expect(mockUpdateExpense).toHaveBeenCalledTimes(1);

    expect(result.current.error).toBe(
      "Could not save data. Please try again later!",
    );
  });
});
