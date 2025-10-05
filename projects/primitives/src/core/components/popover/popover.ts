import {
  Component,
  computed,
  contentChild,
  effect,
  ElementRef,
  inject,
  input,
  OnInit,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import { PopoverTrigger } from './shared/directives/popover-trigger';
import { NgTemplateOutlet } from '@angular/common';
import { PopoverContent } from './shared/components/popover-content';
import { Utils } from '../../../shared/services/utils';

/**
 * Hosts trigger and content projections and manages showing and positioning popover content relative to its trigger.
 */
@Component({
  selector: 'b-popover',
  imports: [NgTemplateOutlet],
  template: `
    <ng-content />
    @if (active() && hasBackdrop()) {
      <div
        class="b-popover-backdrop"
        [class]="backdropClass()"
        (click)="onBackdropClick()"
        [animate.enter]="'b-popover-backdrop-entering'"
        [animate.leave]="'b-popover-backdrop-leaving'"
        tabindex="-1"
        role="button"
        aria-label="Close popover"></div>
    }
    @if (active()) {
      <ng-container *ngTemplateOutlet="contentTplRef()" />
    }
  `,
  styles: [
    `
      .b-popover-backdrop {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
        opacity: 0;
      }

      .b-popover-backdrop-entering {
        opacity: 1;
        transition-duration: 150ms;
      }

      .b-popover-backdrop-leaving {
        opacity: 0;
        transition-duration: 150ms;
      }
    `,
  ],
  host: {
    '(mouseleave)': 'triggerMode() === "hover" && trigger()?.active.set(false)',
  },
})
export class Popover implements OnInit {
  /** Utility service used to generate a unique anchor name. */
  utils = inject(Utils);

  /** Reference to the host DOM element for event boundary checks. */
  el = inject(ElementRef);

  /** Reactive signal indicating whether the popover is currently active (open). */
  readonly active = computed(() => this.trigger()?.active());

  /** Unique anchor CSS name used to link trigger and content via anchor positioning. */
  readonly anchorName = signal('--' + this.utils.generateUUID());

  /** Mode of the trigger (e.g. hover or click) used to determine interaction behavior. */
  readonly triggerMode = computed(() => this.trigger()?.mode());

  /**
   * Whether a click outside the popover should close it.
   *
   * @defaultValue true
   */
  readonly closeOnOutsideClick = input(true);

  /**
   * Whether to show a backdrop behind the popover.
   *
   * @defaultValue false
   */
  readonly hasBackdrop = input(false);

  /**
   * CSS class(es) to apply to the backdrop.
   *
   * @defaultValue ''
   */
  readonly backdropClass = input<string | string[]>('');

  /**
   * Whether scrolling is disabled when the popover is open.
   *
   * @defaultValue false
   */
  readonly disableScroll = input(false);

  /**
   * Whether to trap focus within the popover when open.
   *
   * @defaultValue false
   */
  readonly trapFocus = input(false);

  /**
   * Whether to restore focus to the trigger when the popover closes.
   *
   * @defaultValue false
   */
  readonly restoreFocus = input(false);

  /**
   * Whether to automatically focus the content when the popover opens.
   *
   * @defaultValue false
   */
  readonly autoFocus = input(false);

  /**
   * Whether to close the popover when the user scrolls.
   *
   * @defaultValue false
   */
  readonly closeOnScroll = input(false);

  /**
   * CSS class(es) to apply to the popover content panel.
   *
   * @defaultValue ''
   */
  readonly panelClass = input<string | string[]>('');

  /**
   * Emits when the popover has opened.
   */
  readonly opened = output<void>();

  /**
   * Emits when the popover has closed.
   */
  readonly closed = output<void>();

  /**
   * Emits when the backdrop is clicked.
   */
  readonly backdropClick = output<void>();

  /** Content child reference to the popover trigger directive instance. */
  readonly trigger = contentChild(PopoverTrigger);

  /** Content child reference to the projected popover content component. */
  readonly content = contentChild(PopoverContent);

  /** Template reference for inline content projected with the 'popoverContent' identifier. */
  readonly contentTplRef = contentChild<TemplateRef<any>>('popoverContent');

  /**
   * Lifecycle hook that initializes the trigger element with its anchor name.
   */
  ngOnInit(): void {
    this.setTriggerAnchorName();
  }

  /**
   * Creates a reactive effect that syncs content anchor and registers outside click listeners when active.
   */
  constructor() {
    effect(onCleanup => {
      if (this.active()) {
        this.setContentAnchorName();
        this.applyPanelClass();
        this.applyScrollStrategy(true);
        this.applyFocusStrategy(true);
        this.opened.emit();

        let clickHandler: ((event: MouseEvent) => void) | undefined;
        if (this.closeOnOutsideClick()) {
          clickHandler = (event: MouseEvent) => {
            if (!this.el.nativeElement.contains(event.target)) {
              this.trigger()?.active.set(false);
            }
          };
          document.addEventListener('click', clickHandler, true);
        }

        let scrollHandler: (() => void) | undefined;
        if (this.closeOnScroll()) {
          scrollHandler = () => {
            this.trigger()?.active.set(false);
          };
          window.addEventListener('scroll', scrollHandler, true);
        }

        let focusTrapHandler: ((event: FocusEvent) => void) | undefined;
        if (this.trapFocus()) {
          focusTrapHandler = (event: FocusEvent) => {
            const contentEl = this.content()?.el.nativeElement;
            if (
              contentEl &&
              !contentEl.contains(event.target as Node) &&
              !this.el.nativeElement.contains(event.target as Node)
            ) {
              event.preventDefault();
              contentEl.focus();
            }
          };
          document.addEventListener('focusin', focusTrapHandler, true);
        }

        // Subscribe to content's closePopover output
        const closeSubscription = this.content()?.closePopover.subscribe(() => {
          this.trigger()?.active.set(false);
        });

        onCleanup(() => {
          if (clickHandler) {
            document.removeEventListener('click', clickHandler, true);
          }
          if (scrollHandler) {
            window.removeEventListener('scroll', scrollHandler, true);
          }
          if (focusTrapHandler) {
            document.removeEventListener('focusin', focusTrapHandler, true);
          }
          closeSubscription?.unsubscribe();
          this.applyScrollStrategy(false);
          this.applyFocusStrategy(false);
          this.closed.emit();
        });
      }
    });
  }

  /**
   * Applies the generated anchor name to the content element for CSS anchor positioning.
   */
  setContentAnchorName(): void {
    this.content()?.el.nativeElement.style.setProperty(
      '--anchor-name',
      this.anchorName()
    );
  }

  /**
   * Applies the generated anchor name to the trigger element to associate it with the content.
   */
  setTriggerAnchorName(): void {
    this.trigger()?.el.nativeElement.style.setProperty(
      'anchor-name',
      this.anchorName()
    );
  }

  /**
   * Applies custom CSS classes to the popover content panel.
   */
  applyPanelClass(): void {
    const contentEl = this.content()?.el.nativeElement;
    if (!contentEl) return;

    const classes = this.panelClass();
    if (typeof classes === 'string') {
      classes.split(' ').forEach(cls => cls && contentEl.classList.add(cls));
    } else if (Array.isArray(classes)) {
      classes.forEach(cls => cls && contentEl.classList.add(cls));
    }
  }

  /**
   * Handles backdrop click events.
   */
  onBackdropClick(): void {
    this.backdropClick.emit();
    if (this.closeOnOutsideClick()) {
      this.trigger()?.active.set(false);
    }
  }

  /**
   * Applies or removes scroll blocking strategy based on disableScroll input.
   */
  applyScrollStrategy(opening: boolean): void {
    if (opening) {
      if (!this.disableScroll()) {
        return;
      }
      document.body.style.setProperty('overflow', 'hidden');
      document.documentElement.style.setProperty('scrollbar-gutter', 'stable');
    } else {
      document.body.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('scrollbar-gutter');
    }
  }

  /**
   * Applies focus management strategy based on autoFocus and restoreFocus inputs.
   */
  applyFocusStrategy(opening: boolean): void {
    if (opening) {
      if (this.autoFocus()) {
        setTimeout(() => {
          this.content()?.el.nativeElement.focus();
        });
      }
    } else {
      if (this.restoreFocus()) {
        this.trigger()?.el.nativeElement.focus();
      }
    }
  }
}
