import {
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import {
  Component,
  contentChildren,
  effect,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { TreeNodeComponent } from '@basis-ng/primitives';

/**
 * Represents a tree component that supports drag-and-drop functionality
 * and manages nested tree nodes.
 */
@Component({
  selector: 'b-tree',
  template: `<ng-content />`,
  host: {
    '(cdkDropListDropped)': 'dropEmitter.emit($event)',
    '[style.max-width]': 'maxWidth()',
  },
  hostDirectives: [
    {
      directive: CdkDropList,
      inputs: ['id', 'cdkDropListConnectedTo: connectedTo'],
      outputs: ['cdkDropListDropped'],
    },
    CdkDropListGroup,
  ],
})
export class TreeComponent implements OnInit {
  /**
   * The ID of the tree component.
   */
  readonly maxWidth = input<string>('100%');
  /**
   * Determines whether the tree is draggable.
   */
  readonly draggable = input(false);

  /**
   * Reference to the `CdkDropList` directive used for drag-and-drop.
   */
  private tree = inject(CdkDropList);

  /**
   * Collection of nested `TreeNode` components.
   */
  private readonly nestedNodes = contentChildren(TreeNodeComponent);

  /**
   * Determines whether to close nodes recursively.
   */
  readonly closeRecursively = input(false);

  /**
   * Emits an event when a drop occurs in the tree.
   */
  dropEmitter = output<CdkDragDrop<string[]>>();

  /**
   * Initializes the `Tree` component and sets up reactive effects.
   */
  constructor() {
    effect(() => {
      this.handleTreeDisability();
    });
  }

  /**
   * Lifecycle hook that is called after the component is initialized.
   */
  ngOnInit(): void {
    if (this.closeRecursively()) this.handleCloseRecursively();
  }

  /**
   * Updates the disabled state of the tree and its nested nodes.
   */
  private handleTreeDisability(): void {
    const isDisabled = !this.draggable();
    this.tree.disabled = isDisabled;

    this.nestedNodes().forEach(node => {
      node.handleNodeDisability(isDisabled);
    });
  }

  /**
   * Sets up recursive closing behavior for nested nodes.
   */
  handleCloseRecursively(): void {
    this.nestedNodes().forEach(node => {
      node.closeEmitter.subscribe(() => {
        this.closeNestedNodes();
      });
    });
  }

  /**
   * Closes all nested nodes recursively.
   */
  closeNestedNodes(): void {
    this.nestedNodes().forEach(node => {
      node.extended.set(false);
      node.nestedTree()?.closeNestedNodes();
    });
  }
}
