import {
  CdkConnectedOverlay,
  ConnectedPosition,
  ConnectionPositionPair,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { computed, Directive, effect, inject, input, linkedSignal, model } from '@angular/core';
import { Position } from '../../types/position.type';
import { OverlayTrigger } from './overlay-trigger';

/**
 * Directive that wires an Angular CDK connected overlay to a trigger and exposes
 * reactive signals for positions and scroll strategy.
 */
@Directive({
  selector: '[bOverlay]',
  hostDirectives: [
    {
      directive: CdkConnectedOverlay,
      inputs: [
        'cdkConnectedOverlayBackdropClass: backdropClass',
        'cdkConnectedOverlayDisposeOnNavigation: disposeOnNavigation',
        'cdkConnectedOverlayFlexibleDimensions: flexibleDimensions',
        'cdkConnectedOverlayGrowAfterOpen: growAfterOpen',
        'cdkConnectedOverlayHasBackdrop: hasBackdrop',
        'cdkConnectedOverlayHeight: height',
        'cdkConnectedOverlayLockPosition: lockPosition',
        'cdkConnectedOverlayMinHeight: minHeight',
        'cdkConnectedOverlayMinWidth: minWidth',
        'cdkConnectedOverlayOffsetX: offsetX',
        'cdkConnectedOverlayOffsetY: offsetY',
        'cdkConnectedOverlayOpen: open',
        'cdkConnectedOverlayOrigin: trigger',
        'cdkConnectedOverlayPanelClass: panelClass',
        'cdkConnectedOverlayPositionStrategy: positionStrategy',
        'cdkConnectedOverlayPush: push',
        'cdkConnectedOverlayTransformOriginOn: transformOriginSelector',
        'cdkConnectedOverlayViewportMargin: viewportMargin',
        'cdkConnectedOverlayWidth: width',
      ],
      outputs: [
        'attach: attach',
        'detach: detach',
        'overlayKeydown: overlayKeydown',
        'overlayOutsideClick: overlayOutsideClick',
        'positionChange: positionChange',
      ],
    },
  ],
  host: {
    '(positionChange)': 'setPositionPair($event)',
    '(detach)': 'deactivateTrigger()',
    '(overlayOutsideClick)': 'closeIfClickedOutside()',
    '(overlayKeydown)': 'closeOnEscape($event)',
  },
})
export class Overlay {
  /**
   * Reference to the CDK connected overlay instance.
   */
  cdkConnectedOverlay = inject(CdkConnectedOverlay);

  /**
   * Options for scroll handling provided by the CDK.
   */
  scrollStrategyOptions = inject(ScrollStrategyOptions);

  /**
   * The overlay trigger object (signal) that controls the overlay origin and active state.
   */
  trigger = input<OverlayTrigger>();

  /**
   * Whether the overlay is open.
   *
   * @defaultValue false
   */
  open = input<boolean>(false);

  /** Preferred overlay positions in priority order.

   * @defaultValue ['bottom-center', 'top-center']
   */
  positions = input<Position[]>(['bottom-center', 'top-center']);

  /** Whether clicking outside closes the overlay.

   * @defaultValue true
   */
  closeOnClickOutside = model<boolean>(true);

  /** Whether pressing Escape closes the overlay.

   * @defaultValue true
   */
  closeOnTypeEscape = model<boolean>(true);

  /** Scroll handling mode applied to the overlay.

   * @defaultValue 'reposition'
   */
  scroll = model<'close' | 'reposition' | 'block'>('reposition');

  /**
   * Computed array of CDK ConnectedPosition values derived from `positions`.
   */
  connectedPositions = computed<ConnectedPosition[]>(() =>
    this.positions().map((position) => positionsMap[position]),
  );

  /**
   * Linked signal that holds the currently active ConnectionPositionPair.
   */
  connectedPositionPair = linkedSignal<ConnectionPositionPair>(() => this.connectedPositions()[0]);

  /**
   * Computed overlay direction string derived from the active connection pair (e.g. 'top', 'bottom').
   */
  direction = computed(() => {
    const pair = this.connectedPositionPair();

    return Object.entries(positionsMap)
      .find(
        ([, position]) =>
          position.originX === pair.originX &&
          position.originY === pair.originY &&
          position.overlayX === pair.overlayX &&
          position.overlayY === pair.overlayY,
      )?.[0]
      .split('-')[0];
  });

  constructor() {
    effect(() => {
      this.setScrollStrategy();
      this.setPositions();
    });
  }

  /**
   * Set the active connection pair when the CDK overlay reports a position change.
   *
   * @param event - The position change event containing the new connection pair.
   */
  setPositionPair(event: { connectionPair: ConnectionPositionPair }): void {
    this.connectedPositionPair.set(event.connectionPair);
  }

  /**
   * Deactivate the overlay trigger when the overlay detaches.
   */
  deactivateTrigger(): void {
    this.trigger()?.active?.set(false);
  }

  /**
   * Close the overlay if a click occurs outside and `closeOnClickOutside` is enabled.
   */
  closeIfClickedOutside(): void {
    if (this.closeOnClickOutside()) {
      this.trigger()?.active?.set(false);
    }
  }

  /**
   * Close the overlay when the Escape key is pressed and `closeOnTypeEscape` is enabled.
   *
   * @param event - The keyboard event emitted by the overlay.
   */
  closeOnEscape(event: KeyboardEvent): void {
    if (this.closeOnTypeEscape() && event.key === 'Escape') {
      this.trigger()?.active?.set(false);
    }
  }

  /**
   * Apply the selected scroll strategy to the CDK connected overlay.
   */
  setScrollStrategy(): void {
    switch (this.scroll()) {
      case 'close':
        this.cdkConnectedOverlay.scrollStrategy = this.scrollStrategyOptions.close();
        break;
      case 'reposition':
        this.cdkConnectedOverlay.scrollStrategy = this.scrollStrategyOptions.reposition();
        break;
      case 'block':
        this.cdkConnectedOverlay.scrollStrategy = this.scrollStrategyOptions.block();
        break;
    }
  }

  /**
   * Update the overlay's available positions from the computed `connectedPositions`.
   */
  setPositions(): void {
    this.cdkConnectedOverlay.positions = this.connectedPositions();
  }
}

/** Map of semantic positions to CDK ConnectedPosition configuration objects. */
const positionsMap: Record<Position, ConnectedPosition> = {
  'top-left': {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetX: 0,
    offsetY: -4,
  },
  'top-center': {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetX: 0,
    offsetY: -4,
  },
  'top-right': {
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
    offsetX: 0,
    offsetY: -4,
  },
  'bottom-left': {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetX: 0,
    offsetY: 4,
  },
  'bottom-center': {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetX: 0,
    offsetY: 4,
  },
  'bottom-right': {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
    offsetX: 0,
    offsetY: 4,
  },
  'left-top': {
    originX: 'start',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'top',
    offsetX: -4,
    offsetY: 0,
  },
  'left-center': {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
    offsetX: -4,
    offsetY: 0,
  },
  'left-bottom': {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'bottom',
    offsetX: -4,
    offsetY: 0,
  },
  'right-top': {
    originX: 'end',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'top',
    offsetX: 4,
    offsetY: 0,
  },
  'right-center': {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: 4,
    offsetY: 0,
  },
  'right-bottom': {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetX: 4,
    offsetY: 0,
  },
};
