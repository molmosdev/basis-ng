import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../../../../primitives/src/core/services/theme.service';
import { ResponsiveService } from '../../../../../../primitives/src/core/services/responsive.service';
import { Button, Icon, MenuTrigger } from '@basis-ng/primitives';
import { Menu } from '../../../../../../primitives/src/core/components/menu/menu.component';
import { MenuItemRadioComponent } from '../../../../../../primitives/src/core/components/menu/shared/components/menu-item-radio/menu-item-radio.component';
import { MenuGroupComponent } from '../../../../../../primitives/src/core/components/menu/shared/components/menu-group/menu-group.component';
import { NavigationService } from '../navigation/navigation.service';

@Component({
  selector: 'header',
  imports: [
    RouterLink,
    Icon,
    Button,
    MenuTrigger,
    Menu,
    MenuItemRadioComponent,
    MenuGroupComponent,
    Icon,
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
  navigationService = inject(NavigationService);
  readonly isBottomSheetTriggerVisible = computed(
    () => !this.navigationService.isHomePath()
  );

  readonly theme = computed(() => this.themeService.theme());

  applyTheme(theme: 'light' | 'dark' | 'auto'): void {
    this.themeService.applyTheme(theme);
  }
}
