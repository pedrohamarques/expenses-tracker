export const DUMMY_FETCH_DATA = {
  id1: {
    amount: "10",
    date: "2020-10-10 03:00",
    description: "Description 1",
  },
  id2: {
    amount: "5",
    date: "2022-10-10 03:00",
    description: "Description 2",
  },
};

export const DUMMY_FORMATTED_FETCH_DATA = [
  {
    id: "id1",
    amount: "10",
    date: new Date("2020-10-10 03:00"),
    description: "Description 1",
  },
  {
    id: "id2",
    amount: "5",
    date: new Date("2022-10-10 03:00"),
    description: "Description 2",
  },
];
