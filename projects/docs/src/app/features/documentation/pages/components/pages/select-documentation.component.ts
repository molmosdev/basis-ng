import { Component, signal } from '@angular/core';
import { CodeBlockComponent } from '../shared/components/code-block.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import {
  AlertComponent,
  Option,
  OverlayDirective,
  OverlayTriggerDirective,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@basis-ng/primitives';

@Component({
  selector: 'article[app-select-documentation]',
  template: `<b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Select</h1>
    <span>
      Select is an advanced dropdown component, now based on signals and display
      functions for greater flexibility and performance.
    </span>

    <code-block [code]="angularImport" />
    <span>
      Include the styles so the component looks correct. The component is
      headless without them.
    </span>
    <code-block [code]="stylesImport" />

    <h2>Basic usage</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <b-select
        [(ngModel)]="selectedOptions"
        size="2"
        [displayWith]="displayFn">
        <button b-select-trigger bOverlayTrigger #trigger="bOverlayTrigger">
          <b-select-value placeholder="Select an option" />
        </button>
        <ng-template
          bOverlay
          [trigger]="trigger"
          [positions]="[
            'bottom-left',
            'bottom-right',
            'top-left',
            'top-right',
          ]">
          <ul b-select-content [multiple]="false">
            @for (option of options(); track option) {
              <li b-option [value]="option.value">{{ option.label }}</li>
            }
          </ul>
        </ng-template>
      </b-select>
    </div>

    <h2>Sizes</h2>
    <code-block [code]="sizesUsage" />
    <div class="documentation-playground">
      <b-select
        [(ngModel)]="selectedOptions"
        size="1"
        [displayWith]="displayFn">
        <button b-select-trigger bOverlayTrigger #trigger1="bOverlayTrigger">
          <b-select-value placeholder="Size 1" />
        </button>
        <ng-template
          bOverlay
          [trigger]="trigger1"
          [positions]="[
            'bottom-left',
            'bottom-right',
            'top-left',
            'top-right',
          ]">
          <ul b-select-content [multiple]="false">
            @for (option of options(); track option) {
              <li b-option [value]="option.value">{{ option.label }}</li>
            }
          </ul>
        </ng-template>
      </b-select>
      <b-select
        [(ngModel)]="selectedOptions"
        size="2"
        [displayWith]="displayFn">
        <button b-select-trigger bOverlayTrigger #trigger2="bOverlayTrigger">
          <b-select-value placeholder="Size 2" />
        </button>
        <ng-template
          bOverlay
          [trigger]="trigger2"
          [positions]="[
            'bottom-left',
            'bottom-right',
            'top-left',
            'top-right',
          ]">
          <ul b-select-content [multiple]="false">
            @for (option of options(); track option) {
              <li b-option [value]="option.value">{{ option.label }}</li>
            }
          </ul>
        </ng-template>
      </b-select>
      <b-select
        [(ngModel)]="selectedOptions"
        size="3"
        [displayWith]="displayFn">
        <button b-select-trigger bOverlayTrigger #trigger3="bOverlayTrigger">
          <b-select-value placeholder="Size 3" />
        </button>
        <ng-template
          bOverlay
          [trigger]="trigger3"
          [positions]="[
            'bottom-left',
            'bottom-right',
            'top-left',
            'top-right',
          ]">
          <ul b-select-content [multiple]="false">
            @for (option of options(); track option) {
              <li b-option [value]="option.value">{{ option.label }}</li>
            }
          </ul>
        </ng-template>
      </b-select>
    </div>

    <h2>Multiple selection</h2>
    <code-block [code]="multipleUsage" />
    <div class="documentation-playground">
      <b-select [(ngModel)]="selectedMultiple" [displayWith]="displayFn">
        <button
          b-select-trigger
          bOverlayTrigger
          #triggerMulti="bOverlayTrigger">
          <b-select-value placeholder="Select options" />
        </button>
        <ng-template
          bOverlay
          [trigger]="triggerMulti"
          [positions]="[
            'bottom-left',
            'bottom-right',
            'top-left',
            'top-right',
          ]">
          <ul b-select-content [multiple]="true">
            @for (option of options(); track option) {
              <li b-option [value]="option.value">{{ option.label }}</li>
            }
          </ul>
        </ng-template>
      </b-select>
    </div>

    <h2>Reactive Forms</h2>
    <code-block [code]="reactiveFormsUsage" />
    <div class="documentation-playground">
      <form [formGroup]="formGroup">
        <b-select formControlName="selectControl" [displayWith]="displayFn">
          <button
            b-select-trigger
            bOverlayTrigger
            #triggerReactive="bOverlayTrigger">
            <b-select-value placeholder="Select an option" />
          </button>
          <ng-template
            bOverlay
            [trigger]="triggerReactive"
            [positions]="[
              'bottom-left',
              'bottom-right',
              'top-left',
              'top-right',
            ]">
            <ul b-select-content [multiple]="false">
              @for (option of options(); track option) {
                <li b-option [value]="option.value">{{ option.label }}</li>
              }
            </ul>
          </ng-template>
        </b-select>
      </form>
    </div>

    <h2>Disabled</h2>
    <code-block [code]="disabledOptionUsage" />
    <div class="documentation-playground">
      <b-select [(ngModel)]="selectedOptions" [displayWith]="displayFn">
        <button
          b-select-trigger
          bOverlayTrigger
          #triggerDisabled="bOverlayTrigger">
          <b-select-value placeholder="Select an option" />
        </button>
        <ng-template
          bOverlay
          [trigger]="triggerDisabled"
          [positions]="[
            'bottom-left',
            'bottom-right',
            'top-left',
            'top-right',
          ]">
          <ul b-select-content [multiple]="false">
            <li b-option [value]="'option1'">Option 1</li>
            <li b-option [value]="'option2'" [disabled]="true">
              Option 2 (Disabled)
            </li>
            <li b-option [value]="'option3'">Option 3</li>
          </ul>
        </ng-template>
      </b-select>
    </div>`,
  imports: [
    CodeBlockComponent,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    Option,
    OverlayTriggerDirective,
    OverlayDirective,
  ],
})
export default class SelectDocumentationComponent {
  angularImport = `import { Select, SelectTrigger, SelectValue, SelectContent, Option, OverlayDirective, OverlayTriggerDirective } from '@basis-ng/primitives';`;
  stylesImport = `@import '@basis-ng/styles/select';`;

  selectedOptions: string[] = ['option2'];
  selectedMultiple: string[] = ['option1', 'option3'];
  readonly options = signal([
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' },
    { value: 'option3', label: 'Opción 3' },
  ]);
  displayFn = (value: string[]) => {
    return value
      ? this.options()
          .filter(option => value.includes(option.value))
          .map(option => option.label)
          .join(', ')
      : '';
  };
  formGroup = new FormGroup({
    selectControl: new FormControl(['option3']),
  });

  basicUsage = `<b-select [(ngModel)]='selectedOptions' size='2' [displayWith]='displayFn'>
  <button b-select-trigger bOverlayTrigger #trigger='bOverlayTrigger'>
    <b-select-value placeholder='Selecciona una opción' />
  </button>
  <ng-template bOverlay [trigger]='trigger' [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']">
    <ul b-select-content [multiple]='false'>
      @for (option of options(); track option) {
        <li b-option [value]='option.value'>{{ option.label }}</li>
      }
    </ul>
  </ng-template>
</b-select>`;

  sizesUsage = `<b-select [(ngModel)]='selectedOptions' size='1' [displayWith]='displayFn'>
  <button b-select-trigger bOverlayTrigger #trigger1='bOverlayTrigger'>
    <b-select-value placeholder='Tamaño 1' />
  </button>
  <ng-template bOverlay [trigger]='trigger1' [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']">
    <ul b-select-content [multiple]='false'>
      @for (option of options(); track option) {
        <li b-option [value]='option.value'>{{ option.label }}</li>
      }
    </ul>
  </ng-template>
</b-select>
<b-select [(ngModel)]='selectedOptions' size='2' [displayWith]='displayFn'>
  <button b-select-trigger bOverlayTrigger #trigger2='bOverlayTrigger'>
    <b-select-value placeholder='Tamaño 2' />
  </button>
  <ng-template bOverlay [trigger]='trigger2' [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']">
    <ul b-select-content [multiple]='false'>
      @for (option of options(); track option) {
        <li b-option [value]='option.value'>{{ option.label }}</li>
      }
    </ul>
  </ng-template>
</b-select>
<b-select [(ngModel)]='selectedOptions' size='3' [displayWith]='displayFn'>
  <button b-select-trigger bOverlayTrigger #trigger3='bOverlayTrigger'>
    <b-select-value placeholder='Tamaño 3' />
  </button>
  <ng-template bOverlay [trigger]='trigger3' [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']">
    <ul b-select-content [multiple]='false'>
      @for (option of options(); track option) {
        <li b-option [value]='option.value'>{{ option.label }}</li>
      }
    </ul>
  </ng-template>
</b-select>`;

  multipleUsage = `<b-select [(ngModel)]='selectedMultiple' [displayWith]='displayFn'>
  <button b-select-trigger bOverlayTrigger #triggerMulti='bOverlayTrigger'>
    <b-select-value placeholder='Selecciona opciones' />
  </button>
  <ng-template bOverlay [trigger]='triggerMulti' [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']">
    <ul b-select-content [multiple]='true'>
      @for (option of options(); track option) {
        <li b-option [value]='option.value'>{{ option.label }}</li>
      }
    </ul>
  </ng-template>
</b-select>`;

  reactiveFormsUsage = `<form [formGroup]='formGroup'>
  <b-select formControlName='selectControl' [displayWith]='displayFn'>
    <button b-select-trigger bOverlayTrigger #triggerReactive='bOverlayTrigger'>
      <b-select-value placeholder='Selecciona una opción' />
    </button>
    <ng-template bOverlay [trigger]='triggerReactive' [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']">
      <ul b-select-content [multiple]='false'>
        @for (option of options(); track option) {
          <li b-option [value]='option.value'>{{ option.label }}</li>
        }
      </ul>
    </ng-template>
  </b-select>
</form>`;

  disabledOptionUsage = `<b-select [(ngModel)]='selectedOptions' [displayWith]='displayFn'>
  <button b-select-trigger bOverlayTrigger #triggerDisabled='bOverlayTrigger'>
    <b-select-value placeholder='Selecciona una opción' />
  </button>
  <ng-template bOverlay [trigger]='triggerDisabled' [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']">
    <ul b-select-content [multiple]='false'>
      <li b-option [value]='option1'>Opción 1</li>
      <li b-option [value]='option2' [disabled]='true'>Opción 2 (Deshabilitada)</li>
      <li b-option [value]='option3'>Opción 3</li>
    </ul>
  </ng-template>
</b-select>`;
}
