import axios from "axios";
import { renderHook } from "@testing-library/react-native";
import MockAdapter from "axios-mock-adapter";

import { firebaseApiUrl, useHttpRequests } from "@services/http";

import { DUMMY_DATA } from "@constants/fixture";

import { DUMMY_FETCH_DATA, DUMMY_FORMATTED_FETCH_DATA } from "./fixture";

const mock = new MockAdapter(axios);

const mockApi = `${firebaseApiUrl}expenses.json`;

const mockApiUpdateDelete = `${firebaseApiUrl}expenses/`;

const expenseId = "3";

describe("services/http/useHttpRequests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("storeExpense", () => {
    it("returns an id when storeExpense is called with an expense", async () => {
      const { result } = renderHook(() => useHttpRequests());

      mock.onPost(mockApi).reply(200, { name: "expenseID" });

      expect(await result.current.storeExpense(DUMMY_DATA[0])).toBe(
        "expenseID",
      );
    });
  });

  describe("fetchExpense", () => {
    it("returns an array of expenses when fetchExpense is called", async () => {
      const { result } = renderHook(() => useHttpRequests());
      mock.onGet(mockApi).reply(200, DUMMY_FETCH_DATA);

      expect(await result.current.fetchExpenses()).toEqual(
        DUMMY_FORMATTED_FETCH_DATA,
      );
    });
  });

  describe("deleteExpense", () => {
    it("deletes an expense when it is requested", async () => {
      const { result } = renderHook(() => useHttpRequests());
      mock
        .onDelete(`${mockApiUpdateDelete}${expenseId}.json`)
        .reply(200, { success: true });

      const request = await result.current.deleteExpense("3");

      expect(request.data.success).toBe(true);
    });
    it("handles errors during deletion", async () => {
      const { result } = renderHook(() => useHttpRequests());
      mock.onDelete(`${mockApiUpdateDelete}${expenseId}.json`).reply(500);

      await expect(result.current.deleteExpense(expenseId)).rejects.toThrow(
        "Request failed with status code 500",
      );
    });
  });

  describe("updateExpense", () => {
    it("does not throw an error when requested", async () => {
      const { result } = renderHook(() => useHttpRequests());

      mock
        .onPut(`${mockApiUpdateDelete}${expenseId}.json`)
        .reply(200, { success: true });

      await expect(
        result.current.updateExpense("3", DUMMY_DATA[0]),
      ).resolves.toBeUndefined();
    });
  });
});
