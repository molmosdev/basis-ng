import {
  CdkOverlayOrigin,
  ConnectedPosition,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  computed,
  Directive,
  effect,
  inject,
  input,
  signal,
  TemplateRef,
  OnDestroy,
  ComponentRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Direction } from '../../../shared/types/direction.type';
import { UtilsService } from '../../../shared/services/utils.service';
import { Position } from '../../../public-api';
import { TooltipComponent } from './tooltip.component';

/**
 * Directive to attach a tooltip to an element.
 */
@Directive({
  selector: '[bTooltip]',
  hostDirectives: [CdkOverlayOrigin],
  host: {
    '(mouseenter)': 'hover() && show()',
    '(mouseleave)': 'hover() && hide()',
    '(focus)': 'focus() && show()',
    '(blur)': 'focus() && hide()',
  },
})
export class TooltipDirective implements OnDestroy {
  /**
   * Tooltip content, which can be a string or a template.
   *
   * @alias bTooltip
   */
  readonly content = input<string | TemplateRef<any>>('', {
    alias: 'bTooltip',
  });

  /**
   * Specifies the size of the tooltip.
   *
   * @defaultValue '2'
   */
  readonly size = input<'1' | '2' | '3'>('2');

  /**
   * Overlay origin for positioning the tooltip.
   */
  origin = inject(CdkOverlayOrigin);

  /**
   * Overlay service for creating and managing overlays.
   */
  overlay = inject(Overlay);

  /**
   * Utility service for common operations.
   */
  utils = inject(UtilsService);

  /**
   * Whether the tooltip should appear on hover.
   *
   * @defaultValue true
   */
  readonly hover = input(true);

  /**
   * Whether the tooltip should appear on focus.
   *
   * @defaultValue false
   */
  readonly focus = input(false);

  /**
   * Reference to the overlay instance.
   */
  readonly overlayRef = signal<OverlayRef | null>(null);

  /**
   * Map of positions for the tooltip.
   */
  readonly positionsMap = signal<Record<Position, ConnectedPosition>>({
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
  });

  /**
   * List of positions for the tooltip.
   *
   * @defaultValue ['bottom-center']
   */
  readonly positions = input<Position[]>(['bottom-center']);

  /**
   * Computed connected positions based on the positions input.
   */
  readonly connectedPositions = computed<ConnectedPosition[]>(() =>
    this.positions().map(position => this.positionsMap()[position])
  );

  /**
   * Delay before showing the tooltip.
   *
   * @defaultValue 0
   */
  readonly showDelay = input<number>(0);

  /**
   * Delay before hiding the tooltip.
   *
   * @defaultValue 150
   */
  readonly hideDelay = input<number>(150);

  /**
   * Currently connected position of the tooltip.
   */
  readonly connectedPosition = signal<ConnectedPosition | null>(null);

  /**
   * Direction of the tooltip based on the connected position.
   */
  readonly direction = computed<Direction>(() => {
    const pair = this.connectedPosition();
    return Object.entries(this.positionsMap())
      .find(
        ([, position]) =>
          position.originX === pair?.originX &&
          position.originY === pair?.originY &&
          position.overlayX === pair?.overlayX &&
          position.overlayY === pair?.overlayY
      )?.[0]
      .split('-')[0] as Direction;
  });

  /**
   * Subscription to position change events.
   */
  private positionChangeSubscription: Subscription | null = null;

  /**
   * Reference to the tooltip component instance.
   */
  readonly componentRef = signal<ComponentRef<TooltipComponent> | undefined>(
    undefined
  );

  /**
   * Shows the tooltip.
   */
  show(): void {
    if (this.overlayRef()?.hasAttached()) {
      return;
    }

    this.utils.debounce(
      'tooltip-show',
      () => {
        const positionStrategy = this.overlay
          .position()
          .flexibleConnectedTo(this.origin.elementRef)
          .withPositions(this.connectedPositions())
          .withPush(true);

        // Subscribe to position change events
        this.positionChangeSubscription =
          positionStrategy.positionChanges.subscribe(change => {
            this.connectedPosition.set(change.connectionPair);
          });

        const overlayConfig = new OverlayConfig({
          positionStrategy,
          scrollStrategy: this.overlay.scrollStrategies.reposition(),
        });

        if (!this.overlayRef()) {
          this.overlayRef.set(this.overlay.create(overlayConfig));
        }

        const componentPortal = new ComponentPortal(TooltipComponent);
        this.componentRef.set(this.overlayRef()?.attach(componentPortal));

        // Reset the leaving state and direction to ensure animations play
        const instance = this.componentRef()?.instance;
        instance?.leaving.set(false);
        instance?.direction.set(this.direction());
        instance?.content.set(this.content());
        instance?.size.set(this.size());

        // Trigger reflow to ensure CSS animations are applied
        void this.overlayRef()?.overlayElement.offsetHeight;
      },
      this.showDelay()
    );
  }

  /**
   * Hides the tooltip.
   */
  hide(): void {
    if (!this.overlayRef()?.hasAttached()) {
      return; // Avoid detaching if not attached
    }

    this.componentRef()?.instance.leaving.set(true);

    this.utils.debounce(
      'tooltip-hide',
      () => this.overlayRef()?.detach(),
      this.hideDelay()
    );
  }

  /**
   * Cleans up resources when the directive is destroyed.
   */
  ngOnDestroy() {
    this.hide();
    // Unsubscribe from position change events
    this.positionChangeSubscription?.unsubscribe();
    this.positionChangeSubscription = null;
  }

  constructor() {
    effect(() => this.componentRef()?.instance.direction.set(this.direction()));
  }
}
