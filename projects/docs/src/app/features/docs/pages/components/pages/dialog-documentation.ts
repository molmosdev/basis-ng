import { Component, inject } from '@angular/core';
import {
  DialogService,
  Dialog,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Button,
  Badge,
  Alert,
} from '@basis-ng/primitives';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { CodeBlock } from '../shared/components/code-block';
import { StepsButtons } from '../../shared/components/steps-buttons';

@Component({
  selector: 'article[app-dialog-documentation]',
  imports: [
    CodeBlock,
    Button,
    Dialog,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
    StepsButtons,
    Badge,
    Alert,
  ],
  template: `
    <app-steps-buttons
      [previous]="{
        label: 'Color Picker',
        path: '/docs/components/color-picker',
      }"
      [next]="{ label: 'Drawer', path: '/docs/components/drawer' }" />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback!
      Expect breaking changes!
    </b-alert>
    <h1 class="font-bold text-2xl flex gap-2 items-start">
      Dialog
      <span b-badge variant="outlined" size="sm"> New </span>
    </h1>
    <span>
      The <strong>Dialog</strong> directive allows you to register an
      <span class="font-display-mono">ng-template</span> as a dialog. You can
      open dialogs using the <strong>DialogService</strong> or by referencing
      the directive instance. The directive, together with the service,
      dynamically instantiates the dialog content component.
    </span>
    <code-block [code]="angularImport" />
    <span>
      Include this to apply predefined styles. The component is headless without
      it.
    </span>
    <code-block [code]="stylesImport" />
    <h2 class="font-semibold text-xl">Properties</h2>
    <div
      class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-700 dark:bg-neutral-900 mb-6">
      <table class="table-auto w-full text-left text-sm">
        <thead class="bg-gray-50 dark:bg-zinc-800">
          <tr>
            <th
              class="border-b border-gray-200 dark:border-neutral-700 px-4 py-2 font-semibold">
              Property
            </th>
            <th
              class="border-b border-gray-200 dark:border-neutral-700 px-4 py-2 font-semibold">
              Type
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
              hasBackdrop
            </td>
            <td
              class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
              <strong>true</strong> | false
            </td>
          </tr>
          <tr>
            <td
              class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
              closeOnBackdropClick
            </td>
            <td
              class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
              <strong>true</strong> | false
            </td>
          </tr>
          <tr>
            <td
              class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
              closeOnEscapeKey
            </td>
            <td
              class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
              <strong>true</strong> | false
            </td>
          </tr>
          <tr>
            <td
              class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
              closeDelay
            </td>
            <td
              class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
              <strong>150</strong> | number
            </td>
          </tr>
          <tr>
            <td
              class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
              closed
            </td>
            <td
              class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
              EventEmitter&lt;void&gt;
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 class="font-semibold text-xl">Basic Usage (Service)</h2>
    <code-block [code]="basicUsageService" />
    <div
      class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
      <button b-button (click)="openDialogService()">
        Open Dialog (Service)
      </button>
    </div>
    <ng-template bDialog="exampleDialog">
      <b-card>
        <b-card-header>
          <b-card-title>Dialog</b-card-title>
          <b-card-description>
            This is a dialog component. You can use it to display important
            information to the user.
          </b-card-description>
        </b-card-header>
        <b-card-footer>
          <button b-button (click)="closeDialogService()">Close</button>
        </b-card-footer>
      </b-card>
    </ng-template>
    <h2 class="font-semibold text-xl">Basic Usage (Directive Reference)</h2>
    <code-block [code]="basicUsageDirective" />
    <div
      class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
      <button b-button (click)="dialogRef.open()">
        Open Dialog (Directive Ref)
      </button>
    </div>
    <ng-template bDialog="exampleDialog2" #dialogRef="bDialog">
      <b-card>
        <b-card-header>
          <b-card-title>Dialog</b-card-title>
          <b-card-description>
            This is a dialog component. You can use it to display important
            information to the user.
          </b-card-description>
        </b-card-header>
        <b-card-footer>
          <button b-button (click)="dialogRef.close()">Close</button>
        </b-card-footer>
      </b-card>
    </ng-template>
    <h2 class="font-semibold text-xl">Dialog without backdrop</h2>
    <code-block [code]="hasBackdropFalseExample" />
    <div
      class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
      <button b-button (click)="dialogNoBackdrop.open()">
        Open Dialog (No Backdrop)
      </button>
    </div>
    <ng-template
      bDialog="dialogNoBackdrop"
      [hasBackdrop]="false"
      #dialogNoBackdrop="bDialog">
      <b-card>
        <b-card-header>
          <b-card-title>Dialog</b-card-title>
          <b-card-description
            >No backdrop is rendered behind this dialog.</b-card-description
          >
        </b-card-header>
        <b-card-footer>
          <button b-button (click)="dialogNoBackdrop.close()">Close</button>
        </b-card-footer>
      </b-card>
    </ng-template>
    <h2 class="font-semibold text-xl">
      Dialog cannot be closed by clicking backdrop
    </h2>
    <code-block [code]="noBackdropCloseExample" />
    <div
      class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
      <button b-button (click)="dialogNoBackdropClose.open()">
        Open Dialog (Backdrop can't close)
      </button>
    </div>
    <ng-template
      bDialog="dialogNoBackdropClose"
      [closeOnBackdropClick]="false"
      #dialogNoBackdropClose="bDialog">
      <b-card>
        <b-card-header>
          <b-card-title>Dialog</b-card-title>
          <b-card-description
            >Clicking the backdrop will not close this
            dialog.</b-card-description
          >
        </b-card-header>
        <b-card-footer>
          <button b-button (click)="dialogNoBackdropClose.close()">
            Close
          </button>
        </b-card-footer>
      </b-card>
    </ng-template>
    <h2 class="font-semibold text-xl">
      Dialog cannot be closed with Escape key
    </h2>
    <code-block [code]="noEscapeCloseExample" />
    <div
      class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
      <button b-button (click)="dialogNoEscape.open()">
        Open Dialog (Escape can't close)
      </button>
    </div>
    <ng-template
      bDialog="dialogNoEscape"
      [closeOnEscapeKey]="false"
      #dialogNoEscape="bDialog">
      <b-card>
        <b-card-header>
          <b-card-title>Dialog</b-card-title>
          <b-card-description
            >Pressing Escape will not close this dialog.</b-card-description
          >
        </b-card-header>
        <b-card-footer>
          <button b-button (click)="dialogNoEscape.close()">Close</button>
        </b-card-footer>
      </b-card>
    </ng-template>
    <app-steps-buttons
      [previous]="{
        label: 'Color Picker',
        path: '/docs/components/color-picker',
      }"
      [next]="{ label: 'Drawer', path: '/docs/components/drawer' }" />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class DialogDocumentation {
  angularImport = `import { Dialog, DialogService } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/dialog';`;
  basicUsageService = `<button b-button (click)="openDialogService()">Open Dialog (Service)</button>\n<ng-template bDialog="exampleDialog">\n  <b-card>\n    <b-card-header>\n      <b-card-title>Dialog</b-card-title>\n      <b-card-description>\n        This is a dialog component. You can use it to display important information to the user.\n      </b-card-description>\n    </b-card-header>\n    <b-card-footer>\n      <button b-button (click)="closeDialogService()">Close</button>\n    </b-card-footer>\n  </b-card>\n</ng-template>`;
  basicUsageDirective = `<button b-button (click)="dialogRef.open()">Open Dialog (Directive Ref)</button>\n<ng-template bDialog="exampleDialog2" #dialogRef="bDialog">\n  <b-card>\n    <b-card-header>\n      <b-card-title>Dialog</b-card-title>\n      <b-card-description>\n        This is a dialog component. You can use it to display important information to the user.\n      </b-card-description>\n    </b-card-header>\n    <b-card-footer>\n      <button b-button (click)="dialogRef.close()">Close</button>\n    </b-card-footer>\n  </b-card>\n</ng-template>`;
  hasBackdropFalseExample = `<button b-button (click)="dialogNoBackdrop.open()">Open Dialog (No Backdrop)</button>\n<ng-template bDialog="dialogNoBackdrop" [hasBackdrop]="false" #dialogNoBackdrop="bDialog">\n  <b-card>\n    <b-card-header>\n      <b-card-title>Dialog</b-card-title>\n      <b-card-description>\n        No backdrop is rendered behind this dialog.\n      </b-card-description>\n    </b-card-header>\n    <b-card-footer>\n      <button b-button (click)="dialogNoBackdrop.close()">Close</button>\n    </b-card-footer>\n  </b-card>\n</ng-template>`;
  noBackdropCloseExample = `<button b-button (click)="dialogNoBackdropClose.open()">Open Dialog (Backdrop can't close)</button>\n<ng-template bDialog="dialogNoBackdropClose" [closeOnBackdropClick]="false" #dialogNoBackdropClose="bDialog">\n  <b-card>\n    <b-card-header>\n      <b-card-title>Dialog</b-card-title>\n      <b-card-description>\n        Clicking the backdrop will not close this dialog.\n      </b-card-description>\n    </b-card-header>\n    <b-card-footer>\n      <button b-button (click)="dialogNoBackdropClose.close()">Close</button>\n    </b-card-footer>\n  </b-card>\n</ng-template>`;
  noEscapeCloseExample = `<button b-button (click)="dialogNoEscape.open()">Open Dialog (Escape can't close)</button>\n<ng-template bDialog="dialogNoEscape" [closeOnEscapeKey]="false" #dialogNoEscape="bDialog">\n  <b-card>\n    <b-card-header>\n      <b-card-title>Dialog</b-card-title>\n      <b-card-description>\n        Pressing Escape will not close this dialog.\n      </b-card-description>\n    </b-card-header>\n    <b-card-footer>\n      <button b-button (click)="dialogNoEscape.close()">Close</button>\n    </b-card-footer>\n  </b-card>\n</ng-template>`;
  dialogService = inject(DialogService);
  openDialogService() {
    this.dialogService.openDialog('exampleDialog');
  }
  closeDialogService() {
    this.dialogService.closeDialog('exampleDialog');
  }
}
