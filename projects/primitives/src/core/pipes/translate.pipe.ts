import { Pipe, PipeTransform, inject, ChangeDetectorRef } from '@angular/core';
import { TranslationManager } from '../services/translation-manager';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private translationManager = inject(TranslationManager);
  private cdr = inject(ChangeDetectorRef);
  private lastLang: string | undefined;

  transform(key: string): string {
    const lang = this.translationManager.language();
    if (lang !== this.lastLang) {
      this.lastLang = lang;
      this.cdr.markForCheck();
    }
    return this.translationManager.translate(key);
  }
}
