export function padZero(n: number) {
  return n > 0 && n < 10 ? String(n).padStart(2, '0') : n;
}
