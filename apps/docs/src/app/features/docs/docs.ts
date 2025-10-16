import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button, Drawer, ResponsiveManager } from '@basis-ng/primitives';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTelescope } from '@ng-icons/lucide';
import { Routes } from '../../core/components/routes';

@Component({
  selector: 'app-documentation',
  imports: [Routes, RouterOutlet, NgTemplateOutlet, Drawer, Button, NgIcon],
  template: `
    @if (isMobile()) {
      <button
        b-button
        class="fixed top-6 right-4 z-30 b-variant-secondary "
        (click)="drawerOpen.set(true)"
      >
        <ng-icon name="lucideTelescope" size="22" color="currentColor" cdkDragHandle />
        Explore
      </button>
      <b-drawer [(isOpen)]="drawerOpen" class="h-[60dvh]">
        <ng-container *ngTemplateOutlet="menu" />
      </b-drawer>
    } @else {
      <ng-container *ngTemplateOutlet="menu" />
    }
    <ng-template #menu>
      <app-routes (navigationEmitter)="drawerOpen.set(false)" />
    </ng-template>
    <router-outlet />
  `,
  host: {
    class: 'flex',
    '[class]': 'isMobile() ? "gap-0" : "gap-5"',
  },
  providers: [
    provideIcons({
      lucideTelescope,
    }),
  ],
})
export class Documentation {
  responsiveManager = inject(ResponsiveManager);
  readonly isMobile = computed(() => this.responsiveManager.currentDevice() === 'mobile');
  readonly drawerOpen = signal(false);
}
