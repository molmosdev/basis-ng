import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../../../primitives/src/core/services/theme.service';
import { HeaderComponent } from './core/components/header/header.component';
import { OverlayTriggerDirective } from 'projects/primitives/src/core/directives/overlay-trigger.directive';
import { OverlayDirective } from 'projects/primitives/src/core/directives/overlay.directive';
import { SelectTrigger } from 'projects/primitives/src/core/components/select-v2/select/components/select-trigger/select-trigger';
import { SelectContent } from 'projects/primitives/src/core/components/select-v2/select/components/select-content/select-content';
import { Select } from 'projects/primitives/src/core/components/select-v2/select/select';
import { SelectValue } from 'projects/primitives/src/core/components/select-v2/select/components/select-value/select-value';
import { Option } from 'projects/primitives/src/shared/components/option.component';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    OverlayDirective,
    OverlayTriggerDirective,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    Option,
    FormsModule,
    JsonPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Basis';
  themeService = inject(ThemeService);
  readonly isMenuVisible = signal(false);
  readonly isThemeConfigVisible = signal(false);
  // Signal para controlar el overlay original
  readonly isOverlayOpen = signal(false);

  // Signals y métodos para los overlays de prueba
  readonly isOverlayOpen1 = signal(false);
  readonly isOverlayOpen2 = signal(false);

  closeOverlay1 = () => this.isOverlayOpen1.set(false);
  closeOverlay2 = () => this.isOverlayOpen2.set(false);

  //  new select
  example: string[] = ['option1'];
}
