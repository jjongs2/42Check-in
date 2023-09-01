import dayjs from 'dayjs';

export default function getISODate(date: string = undefined): string {
  return dayjs(date).format('YYYY-MM-DD');
}
