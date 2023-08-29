import dayjs from 'dayjs';

export default function getISODate(date: string): string {
  return dayjs(date).format('YYYY-MM-DD');
}
