import {
  formatDate,
  getDayMinusDays,
  getFormattedDate,
  getMonthName,
} from "@utils/date";

describe("utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getMonthName", () => {
    it("returns the name of the month correctly", () => {
      expect(getMonthName(5)).toBe("June");
      expect(getMonthName(8)).toBe("September");

      expect(getMonthName(1)).not.toBe("January");
    });
  });

  describe("formatName", () => {
    it("returns the same date number when it is between 0 and 9", () => {
      expect(formatDate("1")).toBe("01");
      expect(formatDate("9")).toBe("09");
      expect(formatDate("15")).toBe("15");

      expect(formatDate("5")).not.toBe("5");
      expect(formatDate("14")).not.toBe("014");
    });
  });

  describe("getFormattedDate", () => {
    it("returns a formatted date", () => {
      expect(getFormattedDate(new Date("2015-10-14 03:00"))).toBe(
        "14 / October / 2015",
      );
    });
  });

  describe("getDayMinusDays", () => {
    it("returns the date after subtracts a number of days", () => {
      expect(
        getFormattedDate(getDayMinusDays(new Date("2015-10-14 03:00"), 2)),
      ).toBe(`12 / October / 2015`);
    });
  });
});
