import type { ParsedUrlQuery } from 'querystring';

export default function parseDate({ date: dateStrings }: ParsedUrlQuery): Date | null {
  if (dateStrings === undefined) return null;
  const date = new Date(dateStrings[0]);
  if (!(date instanceof Date)) return null;
  if (isNaN(date.getTime())) return null;
  return date;
}
