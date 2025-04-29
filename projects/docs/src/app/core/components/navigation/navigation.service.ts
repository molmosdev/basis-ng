import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  /**
   * Signal to track the state of the bottom sheet.
   */
  readonly bottomSheetOpen = signal(false);

  /**
   * Signal to track whether the path is the home path.
   */
  readonly isHomePath = signal(false);
}
