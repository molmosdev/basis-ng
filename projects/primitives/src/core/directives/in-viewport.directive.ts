import { Directive, ElementRef, inject, input, OnDestroy } from '@angular/core';
import { afterNextRender } from '@angular/core'; // Importante
import { InViewportService } from '../services/in-viewport.service';

@Directive({
  selector: '[b-in-viewport]',
})
export class InViewportDirective implements OnDestroy {
  readonly inViewportId = input.required<string>();
  readonly inViewportInitialVisibility = input<boolean>(false);
  el = inject(ElementRef);
  inViewportService = inject(InViewportService);

  constructor() {
    afterNextRender({
      write: () => {
        this.inViewportService.registerElement(
          this.inViewportId(),
          this.el.nativeElement,
          this.inViewportInitialVisibility()
        );
      },
    });
  }

  ngOnDestroy(): void {
    this.inViewportService.unregisterElement(this.inViewportId());
  }
}
