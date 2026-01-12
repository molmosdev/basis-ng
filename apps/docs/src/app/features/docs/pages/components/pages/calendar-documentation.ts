import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  Button,
  Calendar,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Popover,
  PopoverTrigger,
} from '@basis-ng/primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { CodeBlock } from '../shared/components/code-block';

@Component({
  selector: 'article[app-calendar-documentation]',
  imports: [
    CommonModule,
    CodeBlock,
    Calendar,
    StepsButtons,
    Button,
    Popover,
    PopoverTrigger,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    FormField,
  ],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Card', path: '/docs/components/card' }"
      [next]="{ label: 'Checkbox', path: '/docs/components/checkbox' }"
    />
    <h1 class="font-bold text-2xl">Calendar</h1>
    <div class="flex flex-col gap-4">
      <span>A lightweight calendar component for selecting dates.</span>
      <code-block [code]="angularImport" />
      <span>Include styles to get default visual appearance.</span>
      <code-block [code]="stylesImport" />

      <h2 class="font-semibold text-xl">Basic</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <b-calendar [(value)]="selectedDate" class="w-60!" />
        <span class="text-sm text-muted">Selected: {{ displaySelected() }}</span>
      </div>

      <h2 class="font-semibold text-xl">Emitter example</h2>
      <span>Use the <code>dateSelected</code> emitter when you need an imperative handler.</span>
      <code-block [code]="emitterUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center"
      >
        <b-calendar (dateSelected)="showAlert($event)" class="w-60!" />
      </div>

      <h2 class="font-semibold text-xl">Customization</h2>
      <span>Customize weekday labels, month labels and the first day of week.</span>
      <code-block [code]="customUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center gap-2"
      >
        <b-calendar
          [(value)]="selectedDateCustom"
          [weekdays]="['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']"
          [months]="[
            'Ene',
            'Feb',
            'Mar',
            'Abr',
            'May',
            'Jun',
            'Jul',
            'Ago',
            'Sep',
            'Oct',
            'Nov',
            'Dic',
          ]"
          [weekStart]="0"
          class="w-60!"
        />
        <span class="text-sm text-muted"> Selected: {{ displaySelectedCustom() }}</span>
      </div>

      <h2 class="font-semibold text-xl">Signal Forms</h2>
      <code-block [code]="signalFormsUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center"
      >
        <b-calendar [formField]="form.selected" class="w-60!" />
        Selected: {{ form.selected().value() ? form.selected().value()!.toDateString() : 'none' }}
      </div>
      <h2 class="font-semibold text-xl">Popover demo</h2>
      <code-block [code]="popoverUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button bPopoverTrigger #triggerCal="bPopoverTrigger" class="b-button">
          Open calendar in popover
        </button>
        <ng-template bPopover [trigger]="triggerCal">
          <b-card class="w-full max-w-[320px]">
            <b-card-header>
              <b-card-title>Pick a date</b-card-title>
            </b-card-header>
            <b-card-content>
              <b-calendar [(value)]="selectedDate" class="w-60!" />
            </b-card-content>
          </b-card>
        </ng-template>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Card', path: '/docs/components/card' }"
      [next]="{ label: 'Checkbox', path: '/docs/components/checkbox' }"
    />
  `,
  host: {
    class: 'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class CalendarDocumentation {
  angularImport = `import { Calendar } from '@basis-ng/primitives' `;
  stylesImport = `@import '@basis-ng/styles/calendar';`;
  basicUsage = `<b-calendar [(value)]="selectedDate" class="w-60!" />
{{ selectedDate() ? selectedDate()!.toDateString() : 'none' }}`;

  customUsage = `<b-calendar
  [(value)]="selectedDateCustom"
  [weekdays]="['Do','Lu','Ma','Mi','Ju','Vi','Sa']"
  [months]="['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']"
  [weekStart]="0"
  class="w-60!" />
{{ selectedDateCustom() ? selectedDateCustom()!.toDateString() : 'none' }}`;

  popoverUsage = `<button b-button bPopoverTrigger #triggerCal="bPopoverTrigger">Open calendar</button>
<ng-template bPopover [trigger]="triggerCal">
  <b-card class="w-full max-w-[320px]">
    <b-card-header>
      <b-card-title>Pick a date</b-card-title>
    </b-card-header>
    <b-card-content>
      <b-calendar [(value)]="selectedDate" class="w-60!" />
    </b-card-content>
  </b-card>
</ng-template>`;

  signalFormsUsage = `<b-calendar [formField]="form.selected" class="w-60!"/>
{{ form.selected().value() ? form.selected().value()!.toDateString() : 'none' }}`;

  form = form(signal({ selected: null as Date | null }));
  selectedDate = signal<Date | null>(null);
  selectedDateCustom = signal<Date | null>(null);

  displaySelected = computed(() =>
    this.selectedDate() ? this.selectedDate()!.toDateString() : 'none',
  );
  displaySelectedCustom = computed(() =>
    this.selectedDateCustom() ? this.selectedDateCustom()!.toDateString() : 'none',
  );

  twoWayUsage = `<b-calendar [(value)]="selectedDate" />
<div>{{ selectedDate() ? selectedDate()!.toDateString() : 'none' }}</div>`;

  emitterUsage = `<b-calendar (dateSelected)="showAlert($event)" />`;

  showAlert(date: unknown) {
    // simple example: use alert for demo purposess($eve

    alert('Date selected: ' + (date instanceof Date ? date.toDateString() : String(date)));
  }
}
