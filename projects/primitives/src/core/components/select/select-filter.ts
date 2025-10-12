import { Directive, ElementRef, inject, OnInit } from '@angular/core';

@Directive({
  selector: '[bSelectFilter]',
  host: {
    '(blur)': 'el.nativeElement.focus()',
  },
})
export class SelectFilter implements OnInit {
  el = inject(ElementRef);

  ngOnInit(): void {
    this.el.nativeElement.focus();
  }
}
