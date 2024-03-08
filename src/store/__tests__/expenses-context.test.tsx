import { expensesReducer } from "../expenses-context";

import { ReducerActionsCases } from "@store/types";

import { ExpensesProps } from "@typings/data";

import { DUMMY_DATA } from "@constants/fixture";

const initialState: ExpensesProps[] = [];

describe("expensesReducer", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(global.Math, "random").mockReturnValue(0.5);
    jest.useFakeTimers().setSystemTime(new Date("2020-01-01 03:00"));
  });

  it("adds an expense to the state", () => {
    const action = {
      type: ReducerActionsCases.ADD,
      payload: { ...DUMMY_DATA[0], date: new Date("2020-01-01 03:00") },
    };

    const newState = expensesReducer(initialState, action);

    expect(newState).toHaveLength(1);
    expect(newState).toEqual([
      {
        id: "Wed Jan 01 2020 03:00:00 GMT-0300 (Brasilia Standard Time)0.5",
        description: "Description 1",
        amount: 10,
        date: new Date("2020-01-01 03:00"),
      },
    ]);
  });

  it("updates an expense from the state", () => {
    const initialState: ExpensesProps[] = DUMMY_DATA;

    const action = {
      type: ReducerActionsCases.UPDATE,
      payload: { ...DUMMY_DATA[0], amount: 666 },
    };

    const newState = expensesReducer(initialState, action);

    expect(newState).toHaveLength(2);
    expect(newState).toEqual([
      {
        id: "1",
        description: "Description 1",
        amount: 666,
        date: new Date("2020-10-10"),
      },
      {
        id: "2",
        description: "Description 2",
        amount: 15,
        date: new Date("2020-10-10"),
      },
    ]);
  });

  it("deletes an expense from the state", () => {
    const initialState: ExpensesProps[] = DUMMY_DATA;

    const action = {
      type: ReducerActionsCases.DELETE,
      payload: DUMMY_DATA[0],
    };

    const newState = expensesReducer(initialState, action);

    expect(newState).toHaveLength(1);
    expect(newState).toStrictEqual([DUMMY_DATA[1]]);
  });

  it("sets expenses to show in the screen", () => {
    const initialState: ExpensesProps[] = [];

    const action = {
      type: ReducerActionsCases.SET,
      payload: DUMMY_DATA[0],
    };

    const newState = expensesReducer(initialState, action);

    expect(newState).toHaveLength(1);
    expect(newState).toEqual([DUMMY_DATA[0]]);

    const updatedState = expensesReducer(newState, action);

    expect(updatedState).toHaveLength(1);
    expect(updatedState).toEqual([DUMMY_DATA[0]]);

    const newAction = {
      type: ReducerActionsCases.SET,
      payload: DUMMY_DATA[1],
    };

    const newerUpdatedState = expensesReducer(updatedState, newAction);

    expect(newerUpdatedState).toHaveLength(2);
    expect(newerUpdatedState).toEqual(DUMMY_DATA);
  });
});
