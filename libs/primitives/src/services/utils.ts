import { Injectable } from '@angular/core';

/**
 * Utility service for common operations.
 */
@Injectable({
  providedIn: 'root',
})
export class Utils {
  private debounceTimers = new Map<string, ReturnType<typeof setTimeout>>();

  /**
   * Executes a function after a delay, canceling any previous calls with the same key.
   *
   * @param key - Unique key to identify the debounce timer.
   * @param func - The function to debounce.
   * @param delay - The delay in milliseconds before executing the function.
   */
  debounce(key: string, func: () => void, delay: number): void {
    clearTimeout(this.debounceTimers.get(key));
    this.debounceTimers.set(key, setTimeout(func, delay));
  }

  /**
   * Cancels the debounce timer for a specific key.
   *
   * @param key - Unique key to identify the debounce timer.
   */
  stopDebounce(key: string): void {
    clearTimeout(this.debounceTimers.get(key));
    this.debounceTimers.delete(key);
  }

  /**
   * Generates a simple UUID.
   *
   * @returns A string representing a UUID.
   */
  generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0; // Random integer between 0 and 15
      const v = c === 'x' ? r : (r & 0x3) | 0x8; // Version 4 UUID
      return v.toString(16);
    });
  }
}
