import { Injectable, signal, computed, afterRenderEffect } from '@angular/core';

/**
 * Interface that defines the breakpoints for different device types
 */
export interface DeviceBreakpoints {
  /** Maximum width for mobile devices in pixels */
  mobile: number;
  /** Maximum width for tablet devices in pixels */
  tablet: number;
  /** Maximum width for desktop devices in pixels */
  desktop: number;
}

/** Available device types */
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

/**
 * Service that handles responsive design functionality
 * Detects current device type based on window width and configurable breakpoints
 */
@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  /** Signal that holds the breakpoint configuration */
  private readonly breakpoints = signal<DeviceBreakpoints>({
    mobile: 576,
    tablet: 992,
    desktop: 1200,
  });

  /** Signal that holds the current window width */
  private readonly windowWidth = signal<number>(0);

  /**
   * Computed signal that returns the current device type based on window width
   * @returns The current device type ('mobile', 'tablet', or 'desktop')
   */
  readonly currentDevice = computed<DeviceType>(() => {
    const width = this.windowWidth();
    const breaks = this.breakpoints();

    if (width < breaks.mobile) {
      return 'mobile';
    }
    if (width < breaks.tablet) {
      return 'tablet';
    }
    return 'desktop';
  });

  constructor() {
    afterRenderEffect(() => {
      this.initializeWindowWidth();
      this.setupResizeListener();
    });
  }

  /**
   * Initializes the window width signal with the current window inner width
   * Only called in browser environment
   */
  private initializeWindowWidth(): void {
    this.windowWidth.set(window.innerWidth);
  }

  /**
   * Sets up the resize event listener to update window width
   * Only called in browser environment
   */
  private setupResizeListener(): void {
    window.addEventListener('resize', () => {
      this.windowWidth.set(window.innerWidth);
    });
  }

  /**
   * Updates the breakpoint configuration
   * @param newBreakpoints - Partial breakpoint configuration to update
   */
  updateBreakpoints(newBreakpoints: Partial<DeviceBreakpoints>): void {
    this.breakpoints.update(current => ({
      ...current,
      ...newBreakpoints,
    }));
  }
}
