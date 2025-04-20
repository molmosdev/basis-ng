import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { Menu } from '../../../../../../primitives/src/core/components/menu/menu.component';
import { MenuItemRadioComponent } from '../../../../../../primitives/src/core/components/menu/shared/components/menu-item-radio/menu-item-radio.component';
import { MenuLabel } from '../../../../../../primitives/src/core/components/menu/shared/components/menu-label/menu-label.component';
import { BottomSheet } from '../../../../../../primitives/src/core/components/bottom-sheet/bottom-sheet.component';
import { NgTemplateOutlet } from '@angular/common';
import {
  Badge,
  Button,
  Icon,
  ResponsiveService,
} from '../../../../../../primitives/src/public-api';

@Component({
  selector: 'aside[app-navigation]',
  imports: [
    Menu,
    MenuItemRadioComponent,
    MenuLabel,
    BottomSheet,
    NgTemplateOutlet,
    Button,
    Icon,
    Badge,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  /**
   * Service to handle responsive design logic.
   */
  responsiveService = inject(ResponsiveService);

  /**
   * Router instance to handle navigation.
   */
  router = inject(Router);

  /**
   * ActivatedRoute instance to access route information.
   */
  route = inject(ActivatedRoute);

  /**
   * Signal to store the current path as a string.
   */
  readonly path = signal('');

  /**
   * Signal to store the routes configuration.
   * This is a reactive signal that updates when the router configuration changes.
   */
  readonly routes = signal(this.router.config);

  /**
   * Signal to manage the visibility of the bottom sheet.
   */
  readonly bottomSheetOpen = signal(false);

  /**
   * Computed property to get the current device type.
   */
  readonly currentDevice = computed(() =>
    this.responsiveService.currentDevice()
  );

  /**
   * Computed property to determine the current route based on the path.
   * Always returns a `Route` object.
   */
  readonly currentRoute = computed<Route>(() => {
    const path = this.path().split('/').pop() || '';
    const findRoute = (routes: Route[]): Route | undefined => {
      for (const route of routes) {
        if (route.path === path) {
          return route;
        }
        if (route.children) {
          const childRoute = findRoute(route.children);
          if (childRoute) {
            return childRoute;
          }
        }
      }
      return undefined;
    };
    return findRoute(this.filteredRoutes()) || ({} as Route);
  });

  /**
   * Computed property to filter and format the routes for display.
   * Removes routes with empty paths or wildcard paths and excludes `loadComponent`.
   */
  readonly filteredRoutes = computed(() => {
    const filterRoutes = (routes: any[]): any[] => {
      return routes
        .filter(route => route.path !== '' && route.path !== '**')
        .map(route => ({
          ...route,
          children: route.children ? filterRoutes(route.children) : [],
        }));
    };
    return filterRoutes(this.routes());
  });

  /**
   * Computed property to get the top-level routes.
   * Filters out the 'components' route from the list of routes.
   */
  readonly topLevelRoutes = computed(() => {
    return this.filteredRoutes().filter(route => route.path !== 'components');
  });

  /**
   * Computed property to get the child routes under the 'components' route.
   */
  readonly componentsRoutes = computed(() => {
    return (
      this.filteredRoutes().find(route => route.path === 'components')
        ?.children || []
    );
  });

  /**
   * Lifecycle hook that initializes the component.
   * Subscribes to router events to update the current path.
   */
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.path.set(event.urlAfterRedirects);
      }
    });
  }

  /**
   * Method to navigate to a specific route.
   * @param route - The route to navigate to.
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.bottomSheetOpen.set(false);
  }
}
