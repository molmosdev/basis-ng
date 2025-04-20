import { Component } from '@angular/core';
import {
  TooltipComponent,
  Button,
  Position,
  Alert,
} from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';

@Component({
  selector: 'article[app-tooltip-documentation]',
  template: `
    <b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>

    <h1>Tooltip</h1>
    <span>
      Tooltip is a component for displaying additional information when hovering
      over an element.
    </span>

    <code-block [code]="angularImport" />

    <h2>Properties</h2>
    <div class="table-wrapper">
      <table>
        <tr>
          <th>Property</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr>
          <td><strong>position</strong></td>
          <td><code>Position</code></td>
          <td>The position of the tooltip relative to its trigger element.</td>
        </tr>
        <tr>
          <td><strong>gap</strong></td>
          <td><code>number</code></td>
          <td>
            The gap (in pixels) between the tooltip and its trigger element.
          </td>
        </tr>
        <tr>
          <td><strong>variant</strong></td>
          <td>
            <code>'primary' | 'secondary' | 'ghost' | 'outlined'</code>
          </td>
          <td>The visual variant of the tooltip.</td>
        </tr>
        <tr>
          <td><strong>size</strong></td>
          <td><code>'small' | 'default'</code></td>
          <td>The size of the tooltip.</td>
        </tr>
      </table>
    </div>

    <h2>Basic Example</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <b-tooltip position="top-center">
        <button b-button variant="outlined" b-tooltip-trigger>
          Hover me to see the tooltip
        </button>
        <span b-tooltip-content>Tooltip content</span>
      </b-tooltip>
    </div>

    <h2>Variants</h2>
    <code-block [code]="variantsUsage" />
    <div class="documentation-playground">
      <b-tooltip variant="primary" position="top-center">
        <button b-button variant="outlined" b-tooltip-trigger>
          Primary Tooltip
        </button>
        <span b-tooltip-content>Primary Tooltip</span>
      </b-tooltip>
      <b-tooltip variant="secondary" position="top-center">
        <button b-button variant="outlined" b-tooltip-trigger>
          Secondary Tooltip
        </button>
        <span b-tooltip-content>Secondary Tooltip</span>
      </b-tooltip>
      <b-tooltip variant="ghost" position="top-center">
        <button b-button variant="outlined" b-tooltip-trigger>
          Ghost Tooltip
        </button>
        <span b-tooltip-content>Ghost Tooltip</span>
      </b-tooltip>
      <b-tooltip variant="outlined" position="top-center">
        <button b-button variant="outlined" b-tooltip-trigger>
          Outlined Tooltip
        </button>
        <span b-tooltip-content>Outlined Tooltip</span>
      </b-tooltip>
    </div>

    <h2>Sizes</h2>
    <code-block [code]="sizesUsage" />
    <div class="documentation-playground">
      <b-tooltip size="small" position="top-center">
        <button b-button variant="outlined" b-tooltip-trigger>
          Small Tooltip
        </button>
        <span b-tooltip-content>Small Tooltip</span>
      </b-tooltip>
      <b-tooltip size="default" position="top-center">
        <button b-button variant="outlined" b-tooltip-trigger>
          Default Tooltip
        </button>
        <span b-tooltip-content>Default Tooltip</span>
      </b-tooltip>
    </div>

    <h2>Positions</h2>
    <span>
      The position property allows you to control where the tooltip appears
      relative to the trigger element. It is composed of two parts: direction
      (e.g., top, bottom, left, right) and alignment (e.g., left, center,
      right). Below are examples of all possible combinations.
    </span>
    <span>
      The tooltip leverages the functionality of the AttachedBox component from
      this library, which dynamically adjusts the direction and alignment to
      prevent overflowing the screen. This ensures the tooltip remains fully
      visible even in constrained spaces.
    </span>

    <h3>Top</h3>
    <code-block [code]="topPositionsUsage" />
    <div class="documentation-playground">
      <b-tooltip position="top-left">
        <button b-button variant="outlined" b-tooltip-trigger>Top Left</button>
        <span b-tooltip-content>Top Left Tooltip</span>
      </b-tooltip>
      <b-tooltip position="top-center">
        <button b-button variant="outlined" b-tooltip-trigger>
          Top Center
        </button>
        <span b-tooltip-content>Top Center Tooltip</span>
      </b-tooltip>
      <b-tooltip position="top-right">
        <button b-button variant="outlined" b-tooltip-trigger>Top Right</button>
        <span b-tooltip-content>Top Right Tooltip</span>
      </b-tooltip>
    </div>

    <h3>Bottom</h3>
    <code-block [code]="bottomPositionsUsage" />
    <div class="documentation-playground">
      <b-tooltip position="bottom-left">
        <button b-button variant="outlined" b-tooltip-trigger>
          Bottom Left
        </button>
        <span b-tooltip-content>Bottom Left Tooltip</span>
      </b-tooltip>
      <b-tooltip position="bottom-center">
        <button b-button variant="outlined" b-tooltip-trigger>
          Bottom Center
        </button>
        <span b-tooltip-content>Bottom Center Tooltip</span>
      </b-tooltip>
      <b-tooltip position="bottom-right">
        <button b-button variant="outlined" b-tooltip-trigger>
          Bottom Right
        </button>
        <span b-tooltip-content>Bottom Right Tooltip</span>
      </b-tooltip>
    </div>

    <h3>Left</h3>
    <code-block [code]="leftPositionsUsage" />
    <div class="documentation-playground">
      <b-tooltip position="left-top">
        <button b-button variant="outlined" b-tooltip-trigger>Left Top</button>
        <span b-tooltip-content>Left Top Tooltip</span>
      </b-tooltip>
      <b-tooltip position="left-center">
        <button b-button variant="outlined" b-tooltip-trigger>
          Left Center
        </button>
        <span b-tooltip-content>Left Center Tooltip</span>
      </b-tooltip>
      <b-tooltip position="left-bottom">
        <button b-button variant="outlined" b-tooltip-trigger>
          Left Bottom
        </button>
        <span b-tooltip-content>Left Bottom Tooltip</span>
      </b-tooltip>
    </div>

    <h3>Right</h3>
    <code-block [code]="rightPositionsUsage" />
    <div class="documentation-playground">
      <b-tooltip position="right-top">
        <button b-button variant="outlined" b-tooltip-trigger>Right Top</button>
        <span b-tooltip-content>Right Top Tooltip</span>
      </b-tooltip>
      <b-tooltip position="right-center">
        <button b-button variant="outlined" b-tooltip-trigger>
          Right Center
        </button>
        <span b-tooltip-content>Right Center Tooltip</span>
      </b-tooltip>
      <b-tooltip position="right-bottom">
        <button b-button variant="outlined" b-tooltip-trigger>
          Right Bottom
        </button>
        <span b-tooltip-content>Right Bottom Tooltip</span>
      </b-tooltip>
    </div>
  `,
  standalone: true,
  imports: [TooltipComponent, CodeBlockComponent, Button, Alert],
})
export default class TooltipDocumentationComponent {
  angularImport = `import { TooltipComponent } from '@basis-ng/primitives'`;

  basicUsage = `<b-tooltip position="top-center">
  <button b-button b-tooltip-trigger>Hover me</button>
  <span b-tooltip-content>Tooltip content</span>
</b-tooltip>`;

  variantsUsage = `<b-tooltip variant="primary" position="top-center">
  <button b-button b-tooltip-trigger>Primary Tooltip</button>
  <span b-tooltip-content>Primary Tooltip</span>
</b-tooltip>
<b-tooltip variant="secondary" position="top-center">
  <button b-button b-tooltip-trigger>Secondary Tooltip</button>
  <span b-tooltip-content>Secondary Tooltip</span>
</b-tooltip>
<b-tooltip variant="ghost" position="top-center">
  <button b-button b-tooltip-trigger>Ghost Tooltip</button>
  <span b-tooltip-content>Ghost Tooltip</span>
</b-tooltip>
<b-tooltip variant="outlined" position="top-center">
  <button b-button b-tooltip-trigger>Outlined Tooltip</button>
  <span b-tooltip-content>Outlined Tooltip</span>
</b-tooltip>`;

  sizesUsage = `<b-tooltip size="small" position="top-center">
  <button b-button b-tooltip-trigger>Small Tooltip</button>
  <span b-tooltip-content>Small Tooltip</span>
</b-tooltip>
<b-tooltip size="default" position="top-center">
  <button b-button b-tooltip-trigger>Default Tooltip</button>
  <span b-tooltip-content>Default Tooltip</span>
</b-tooltip>`;

  topPositionsUsage = `<b-tooltip position="top-left">
  <button b-button b-tooltip-trigger>Top Left</button>
  <span b-tooltip-content>Top Left Tooltip</span>
</b-tooltip>
<b-tooltip position="top-center">
  <button b-button b-tooltip-trigger>Top Center</button>
  <span b-tooltip-content>Top Center Tooltip</span>
</b-tooltip>
<b-tooltip position="top-right">
  <button b-button b-tooltip-trigger>Top Right</button>
  <span b-tooltip-content>Top Right Tooltip</span>
</b-tooltip>`;

  bottomPositionsUsage = `<b-tooltip position="bottom-left">
  <button b-button b-tooltip-trigger>Bottom Left</button>
  <span b-tooltip-content>Bottom Left Tooltip</span>
</b-tooltip>
<b-tooltip position="bottom-center">
  <button b-button b-tooltip-trigger>Bottom Center</button>
  <span b-tooltip-content>Bottom Center Tooltip</span>
</b-tooltip>
<b-tooltip position="bottom-right">
  <button b-button b-tooltip-trigger>Bottom Right</button>
  <span b-tooltip-content>Bottom Right Tooltip</span>
</b-tooltip>`;

  leftPositionsUsage = `<b-tooltip position="left-top">
  <button b-button b-tooltip-trigger>Left Top</button>
  <span b-tooltip-content>Left Top Tooltip</span>
</b-tooltip>
<b-tooltip position="left-center">
  <button b-button b-tooltip-trigger>Left Center</button>
  <span b-tooltip-content>Left Center Tooltip</span>
</b-tooltip>
<b-tooltip position="left-bottom">
  <button b-button b-tooltip-trigger>Left Bottom</button>
  <span b-tooltip-content>Left Bottom Tooltip</span>
</b-tooltip>`;

  rightPositionsUsage = `<b-tooltip position="right-top">
  <button b-button b-tooltip-trigger>Right Top</button>
  <span b-tooltip-content>Right Top Tooltip</span>
</b-tooltip>
<b-tooltip position="right-center">
  <button b-button b-tooltip-trigger>Right Center</button>
  <span b-tooltip-content>Right Center Tooltip</span>
</b-tooltip>
<b-tooltip position="right-bottom">
  <button b-button b-tooltip-trigger>Right Bottom</button>
  <span b-tooltip-content>Right Bottom Tooltip</span>
</b-tooltip>`;

  positions: Position[] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
    'left-top',
    'left-center',
    'left-bottom',
    'right-top',
    'right-center',
    'right-bottom',
  ];
}
