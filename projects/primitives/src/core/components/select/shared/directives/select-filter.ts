import { Directive, ElementRef, inject, OnInit } from '@angular/core';

/**
 * Adds automatic focus and blur behavior to a select filter input element.
 *
 * Applies focus on initialization and refocuses on blur events.
 */
@Directive({
  selector: '[bSelectFilter]',
  host: {
    '(blur)': 'el.nativeElement.focus()',
  },
})
export class SelectFilter implements OnInit {
  /**
   * Reference to the host DOM element.
   */
  el = inject(ElementRef);

  /**
   * Sets focus to the host element when the directive initializes.
   */
  ngOnInit(): void {
    this.el.nativeElement.focus();
  }
}
