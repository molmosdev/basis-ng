import { Component, signal } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import {
  Option,
  ConnectedOverlay,
  OverlayOrigin,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  Alert,
  Input,
  SelectFilter,
} from '@basis-ng/primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';

@Component({
  selector: 'article[app-select-documentation]',
  imports: [
    CodeBlock,
    FormsModule,
    ReactiveFormsModule,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectFilter,
    Option,
    OverlayOrigin,
    ConnectedOverlay,
    StepsButtons,
    Alert,
    Input,
  ],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Range', path: '/docs/components/range' }"
      [next]="{ label: 'Sheet', path: '/docs/components/sheet' }"
    />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback! Expect breaking
      changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Select</h1>
    <div class="flex flex-col gap-4">
      <span>
        Select is an advanced dropdown component, now based on signals and display functions for
        greater flexibility and performance.
      </span>
      <code-block [code]="angularImport" />
      <span>
        Include the styles so the component looks correct. The component is headless without them.
      </span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Select properties</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-900 mb-6"
      >
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-neutral-900">
            <tr>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Prop
              </th>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- size is visual-only now; use class="b-size-sm|md|lg" on the host -->
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                displayWith
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                <b class="font-bold">required</b>
                | (value: string[]) => string
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">SelectValue properties</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-900 mb-6"
      >
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-neutral-900">
            <tr>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Prop
              </th>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                placeholder
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                <b class="font-bold">'Select an option'</b>
                | string
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">SelectContent properties</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-900 mb-6"
      >
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-neutral-900">
            <tr>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Prop
              </th>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                multiple
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                <b class="font-bold">false</b>
                | boolean
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic usage</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <!-- Basic select example -->
        <b-select [(ngModel)]="selectedOptions" [displayWith]="displayFn">
          <button b-select-trigger bOverlayOrigin #trigger="bOverlayOrigin" class="b-size-md">
            <b-select-value placeholder="Select an option" />
          </button>
          <ng-template
            bConnectedOverlay
            [trigger]="trigger"
            [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']"
          >
            <ul b-select-content class="b-size-md" [multiple]="false">
              @for (option of options(); track option) {
                <li b-option [value]="option.value">{{ option.label }}</li>
              }
            </ul>
          </ng-template>
        </b-select>
      </div>
      <h2 class="font-semibold text-xl">Sizes</h2>
      <code-block [code]="sizesUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-row items-center justify-center gap-8"
      >
        <b-select [(ngModel)]="selectedOptions" [displayWith]="displayFn">
          <button b-select-trigger bOverlayOrigin #trigger1="bOverlayOrigin" class="b-size-sm">
            <b-select-value placeholder="Size sm" />
          </button>
          <ng-template
            bConnectedOverlay
            [trigger]="trigger1"
            [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']"
          >
            <ul b-select-content class="b-size-sm" [multiple]="false">
              @for (option of options(); track option) {
                <li b-option [value]="option.value">{{ option.label }}</li>
              }
            </ul>
          </ng-template>
        </b-select>
        <b-select [(ngModel)]="selectedOptions" [displayWith]="displayFn">
          <button b-select-trigger bOverlayOrigin #trigger2="bOverlayOrigin" class="b-size-md">
            <b-select-value placeholder="Size md" />
          </button>
          <ng-template
            bConnectedOverlay
            [trigger]="trigger2"
            [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']"
          >
            <ul b-select-content class="b-size-md" [multiple]="false">
              @for (option of options(); track option) {
                <li b-option [value]="option.value">{{ option.label }}</li>
              }
            </ul>
          </ng-template>
        </b-select>
        <b-select [(ngModel)]="selectedOptions" [displayWith]="displayFn">
          <button b-select-trigger bOverlayOrigin #trigger3="bOverlayOrigin" class="b-size-lg">
            <b-select-value placeholder="Size lg" />
          </button>
          <ng-template
            bConnectedOverlay
            [trigger]="trigger3"
            [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']"
          >
            <ul b-select-content class="b-size-lg" [multiple]="false">
              @for (option of options(); track option) {
                <li b-option [value]="option.value">{{ option.label }}</li>
              }
            </ul>
          </ng-template>
        </b-select>
      </div>
      <h2 class="font-semibold text-xl">Multiple selection</h2>
      <code-block [code]="multipleUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <b-select [(ngModel)]="selectedMultiple" [displayWith]="displayFn">
          <button b-select-trigger bOverlayOrigin #triggerMulti="bOverlayOrigin">
            <b-select-value placeholder="Select options" />
          </button>
          <ng-template
            bConnectedOverlay
            [trigger]="triggerMulti"
            [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']"
          >
            <ul b-select-content [multiple]="true">
              @for (option of options(); track option) {
                <li b-option [value]="option.value">{{ option.label }}</li>
              }
            </ul>
          </ng-template>
        </b-select>
      </div>
      <h2 class="font-semibold text-xl">Reactive Forms</h2>
      <code-block [code]="reactiveFormsUsage" />
      <form
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
        [formGroup]="formGroup"
      >
        <b-select formControlName="selectControl" [displayWith]="displayFn">
          <button b-select-trigger bOverlayOrigin #triggerReactive="bOverlayOrigin">
            <b-select-value placeholder="Select an option" />
          </button>
          <ng-template
            bConnectedOverlay
            [trigger]="triggerReactive"
            [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']"
          >
            <ul b-select-content [multiple]="false">
              @for (option of options(); track option) {
                <li b-option [value]="option.value">{{ option.label }}</li>
              }
            </ul>
          </ng-template>
        </b-select>
      </form>
      <h2 class="font-semibold text-xl">Disabled</h2>
      <code-block [code]="disabledOptionUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <b-select [(ngModel)]="selectedOptions" [displayWith]="displayFn">
          <button b-select-trigger bOverlayOrigin #triggerDisabled="bOverlayOrigin">
            <b-select-value placeholder="Select an option" />
          </button>
          <ng-template
            bConnectedOverlay
            [trigger]="triggerDisabled"
            [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']"
          >
            <ul b-select-content [multiple]="false">
              <li b-option [value]="'option1'">Option 1</li>
              <li b-option [value]="'option2'" [disabled]="true">Option 2 (Disabled)</li>
              <li b-option [value]="'option3'">Option 3</li>
            </ul>
          </ng-template>
        </b-select>
      </div>
      <h2 class="font-semibold text-xl">Filter with input</h2>
      <span>
        If you want to implement a
        <b>combobox</b>
        (a select with an input to type and filter options), you can subscribe to the standard HTML
        <code>&lt;input&gt;</code>
        events (like
        <code>input</code>
        or
        <code>change</code>
        ). This way, you can dynamically update the displayed options based on the entered text.
      </span>
      <code-block [code]="withFilterImport" />
      <code-block [code]="filterUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <b-select [(ngModel)]="selectedOptionsFiltered" [displayWith]="displayFn">
          <button b-select-trigger bOverlayOrigin #triggerFilter="bOverlayOrigin">
            <b-select-value placeholder="Select (filter)" />
          </button>
          <ng-template
            bConnectedOverlay
            [trigger]="triggerFilter"
            [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']"
          >
            <ul b-select-content [multiple]="false">
              <input
                b-input
                bSelectFilter
                type="text"
                placeholder="Filter options"
                [(ngModel)]="filterText"
              />
              @for (option of options(); track option.label) {
                <li b-option [value]="option.value">{{ option.label }}</li>
              }
            </ul>
          </ng-template>
        </b-select>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Range', path: '/docs/components/range' }"
      [next]="{ label: 'Sheet', path: '/docs/components/sheet' }"
    />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class: 'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class SelectDocumentation {
  angularImport = `import { Select, SelectTrigger, SelectValue, SelectContent, Option, ConnectedOverlay, OverlayOrigin } from '@basis-ng/primitives' ;`;
  stylesImport = `@import '@basis-ng/styles/select';`;

  selectedOptions: string[] = ['option3'];
  selectedMultiple: string[] = ['option1', 'option3'];
  selectedOptionsFiltered: string[] = [];
  readonly options = signal([
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' },
    { value: 'option3', label: 'Opción 3' },
  ]);
  filterText = '';
  displayFn = (value: string[]) => {
    return value
      ? this.options()
          .filter((option) => value.includes(option.value))
          .map((option) => option.label)
          .join(', ')
      : '';
  };
  formGroup = new FormGroup({
    selectControl: new FormControl(['option3']),
  });

  basicUsage = `<b-select [(ngModel)]='selectedOptions' [displayWith]='displayFn'>
  <button b-select-trigger bOverlayOrigin #trigger='bOverlayOrigin' class='b-size-md'>
    <b-select-value placeholder='Selecciona una opción' />
  </button>
  <ng-template bConnectedOverlay [trigger]='trigger' [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']">
    <ul b-select-content class='b-size-md' [multiple]='false'>
      @for (option of options(); track option) {
        <li b-option [value]='option.value'>{{ option.label }}</li>
      }
    </ul>
  </ng-template>
</b-select>`;

  sizesUsage = `<b-select [(ngModel)]='selectedOptions' [displayWith]='displayFn'>
  <button b-select-trigger bOverlayOrigin #trigger1='bOverlayOrigin' class='b-size-sm'>
    <b-select-value placeholder='Tamaño sm' />
  </button>
  <ng-template bConnectedOverlay [trigger]='trigger1' [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']">
    <ul b-select-content class='b-size-sm' [multiple]='false'>
      @for (option of options(); track option) {
        <li b-option [value]='option.value'>{{ option.label }}</li>
      }
    </ul>
  </ng-template>
</b-select>
  <b-select [(ngModel)]='selectedOptions' [displayWith]='displayFn'>
  <button b-select-trigger bOverlayOrigin #trigger2='bOverlayOrigin' class='b-size-md'>
    <b-select-value placeholder='Tamaño md' />
  </button>
  <ng-template bConnectedOverlay [trigger]='trigger2' [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']">
    <ul b-select-content class='b-size-md' [multiple]='false'>
      @for (option of options(); track option) {
        <li b-option [value]='option.value'>{{ option.label }}</li>
      }
    </ul>
  </ng-template>
</b-select>
<b-select [(ngModel)]='selectedOptions' [displayWith]='displayFn'>
  <button b-select-trigger bOverlayOrigin #trigger3='bOverlayOrigin' class='b-size-lg'>
    <b-select-value placeholder='Tamaño lg' />
  </button>
  <ng-template bConnectedOverlay [trigger]='trigger3' [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']">
    <ul b-select-content class='b-size-lg' [multiple]='false'>
      @for (option of options(); track option) {
        <li b-option [value]='option.value'>{{ option.label }}</li>
      }
    </ul>
  </ng-template>
</b-select>`;

  multipleUsage = `<b-select [(ngModel)]='selectedMultiple' [displayWith]='displayFn'>
  <button b-select-trigger bOverlayOrigin #triggerMulti='bOverlayOrigin'>
    <b-select-value placeholder='Selecciona opciones' />
  </button>
  <ng-template bConnectedOverlay [trigger]='triggerMulti' [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']">
    <ul b-select-content [multiple]='true'>
      @for (option of options(); track option) {
        <li b-option [value]='option.value'>{{ option.label }}</li>
      }
    </ul>
  </ng-template>
</b-select>`;

  reactiveFormsUsage = `<form [formGroup]='formGroup'>
  <b-select formControlName='selectControl' [displayWith]='displayFn'>
    <button b-select-trigger bOverlayOrigin #triggerReactive='bOverlayOrigin'>
      <b-select-value placeholder='Selecciona una opción' />
    </button>
    <ng-template bConnectedOverlay [trigger]='triggerReactive' [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']">
      <ul b-select-content [multiple]='false'>
        @for (option of options(); track option) {
          <li b-option [value]='option.value'>{{ option.label }}</li>
        }
      </ul>
    </ng-template>
  </b-select>
</form>`;

  disabledOptionUsage = `<b-select [(ngModel)]='selectedOptions' [displayWith]='displayFn'>
  <button b-select-trigger bOverlayOrigin #triggerDisabled='bOverlayOrigin'>
    <b-select-value placeholder='Selecciona una opción' />
  </button>
  <ng-template bConnectedOverlay [trigger]='triggerDisabled' [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']">
    <ul b-select-content [multiple]='false'>
      <li b-option [value]='option1'>Opción 1</li>
      <li b-option [value]='option2' [disabled]='true'>Opción 2 (Deshabilitada)</li>
      <li b-option [value]='option3'>Opción 3</li>
    </ul>
  </ng-template>
</b-select>`;

  withFilterImport = `import { SelectFilter } from '@basis-ng/primitives' ;`;

  filterUsage = `<b-select [(ngModel)]='selectedOptionsFiltered' [displayWith]='displayFn'>
  <button b-select-trigger bOverlayOrigin #triggerFilter='bOverlayOrigin'>
    <b-select-value placeholder='Select (filter)' />
  </button>
  <ng-template bConnectedOverlay [trigger]='triggerFilter' [positions]="['bottom-left','bottom-right','top-left','top-right']">
    <ul b-select-content [multiple]='false'>
      <input b-input bSelectFilter type='text' placeholder='Filter options' [(ngModel)]='filterText' />
      @for (option of filteredOptions(); track option) {
        <li b-option [value]='option.value'>{{ option.label }}</li>
      }
    </ul>
  </ng-template>
</b-select>`;
}
