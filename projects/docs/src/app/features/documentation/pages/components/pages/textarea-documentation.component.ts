import { Component } from '@angular/core';
import { AlertComponent, TextareaComponent } from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'article[app-textarea-documentation]',
  template: `<b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Textarea</h1>
    <span>
      Textarea is a custom textarea component with additional features.
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
          <td><strong>size</strong></td>
          <td><code>'1' | '2' | '3'</code></td>
          <td>Textarea size variant.</td>
        </tr>
      </table>
    </div>

    <h2>Basic</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <textarea b-textarea placeholder="Enter text"></textarea>
    </div>

    <h2>Size Variants</h2>
    <code-block [code]="sizeUsage" />
    <div class="documentation-playground">
      <textarea b-textarea size="1" placeholder="Small"></textarea>
      <textarea b-textarea size="2" placeholder="Medium"></textarea>
      <textarea b-textarea size="3" placeholder="Large"></textarea>
    </div> `,
  imports: [
    CodeBlockComponent,
    TextareaComponent,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
  ],
})
export default class TextareaDocumentationComponent {
  angularImport = `import { TextareaComponent } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/textarea';`;
  basicUsage = `<textarea b-textarea placeholder="Enter text"></textarea>`;
  sizeUsage = `<textarea b-textarea size="1" placeholder="Small"></textarea>
<textarea b-textarea size="2" placeholder="Medium"></textarea>
<textarea b-textarea size="3" placeholder="Large"></textarea>`;
}
