// src/lib/formatters.ts

/**
 * Formats a number as a currency string.
 * @param amount The number to format.
 * @param currency The currency code (e.g., 'USD').
 * @returns The formatted currency string.
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

/**
 * Formats a date object into a readable string.
 * @param date The date object to format.
 * @returns The formatted date string.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
