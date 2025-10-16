import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { Component, contentChild, inject, model, OnInit, output } from '@angular/core';
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
      @if (!node.disabled) {
        <ng-icon name="lucideGripVertical" size="16" color="currentColor" cdkDragHandle />
      }
      <div
        class="projected-content"
        (click)="nestedTree() && handleExtension()"
        (keydown.enter)="nestedTree() && handleExtension()"
        (keydown.space)="nestedTree() && handleExtension()"
        role="button"
        tabindex="0"
      >
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
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      }
    </section>
    @if (nestedTree() && extended()) {
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
  protected node = inject(CdkDrag);

  /**
   * Child nested tree, if present.
   */
  readonly nestedTree = contentChild(Tree);

  /**
   * Emitted when a nested tree is closed.
   */
  closeEmitter = output<void>();

  ngOnInit(): void {
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
   * Toggle the node expansion and emit close events when collapsed.
   */
  handleExtension(): void {
    const isExtended = this.extended();
    this.extended.set(!isExtended);

    if (isExtended && this.nestedTree()) {
      this.closeEmitter.emit();
    }
  }
}
