/**
 * Utilities barrel export
 *
 * This module re-exports all shared utility functions:
 *
 * - formatting     Number and string formatting utilities
 * - validation     Input validation helpers
 * - random         Random number generation utilities
 * - constants      Application constants
 */

// Utility functions will be exported here
// export * from './formatting';
// export * from './validation';
// export * from './random';
// export * from './constants';

/**
 * Generate a unique ID for game entities
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Clamp a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Format a percentage value for display
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format a ratio for display (e.g., "4:1")
 */
export function formatRatio(value: number): string {
  if (value >= 1) {
    return `${value.toFixed(1)}:1`;
  }
  return `1:${(1 / value).toFixed(1)}`;
}

/**
 * Delay execution for a specified number of milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
