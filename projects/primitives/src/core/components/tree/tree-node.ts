import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import {
  Component,
  contentChild,
  inject,
  model,
  OnInit,
  output,
} from '@angular/core';
import { Tree } from './tree';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGripVertical } from '@ng-icons/lucide';

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
  readonly extended = model(false);
  protected node = inject(CdkDrag);
  readonly nestedTree = contentChild(Tree);
  closeEmitter = output<void>();

  ngOnInit(): void {
    this.node.lockAxis = 'y';
  }

  handleNodeDisability(disabled: boolean): void {
    this.node.disabled = disabled;
  }

  handleExtension(): void {
    const isExtended = this.extended();
    this.extended.set(!isExtended);

    if (isExtended && this.nestedTree()) {
      this.closeEmitter.emit();
    }
  }
}
