import { Component } from '@angular/core';
import {
  AlertComponent,
  CommandComponent,
  CommandOptionsComponent,
  OptionComponent,
} from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';

@Component({
  selector: 'article[app-command-documentation]',
  template: `<b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Command</h1>
    <span>
      Command is a headless component for building command palettes with
      keyboard navigation.
    </span>

    <code-block [code]="angularImport" />
    <span
      >Include this to apply predefined styles. The component is headless
      without it.</span
    >
    <code-block [code]="stylesImport" />

    <h2>Properties</h2>
    <div class="table-wrapper">
      <table>
        <tr>
          <th>Property</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr>
          <td><strong>maxWidth</strong></td>
          <td><code>string</code></td>
          <td>The maximum width of the command component.</td>
        </tr>
      </table>
    </div>

    <h2>Basic Usage</h2>
    <span>
      Use <strong>Arrow Up</strong> and <strong>Arrow Down</strong> keys to
      navigate between options, and press <strong>Enter</strong> to select an
      option. The input remains focused, making it ideal for building CDK
      components or autocomplete dropdowns.
    </span>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <b-command [style.max-width.px]="'200'" [maxHeight]="'200px'">
        <ul b-command-options>
          <li b-option value="option1">Option 1</li>
          <li b-option value="option2">Option 2</li>
          <li b-option value="option3">Option 3</li>
          <li b-option value="option4">Option 4</li>
          <li b-option value="option5">Option 5</li>
          <li b-option value="option6">Option 6</li>
        </ul>
      </b-command>
    </div>`,
  imports: [
    CodeBlockComponent,
    AlertComponent,
    CommandComponent,
    CommandOptionsComponent,
    OptionComponent,
  ],
})
export default class CommandDocumentationComponent {
  angularImport = `import { CommandComponent, CommandOptionsComponent } from '@basis-ng/primitives'`;

  stylesImport = `@import '@basis-ng/styles/command';
@import '@basis-ng/styles/command-options';`;

  basicUsage = `<b-command [maxWidth]="'350px'" [maxHeight]="'200px'">
  <ul b-command-options>
    <li b-option value="option1">Option 1</li>
    <li b-option value="option2">Option 2</li>
    <li b-option value="option3">Option 3</li>
    <li b-option value="option4">Option 4</li>
    <li b-option value="option5">Option 5</li>
    <li b-option value="option6">Option 6</li>
  </ul>
</b-command>`;
}
