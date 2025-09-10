import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { documentationRoutes } from '../../../features/documentation/documentation.routes';
import { componentsRoutes } from '../../../features/documentation/pages/components/components.routes';
import { NavigationService } from './navigation.service';
import {
  DrawerComponent,
  MenuItemRadioComponent,
  ResponsiveService,
  BadgeComponent,
  MenuLabelComponent,
  MenuComponent,
  Button,
} from '@basis-ng/primitives';

@Component({
  selector: 'aside[app-navigation]',
  imports: [
    MenuComponent,
    MenuItemRadioComponent,
    RouterLink,
    RouterLinkActive,
    MenuLabelComponent,
    DrawerComponent,
    NgTemplateOutlet,
    BadgeComponent,
    Button,
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
   * Signal to track the state of the drawer.
   */
  readonly drawerOpen = signal(false);

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
  readonly path = signal(this.router.url);

  /**
   * Service to handle navigation logic.
   */
  navigationService = inject(NavigationService);

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

  /**
   * The routes for the documentation section of the application.
   */
  readonly documentationRoutes = signal(documentationRoutes);

  /**
   * The routes for the components section of the application.
   */
  readonly componentsRoutes = signal(componentsRoutes);

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
    this.navigationService.isHomePath.set(false);
  }
}
