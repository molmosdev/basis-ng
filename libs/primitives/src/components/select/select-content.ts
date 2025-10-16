import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CdkListbox, CdkOption, ListboxValueChangeEvent } from '@angular/cdk/listbox';
import {
  Component,
  computed,
  contentChildren,
  ElementRef,
  inject,
  model,
  OnInit,
  output,
} from '@angular/core';
import { ConnectedOverlay } from '../../directives/connected-overlay';

/**
 * Content container for select overlays that manages option navigation.
 */
@Component({
  selector: 'ul[b-select-content]',
  imports: [],
  template: ` <ng-content /> `,
  hostDirectives: [
    {
      directive: CdkListbox,
      inputs: ['cdkListboxMultiple: multiple'],
      outputs: ['cdkListboxValueChange'],
    },
  ],
  host: {
    '(cdkListboxValueChange)': 'emitValueChange($event)',
    '[animate.enter]': '"b-select-content-entering-" + this.direction()',
    '[animate.leave]': '"b-select-content-leaving-" + this.direction()',
  },
})
export class SelectContent implements OnInit {
  /**
   * Reference to the host element.
   */
  el = inject(ElementRef);

  /**
   * Injected CDK listbox instance.
   */
  listBox = inject(CdkListbox);

  /**
   * Option nodes within the select content.
   */
  readonly options = contentChildren(CdkOption);

  /**
   * Key manager for handling option navigation.
   */
  readonly listKeyManager = computed(() =>
    new ActiveDescendantKeyManager(this.options()).withWrap().withVerticalOrientation(),
  );

  /**
   * Emits value changes from the listbox.
   */
  changeValueEmitter = output<string[]>();

  /**
   * Whether multiple selection is allowed.
   */
  readonly multiple = model<boolean>(false);

  /**
   * Injected connected overlay for positioning.
   */
  overlay = inject(ConnectedOverlay);

  /**
   * Computed overlay direction.
   */
  readonly direction = computed(() => this.overlay.direction());

  ngOnInit(): void {
    this.listBox.useActiveDescendant = true;
  }

  /**
   * Emits the value change event from the listbox.
   * @param event - The value change event from the listbox.
   */
  emitValueChange(event: ListboxValueChangeEvent<unknown>): void {
    this.changeValueEmitter.emit(event.value as string[]);
  }
}
