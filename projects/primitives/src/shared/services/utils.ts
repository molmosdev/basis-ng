import { Injectable } from '@angular/core';

/**
 * Utility service for common operations.
 */
@Injectable({
  providedIn: 'root',
})
export class Utils {
  private debounceTimers = new Map<string, any>();

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
}
