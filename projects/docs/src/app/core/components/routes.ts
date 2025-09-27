import {
  Component,
  computed,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {
  Badge,
  Menu,
  MenuItemRadio,
  ResponsiveManager,
} from '@basis-ng/primitives';
import { docsRoutes } from '../../features/docs/docs.routes';
import { componentsRoutes } from '../../features/docs/pages/components/components.routes';
import { utilitiesRoutes } from '../../features/docs/pages/utilities/utilities.routes';

@Component({
  selector: 'app-routes',
  imports: [Menu, MenuItemRadio, RouterLink, RouterLinkActive, Badge],
  template: `
    <b-menu [size]="isMobile() ? 'md' : 'sm'">
      <span
        class="opacity-70 mb-1 pl-1 font-display-mono"
        [class]="!isMobile() ? 'text-sm' : 'text-md'">
        Getting started
      </span>
      @for (route of documentationRoutes(); track route) {
        @if (route.data) {
          <button
            b-menu-item-radio
            [routerLink]="route.path"
            [routerLinkActive]="['active']"
            (click)="navigationEmitter.emit()">
            {{ route.data['title'] }}
            @if (route.data['badge']) {
              <span b-badge variant="outlined" size="sm">
                {{ route.data['badge'] }}
              </span>
            }
          </button>
        }
      }
      <span
        class="opacity-70 mb-1 pl-1 font-display-mono mt-5"
        [class]="!isMobile() ? 'text-sm' : 'text-md'">
        Components
      </span>
      @for (route of componentsRoutes(); track route) {
        @if (route.data) {
          @let path = '/docs/components/' + route.path;
          <button
            b-menu-item-radio
            [routerLink]="path"
            [routerLinkActive]="['active']"
            (click)="navigationEmitter.emit()">
            {{ route.data['title'] }}
            @if (route.data['badge']) {
              <span b-badge variant="outlined" size="sm">{{
                route.data['badge']
              }}</span>
            }
          </button>
        }
      }
      <span class="opacity-70 text-xs mb-1 pl-1 font-display-mono mt-5">
        Utilities
      </span>
      @for (route of utilitiesRoutes(); track route) {
        @if (route.data) {
          @let path = '/docs/utilities/' + route.path;
          <button
            b-menu-item-radio
            [routerLink]="path"
            [routerLinkActive]="['active']"
            (click)="navigationEmitter.emit()">
            {{ route.data['title'] }}
            @if (route.data['new']) {
              <span b-badge variant="outlined" size="sm"> New </span>
            }
          </button>
        }
      }
    </b-menu>
  `,
  host: {
    class:
      'max-h-[calc(100vh-5rem)] overflow-y-scroll sticky top-20 scroll-0 no-scrollbar px-6.5',
    '[class]': 'isMobile() ? "pb-6.5" : "pb-4"',
  },
})
export class Routes implements OnInit {
  responsiveManager = inject(ResponsiveManager);
  readonly isMobile = computed(
    () => this.responsiveManager.currentDevice() === 'mobile'
  );
  navigationEmitter = output<void>();

  router = inject(Router);
  route = inject(ActivatedRoute);
  readonly path = signal(this.router.url);
  readonly documentationRoutes = signal(docsRoutes);
  readonly componentsRoutes = signal(componentsRoutes);
  readonly utilitiesRoutes = signal(utilitiesRoutes);
  readonly currentRoute = computed<Route>(() => {
    const path = this.path().split('/').pop() || '';
    const route = this.documentationRoutes().find(route => route.path === path);
    if (route) {
      return route;
    }
    const route2 = this.componentsRoutes().find(route => route.path === path);
    if (route2) {
      return route2;
    }
    const route3 = this.utilitiesRoutes().find(route => route.path === path);
    if (route3) {
      return route3;
    }
    return { path: '', component: undefined } as Route;
  });

  ngOnInit() {
    this.handleRouterEvents();
  }

  handleRouterEvents() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.path.set(event.urlAfterRedirects);
      }
    });
  }
}
