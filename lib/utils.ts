import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

/** Calcula HUT de NC: 3% sobre (precio - trade-in), sin tope */
export function calcHUT(price: number, tradeIn = 0): number {
  const taxable = Math.max(0, price - tradeIn);
  return taxable * 0.03;
}

/** Calcula pago mensual */
export function calcMonthlyPayment(
  price: number,
  downPayment: number,
  annualRate: number,
  termMonths: number
): number {
  const principal = price - downPayment;
  if (principal <= 0) return 0;
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / termMonths;
  return (principal * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
}

/** Calcula oferta recomendada al vendedor */
export function calcDealerOffer(
  marketPrice: number,
  mileage: number,
  condition: "excellent" | "good" | "fair" | "poor"
): number {
  const conditionFactor = {
    excellent: 0.88,
    good: 0.82,
    fair: 0.75,
    poor: 0.67,
  }[condition];

  let mileageFactor = 1;
  if (mileage < 30000) mileageFactor = 1.0;
  else if (mileage < 60000) mileageFactor = 0.97;
  else if (mileage < 100000) mileageFactor = 0.93;
  else if (mileage < 150000) mileageFactor = 0.87;
  else mileageFactor = 0.78;

  return marketPrice * conditionFactor * mileageFactor;
}
