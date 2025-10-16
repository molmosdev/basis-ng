import { CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Component, contentChildren, effect, inject, input, OnInit, output } from '@angular/core';
import { TreeNode } from './tree-node';

/**
 * Root container for a tree structure, enabling drag-and-drop and nested nodes.
 */
@Component({
  selector: 'b-tree',
  template: ` <ng-content /> `,
  host: {
    '(cdkDropListDropped)': 'dropEmitter.emit($event)',
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
export class Tree implements OnInit {
  /**
   * Whether nodes are draggable.
   */
  readonly draggable = input(false);

  /**
   * Injected CDK drop list instance for this tree.
   */
  private tree = inject(CdkDropList);

  /**
   * Nested TreeNode children.
   */
  private readonly nestedNodes = contentChildren(TreeNode);

  /**
   * Whether to close nested nodes recursively when closing a node.
   */
  readonly closeRecursively = input(false);

  /**
   * Emitted when a drag-drop operation finishes.
   */
  dropEmitter = output<CdkDragDrop<string[]>>();

  constructor() {
    effect(() => {
      this.handleTreeDisability();
    });
  }

  ngOnInit(): void {
    if (this.closeRecursively()) this.handleCloseRecursively();
  }

  /**
   * Watch draggable state and apply it to CDK drop list and nested nodes.
   */
  private handleTreeDisability(): void {
    const isDisabled = !this.draggable();
    this.tree.disabled = isDisabled;

    this.nestedNodes().forEach((node) => {
      node.handleNodeDisability(isDisabled);
    });
  }

  /**
   * Subscribe to nested node close events and close children recursively.
   */
  handleCloseRecursively(): void {
    this.nestedNodes().forEach((node) => {
      node.closeEmitter.subscribe(() => {
        this.closeNestedNodes();
      });
    });
  }

  /**
   * Close all nested nodes recursively.
   */
  closeNestedNodes(): void {
    this.nestedNodes().forEach((node) => {
      node.extended.set(false);
      node.nestedTree()?.closeNestedNodes();
    });
  }
}
