import {
  CdkConnectedOverlay,
  ConnectedPosition,
  ConnectionPositionPair,
  Overlay,
} from '@angular/cdk/overlay';
import {
  computed,
  Directive,
  effect,
  inject,
  input,
  linkedSignal,
  model,
  output,
} from '@angular/core';
import { OverlayOrigin } from './overlay-origin';
import { Position } from '../../shared/types/position.type';

/**
 * Directive to manage overlay behavior and positioning.
 * Integrates with Angular CDK's `CdkConnectedOverlay` to provide
 * flexible overlay positioning and triggering mechanisms.
 */
@Directive({
  selector: '[bConnectedOverlay]',
  hostDirectives: [
    {
      directive: CdkConnectedOverlay,
      inputs: [
        'cdkConnectedOverlayWidth: width',
        'cdkConnectedOverlayMinWidth: minWidth',
        'cdkConnectedOverlayBackdropClass: customBackdropClass',
        'cdkConnectedOverlayPanelClass: panelClass',
      ],
      outputs: [
        'detach: detach',
        'attach: attach',
        'overlayOutsideClick: outsideClick',
        'backdropClick: backdropClick',
        'positionChange: positionChange',
      ],
    },
  ],
  host: {
    '(positionChange)': 'connectedPositionPair.set($event.connectionPair)',
    '(detach)': 'detachEmitter.emit()',
    '(attach)': 'attachEmitter.emit()',
    '(outsideClick)': 'outsideClickEmitter.emit()',
    '(backdropClick)': 'backdropClickEmitter.emit()',
  },
})
export class ConnectedOverlay {
  /**
   * Controls whether the overlay is open.
   * @default false
   */
  readonly open = model(false);

  /**
   * The trigger directive that activates the overlay.
   * This input is required.
   */
  readonly trigger = input.required<OverlayOrigin>();

  /**
   * A computed map of positions to their corresponding `ConnectedPosition` configurations.
   */
  readonly positionsMap = computed<Record<Position, ConnectedPosition>>(() => ({
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
  }));

  /**
   * List of positions for the overlay.
   * @default ['bottom-left']
   */
  readonly positions = input<Position[]>(['bottom-left']);

  /**
   * Controls whether the trigger element should be focused when the overlay is closed.
   * @default true
   */
  readonly focusTriggerOnClose = input(true);

  /**
   * Computed list of `ConnectedPosition` objects based on the `positions` input.
   */
  readonly connectedPositions = computed<ConnectedPosition[]>(() =>
    this.positions().map(position => this.positionsMap()[position])
  );

  /**
   * Signal to track the currently active `ConnectionPositionPair`.
   */
  readonly connectedPositionPair = linkedSignal<ConnectionPositionPair>(
    () => this.connectedPositions()[0]
  );

  /**
   * Injected instance of `CdkConnectedOverlay`.
   */
  cdkConnectedOverlay = inject(CdkConnectedOverlay);

  /**
   * Injected instance of `Overlay`.
   */
  overlay = inject(Overlay);

  /**
   * Computed direction of the overlay based on the active position pair.
   */
  readonly direction = computed(() => {
    const pair = this.connectedPositionPair();

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
   * Event emitter for overlay detach events.
   */
  detachEmitter = output<void>();

  /**
   * Event emitter for overlay attach events.
   */
  attachEmitter = output<void>();

  /**
   * Event emitter for overlay outside click events.
   */
  outsideClickEmitter = output<void>();

  /**
   * Event emitter for overlay backdrop click events.
   */
  backdropClickEmitter = output<void>();

  /**
   * Flag to indicate if el overlay ya fue abierto al menos una vez.
   */
  private hasBeenOpened = false;

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
   * Determines whether to open or close the overlay and invokes the appropriate method.
   */
  handleOpen(): void {
    if (this.open()) {
      this.cdkConnectedOverlay.attachOverlay();
      this.hasBeenOpened = true;
    } else {
      this.cdkConnectedOverlay.detachOverlay();

      // Only focus the trigger if the overlay has been opened at least once
      if (this.hasBeenOpened && this.focusTriggerOnClose()) {
        this.trigger().el.nativeElement.focus();
      }
    }
  }

  /**
   * Toggles the open state of the overlay.
   * If the overlay is open, it will be closed, and vice versa.
   */
  toggleOverlay(): void {
    this.open.set(!this.open());
  }

  /**
   * Closes the overlay by setting the `open` state to false.
   */
  closeOverlay(): void {
    this.open.set(false);
  }

  /**
   * Opens the overlay by setting the `open` state to true.
   */
  openOverlay(): void {
    this.open.set(true);
  }
}
