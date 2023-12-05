function convertToFraction(num: number): string {
  if (Number.isInteger(num)) return String(Math.round(num));

  const wholeNumberPart = Math.floor(num);
  const decimalPart = num - wholeNumberPart;

  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const denominator: number = 1 / decimalPart;
  const divisor: number = gcd(1, denominator);

  const wholeNumberFraction = wholeNumberPart > 0 ? `${wholeNumberPart} ` : "";

  return wholeNumberFraction + `${1 / divisor}/${denominator / divisor}`;
}

export { convertToFraction };
