import { Component } from '@angular/core';
import { TreeComponent, TreeNodeComponent, Badge } from '@basis-ng/primitives';
import { CodeBlock } from '../shared/components/code-block';
import { StepsButtons } from '../../shared/components/steps-buttons';

@Component({
  selector: 'article[app-tree-documentation]',
  imports: [TreeComponent, TreeNodeComponent, CodeBlock, StepsButtons, Badge],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Tooltip', path: '/docs/components/tooltip' }"
      [next]="{ label: 'Translation', path: '/docs/utilities/translation' }" />
    <h1 class="font-bold text-2xl flex gap-2 items-start">
      Tree
      <span b-badge variant="outlined" size="sm"> New </span>
    </h1>
    <div class="flex flex-col gap-4">
      <span>
        The Tree component is a hierarchical structure that supports
        drag-and-drop functionality and nested nodes.
      </span>
      <code-block [code]="angularImport" />
      <span>
        Include this to apply predefined styles. The component is headless
        without it.
      </span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Properties</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 mb-6">
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th
                class="border-b border-gray-200 dark:border-zinc-700 px-4 py-2 font-semibold">
                Prop
              </th>
              <th
                class="border-b border-gray-200 dark:border-zinc-700 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                draggable
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                boolean <strong>false</strong>
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                extended
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                boolean <strong>false</strong>
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                maxWidth
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                string <strong>'100%'</strong>
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                closeRecursively
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                boolean <strong>false</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic Example</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col gap-4 items-center">
        <b-tree [maxWidth]="'240px'">
          <b-tree-node>Node 1</b-tree-node>
          <b-tree-node>Node 2</b-tree-node>
        </b-tree>
      </div>
      <h2 class="font-semibold text-xl">With Nested Nodes</h2>
      <code-block [code]="nestedUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col gap-4 items-center">
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
      <h2 class="font-semibold text-xl">With Recursive Closing</h2>
      <code-block [code]="recursiveCloseUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col gap-4 items-center">
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
      <h2 class="font-semibold text-xl">With Drag-and-Drop</h2>
      <code-block [code]="dragDropUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col gap-4 items-center">
        <b-tree [draggable]="true" [maxWidth]="'240px'">
          <b-tree-node>Node 1</b-tree-node>
          <b-tree-node>Node 2</b-tree-node>
        </b-tree>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Tooltip', path: '/docs/components/tooltip' }"
      [next]="{ label: 'Translation', path: '/docs/utilities/translation' }" />
  `,
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-20',
  },
})
export class TreeDocumentation {
  angularImport = `import { TreeComponent, TreeNodeComponent } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/tree';\n@import '@basis-ng/styles/tree-node';`;
  basicUsage = `<b-tree [maxWidth]="'240px'">\n  <b-tree-node>Node 1</b-tree-node>\n  <b-tree-node>Node 2</b-tree-node>\n</b-tree>`;
  nestedUsage = `<b-tree [maxWidth]="'240px'">\n  <b-tree-node>\n    Parent Node\n    <b-tree>\n      <b-tree-node>Child Node 1</b-tree-node>\n      <b-tree-node>Child Node 2</b-tree-node>\n    </b-tree>\n  </b-tree-node>\n</b-tree>`;
  recursiveCloseUsage = `<b-tree [closeRecursively]="true" [maxWidth]="'240px'">\n  <b-tree-node>\n    Parent Node\n    <b-tree>\n      <b-tree-node>\n        Child Node 1\n        <b-tree>\n          <b-tree-node>Grandchild Node 1</b-tree-node>\n          <b-tree-node>Grandchild Node 2</b-tree-node>\n        </b-tree>\n      </b-tree-node>\n      <b-tree-node>Child Node 2</b-tree-node>\n    </b-tree>\n  </b-tree-node>\n</b-tree>`;
  dragDropUsage = `<b-tree [draggable]="true" [maxWidth]="'240px'">\n  <b-tree-node>Node 1</b-tree-node>\n  <b-tree-node>Node 2</b-tree-node>\n</b-tree>`;
}
