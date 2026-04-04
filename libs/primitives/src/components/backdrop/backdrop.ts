import { booleanAttribute, Component, computed, input, model, output } from '@angular/core';

/**
 * A full-viewport backdrop layer that can dim background content behind projected overlays.
 */
@Component({
  selector: 'b-backdrop',
  template: `
    <div class="b-backdrop-layer" [style.opacity]="opacity()" (click)="handleBackdropClick()"></div>
    <ng-content />
  `,
  host: {
    '[class.b-open]': 'isOpen()',
    '[class.b-animated]': 'animated()',
  },
})
export class Backdrop {
  /**
   * Whether the backdrop is active.
   */
  readonly isOpen = model(false);

  /**
   * Optional open progress from 0 (open) to 100 (closed).
   */
  readonly progress = input<number | null>(null);

  /**
   * Maximum darkness applied when fully open.
   */
  readonly maxOpacity = input(0.14);

  /**
   * Whether clicking the backdrop closes it automatically.
   */
  readonly closeOnClick = input(true, { transform: booleanAttribute });

  /**
   * Whether opacity changes should animate.
   */
  readonly animated = input(true, { transform: booleanAttribute });

  /**
   * Emitted whenever the backdrop surface is clicked.
   */
  readonly backdropClick = output<void>();

  /**
   * Current effective opacity based on explicit progress or open state.
   */
  readonly opacity = computed(() => {
    const progress = this.progress();

    if (progress === null) {
      return this.isOpen() ? this.maxOpacity() : 0;
    }

    return ((100 - progress) / 100) * this.maxOpacity();
  });

  handleBackdropClick() {
    this.backdropClick.emit();

    if (this.closeOnClick()) {
      this.isOpen.set(false);
    }
  }
}
