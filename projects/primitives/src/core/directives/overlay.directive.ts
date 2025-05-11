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
  signal,
} from '@angular/core';
import { OverlayTriggerDirective, Position } from '../../public-api';

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
    },
    'top-center': {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
    },
    'top-right': {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
    },
    'bottom-left': {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
    },
    'bottom-center': {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
    },
    'bottom-right': {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
    'left-top': {
      originX: 'start',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top',
    },
    'left-center': {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
    },
    'left-bottom': {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'bottom',
    },
    'right-top': {
      originX: 'end',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
    },
    'right-center': {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
    },
    'right-bottom': {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom',
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
   * Injected instance of `Overlay`.
   */
  overlay = inject(Overlay);

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
   * Flag to indicate if this is the first load of the overlay.
   */
  firstLoad = true;

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
      this.handleOverlayOpen();
    } else {
      if (!this.firstLoad) this.handleOverlayClose();
      this.firstLoad = false;
    }
  }

  /**
   * Opens the overlay and applies the appropriate direction class.
   * Ensures the overlay is attached and styled correctly.
   */
  private handleOverlayOpen(): void {
    this.cdkConnectedOverlay.attachOverlay();
    this.applyDirectionClass();
  }

  /**
   * Closes the overlay with optional animation and cleanup.
   * If it's the first load, detaches the overlay immediately without animation.
   */
  private handleOverlayClose(): void {
    const firstChild = this.getFirstChild();

    if (!firstChild) {
      this.detachOverlayWithCleanup();
      return;
    }

    firstChild.classList.add('b-overlay-leave');
    setTimeout(
      () => this.detachOverlayWithCleanup(firstChild),
      this.closeDelay()
    );
  }

  /**
   * Retrieves the first child element of the overlay pane.
   * @returns The first child element or `null` if not found.
   */
  private getFirstChild(): Element | null {
    return (
      this.cdkConnectedOverlay.overlayRef?.overlayElement.querySelector(
        '.cdk-overlay-pane > *'
      ) || null
    );
  }

  /**
   * Applies the direction class to the overlay's first child element.
   * Cleans up any existing direction-related classes before applying the new one.
   */
  private applyDirectionClass(): void {
    const firstChild = this.getFirstChild();
    if (!firstChild) return;

    this.cleanOverlayClasses(firstChild);
    const direction = this.direction();
    if (direction) {
      firstChild.classList.add(`b-overlay-${direction}`);
    }
  }

  /**
   * Detaches the overlay and performs cleanup operations.
   * Optionally cleans up classes from a provided element.
   * @param element The element to clean up classes from (optional).
   */
  private detachOverlayWithCleanup(element?: Element): void {
    this.cdkConnectedOverlay.detachOverlay();

    if (element) {
      this.cleanOverlayClasses(element);
    }

    this.trigger().el.nativeElement.focus();
  }

  /**
   * Removes overlay-related classes from the specified element.
   * @param element The element to remove classes from.
   */
  private cleanOverlayClasses(element: Element): void {
    const classesToRemove = [
      'b-overlay-leave',
      'b-overlay-top',
      'b-overlay-bottom',
      'b-overlay-left',
      'b-overlay-right',
    ];

    element.classList.remove(...classesToRemove);
  }
}
