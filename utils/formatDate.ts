export default function formatDate(date = new Date()): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const localDate = date.toLocaleString('ko-KR', options);
  return localDate.replaceAll('. ', '-').slice(0, -1);
}
