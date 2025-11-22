import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Calendar } from '../../../../../../../../../libs/primitives/src/components/calendar/calendar';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { CodeBlock } from '../shared/components/code-block';

@Component({
  selector: 'article[app-calendar-documentation]',
  imports: [CommonModule, CodeBlock, Calendar, StepsButtons],
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
        <b-calendar (dateSelected)="onDate($event)"></b-calendar>
        <div *ngIf="selected" class="text-sm text-muted">Selected: {{ selected }}</div>
      </div>

      <h2 class="font-semibold text-xl">Notes</h2>
      <span
        >Current component is minimal: supports month navigation and single-date selection. Keyboard
        accessibility and range selection can be added.</span
      >
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
  basicUsage = `<b-calendar (dateSelected)="onDate($event)"></b-calendar>`;

  selected = '';

  onDate(event: Event | Date | unknown) {
    // Normalize event payload that may come as a DOM Event or a Date
    let date: Date | null = null;
    if (event instanceof Date) {
      date = event;
    } else if (event instanceof Event) {
      const ev = event as Event & { target?: unknown };
      const tgt = ev.target;
      interface HasValue {
        value?: string;
      }
      const tv = tgt as HasValue | undefined;
      if (tv && typeof tv.value === 'string') {
        const parsed = new Date(tv.value);
        if (!isNaN(parsed.getTime())) date = parsed;
      }
    }

    if (date) {
      this.selected = date.toDateString();
    } else {
      this.selected = String(event ?? '');
    }
  }
}
