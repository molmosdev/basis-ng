import { Component } from '@angular/core';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
  CardFooterComponent,
  ButtonComponent,
  AlertComponent,
} from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';
import { InputComponent } from 'primitives';

@Component({
  selector: 'article[app-card-documentation]',
  template: `
    <b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Card</h1>
    <span>
      Card is a flexible container for grouping related content and actions.
    </span>

    <code-block [code]="angularImport" />
    <span>
      Include this to apply predefined styles. The component is headless without
      it.
    </span>
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
          <td>The maximum width of the card. Default: <code>'80vw'</code></td>
        </tr>
      </table>
    </div>

    <h2>Basic Usage</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <b-card [maxWidth]="'400px'">
        <b-card-header>
          <b-card-title>Card Title</b-card-title>
          <b-card-description
            >This is a description for the card.</b-card-description
          >
        </b-card-header>
        <b-card-content>
          Here is some content inside the card. This is a longer text to
          demonstrate how the card handles multiple lines of content. You can
          add as much information as needed, and the card will expand
          accordingly to fit the content.
        </b-card-content>
        <b-card-footer>
          <button b-button>Action</button>
        </b-card-footer>
      </b-card>
    </div>

    <h2>Card with Only Content</h2>
    <code-block [code]="contentOnlyUsage" />
    <div class="documentation-playground">
      <b-card [maxWidth]="'300px'">
        <b-card-content>
          <span>
            This card only uses <code>&lt;b-card-content&gt;</code> for simple
            layouts.
          </span>
        </b-card-content>
      </b-card>
    </div>

    <h2>Card with Multiple Actions</h2>
    <code-block [code]="multiActionUsage" />
    <div class="documentation-playground">
      <b-card [maxWidth]="'350px'">
        <b-card-header>
          <b-card-title>Card with Actions</b-card-title>
        </b-card-header>
        <b-card-content>
          <span> You can add multiple actions in the footer. </span>
        </b-card-content>
        <b-card-footer>
          <button b-button variant="outlined">Cancel</button>
          <button b-button>Accept</button>
        </b-card-footer>
      </b-card>
    </div>

    <h2>Card with Inputs</h2>
    <code-block [code]="inputsCardUsage" />
    <div class="documentation-playground">
      <b-card [maxWidth]="'350px'">
        <b-card-header>
          <b-card-title>Login</b-card-title>
          <b-card-description>
            Enter your credentials to continue.
          </b-card-description>
        </b-card-header>
        <b-card-content>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <input b-input placeholder="Email" type="email" />
            <input b-input placeholder="Password" type="password" />
          </div>
        </b-card-content>
        <b-card-footer>
          <button b-button>Login</button>
        </b-card-footer>
      </b-card>
    </div>
  `,
  imports: [
    CodeBlockComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    CardFooterComponent,
    ButtonComponent,
    AlertComponent,
    InputComponent,
  ],
})
export default class CardDocumentationComponent {
  angularImport = `import { CardComponent } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/card';`;
  inputsCardUsage = `<b-card [maxWidth]="'350px'">
  <b-card-header>
    <b-card-title>Login</b-card-title>
    <b-card-description>
      Enter your credentials to continue.
    </b-card-description>
  </b-card-header>
  <b-card-content>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <input b-input placeholder="Email" type="email" />
      <input b-input placeholder="Password" type="password" />
    </div>
  </b-card-content>
  <b-card-footer>
    <button b-button>Login</button>
  </b-card-footer>
</b-card>`;

  basicUsage = `<b-card [maxWidth]="'400px'">
  <b-card-header>
    <b-card-title>Card Title</b-card-title>
    <b-card-description>This is a description for the card.</b-card-description>
  </b-card-header>
  <b-card-content>
    Here is some content inside the card. This is a longer text to demonstrate how the card handles multiple lines of content. You can add as much information as needed, and the card will expand accordingly to fit the content.
  </b-card-content>
  <b-card-footer>
    <button b-button>Action</button>
  </b-card-footer>
</b-card>`;

  contentOnlyUsage = `<b-card [maxWidth]="'300px'">
  <b-card-content>
    <span>
      This card only uses <code>&lt;b-card-content&gt;</code> for simple layouts.
    </span>
  </b-card-content>
</b-card>`;

  multiActionUsage = `<b-card [maxWidth]="'350px'">
  <b-card-header>
    <b-card-title>Card with Actions</b-card-title>
  </b-card-header>
  <b-card-content>
    <span>
      You can add multiple actions in the footer.
    </span>
  </b-card-content>
  <b-card-footer>
    <button b-button variant="outlined">Cancel</button>
    <button b-button>Accept</button>
  </b-card-footer>
</b-card>`;
}
