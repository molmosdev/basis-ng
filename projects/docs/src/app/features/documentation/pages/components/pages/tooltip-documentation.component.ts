import { Component } from '@angular/core';
import { AlertComponent, Button, TooltipDirective } from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';

@Component({
  selector: 'article[app-tooltip-documentation]',
  template: `
    <b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>

    <h1>Tooltip</h1>
    <span>
      The Tooltip directive allows you to display additional information when
      hovering over an element. It supports both string and template content.
    </span>

    <code-block [code]="angularImport" />
    <span>Include this to apply predefined styles.</span>

    <h2>Properties</h2>
    <div class="table-wrapper">
      <table>
        <tr>
          <th>Property</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr>
          <td><strong>bTooltip</strong></td>
          <td><code>string | TemplateRef</code></td>
          <td>The content of the tooltip.</td>
        </tr>
        <tr>
          <td><strong>size</strong></td>
          <td><code>'sm' | 'md' | 'lg'</code></td>
          <td>The size of the tooltip.</td>
        </tr>
        <tr>
          <td><strong>positions</strong></td>
          <td><code>Position[]</code></td>
          <td>
            The possible positions of the tooltip. Default is
            <code>['bottom-center']</code>.
          </td>
        </tr>
        <tr>
          <td><strong>showDelay</strong></td>
          <td><code>number</code></td>
          <td>Delay in milliseconds before showing the tooltip.</td>
        </tr>
        <tr>
          <td><strong>hideDelay</strong></td>
          <td><code>number</code></td>
          <td>Delay in milliseconds before hiding the tooltip.</td>
        </tr>
        <tr>
          <td><strong>hover</strong></td>
          <td><code>boolean</code></td>
          <td>
            Whether the tooltip appears on hover. Default is <code>true</code>.
          </td>
        </tr>
        <tr>
          <td><strong>focus</strong></td>
          <td><code>boolean</code></td>
          <td>
            Whether the tooltip appears on focus. Default is <code>false</code>.
          </td>
        </tr>
      </table>
    </div>

    <h2>Basic Example</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <button b-button variant="outlined" [bTooltip]="'Tooltip content'">
        Hover me to see the tooltip
      </button>
    </div>

    <h2>Template Content</h2>
    <code-block [code]="templateUsage" />
    <ng-template #tooltipTemplate>
      <strong>Custom Template Content</strong>
    </ng-template>
    <div class="documentation-playground">
      <button b-button variant="outlined" [bTooltip]="tooltipTemplate">
        Hover me to see the tooltip
      </button>
    </div>

    <h2>Positions</h2>
    <span>
      The positions property allows you to control where the tooltip appears
      relative to the trigger element. Below are examples of different
      positions.
    </span>
    <code-block [code]="positionsUsage" />
    <div class="documentation-playground">
      <button
        b-button
        variant="outlined"
        [bTooltip]="'Tooltip positioned at top left'"
        [positions]="['top-left']">
        Top Left
      </button>
      <button
        b-button
        variant="outlined"
        [bTooltip]="'Tooltip positioned at bottom center'"
        [positions]="['bottom-center']">
        Bottom Center
      </button>
    </div>

    <h2>Hover Example</h2>
    <code-block [code]="hoverExample" />
    <div class="documentation-playground">
      <button
        b-button
        variant="outlined"
        [bTooltip]="'Hover Tooltip'"
        [hover]="true">
        Hover me
      </button>
    </div>

    <h2>Focus Example</h2>
    <code-block [code]="focusExample" />
    <div class="documentation-playground">
      <button
        b-button
        variant="outlined"
        [bTooltip]="'Focus Tooltip'"
        [focus]="true"
        [hover]="false">
        Focus me
      </button>
    </div>

    <h2>Sizes</h2>
    <span>
      The size property allows you to control the size of the tooltip. Below are
      examples of different sizes.
    </span>
    <code-block [code]="sizesExample" />
    <div class="documentation-playground">
      <button
        b-button
        variant="outlined"
        [bTooltip]="'Small Tooltip'"
        size="sm">
        Small
      </button>
      <button
        b-button
        variant="outlined"
        [bTooltip]="'Default Tooltip'"
        size="md">
        Default
      </button>
      <button
        b-button
        variant="outlined"
        [bTooltip]="'Large Tooltip'"
        size="lg">
        Large
      </button>
    </div>
  `,
  standalone: true,
  imports: [CodeBlockComponent, Button, AlertComponent, TooltipDirective],
})
export default class TooltipDocumentationComponent {
  angularImport = `import { TooltipDirective } from '@basis-ng/primitives'`;

  basicUsage = `<button b-button [bTooltip]="'Tooltip content'">
  Hover me
</button>`;

  templateUsage = `<ng-template #tooltipTemplate>
  <strong>Custom Template Content</strong>
</ng-template>
<button b-button [bTooltip]="tooltipTemplate">
  Hover me
</button>`;

  positionsUsage = `<button b-button [bTooltip]="'Tooltip positioned at top left'" [positions]="['top-left']">
  Top Left
</button>
<button b-button [bTooltip]="'Tooltip positioned at bottom center'" [positions]="['bottom-center']">
  Bottom Center
</button>`;

  hoverExample = `<button b-button [bTooltip]="'Hover Tooltip'" [hover]="true">
  Hover me
</button>`;

  focusExample = `<button b-button [bTooltip]="'Focus Tooltip'" [focus]="true" [hover]="false">
  Focus me
</button>`;

  sizesExample = `<button b-button [bTooltip]="'Small Tooltip'" size="sm">
  Small
</button>
<button b-button [bTooltip]="'Default Tooltip'" size="md">
  Default
</button>
<button b-button [bTooltip]="'Large Tooltip'" size="lg">
  Large
</button>`;
}
