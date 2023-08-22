export default function getCategory(asPath: string): string {
  return asPath.split('/')[1];
}
