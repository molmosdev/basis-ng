import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  debounceTimer: any;

  /**
   * Debounce with optional delay
   * @param {any} func - The function to debounce
   * @param {any} delay - The delay in milliseconds
   */
  debounce(func: any, delay: any): void {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(func, delay);
  }

  /**
   * Stop debounce
   */
  stopDebounce(): void {
    clearTimeout(this.debounceTimer);
  }
}
