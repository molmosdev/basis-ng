import { Component, signal } from '@angular/core';
import { componentsRoutes } from './documentation/pages/components/components.routes';
import { Route } from '@angular/router';

@Component({
  selector: 'app-get-started',
  imports: [],
  template: `
    <h1 class="font-bold text-2xl">Components</h1>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      @for (route of routes(); track route.title) {
        @if (route.data?.['title']) {
          <div
            class="p-4 relative h-30 inset-ring-1 inset-ring-secondary bg-primary/5 hover:bg-primary/10 dark:inset-ring-secondary-dark dark:bg-primary-dark/5 dark:hover:bg-primary-dark/10 rounded-lg transition-all duration-150 cursor-pointer">
            <h2>{{ route.data?.['title'] }}</h2>
            @if (route.data?.['new']) {
              <span
                class="absolute top-2 right-2 bg-primary/5 dark:bg-primary-dark/5 text-xs font-semibold px-2 py-1 rounded-md"
                >New</span
              >
            }
          </div>
        }
      }
    </div>
  `,
  host: {
    class: 'flex flex-col px-8 gap-6 pb-8',
  },
})
export class GetStarted {
  readonly routes = signal<Route[]>(componentsRoutes);
}
