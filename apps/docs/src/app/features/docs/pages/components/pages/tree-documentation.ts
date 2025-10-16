import { Component } from '@angular/core';
import { Alert, Badge, Tree, TreeNode } from '@basis-ng/primitives';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { CodeBlock } from '../shared/components/code-block';

@Component({
  selector: 'article[app-tree-documentation]',
  imports: [Tree, TreeNode, CodeBlock, StepsButtons, Badge, Alert],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Tooltip', path: '/docs/components/tooltip' }"
      [next]="{ label: 'Translation', path: '/docs/utilities/translation' }"
    />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback! Expect breaking
      changes!
    </b-alert>
    <h1 class="font-bold text-2xl flex gap-2 items-start">
      Tree
      <span b-badge class="b-variant-outlined b-size-sm">New</span>
    </h1>
    <div class="flex flex-col gap-4">
      <span>
        The Tree component is a hierarchical structure that supports drag-and-drop functionality and
        nested nodes.
      </span>
      <code-block [code]="angularImport" />
      <span>Include this to apply predefined styles. The component is headless without it.</span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Properties</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-900 mb-6"
      >
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-neutral-900">
            <tr>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Prop
              </th>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                draggable
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                boolean
                <strong>false</strong>
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                extended
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                boolean
                <strong>false</strong>
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                closeRecursively
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                boolean
                <strong>false</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic Example</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col gap-4 items-center"
      >
        <b-tree>
          <b-tree-node>Node 1</b-tree-node>
          <b-tree-node>Node 2</b-tree-node>
        </b-tree>
      </div>
      <h2 class="font-semibold text-xl">With Nested Nodes</h2>
      <code-block [code]="nestedUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col gap-4 items-center"
      >
        <b-tree>
          <b-tree-node>
            Parent Node
            <b-tree>
              <b-tree-node>Child Node 1</b-tree-node>
              <b-tree-node>Child Node 2</b-tree-node>
            </b-tree>
          </b-tree-node>
        </b-tree>
      </div>
      <h2 class="font-semibold text-xl">With Recursive Closing</h2>
      <code-block [code]="recursiveCloseUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col gap-4 items-center"
      >
        <b-tree [closeRecursively]="true">
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
      <h2 class="font-semibold text-xl">With Drag-and-Drop</h2>
      <code-block [code]="dragDropUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col gap-4 items-center"
      >
        <b-tree [draggable]="true">
          <b-tree-node>Node 1</b-tree-node>
          <b-tree-node>Node 2</b-tree-node>
        </b-tree>
      </div>
      <h2 class="font-semibold text-xl">Active Node</h2>
      <code-block [code]="activeNodeUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col gap-4 items-center"
      >
        <b-tree>
          <b-tree-node class="b-active">Active node</b-tree-node>
          <b-tree-node>Node 2</b-tree-node>
        </b-tree>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Tooltip', path: '/docs/components/tooltip' }"
      [next]="{ label: 'Translation', path: '/docs/utilities/translation' }"
    />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class: 'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class TreeDocumentation {
  angularImport = `import { Tree, TreeNode } from '@basis-ng/primitives' `;
  stylesImport = `@import '@basis-ng/styles/tree';`;
  basicUsage = `<b-tree>\n  <b-tree-node>Node 1</b-tree-node>\n  <b-tree-node>Node 2</b-tree-node>\n</b-tree>`;
  nestedUsage = `<b-tree>\n  <b-tree-node>\n    Parent Node\n    <b-tree>\n      <b-tree-node>Child Node 1</b-tree-node>\n      <b-tree-node>Child Node 2</b-tree-node>\n    </b-tree>\n  </b-tree-node>\n</b-tree>`;
  recursiveCloseUsage = `<b-tree [closeRecursively]="true">\n  <b-tree-node>\n    Parent Node\n    <b-tree>\n      <b-tree-node>\n        Child Node 1\n        <b-tree>\n          <b-tree-node>Grandchild Node 1</b-tree-node>\n          <b-tree-node>Grandchild Node 2</b-tree-node>\n        </b-tree>\n      </b-tree-node>\n      <b-tree-node>Child Node 2</b-tree-node>\n    </b-tree>\n  </b-tree-node>\n</b-tree>`;
  dragDropUsage = `<b-tree [draggable]="true">\n  <b-tree-node>Node 1</b-tree-node>\n  <b-tree-node>Node 2</b-tree-node>\n</b-tree>`;
  activeNodeUsage = `<b-tree>\n  <b-tree-node class='b-active'>Active node</b-tree-node>\n  <b-tree-node>Node 2</b-tree-node>\n</b-tree>`;
}
