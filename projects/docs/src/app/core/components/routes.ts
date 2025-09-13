import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Badge, Menu, MenuItemRadio } from '@basis-ng/primitives';
import { docsRoutes } from '../../features/docs/docs.routes';
import { componentsRoutes } from '../../features/docs/pages/components/components.routes';

@Component({
  selector: 'app-routes',
  imports: [Menu, MenuItemRadio, RouterLink, RouterLinkActive, Badge],
  template: `
    <b-menu size="sm">
      <span class="opacity-70 text-xs mb-1 pl-1 font-display-mono">
        Getting started
      </span>
      @for (route of documentationRoutes(); track route) {
        @if (route.data) {
          <button
            b-menu-item-radio
            [routerLink]="route.path"
            [routerLinkActive]="['active']">
            {{ route.data['title'] }}
            @if (route.data['new']) {
              <span b-badge variant="outlined" size="sm"> New </span>
            }
          </button>
        }
      }
      <span class="opacity-70 text-xs mb-1 pl-1 font-display-mono mt-5">
        Components
      </span>
      @for (route of componentsRoutes(); track route) {
        @if (route.data) {
          @let path = '/docs/components/' + route.path;
          <button
            b-menu-item-radio
            [routerLink]="path"
            [routerLinkActive]="['active']">
            {{ route.data['title'] }}
            @if (route.data['new']) {
              <span b-badge variant="outlined" size="sm"> New </span>
            }
          </button>
        }
      }
    </b-menu>
  `,
})
export class Routes implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  readonly path = signal(this.router.url);
  readonly documentationRoutes = signal(docsRoutes);
  readonly componentsRoutes = signal(componentsRoutes);
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
