export default (date: Date): string => (
  String(date)
    .split('-')
    .reverse()
    .join('/')
);
