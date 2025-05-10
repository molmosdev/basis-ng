import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../../../../primitives/src/core/services/theme.service';
import { ResponsiveService } from '../../../../../../primitives/src/core/services/responsive.service';
import {
  ButtonComponent,
  IconComponent,
  MenuComponent,
  MenuTrigger,
} from '@basis-ng/primitives';
import { MenuItemRadioComponent } from '../../../../../../primitives/src/core/components/menu/shared/components/menu-item-radio/menu-item-radio.component';
import { MenuGroupComponent } from '../../../../../../primitives/src/core/components/menu/shared/components/menu-group/menu-group.component';

@Component({
  selector: 'header',
  imports: [
    RouterLink,
    ButtonComponent,
    MenuTrigger,
    MenuComponent,
    MenuItemRadioComponent,
    MenuGroupComponent,
    IconComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
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
