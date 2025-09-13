import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Routes } from '../../core/components/routes';

@Component({
  selector: 'app-documentation',
  imports: [Routes, RouterOutlet],
  template: `
    <!-- <aside app-navigation></aside> -->
    <app-routes
      class="max-h-[calc(100vh-5rem)] overflow-y-scroll sticky top-20 scroll-0 no-scrollbar pl-4 pb-4" />
    <router-outlet />
  `,
  host: {
    class: 'flex gap-5',
  },
})
export class Documentation {}
