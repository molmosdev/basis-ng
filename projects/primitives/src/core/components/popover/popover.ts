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
import { PopoverTrigger } from './popover-trigger';
import { NgTemplateOutlet } from '@angular/common';
import { PopoverContent } from './popover-content';
import { Utils } from '../../../shared/services/utils';

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
  utils = inject(Utils);
  el = inject(ElementRef);
  readonly active = computed(() => this.trigger()?.active());
  readonly anchorName = signal('--' + this.utils.generateUUID());
  readonly triggerMode = computed(() => this.trigger()?.mode());
  readonly closeOnOutsideClick = input(true);
  readonly hasBackdrop = input(false);
  readonly backdropClass = input<string | string[]>('');
  readonly disableScroll = input(false);
  readonly trapFocus = input(false);
  readonly restoreFocus = input(false);
  readonly autoFocus = input(false);
  readonly closeOnScroll = input(false);
  readonly panelClass = input<string | string[]>('');
  readonly opened = output<void>();
  readonly closed = output<void>();
  readonly backdropClick = output<void>();
  readonly trigger = contentChild(PopoverTrigger);
  readonly content = contentChild(PopoverContent);
  readonly contentTplRef = contentChild<TemplateRef<any>>('popoverContent');

  ngOnInit(): void {
    this.setTriggerAnchorName();
  }

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

  setContentAnchorName(): void {
    this.content()?.el.nativeElement.style.setProperty(
      '--anchor-name',
      this.anchorName()
    );
  }

  setTriggerAnchorName(): void {
    this.trigger()?.el.nativeElement.style.setProperty(
      'anchor-name',
      this.anchorName()
    );
  }

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

  onBackdropClick(): void {
    this.backdropClick.emit();
    if (this.closeOnOutsideClick()) {
      this.trigger()?.active.set(false);
    }
  }

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
