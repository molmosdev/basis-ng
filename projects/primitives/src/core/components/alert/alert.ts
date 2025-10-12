import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideX } from '@ng-icons/lucide';

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
  readonly title = input<string | null>(null);
  readonly icon = input<string | null>(null);
  readonly dismissible = input(false);
  readonly dismissed = output<void>();

  dismiss(): void {
    this.dismissed.emit();
  }
}
