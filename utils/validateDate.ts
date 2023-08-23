import type { ParsedUrlQuery } from 'querystring';

export default function validateDate(query: ParsedUrlQuery): Date | null {
  const { date } = query;
  if (date === undefined) return null;
  const currentDate = new Date(date[0]);
  if (!(currentDate instanceof Date)) return null;
  if (isNaN(currentDate.getTime())) return null;
  return currentDate;
}
