import { CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import {
  Component,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
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
  private readonly tree = inject(CdkDropList);

  /**
   * Nested TreeNode children.
   */
  private readonly nestedNodes = contentChildren(TreeNode);

  /**
   * Whether to close nested nodes recursively when closing a node.
   */
  readonly closeRecursively = input(false);

  /**
   * Whether nodes should be expanded by default on initialization.
   */
  readonly defaultExpanded = input(false);

  /**
   * Computed signal indicating if the tree is disabled (inverse of draggable).
   */
  private readonly isTreeDisabled = computed(() => !this.draggable());

  /**
   * Emitted when a drag-drop operation finishes.
   */
  readonly dropEmitter = output<CdkDragDrop<string[]>>();

  constructor() {
    // Reactively update tree and nodes disability - needs to react to draggable changes
    effect(() => {
      const disabled = this.isTreeDisabled();
      this.tree.disabled = disabled;

      this.nestedNodes().forEach((node) => {
        node.handleNodeDisability(disabled);
      });
    });

    // Reactively expand nodes - needs to react to defaultExpanded changes
    effect(() => {
      const shouldExpand = this.defaultExpanded();
      this.nestedNodes().forEach((node) => {
        node.setInitialExpansion(shouldExpand);
      });
    });
  }

  ngOnInit(): void {
    // Setup recursive close only once based on initial input value
    if (this.closeRecursively()) {
      this.setupRecursiveClose();
    }
  }

  /**
   * Subscribe to nested node close events and close children recursively.
   */
  private setupRecursiveClose(): void {
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

  /**
   * Set expansion state for all nodes recursively.
   * @param expanded - Whether nodes should be expanded.
   */
  setNodesExpansion(expanded: boolean): void {
    this.nestedNodes().forEach((node) => {
      node.setInitialExpansion(expanded);
    });
  }
}
