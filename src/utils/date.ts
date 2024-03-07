const MONTHS = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export function getMonthName(month: number) {
  const keys = Object.keys(MONTHS);
  return keys[month];
}

export function formatDate(date: string) {
  if (date.length === 1) {
    return "0" + date;
  }

  return date;
}

export function getFormattedDate(date: Date) {
  console.log(date);
  return `${formatDate(String(date.getDate()))} / ${getMonthName(date.getMonth())} / ${date.getFullYear()}`;
}

export function getDayMinusDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
