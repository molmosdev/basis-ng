import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../../../../primitives/src/core/services/theme.service';
import { ResponsiveService } from '../../../../../../primitives/src/core/services/responsive.service';
import {
  Button,
  MenuComponent,
  MenuTriggerDirective,
} from '@basis-ng/primitives';
import { MenuItemRadioComponent } from '../../../../../../primitives/src/core/components/menu/shared/components/menu-item-radio/menu-item-radio.component';
import { MenuGroupComponent } from '../../../../../../primitives/src/core/components/menu/shared/components/menu-group/menu-group.component';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { lucideMoon, lucideSun, lucideSunMoon } from '@ng-icons/lucide';

@Component({
  selector: 'header',
  imports: [
    RouterLink,
    Button,
    MenuTriggerDirective,
    MenuComponent,
    MenuItemRadioComponent,
    MenuGroupComponent,
    NgIcon,
  ],
  templateUrl: './header.component.html',
  providers: [provideIcons({ lucideMoon, lucideSun, lucideSunMoon })],
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  responsiveService = inject(ResponsiveService);
  readonly isDesktop = computed(
    () => this.responsiveService.currentDevice() === 'desktop'
  );
  readonly theme = computed(() => this.themeService.theme());

  applyTheme(theme: 'light' | 'dark' | 'auto'): void {
    this.themeService.applyTheme(theme);
  }
}
