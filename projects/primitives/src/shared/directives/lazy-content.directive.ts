import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[b-lazy]',
  standalone: true,
})
export class LazyContentDirective {
  tpl = inject(TemplateRef);
}
