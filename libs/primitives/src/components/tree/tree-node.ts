import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import {
  Component,
  computed,
  contentChild,
  effect,
  inject,
  model,
  OnInit,
  output,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGripVertical } from '@ng-icons/lucide';
import { Tree } from './tree';

/**
 * Individual node within a tree structure, supporting drag-and-drop and nested trees.
 */
@Component({
  selector: 'b-tree-node',
  imports: [CdkDragHandle, NgIcon],
  template: `
    <section>
      @if (!isNodeDisabled() && !shouldHideDragHandle()) {
        <ng-icon name="lucideGripVertical" size="16" color="currentColor" cdkDragHandle />
      }
      <div
        class="projected-content"
        (click)="hasNestedTree() && toggleExtension()"
        (keydown.enter)="hasNestedTree() && toggleExtension()"
        (keydown.space)="hasNestedTree() && toggleExtension()"
        role="button"
        tabindex="0"
      >
        <ng-content />
      </div>
      @if (hasNestedTree()) {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      }
    </section>
    @if (hasNestedTree() && expanded()) {
      <div class="nested">
        <ng-content select="b-tree" />
      </div>
    }
  `,
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
   * Whether this node is expanded to show nested content.
   */
  readonly expanded = model(false);

  /**
   * Injected CDK drag instance for this node.
   */
  protected readonly node = inject(CdkDrag);

  /**
   * Child nested tree, if present.
   */
  readonly nestedTree = contentChild(Tree);

  /**
   * Computed signal indicating if this node has a nested tree.
   */
  protected readonly hasNestedTree = computed(() => !!this.nestedTree());

  /**
   * Computed signal for node disabled state.
   */
  protected readonly isNodeDisabled = computed(() => this.node.disabled);

  /**
   * Internal state for dragOnlyWhenCollapsed from parent Tree.
   */
  private _dragOnlyWhenCollapsed = false;

  /**
   * Track if any parent node is expanded (disables drag when dragOnlyWhenCollapsed is active).
   */
  private _hasExpandedParent = false;

  /**
   * Computed to determine if drag handle should be hidden.
   */
  protected readonly shouldHideDragHandle = computed(() => {
    if (!this._dragOnlyWhenCollapsed) return false;
    // Hide if this node is expanded and has nested tree, or if any parent is expanded
    return (this.hasNestedTree() && this.expanded()) || this._hasExpandedParent;
  });

  /**
   * Emitted when a nested tree is closed.
   */
  readonly closeEmitter = output<void>();

  constructor() {
    // Track expanded state changes for close events and drag state
    let previousExpanded = this.expanded();

    effect(() => {
      const currentExpanded = this.expanded();

      // Emit close event when collapsing
      if (previousExpanded && !currentExpanded && this.nestedTree()) {
        this.closeEmitter.emit();
      }

      // Update drag state when dragOnlyWhenCollapsed is active
      if (this._dragOnlyWhenCollapsed) {
        this.updateDragState(currentExpanded, previousExpanded);
      }

      previousExpanded = currentExpanded;
    });
  }

  ngOnInit(): void {
    // Static configuration - only needs to run once
    this.node.lockAxis = 'y';
  }

  /**
   * Update drag state based on expanded state and parent state.
   */
  private updateDragState(isExpanded: boolean, wasExpanded: boolean): void {
    if (this.hasNestedTree()) {
      this.handleNodeWithChildren(isExpanded, wasExpanded);
    } else {
      this.handleLeafNode();
    }
  }

  /**
   * Handle drag state for nodes with children.
   */
  private handleNodeWithChildren(isExpanded: boolean, wasExpanded: boolean): void {
    if (isExpanded) {
      this.node.disabled = true;
      this.nestedTree()?.disableDirectChildren();
    } else if (wasExpanded) {
      this.node.disabled = false;
      this.nestedTree()?.enableDirectChildren();
    }
  }

  /**
   * Handle drag state for leaf nodes (no children).
   */
  private handleLeafNode(): void {
    this.node.disabled = this._hasExpandedParent;
  }

  /**
   * Enable or disable the underlying CDK drag for this node.
   * @param disabled - Whether the node should be disabled.
   */
  handleNodeDisability(disabled: boolean): void {
    this.node.disabled = disabled;
  }

  /**
   * Set drag only when collapsed mode from parent Tree.
   * @param enabled - Whether drag should only work when collapsed.
   */
  setDragOnlyWhenCollapsed(enabled: boolean): void {
    this._dragOnlyWhenCollapsed = enabled;
    // Apply immediately if node has nested tree and is expanded
    if (enabled && this.hasNestedTree() && this.expanded()) {
      this.node.disabled = true;
      this.nestedTree()?.disableDirectChildren();
    }
  }

  /**
   * Set whether this node has an expanded parent.
   * @param hasExpandedParent - Whether the direct parent is expanded.
   */
  setHasExpandedParent(hasExpandedParent: boolean): void {
    this._hasExpandedParent = hasExpandedParent;

    if (!this._dragOnlyWhenCollapsed) return;

    // Update drag state based on parent state
    if (!this.hasNestedTree() || !this.expanded()) {
      this.node.disabled = hasExpandedParent;
    }
  }

  /**
   * Toggle the node expansion.
   */
  toggleExtension(): void {
    this.expanded.update((current) => !current);
  }
}
