import { Component } from '@angular/core';
import { AlertComponent, BadgeComponent } from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';

@Component({
  selector: 'article[app-badge-documentation]',
  template: `<b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Badge</h1>
    <span>
      Badge is a small component used to display additional information or
      status.
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
          <td><strong>variant</strong></td>
          <td>
            <code>'primary' | 'secondary' | 'ghost' | 'outlined'</code>
          </td>
          <td>The variant of the badge.</td>
        </tr>
        <tr>
          <td><strong>size</strong></td>
          <td><code>'small' | 'default'</code></td>
          <td>The size of the badge.</td>
        </tr>
      </table>
    </div>

    <h2>Basic</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <span b-badge variant="primary" size="default">Primary Badge</span>
    </div>

    <h2>Variants</h2>
    <code-block [code]="variantsUsage" />
    <div class="documentation-playground">
      <span b-badge variant="primary">Primary</span>
      <span b-badge variant="secondary">Secondary</span>
      <span b-badge variant="ghost">Ghost</span>
      <span b-badge variant="outlined">Outlined</span>
    </div>

    <h2>Sizes</h2>
    <code-block [code]="sizesUsage" />
    <div class="documentation-playground">
      <span b-badge size="small">Small</span>
      <span b-badge size="default">Default</span>
    </div>`,
  imports: [CodeBlockComponent, BadgeComponent, AlertComponent],
})
export default class BadgeDocumentationComponent {
  angularImport = `import { Badge } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/badge';`;
  basicUsage = `<span b-badge variant="primary" size="default">Primary Badge</span>`;
  variantsUsage = `<span b-badge variant="primary">Primary</span>
<span b-badge variant="secondary">Secondary</span>
<span b-badge variant="ghost">Ghost</span>
<span b-badge variant="outlined">Outlined</span>`;
  sizesUsage = `<span b-badge size="small">Small</span>
<span b-badge size="default">Default</span>`;
}
