import type { ParsedUrlQuery } from 'querystring';

export default function parseDate({ date: dateString }: ParsedUrlQuery): Date | null {
  if (typeof dateString !== 'string') return null;
  const date = new Date(dateString);
  if (!(date instanceof Date)) return null;
  if (isNaN(date.getTime())) return null;
  return date;
}
