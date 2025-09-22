import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import {
  Component,
  contentChild,
  inject,
  model,
  OnInit,
  output,
} from '@angular/core';
import { Tree } from '../../../tree';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGripVertical } from '@ng-icons/lucide';

/**
 * Represents a tree node component that can be extended, collapsed,
 * and optionally supports drag-and-drop functionality.
 */
@Component({
  selector: 'b-tree-node',
  imports: [CdkDragHandle, NgIcon],
  template: `<section>
      @if (!node.disabled) {
        <ng-icon
          name="lucideGripVertical"
          size="16"
          color="currentColor"
          cdkDragHandle />
      }
      <div
        class="projected-content"
        (click)="nestedTree() && handleExtension()"
        (keydown.enter)="nestedTree() && handleExtension()"
        (keydown.space)="nestedTree() && handleExtension()"
        role="button"
        tabindex="0">
        <ng-content />
      </div>
      @if (nestedTree()) {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      }
    </section>
    @if (nestedTree() && extended()) {
      <div class="nested">
        <ng-content select="b-tree" />
      </div>
    } `,
  hostDirectives: [
    {
      directive: CdkDrag,
      inputs: ['cdkDragDisabled: disabled'],
    },
  ],
  providers: [
    provideIcons({
      lucideGripVertical,
    }),
  ],
})
export class TreeNode implements OnInit {
  /**
   * Indicates whether the node is extended (expanded).
   */
  readonly extended = model(false);

  /**
   * Reference to the `CdkDrag` directive for drag-and-drop functionality.
   */
  protected node = inject(CdkDrag);

  /**
   * Reference to a nested `Tree` component, if present.
   */
  readonly nestedTree = contentChild(Tree);

  /**
   * Emits an event when the node is closed.
   */
  closeEmitter = output<void>();

  /**
   * Lifecycle hook that is called after the component is initialized.
   */
  ngOnInit(): void {
    this.node.lockAxis = 'y';
  }

  /**
   * Updates the disabled state of the node.
   * @param disabled - Whether the node should be disabled.
   */
  handleNodeDisability(disabled: boolean): void {
    this.node.disabled = disabled;
  }

  /**
   * Toggles the extended (expanded) state of the node.
   * Emits a close event if the node is collapsed and contains a nested tree.
   */
  handleExtension(): void {
    const isExtended = this.extended();
    this.extended.set(!isExtended);

    if (isExtended && this.nestedTree()) {
      this.closeEmitter.emit();
    }
  }
}
