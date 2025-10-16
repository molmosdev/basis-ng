import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideX } from '@ng-icons/lucide';

/**
 * Displays an alert with optional title, icon and a dismiss button.
 */
@Component({
  selector: 'b-alert',
  template: `
    @if (icon()) {
      <div class="icon">
        <ng-icon [name]="icon()!" size="20" color="currentColor" />
      </div>
    }
    <div class="content">
      @if (title()) {
        <div class="title">{{ title() }}</div>
      }
      <div class="body">
        <ng-content />
      </div>
    </div>
    @if (dismissible()) {
      <button class="close-btn" (click)="dismiss()" aria-label="Close">
        <ng-icon name="lucideX" size="16" color="currentColor" />
      </button>
    }
  `,
  imports: [NgIcon],
  providers: [provideIcons({ lucideX })],
})
export class Alert {
  /**
   * Alert title text. Rendered when provided.
   */
  readonly title = input<string | null>(null);

  /**
   * Icon name to display to the left of the content.
   */
  readonly icon = input<string | null>(null);

  /**
   * Whether the alert shows a dismiss button.
   */
  readonly dismissible = input(false);

  /**
   * Emitted when the alert is dismissed.
   */
  readonly dismissed = output<void>();

  /**
   * Emit the dismissed event.
   */
  dismiss(): void {
    this.dismissed.emit();
  }
}
