import { Component, inject } from '@angular/core';
import {
  AlertComponent,
  ButtonComponent,
  DialogService,
  DialogDirective,
} from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';

@Component({
  selector: 'article[app-dialog-documentation]',
  template: `
    <b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Dialog</h1>
    <span>
      Dialog is a modal component for displaying important information or
      actions. It can be opened via the DialogService or by using a template
      reference to the directive.
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
          <td><strong>hasBackdrop</strong></td>
          <td><code>boolean</code></td>
          <td>Whether the dialog has a backdrop.</td>
        </tr>
        <tr>
          <td><strong>closeOnBackdropClick</strong></td>
          <td><code>boolean</code></td>
          <td>Whether the dialog closes on backdrop click.</td>
        </tr>
        <tr>
          <td><strong>closeOnEscapeKey</strong></td>
          <td><code>boolean</code></td>
          <td>Whether the dialog closes on escape key.</td>
        </tr>
        <tr>
          <td><strong>openDelay</strong></td>
          <td><code>number</code></td>
          <td>Delay before opening (ms). Default: <code>0</code></td>
        </tr>
        <tr>
          <td><strong>closeDelay</strong></td>
          <td><code>number</code></td>
          <td>Delay before closing (ms). Default: <code>150</code></td>
        </tr>
      </table>
    </div>

    <h2>Basic Usage (Service)</h2>
    <code-block [code]="basicUsageService" />
    <div class="documentation-playground">
      <button b-button (click)="openDialogService()">
        Open Dialog (Service)
      </button>
    </div>
    <ng-template bDialog="exampleDialog">
      <h1>Dialog</h1>
      <p>
        This is a dialog component. You can use it to display important
        information to the user.
      </p>
      <button b-button (click)="closeDialogService()">close dialog</button>
    </ng-template>

    <h2>Basic Usage (Directive Reference)</h2>
    <code-block [code]="basicUsageDirective" />
    <div class="documentation-playground">
      <button b-button (click)="dialogRef.open()">
        Open Dialog (Directive Ref)
      </button>
    </div>
    <ng-template bDialog="exampleDialog2" #dialogRef="bDialog">
      <h1>Dialog</h1>
      <p>
        This is a dialog component. You can use it to display important
        information to the user.
      </p>
      <button b-button (click)="dialogRef.close()">close dialog</button>
    </ng-template>

    <h2>hasBackdrop = false</h2>
    <code-block [code]="hasBackdropFalseExample" />
    <div class="documentation-playground">
      <button b-button (click)="dialogNoBackdrop.open()">
        Open Dialog (No Backdrop)
      </button>
    </div>
    <ng-template
      bDialog="dialogNoBackdrop"
      [hasBackdrop]="false"
      #dialogNoBackdrop="bDialog">
      <h1>Dialog</h1>
      <p>No backdrop is rendered behind this dialog.</p>
      <button b-button (click)="dialogNoBackdrop.close()">close dialog</button>
    </ng-template>

    <h2>closeOnBackdropClick = false</h2>
    <code-block [code]="noBackdropCloseExample" />
    <div class="documentation-playground">
      <button b-button (click)="dialogNoBackdropClose.open()">
        Open Dialog (Backdrop can't close)
      </button>
    </div>
    <ng-template
      bDialog="dialogNoBackdropClose"
      [closeOnBackdropClick]="false"
      #dialogNoBackdropClose="bDialog">
      <h1>Dialog</h1>
      <p>Clicking the backdrop will not close this dialog.</p>
      <button b-button (click)="dialogNoBackdropClose.close()">
        close dialog
      </button>
    </ng-template>

    <h2>closeOnEscapeKey = false</h2>
    <code-block [code]="noEscapeCloseExample" />
    <div class="documentation-playground">
      <button b-button (click)="dialogNoEscape.open()">
        Open Dialog (Escape can't close)
      </button>
    </div>
    <ng-template
      bDialog="dialogNoEscape"
      [closeOnEscapeKey]="false"
      #dialogNoEscape="bDialog">
      <h1>Dialog</h1>
      <p>Pressing Escape will not close this dialog.</p>
      <button b-button (click)="dialogNoEscape.close()">close dialog</button>
    </ng-template>
  `,
  imports: [
    CodeBlockComponent,
    ButtonComponent,
    AlertComponent,
    DialogDirective,
  ],
})
export default class DialogDocumentationComponent {
  angularImport = `import { DialogDirective } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/dialog';`;

  basicUsageService = `<button b-button (click)="openDialogService()">Open Dialog (Service)</button>
<ng-template bDialog="exampleDialog">
  <h1>Dialog</h1>
  <p>
    This is a dialog component. You can use it to display important information to the user.
  </p>
  <button b-button (click)="closeDialogService()">close dialog</button>
</ng-template>`;

  basicUsageDirective = `<button b-button (click)="dialogRef.open()">Open Dialog (Directive Ref)</button>
<ng-template bDialog="exampleDialog2" #dialogRef="bDialog">
  <h1>Dialog</h1>
  <p>
    This is a dialog component. You can use it to display important information to the user.
  </p>
  <button b-button (click)="dialogRef.close()">close dialog</button>
</ng-template>`;

  hasBackdropFalseExample = `<button b-button (click)="dialogNoBackdrop.open()">Open Dialog (No Backdrop)</button>
<ng-template bDialog="dialogNoBackdrop" [hasBackdrop]="false" #dialogNoBackdrop="bDialog">
  <h1>Dialog</h1>
  <p>No backdrop is rendered behind this dialog.</p>
  <button b-button (click)="dialogNoBackdrop.close()">close dialog</button>
</ng-template>`;

  noBackdropCloseExample = `<button b-button (click)="dialogNoBackdropClose.open()">Open Dialog (Backdrop can't close)</button>
<ng-template bDialog="dialogNoBackdropClose" [closeOnBackdropClick]="false" #dialogNoBackdropClose="bDialog">
  <h1>Dialog</h1>
  <p>Clicking the backdrop will not close this dialog.</p>
  <button b-button (click)="dialogNoBackdropClose.close()">close dialog</button>
</ng-template>`;

  noEscapeCloseExample = `<button b-button (click)="dialogNoEscape.open()">Open Dialog (Escape can't close)</button>
<ng-template bDialog="dialogNoEscape" [closeOnEscapeKey]="false" #dialogNoEscape="bDialog">
  <h1>Dialog</h1>
  <p>Pressing Escape will not close this dialog.</p>
  <button b-button (click)="dialogNoEscape.close()">close dialog</button>
</ng-template>`;

  dialogService = inject(DialogService);

  openDialogService() {
    this.dialogService.openDialog('exampleDialog');
  }

  closeDialogService() {
    this.dialogService.closeDialog('exampleDialog');
  }
}
