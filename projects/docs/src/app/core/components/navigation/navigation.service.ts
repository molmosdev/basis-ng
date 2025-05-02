import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  /**
   * Signal to track whether the path is the home path.
   */
  readonly isHomePath = signal(false);
}
