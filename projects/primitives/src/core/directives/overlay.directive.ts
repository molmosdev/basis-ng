import {
  CdkConnectedOverlay,
  ConnectedPosition,
  ConnectionPositionPair,
} from '@angular/cdk/overlay';
import {
  computed,
  Directive,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Position } from '@basis-ng/primitives';
import { OverlayTriggerDirective } from './overlay-trigger.directive';

/**
 * Directive to manage overlay behavior and positioning.
 * Integrates with Angular CDK's `CdkConnectedOverlay` to provide
 * flexible overlay positioning and triggering mechanisms.
 */
@Directive({
  selector: '[bOverlay]',
  hostDirectives: [
    {
      directive: CdkConnectedOverlay,
      inputs: [
        'cdkConnectedOverlayWidth: width',
        'cdkConnectedOverlayMinWidth: minWidth',
        'cdkConnectedOverlayHasBackdrop: hasBackdrop',
        'cdkConnectedOverlayBackdropClass: customBackdropClass',
      ],
      outputs: [
        'backdropClick: backdropClick',
        'detach: detach',
        'attach: attach',
        'overlayOutsideClick: outsideClick',
        'positionChange: positionChange',
      ],
    },
  ],
  host: {
    '(positionChange)': 'connectedPositionPair.set($event.connectionPair)',
  },
})
export class OverlayDirective {
  /**
   * Controls whether the overlay is open.
   * @default false
   */
  readonly open = input(false);

  /**
   * The trigger directive that activates the overlay.
   * This input is required.
   */
  readonly trigger = input.required<OverlayTriggerDirective>();

  /**
   * Offset value for overlay positioning.
   * @default 0
   */
  readonly offset = input(0);

  /**
   * Delay in milliseconds before closing the overlay.
   * @default 0
   */
  readonly closeDelay = input(0);

  /**
   * A computed map of positions to their corresponding `ConnectedPosition` configurations.
   */
  readonly positionsMap = computed<Record<Position, ConnectedPosition>>(() => ({
    'top-left': {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -this.offset(),
    },
    'top-center': {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      offsetY: -this.offset(),
    },
    'top-right': {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: -this.offset(),
    },
    'bottom-left': {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: this.offset(),
    },
    'bottom-center': {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: this.offset(),
    },
    'bottom-right': {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: this.offset(),
    },
    'left-top': {
      originX: 'start',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top',
      offsetX: -this.offset(),
    },
    'left-center': {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -this.offset(),
    },
    'left-bottom': {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetX: -this.offset(),
    },
    'right-top': {
      originX: 'end',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
      offsetX: this.offset(),
    },
    'right-center': {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: this.offset(),
    },
    'right-bottom': {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetX: this.offset(),
    },
  }));

  /**
   * List of positions for the overlay.
   * @default ['bottom-left']
   */
  readonly positions = input<Position[]>(['bottom-left']);

  /**
   * Computed list of `ConnectedPosition` objects based on the `positions` input.
   */
  readonly connectedPositions = computed<ConnectedPosition[]>(() =>
    this.positions().map(position => this.positionsMap()[position])
  );

  /**
   * Signal to track the currently active `ConnectionPositionPair`.
   */
  readonly connectedPositionPair = signal<ConnectionPositionPair | undefined>(
    undefined
  );

  /**
   * Injected instance of `CdkConnectedOverlay`.
   */
  cdkConnectedOverlay = inject(CdkConnectedOverlay);

  /**
   * Computed direction of the overlay based on the active position pair.
   */
  readonly direction = computed(() => {
    const pair = this.connectedPositionPair();
    if (!pair) return undefined;

    return Object.entries(this.positionsMap())
      .find(
        ([, position]) =>
          position.originX === pair.originX &&
          position.originY === pair.originY &&
          position.overlayX === pair.overlayX &&
          position.overlayY === pair.overlayY
      )?.[0]
      .split('-')[0];
  });

  /**
   * Constructor to initialize the directive and set up reactive effects.
   */
  constructor() {
    effect(() => {
      this.handleOrigin();
      this.handleConnectedPositions();
      this.handleOpen();
    });
  }

  /**
   * Handles the origin of the overlay.
   * This method sets the `cdkConnectedOverlay.origin` to the trigger element.
   */
  handleOrigin(): void {
    this.cdkConnectedOverlay.origin = this.trigger().trigger;
  }

  /**
   * Handles the connected positions for the overlay.
   * This method updates the `cdkConnectedOverlay` positions based on the current state.
   */
  handleConnectedPositions(): void {
    this.cdkConnectedOverlay.positions = this.connectedPositions();
  }

  /**
   * Handles the opening and closing of the overlay based on the `open` input.
   */
  handleOpen(): void {
    if (this.open()) {
      this.cdkConnectedOverlay.attachOverlay();
    } else {
      setTimeout(() => {
        this.cdkConnectedOverlay.detachOverlay();
        if (!this.firstLoad) {
          this.trigger().el.nativeElement.focus();
        }
        this.firstLoad = false;
      }, this.closeDelay());
    }
  }

  firstLoad = true;
}
