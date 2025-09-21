import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';
import {
  Component,
  computed,
  contentChildren,
  ElementRef,
  inject,
  model,
  output,
  OnInit,
} from '@angular/core';
import { ConnectedOverlay } from '@basis-ng/primitives';

/**
 * Component representing the content of a select dropdown.
 * Manages the list of options and their selection state.
 */
@Component({
  selector: 'ul[b-select-content]',
  imports: [],
  template: `<ng-content />`,
  hostDirectives: [
    {
      directive: CdkListbox,
      inputs: ['cdkListboxMultiple: multiple'],
      outputs: ['cdkListboxValueChange'],
    },
  ],
  host: {
    '(cdkListboxValueChange)': 'changeValueEmitter.emit($event.value)',
    '[animate.enter]': '"b-select-content-entering-" + this.direction()',
    '[animate.leave]': '"b-select-content-leaving-" + this.direction()',
  },
})
export class SelectContent implements OnInit {
  /**
   * Reference to the host element of the component.
   */
  el = inject(ElementRef);

  /**
   * Reference to the CDK Listbox directive.
   */
  listBox = inject(CdkListbox);

  /**
   * Collection of CdkOption elements within the listbox.
   */
  readonly options = contentChildren(CdkOption);

  /**
   * Key manager for handling keyboard navigation and active descendant management.
   */
  readonly listKeyManager = computed(() =>
    new ActiveDescendantKeyManager(this.options())
      .withWrap()
      .withVerticalOrientation()
  );

  /**
   * Event emitter that emits when the value changes.
   */
  changeValueEmitter = output<string[]>();

  /**
   * Input signal indicating whether multiple selections are allowed.
   */
  readonly multiple = model<boolean>(false);

  /**
   * Reference to the ConnectedOverlay to determine the direction of the overlay.
   */
  overlay = inject(ConnectedOverlay);

  /**
   * Computed signal representing the direction of the overlay.
   */
  readonly direction = computed(() => this.overlay.direction());

  /**
   * Lifecycle hook that initializes the component.
   * Enables the use of active descendant for the listbox.
   */
  ngOnInit(): void {
    this.listBox.useActiveDescendant = true;
  }
}
