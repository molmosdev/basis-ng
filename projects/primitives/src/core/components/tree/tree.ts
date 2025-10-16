import { CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Component, contentChildren, effect, inject, input, OnInit, output } from '@angular/core';
import { TreeNode } from './tree-node';

@Component({
  selector: 'b-tree',
  template: `
    <ng-content />
  `,
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
  readonly draggable = input(false);
  private tree = inject(CdkDropList);
  private readonly nestedNodes = contentChildren(TreeNode);
  readonly closeRecursively = input(false);
  dropEmitter = output<CdkDragDrop<string[]>>();

  constructor() {
    effect(() => {
      this.handleTreeDisability();
    });
  }

  ngOnInit(): void {
    if (this.closeRecursively()) this.handleCloseRecursively();
  }

  private handleTreeDisability(): void {
    const isDisabled = !this.draggable();
    this.tree.disabled = isDisabled;

    this.nestedNodes().forEach((node) => {
      node.handleNodeDisability(isDisabled);
    });
  }

  handleCloseRecursively(): void {
    this.nestedNodes().forEach((node) => {
      node.closeEmitter.subscribe(() => {
        this.closeNestedNodes();
      });
    });
  }

  closeNestedNodes(): void {
    this.nestedNodes().forEach((node) => {
      node.extended.set(false);
      node.nestedTree()?.closeNestedNodes();
    });
  }
}
