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
      @if (!isNodeDisabled()) {
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
    @if (hasNestedTree() && extended()) {
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
  readonly extended = model(false);

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
   * Emitted when a nested tree is closed.
   */
  readonly closeEmitter = output<void>();

  constructor() {
    // Emit close event when collapsing - this needs to be reactive
    effect(() => {
      if (!this.extended() && this.nestedTree()) {
        this.closeEmitter.emit();
      }
    });
  }

  ngOnInit(): void {
    // Static configuration - only needs to run once
    this.node.lockAxis = 'y';
  }

  /**
   * Enable or disable the underlying CDK drag for this node.
   * @param disabled - Whether the node should be disabled.
   */
  handleNodeDisability(disabled: boolean): void {
    this.node.disabled = disabled;
  }

  /**
   * Set initial expansion state for the node.
   * @param expanded - Whether the node should be initially expanded.
   */
  setInitialExpansion(expanded: boolean): void {
    if (this.hasNestedTree()) {
      this.extended.set(expanded);
      // Propagate to nested tree if it exists
      this.nestedTree()?.setNodesExpansion(expanded);
    }
  }

  /**
   * Toggle the node expansion.
   */
  toggleExtension(): void {
    this.extended.update((current) => !current);
  }
}
