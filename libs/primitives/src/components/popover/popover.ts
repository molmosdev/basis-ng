import { NgTemplateOutlet } from '@angular/common';
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
import { Utils } from '../../services/utils';
import { PopoverContent } from './popover-content';
import { PopoverTrigger } from './popover-trigger';

/**
 * Renders a popover container which displays `PopoverContent` and optionally a backdrop.
 * The popover coordinates trigger and content interactions, scroll/focus strategies, and emits lifecycle events.
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
        aria-label="Close popover"
      ></div>
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
    '(mouseleave)': 'triggerMode() === "hover" && trigger()?.active?.set(false)',
  },
})
export class Popover implements OnInit {
  /** Utility services used by the popover. */
  utils = inject(Utils);

  /** Reference to the host element. */
  el = inject(ElementRef);

  /** Whether the popover is currently active/open. */
  readonly active = computed(() => this.trigger()?.active());

  /** CSS variable name used to anchor popover positioning. */
  readonly anchorName = signal('--' + this.utils.generateUUID());

  /** Current trigger interaction mode (e.g., 'click' or 'hover'). */
  readonly triggerMode = computed(() => this.trigger()?.mode());

  /** Whether clicking outside closes the popover. */
  readonly closeOnOutsideClick = input(true);

  /** Whether the popover shows a backdrop element. */
  readonly hasBackdrop = input(false);

  /** CSS class or classes applied to the backdrop element. */
  readonly backdropClass = input<string | string[]>('');

  /** Disable page scrolling while the popover is open. */
  readonly disableScroll = input(false);

  /** Trap focus inside the popover while open. */
  readonly trapFocus = input(false);

  /** Restore focus to the trigger when the popover closes. */
  readonly restoreFocus = input(false);

  /** Automatically focus the popover content when opened. */
  readonly autoFocus = input(false);

  /** Close the popover when the page is scrolled. */
  readonly closeOnScroll = input(false);

  /** CSS class or classes applied to the popover panel/content. */
  readonly panelClass = input<string | string[]>('');

  /** Emitted when the popover is opened. */
  readonly opened = output<void>();

  /** Emitted when the popover is closed. */
  readonly closed = output<void>();

  /** Emitted when the backdrop is clicked. */
  readonly backdropClick = output<void>();

  /** Reference to the popover trigger component instance. */
  readonly trigger = contentChild(PopoverTrigger);

  /** Reference to the popover content component instance. */
  readonly content = contentChild(PopoverContent);

  /** TemplateRef for projected popover content identified by 'popoverContent'. */
  readonly contentTplRef = contentChild<TemplateRef<unknown>>('popoverContent');

  ngOnInit(): void {
    this.setTriggerAnchorName();
  }

  constructor() {
    effect((onCleanup) => {
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
   * Set CSS variable for anchor name on the popover content element.
   */
  setContentAnchorName(): void {
    this.content()?.el.nativeElement.style.setProperty('--anchor-name', this.anchorName());
  }

  /**
   * Set CSS variable for anchor name on the popover trigger element.
   */
  setTriggerAnchorName(): void {
    this.trigger()?.el.nativeElement.style.setProperty('anchor-name', this.anchorName());
  }

  /**
   * Apply panel-specific CSS classes to the popover content element.
   */
  applyPanelClass(): void {
    const contentEl = this.content()?.el.nativeElement;
    if (!contentEl) return;

    const classes = this.panelClass();
    if (typeof classes === 'string') {
      classes.split(' ').forEach((cls) => cls && contentEl.classList.add(cls));
    } else if (Array.isArray(classes)) {
      classes.forEach((cls) => cls && contentEl.classList.add(cls));
    }
  }

  /**
   * Handle clicks on the backdrop element.
   */
  onBackdropClick(): void {
    this.backdropClick.emit();
    if (this.closeOnOutsideClick()) {
      this.trigger()?.active.set(false);
    }
  }

  /**
   * Apply or remove styles that disable/restore page scrolling.
   * @param opening - Whether the popover is opening (true) or closing (false).
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
   * Apply or restore focus behavior when the popover opens or closes.
   * @param opening - Whether the popover is opening (true) or closing (false).
   */
  applyFocusStrategy(opening: boolean): void {
    /**
     * Apply or restore focus behavior when the popover opens or closes.
     *
     * @param opening - Whether the popover is opening (true) or closing (false).
     */
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
