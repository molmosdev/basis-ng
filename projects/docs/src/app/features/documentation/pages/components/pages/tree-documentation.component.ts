import { Component } from '@angular/core';
import {
  TreeComponent,
  TreeNodeComponent,
  IconComponent,
  BadgeComponent,
  AlertComponent,
} from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'article[app-tree-documentation]',
  template: `<b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Tree</h1>
    <span>
      The Tree component is a hierarchical structure that supports drag-and-drop
      functionality and nested nodes.
    </span>

    <code-block [code]="angularImport" />
    <span
      >Include this to apply predefined styles. The component is headless
      without it.</span
    >
    <code-block [code]="stylesImport" />

    <h2>Properties</h2>
    <span
      >This section applies to both <strong>Tree</strong> and
      <strong>TreeNode</strong>.</span
    >
    <div class="table-wrapper">
      <table>
        <tr>
          <th>Property</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr>
          <td><strong>draggable</strong></td>
          <td><code>boolean</code></td>
          <td>Indicates whether the tree or node is draggable.</td>
        </tr>
        <tr>
          <td><strong>extended</strong></td>
          <td><code>boolean</code></td>
          <td>Indicates whether the node is expanded.</td>
        </tr>
        <tr>
          <td><strong>maxWidth</strong></td>
          <td><code>string</code></td>
          <td>Specifies the maximum width of the tree.</td>
        </tr>
        <tr>
          <td><strong>closeRecursively</strong></td>
          <td><code>boolean</code></td>
          <td>
            If set to <code>true</code>, closing a node will recursively close
            all its child nodes.
          </td>
        </tr>
      </table>
    </div>

    <h2>Basic Example</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <b-tree [maxWidth]="'240px'">
        <b-tree-node>Node 1</b-tree-node>
        <b-tree-node>Node 2</b-tree-node>
      </b-tree>
    </div>

    <h2>With Nested Nodes</h2>
    <code-block [code]="nestedUsage" />
    <div class="documentation-playground">
      <b-tree [maxWidth]="'240px'">
        <b-tree-node>
          Parent Node
          <b-tree>
            <b-tree-node>Child Node 1</b-tree-node>
            <b-tree-node>Child Node 2</b-tree-node>
          </b-tree>
        </b-tree-node>
      </b-tree>
    </div>

    <h2>With Recursive Closing</h2>
    <code-block [code]="recursiveCloseUsage" />
    <div class="documentation-playground">
      <b-tree [closeRecursively]="true" [maxWidth]="'240px'">
        <b-tree-node>
          Parent Node
          <b-tree>
            <b-tree-node>
              Child Node 1
              <b-tree>
                <b-tree-node>Grandchild Node 1</b-tree-node>
                <b-tree-node>Grandchild Node 2</b-tree-node>
              </b-tree>
            </b-tree-node>
            <b-tree-node>Child Node 2</b-tree-node>
          </b-tree>
        </b-tree-node>
      </b-tree>
    </div>

    <h2>With Drag-and-Drop</h2>
    <code-block [code]="dragDropUsage" />
    <div class="documentation-playground">
      <b-tree
        [draggable]="true"
        [maxWidth]="'240px'"
        (dropEmitter)="onDrop($event)">
        @for (node of nodes; track node) {
          <b-tree-node>
            {{ node.name }}
            @if (node.children) {
              <b-tree>
                @for (child of node.children; track child) {
                  <b-tree-node>
                    {{ child.name }}
                  </b-tree-node>
                }
              </b-tree>
            }
          </b-tree-node>
        }
      </b-tree>
    </div>

    <h2>Complex Example</h2>
    <code-block [code]="complexUsage" />
    <div class="documentation-playground">
      <b-tree
        [maxWidth]="'320px'"
        [draggable]="true"
        (dropEmitter)="onDrop($event)"
        id="complexTree">
        @for (node of complexNodes; track node) {
          <b-tree-node>
            <i b-icon [size]="13" icon="Folder"></i> {{ node.name }}
            @if (node.badge) {
              <span b-badge variant="outlined" size="small">{{
                node.badge
              }}</span>
            }
            @if (node.children) {
              <b-tree
                [draggable]="true"
                (dropEmitter)="onChildDrop($event)"
                id="childTree-{{ node.name }}">
                @for (child of node.children; track child) {
                  <b-tree-node>
                    <i b-icon [size]="13" icon="File"></i> {{ child.name }}
                    @if (child.badge) {
                      <span b-badge variant="outlined" size="small">{{
                        child.badge
                      }}</span>
                    }
                    @if (child.children) {
                      <b-tree
                        [draggable]="true"
                        (dropEmitter)="onChildDrop($event)"
                        id="childTree-{{ child.name }}">
                        @for (grandchild of child.children; track grandchild) {
                          <b-tree-node>
                            <i b-icon [size]="13" icon="File"></i>
                            {{ grandchild.name }}
                            @if (grandchild.badge) {
                              <span b-badge variant="outlined" size="small">{{
                                grandchild.badge
                              }}</span>
                            }
                          </b-tree-node>
                        }
                      </b-tree>
                    }
                  </b-tree-node>
                }
              </b-tree>
            }
          </b-tree-node>
        }
      </b-tree>
    </div>

    <h2>Two Trees Example</h2>
    <code-block [code]="twoTreesUsage" />
    <div class="documentation-playground">
      <div
        style="display: flex; flex-direction: column; gap: 2rem; width: 100%; align-items: center;">
        <span>Tree 1</span>
        <b-tree
          [maxWidth]="'240px'"
          [draggable]="true"
          id="tree1"
          [connectedTo]="['tree2']"
          (dropEmitter)="onTwoTreesDrop($event)">
          @for (node of tree1Nodes; track node) {
            <b-tree-node>
              {{ node.name }}
            </b-tree-node>
          }
        </b-tree>
        <span>Tree 2</span>
        <b-tree
          [maxWidth]="'240px'"
          [draggable]="true"
          id="tree2"
          [connectedTo]="['tree1']"
          (dropEmitter)="onTwoTreesDrop($event)">
          @for (node of tree2Nodes; track node) {
            <b-tree-node>
              {{ node.name }}
            </b-tree-node>
          }
        </b-tree>
      </div>
    </div>

    <h2>Events</h2>
    <span
      >This section lists the events emitted by the
      <strong>Tree</strong> component.</span
    >
    <div class="table-wrapper">
      <table>
        <tr>
          <th>Event</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr>
          <td><strong>dropEmitter</strong></td>
          <td><code>CdkDragDrop&lt;string[]&gt;</code></td>
          <td>
            Emitted when a drag-and-drop operation is completed within the tree.
          </td>
        </tr>
      </table>
    </div>

    <h2>CdkDragDrop Type</h2>
    <span
      >This section describes the fields of the
      <strong>CdkDragDrop</strong> type.</span
    >
    <div class="table-wrapper">
      <table>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr>
          <td><strong>previousIndex</strong></td>
          <td><code>number</code></td>
          <td>The index of the item before the drop operation.</td>
        </tr>
        <tr>
          <td><strong>currentIndex</strong></td>
          <td><code>number</code></td>
          <td>The index of the item after the drop operation.</td>
        </tr>
        <tr>
          <td><strong>item</strong></td>
          <td><code>T</code></td>
          <td>The item being dragged.</td>
        </tr>
        <tr>
          <td><strong>container</strong></td>
          <td><code>CdkDropList</code></td>
          <td>The container where the item was dropped.</td>
        </tr>
        <tr>
          <td><strong>previousContainer</strong></td>
          <td><code>CdkDropList</code></td>
          <td>The container from which the item was dragged.</td>
        </tr>
      </table>
    </div>`,
  standalone: true,
  imports: [
    TreeComponent,
    TreeNodeComponent,
    CodeBlockComponent,
    IconComponent,
    BadgeComponent,
    AlertComponent,
  ],
})
export default class TreeDocumentationComponent {
  angularImport = `import { Tree, TreeNode } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/tree';
@import '@basis-ng/styles/tree-node';
`;

  basicUsage = `<b-tree [maxWidth]="'240px'">
  <b-tree-node>Node 1</b-tree-node>
  <b-tree-node>Node 2</b-tree-node>
</b-tree>`;

  nestedUsage = `<b-tree [maxWidth]="'240px'">
  <b-tree-node>
    Parent Node
    <b-tree>
      <b-tree-node>Child Node 1</b-tree-node>
      <b-tree-node>Child Node 2</b-tree-node>
    </b-tree>
  </b-tree-node>
</b-tree>`;

  dragDropUsage = `<b-tree [draggable]="true" [maxWidth]="'240px'" (dropEmitter)="onDrop($event)">
  <b-tree-node>
    Node 1
    <b-tree>
      <b-tree-node>Child Node 1</b-tree-node>
      <b-tree-node>Child Node 2</b-tree-node>
    </b-tree>
  </b-tree-node>
  <b-tree-node>Node 2</b-tree-node>
</b-tree>`;

  recursiveCloseUsage = `<b-tree [closeRecursively]="true" [maxWidth]="'240px'">
  <b-tree-node>
    Parent Node
    <b-tree>
      <b-tree-node>
        Child Node 1
        <b-tree>
          <b-tree-node>Grandchild Node 1</b-tree-node>
          <b-tree-node>Grandchild Node 2</b-tree-node>
        </b-tree>
      </b-tree-node>
      <b-tree-node>Child Node 2</b-tree-node>
    </b-tree>
  </b-tree-node>
</b-tree>`;

  complexUsage = `<b-tree [draggable]="true" (dropEmitter)="onDrop($event)" id="complexTree" [maxWidth]="'320px'">
  <b-tree-node>
    <i b-icon [size]="13" icon="Folder"></i> Parent Node
    <span b-badge variant="outlined" size="small">New</span>
    <b-tree [draggable]="true" (dropEmitter)="onChildDrop($event)" id="childTree-Parent Node">
      <b-tree-node>
        <i b-icon [size]="13" icon="File"></i> Child Node 1
        <span b-badge variant="outlined" size="small">Updated</span>
      </b-tree-node>
      <b-tree-node>
        <i b-icon [size]="13" icon="File"></i> Child Node 2
        <b-tree [draggable]="true" (dropEmitter)="onChildDrop($event)" id="childTree-Child Node 2">
          <b-tree-node>
            <i b-icon [size]="13" icon="File"></i> Grandchild Node 1
          </b-tree-node>
          <b-tree-node>
            <i b-icon [size]="13" icon="File"></i> Grandchild Node 2
            <span b-badge variant="outlined" size="small">Important</span>
          </b-tree-node>
        </b-tree>
      </b-tree-node>
    </b-tree>
  </b-tree-node>
  <b-tree-node>
    <i b-icon [size]="13" icon="Folder"></i> Another Parent Node
    <span b-badge variant="outlined" size="small">Beta</span>
  </b-tree-node>
</b-tree>`;

  twoTreesUsage = `<div style="display: flex; flex-direction: column; gap: 2rem; width: 100%; align-items: center;">
  <span>Tree 1</span>
  <b-tree [draggable]="true" id="tree1" [connectedTo]="['tree2']" [maxWidth]="'240px'" (dropEmitter)="onTwoTreesDrop($event)">
    <b-tree-node>Item 1</b-tree-node>
    <b-tree-node>Item 2</b-tree-node>
  </b-tree>
  <span>Tree 2</span>
  <b-tree [draggable]="true" id="tree2" [connectedTo]="['tree1']" [maxWidth]="'240px'" (dropEmitter)="onTwoTreesDrop($event)">
    <b-tree-node>Item A</b-tree-node>
    <b-tree-node>Item B</b-tree-node>
  </b-tree>
</div>`;

  nodes = [
    {
      name: 'Node 1',
      children: [{ name: 'Child Node 1' }, { name: 'Child Node 2' }],
    },
    { name: 'Node 2' },
  ];

  complexNodes = [
    {
      name: 'Parent Node',
      badge: 'New',
      children: [
        { name: 'Child Node 1', badge: 'Updated' },
        {
          name: 'Child Node 2',
          children: [
            { name: 'Grandchild Node 1' },
            { name: 'Grandchild Node 2', badge: 'Important' },
          ],
        },
      ],
    },
    { name: 'Another Parent Node', badge: 'Beta' },
  ];

  tree1Nodes = [{ name: 'Item 1' }, { name: 'Item 2' }];

  tree2Nodes = [{ name: 'Item A' }, { name: 'Item B' }];

  onDrop(event: CdkDragDrop<any[]>) {
    if (event.container.id === 'complexTree') {
      moveItemInArray(
        this.complexNodes,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      moveItemInArray(this.nodes, event.previousIndex, event.currentIndex);
    }
  }

  onChildDrop(event: CdkDragDrop<any[]>) {
    const findNodeById = (nodes: any[], id: string): any => {
      for (const node of nodes) {
        if (`childTree-${node.name}` === id) {
          return node;
        }
        if (node.children) {
          const found = findNodeById(node.children, id);
          if (found) {
            return found;
          }
        }
      }
      return null;
    };

    const parentNode = findNodeById(this.complexNodes, event.container.id);
    if (parentNode && parentNode.children) {
      moveItemInArray(
        parentNode.children,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onTwoTreesDrop(event: CdkDragDrop<any[]>) {
    const previousContainer =
      event.previousContainer.id === 'tree1'
        ? this.tree1Nodes
        : this.tree2Nodes;
    const currentContainer =
      event.container.id === 'tree1' ? this.tree1Nodes : this.tree2Nodes;

    const [movedItem] = previousContainer.splice(event.previousIndex, 1);
    currentContainer.splice(event.currentIndex, 0, movedItem);
  }
}
