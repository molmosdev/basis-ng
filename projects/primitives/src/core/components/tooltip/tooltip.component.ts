import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, signal, TemplateRef } from '@angular/core';
import { Direction } from '../../../shared/types/direction.type';

/**
 * Tooltip component used to display content or templates in a tooltip overlay.
 */
@Component({
  selector: 'b-tooltip',
  standalone: true,
  template: `
    @if (isString()) {
      {{ content() }}
    } @else {
      <ng-container *ngTemplateOutlet="template()" />
    }
  `,
  imports: [NgTemplateOutlet],
  host: {
    '[class]': '"b-tooltip-" + direction() + " size-" + size()',
    '[class.b-tooltip-leave]': 'leaving()',
  },
})
export class TooltipComponent {
  /**
   * Specifies the size of the tooltip.
   *
   * @defaultValue '2'
   */
  readonly size = signal<'1' | '2' | '3'>('2');

  /**
   * Direction of the tooltip (e.g., top, bottom, left, right).
   */
  readonly direction = signal<Direction | undefined>(undefined);

  /**
   * Indicates whether the tooltip is leaving (for animation purposes).
   */
  readonly leaving = signal(false);

  /**
   * Content of the tooltip, which can be a string or a template.
   */
  readonly content = signal<string | TemplateRef<any>>('');

  /**
   * Determines if the content is a string.
   */
  readonly isString = computed(() => typeof this.content() === 'string');

  /**
   * Returns the template if the content is not a string.
   */
  readonly template = computed(() => {
    if (this.isString()) {
      return null;
    }
    return this.content() as TemplateRef<any>;
  });
}
