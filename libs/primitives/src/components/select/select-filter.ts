import { Directive, ElementRef, inject, OnInit } from '@angular/core';

/**
 * Directive to automatically focus the select filter input when it is initialized.
 */
@Directive({
  selector: '[bSelectFilter]',
  host: {
    '(blur)': 'el.nativeElement.focus()',
  },
})
export class SelectFilter implements OnInit {
  /**
   * Element reference used to focus the filter input.
   */
  el = inject(ElementRef);

  ngOnInit(): void {
    this.el.nativeElement.focus();
  }
}
