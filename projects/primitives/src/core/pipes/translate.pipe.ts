import { Pipe, PipeTransform, inject, ChangeDetectorRef } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private translationService = inject(TranslationService);
  private cdr = inject(ChangeDetectorRef);
  private lastLang: string | undefined;

  transform(key: string): string {
    const lang = this.translationService.language();
    if (lang !== this.lastLang) {
      this.lastLang = lang;
      this.cdr.markForCheck();
    }
    return this.translationService.translate(key);
  }
}
