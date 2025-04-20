import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import {
  Component,
  contentChild,
  inject,
  model,
  OnInit,
  output,
} from '@angular/core';
import { Tree } from '../../../tree.component';
import { Icon } from '../../../../icon/icon.component';

/**
 * Represents a tree node component that can be extended, collapsed,
 * and optionally supports drag-and-drop functionality.
 */
@Component({
  selector: 'b-tree-node',
  imports: [Icon, CdkDragHandle],
  templateUrl: './tree-node.component.html',
  hostDirectives: [
    {
      directive: CdkDrag,
      inputs: ['cdkDragDisabled: disabled'],
    },
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
