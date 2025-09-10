import { Component } from '@angular/core';
import { Button, SpinnerComponent } from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';

@Component({
  selector: 'article[app-spinner-documentation]',
  template: `
    <h1>Spinner</h1>
    <span>
      Spinner is a loading indicator component. It supports three sizes for
      flexible usage in buttons or standalone.
    </span>

    <h2>Properties</h2>
    <div class="table-wrapper">
      <table>
        <tr>
          <th>Property</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr>
          <td><strong>size</strong></td>
          <td><code>'1' | '2' | '3'</code></td>
          <td>
            The size of the spinner. <br />
            <code>'1'</code>: Small (for buttons), <code>'2'</code>: Medium
            (default), <code>'3'</code>: Large (standalone)
          </td>
        </tr>
        <tr>
          <td><strong>type</strong></td>
          <td><code>'bars' | 'circle'</code></td>
          <td>
            The type of spinner. <br />
            <code>'bars'</code>: classic spinner with bars (default),
            <code>'circle'</code>: circular spinner
          </td>
        </tr>
      </table>
    </div>

    <h2>Examples</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <b-spinner size="1" />
      <b-spinner size="2" />
      <b-spinner size="3" />
    </div>
    <h3>Type: bars (default)</h3>
    <div class="documentation-playground">
      <b-spinner type="bars" size="2" />
    </div>
    <h3>Type: circle</h3>
    <div class="documentation-playground">
      <b-spinner type="circle" size="2" />
    </div>
    <h2>Usage in Button</h2>
    <code-block [code]="buttonUsage" />
    <div class="documentation-playground">
      <button b-button>
        <b-spinner size="1" />
        Loading...
      </button>
    </div>
  `,
  imports: [CodeBlockComponent, Button, SpinnerComponent],
})
export default class SpinnerDocumentationComponent {
  basicUsage = `<b-spinner size="1"></b-spinner>\n<b-spinner size="2"></b-spinner>\n<b-spinner size="3"></b-spinner>\n\n<b-spinner type="bars" size="2"></b-spinner>\n<b-spinner type="circle" size="2"></b-spinner>`;
  buttonUsage = `<button b-button>\n  <b-spinner size="1"></b-spinner>\n  Loading...\n</button>`;
}
