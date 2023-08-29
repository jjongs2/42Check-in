export default function getHoursIndex(time: Date): number {
  const hours = time.getHours() + time.getMinutes() / 60;
  return (hours - 8) * 2;
}
