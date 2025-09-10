import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '@basis-ng/primitives';
import { provideIcons } from '@ng-icons/core';
import { lucideMoon, lucideSun, lucideSunMoon } from '@ng-icons/lucide';

@Component({
  selector: 'app-theme-selector',
  imports: [],
  template: ``,
  providers: [provideIcons({ lucideMoon, lucideSun, lucideSunMoon })],
})
export class ThemeSelector {
  themeService = inject(ThemeService);
  readonly theme = computed(() => this.themeService.theme());

  applyTheme(theme: 'light' | 'dark' | 'auto'): void {
    this.themeService.applyTheme(theme);
  }
}
