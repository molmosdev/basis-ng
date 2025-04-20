import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InViewportService {
  readonly elements = signal<Record<string, boolean>>({});
  observer!: IntersectionObserver;

  /**
   * Register an element to be tracked by the service.
   * @param {string} id - The id of the element to register.
   */
  registerElement(
    id: string,
    nativeElement: HTMLElement,
    initialVisibility: boolean
  ): void {
    if (!(id in this.elements())) {
      this.elements.set({ ...this.elements(), [id]: initialVisibility });

      // Create an IntersectionObserver to track the element's visibility.
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const isVisible = entry.isIntersecting;
          this.updateElementVisibility(id, isVisible);
        });
      });

      // Start observing the element.
      this.observer.observe(nativeElement);
    }
  }

  /**
   * Unregister an element from being tracked by the service.
   * @param {string} id - The id of the element to unregister.
   */
  unregisterElement(id: string): void {
    if (id in this.elements()) {
      delete this.elements()[id];
      this.observer.disconnect();
    }
  }

  /**
   * Update the visibility of an element.
   * @param {string} id - The id of the element to update.
   * @param {boolean} isVisible - The new visibility state of the element.
   */
  updateElementVisibility(id: string, isVisible: boolean): void {
    this.elements.set({ ...this.elements(), [id]: isVisible });
  }
}
