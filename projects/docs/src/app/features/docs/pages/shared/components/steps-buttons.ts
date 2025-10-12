import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@basis-ng/primitives';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { lucideArrowLeft, lucideArrowRight } from '@ng-icons/lucide';

interface StepButtonConfig {
  label: string;
  path: string;
}

@Component({
  selector: 'app-steps-buttons',
  imports: [Button, RouterLink, NgIcon],
  template: `
    @if (previous()) {
      <button
        b-button
        [routerLink]="previous()?.path"
        class="justify-start b-variant-secondary">
        <ng-icon
          name="lucideArrowLeft"
          size="14"
          color="currentColor"
          class="-ml-0.5" />
        {{ previous()?.label }}
      </button>
    }
    @if (next()) {
      <button
        b-button
        [routerLink]="next()?.path"
        class="justify-end b-variant-secondary">
        {{ next()?.label }}
        <ng-icon
          name="lucideArrowRight"
          size="14"
          color="currentColor"
          class="-mr-0.5" />
      </button>
    }
  `,
  providers: [provideIcons({ lucideArrowLeft, lucideArrowRight })],
  host: {
    '[class]': '"flex " + alignClasses()',
  },
})
export class StepsButtons {
  readonly previous = input<StepButtonConfig | undefined>();
  readonly next = input<StepButtonConfig | undefined>();
  readonly alignClasses = computed(() => {
    if (!this.previous() && this.next()) {
      return 'justify-end';
    } else if (this.previous() && !this.next()) {
      return 'justify-start';
    } else {
      return 'justify-between';
    }
  });
}
