import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Dictionary type for translations.
 * Maps language codes to key-value pairs of translation strings.
 */
export type TranslationDictionary = Record<string, Record<string, string>>;

/**
 * Service for managing translations and language switching.
 *
 * @remarks
 * - Loads language files via HTTP.
 * - Provides reactive signals for language and dictionary.
 * - Use `translate(key)` to get the translated string for the current language.
 *
 * @example
 * ```typescript
 * translationManager.setLanguage('es');
 * translationManager.translate('home.title');
 * ```
 */
@Injectable({ providedIn: 'root' })
export class TranslationManager {
  /** Current language code. */
  private readonly _language = signal<string>('en');

  /** Dictionary of translations. */
  private readonly _dictionary = signal<TranslationDictionary>({});

  /** Reactive signal for current language. */
  readonly language = computed(() => this._language());

  /** Reactive signal for current dictionary. */
  readonly dictionary = computed(() => this._dictionary());

  /** HttpClient for loading language files. */
  private http = inject(HttpClient);

  /**
   * Sets the current language and loads its dictionary.
   * @param lang - Language code (e.g., 'en', 'es').
   */
  setLanguage(lang: string): void {
    this._language.set(lang);
    this.loadLanguage(lang);
  }

  /**
   * Sets the translation dictionary directly.
   * @param dict - Translation dictionary object.
   */
  setDictionary(dict: TranslationDictionary): void {
    this._dictionary.set(dict);
  }

  /**
   * Translates a key using the current language.
   * @param key - Dot-separated translation key (e.g., 'home.title').
   * @returns Translated string or the key if not found.
   */
  translate(key: string): string {
    const lang = this._language();
    const dict = this._dictionary();
    const value = this.resolveKey(dict[lang], key);
    return value ?? key;
  }

  /**
   * Resolves a dot-separated key in an object.
   * @param obj - Object to resolve key in.
   * @param key - Dot-separated key string.
   * @returns Value or undefined if not found.
   */
  private resolveKey(obj: Record<string, unknown>, key: string): string | undefined {
    if (!obj) return undefined;
    return key
      .split('.')
      .reduce(
        (acc: unknown, part: string) =>
          acc && typeof acc === 'object' && acc !== null && part in acc
            ? (acc as Record<string, unknown>)[part]
            : undefined,
        obj as unknown,
      ) as string | undefined;
  }

  /**
   * Loads a language file via HTTP and updates the dictionary.
   * @param lang - Language code to load.
   */
  loadLanguage(lang: string): void {
    this.http.get<Record<string, string>>(`/lang/${lang}.json`).subscribe({
      next: (translations) => {
        const dict = { ...this._dictionary() };
        dict[lang] = translations;
        this._dictionary.set(dict);
      },
      error: () => {
        // If loading fails, do not update the dictionary
      },
    });
  }
}
