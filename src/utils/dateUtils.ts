import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import isValid from 'date-fns/isValid';

const DateFormatToken = {
  //  Apr 20, 2020
  LITERAL_MONTH_NUMERIC_DAY_COMMA_FULL_YEAR: 'MMM dd yyyy, HH:mm',
} as const;

type DateFormatTokenType = typeof DateFormatToken[keyof typeof DateFormatToken];

function toDate(date: Date | string): Date {
  return typeof date === 'string' ? parseISO(date) : date;
}

export function formatDate(
  givenDate: Date | string,
  token: DateFormatTokenType = DateFormatToken.LITERAL_MONTH_NUMERIC_DAY_COMMA_FULL_YEAR
): string {
  const date = toDate(givenDate);

  if (!isValid(date)) {
    return '';
  }

  return format(date, token);
}

export function formatISO(givenDate: string): string {
  return new Date(givenDate).toISOString();
}
