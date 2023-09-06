import dayjs from 'dayjs';

export default function getDurations(timeMask: number, date?: string): string[][] {
  const durations: string[][] = [];
  let startTime = null;
  for (let i = 0; i < 24; ++i) {
    if ((timeMask & (1 << i)) === 0) {
      if (startTime === null) continue;
      const hour = Math.floor(i / 2) + 8;
      const minute = (i % 2) * 30;
      durations.push([startTime, dayjs(date).hour(hour).minute(minute).format()]);
      startTime = null;
    } else if (startTime === null) {
      const hour = Math.floor(i / 2) + 8;
      const minute = (i % 2) * 30;
      startTime = dayjs(date).hour(hour).minute(minute).format();
    }
  }
  if (startTime !== null) {
    durations.push([startTime, dayjs(date).hour(20).minute(0).format()]);
  }
  return durations;
}
