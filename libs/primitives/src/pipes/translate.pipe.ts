import { ChangeDetectorRef, Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationManager } from '../services/translation-manager';

/**
 * Pipe to translate keys using the TranslationManager service.
 */
@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  /** TranslationManager instance for handling translations */
  private translationManager = inject(TranslationManager);

  /** ChangeDetectorRef to trigger change detection on language change */
  private cdr = inject(ChangeDetectorRef);

  /** Last language used to detect changes */
  private lastLang: string | undefined;

  /**
   * Transforms a translation key into the corresponding translated string.
   * @param key - The translation key to be translated.
   * @returns The translated string.
   */
  transform(key: string): string {
    const lang = this.translationManager.language();
    if (lang !== this.lastLang) {
      this.lastLang = lang;
      this.cdr.markForCheck();
    }
    return this.translationManager.translate(key);
  }
}
