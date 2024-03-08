import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import {
  storeExpense,
  firebaseApiUrl,
  fetchExpenses,
  deleteExpense,
} from "@services/http";

import { DUMMY_DATA } from "@constants/fixture";

import { DUMMY_FETCH_DATA, DUMMY_FORMATTED_FETCH_DATA } from "./fixture";

const mock = new MockAdapter(axios);

const mockApi = `${firebaseApiUrl}expenses.json`;

const mockApiUpdateDelete = `${firebaseApiUrl}expenses/`;

const expenseId = "3";

describe("services/http", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("storeExpense", () => {
    it("returns an id when storeExpense is called with an expense", async () => {
      mock.onPost(mockApi).reply(200, { name: "expenseID" });

      expect(await storeExpense(DUMMY_DATA[0])).toBe("expenseID");
    });
  });

  describe("fetchExpense", () => {
    it("returns an array of expenses when fetchExpense is called", async () => {
      mock.onGet(mockApi).reply(200, DUMMY_FETCH_DATA);

      expect(await fetchExpenses()).toEqual(DUMMY_FORMATTED_FETCH_DATA);
    });
  });

  describe("deleteExpense", () => {
    it("deletes an expense when it is requested", async () => {
      mock
        .onDelete(`${mockApiUpdateDelete}${expenseId}.json`)
        .reply(200, { success: true });

      const result = await deleteExpense("3");

      expect(result.data.success).toBe(true);
    });
    it("handles errors during deletion", async () => {
      mock.onDelete(`${mockApiUpdateDelete}${expenseId}.json`).reply(500);

      await expect(deleteExpense(expenseId)).rejects.toThrow(
        "Request failed with status code 500",
      );
    });
  });
});
