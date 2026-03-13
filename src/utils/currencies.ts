/**
 * Formats a number as INR currency.
 * Conversion rate: 1 USD = 80 INR
 */
export const formatCurrency = (amount: number): string => {
  const inrAmount = amount * 80;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(inrAmount);
};

export const convertToINR = (amount: number): number => {
  return amount * 80;
};
