import { Injectable, Renderer2, RendererFactory2, inject } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  /**
   * Signal representing the current theme.
   *
   * Possible values:
   * - `'light'`: Light theme.
   * - `'dark'`: Dark theme.
   * - `'auto'`: Automatically determine the theme.
   */
  readonly theme = signal<'light' | 'dark' | 'auto'>('auto');

  /**
   * Renderer2 instance for manipulating the DOM.
   * Used to set the `data-theme` attribute on the document root (`<html>`).
   */
  private renderer: Renderer2;

  /**
   * RendererFactory2 instance for creating Renderer2 instances.
   * Injected to create the renderer.
   */
  private rendererFactory = inject(RendererFactory2);

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  /**
   * Applies the specified theme to the document root (`<html>`).
   *
   * @param theme - The theme to apply. Possible values:
   *   - `'light'`: Apply the light theme.
   *   - `'dark'`: Apply the dark theme.
   *   - `'auto'`: Remove the theme attribute and let the system decide.
   */
  applyTheme(theme: 'light' | 'dark' | 'auto'): void {
    this.theme.set(theme);
    if (theme === 'auto') {
      this.removeTheme();
      return;
    }
    this.renderer.setAttribute(document.documentElement, 'data-theme', theme);
  }

  /**
   * Toggles the theme between `'light'` and `'dark'`.
   * If the current theme is `'light'`, it switches to `'dark'`, and vice versa.
   */
  toggleTheme(): void {
    this.applyTheme(this.theme() === 'light' ? 'dark' : 'light');
  }

  /**
   * Removes the `data-theme` attribute from the document body.
   * This is used when the theme is set to `'auto'`.
   */
  removeTheme(): void {
    this.renderer.removeAttribute(document.documentElement, 'data-theme');
  }
}
