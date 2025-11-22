import { Component, computed, EventEmitter, model, output, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

/**
 * A minimal calendar component that displays a month grid and emits selected dates.
 * Selector and CSS follow the project's conventions.
 */
@Component({
  selector: 'b-calendar',
  template: `
    <header class="b-calendar-header">
      <button type="button" class="b-calendar-nav" (click)="prevMonth()">‹</button>
      <button
        type="button"
        class="b-calendar-title"
        (click)="onHeaderClick()"
        aria-label="Toggle month/year view"
      >
        @if (viewMode() === 'day') {
          {{ monthLabel() }} {{ year() }}
        } @else if (viewMode() === 'month') {
          {{ year() }}
        } @else {
          {{ yearsGrid()[0] }} - {{ yearsGrid()[yearsGrid().length - 1] }}
        }
      </button>
      <button type="button" class="b-calendar-nav" (click)="nextMonth()">›</button>
    </header>

    @if (viewMode() === 'day') {
      <div class="b-calendar-weekdays">
        @for (d of weekdays; track d) {
          <div class="b-calendar-weekday">{{ d }}</div>
        }
      </div>

      <div class="b-calendar-grid">
        @for (cell of calendarGrid(); track cell.date.toDateString()) {
          <button
            type="button"
            class="b-calendar-cell"
            [class.b-active]="isSelected(cell.date)"
            [attr.aria-pressed]="isSelected(cell.date) ? true : null"
            [attr.data-outside]="cell.outside ? '' : null"
            (click)="selectDate(cell.date)"
          >
            {{ cell.date.getDate() }}
          </button>
        }
      </div>
    } @else if (viewMode() === 'month') {
      <div class="b-calendar-grid b-calendar-grid--months">
        @for (m of months(); track m) {
          <button type="button" class="b-calendar-cell" (click)="selectMonth(months().indexOf(m))">
            {{ m }}
          </button>
        }
      </div>
    } @else {
      <div class="b-calendar-grid b-calendar-grid--years">
        @for (y of yearsGrid(); track y) {
          <button type="button" class="b-calendar-cell" (click)="selectYear(y)">{{ y }}</button>
        }
      </div>
    }
  `,
})
export class Calendar implements FormValueControl<Date | null> {
  readonly today = new Date();

  readonly month = signal<number>(this.today.getMonth());
  readonly year = signal<number>(this.today.getFullYear());

  /** Form model value for selected date (nullable) */
  readonly value = model<Date | null>(null);

  /** Emitted when the value changes (form control API) */
  readonly valueChange = output<Date | null>();

  /** Backwards-compatible emitter used by docs/examples */
  readonly dateSelected = new EventEmitter<Date>();

  readonly weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  /** Current view mode: 'day' | 'month' | 'year' */
  readonly viewMode = signal<'day' | 'month' | 'year'>('day');

  monthLabel = computed(() => {
    return new Intl.DateTimeFormat(undefined, { month: 'long' }).format(
      new Date(this.year(), this.month(), 1),
    );
  });

  months = computed(() => {
    return Array.from({ length: 12 }).map((_, i) =>
      new Intl.DateTimeFormat(undefined, { month: 'short' }).format(new Date(0, i, 1)),
    );
  });

  /** Grid of years for year selection (12 years centered around current year) */
  yearsGrid = computed(() => {
    const center = this.year();
    const start = center - 6;
    const years: number[] = [];
    for (let i = 0; i < 12; i++) years.push(start + i);
    return years;
  });

  // Build a simple 6x7 grid (weeks x weekdays)
  calendarGrid = computed(() => {
    const y = this.year();
    const m = this.month();
    const firstOfMonth = new Date(y, m, 1);

    // ISO weekdays: Monday = 1 .. Sunday = 7; JS getDay: 0..6 (Sun..Sat)
    const startOffset = (firstOfMonth.getDay() + 6) % 7; // number of days from Monday

    const cells: { date: Date; outside: boolean }[] = [];
    // Start from the Monday of the first week
    const startDate = new Date(y, m, 1 - startOffset);
    for (let i = 0; i < 42; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      cells.push({ date: d, outside: d.getMonth() !== m });
    }
    return cells;
  });

  prevMonth(): void {
    const mode = this.viewMode();
    if (mode === 'day') {
      const m = this.month();
      const y = this.year();
      if (m === 0) {
        this.month.set(11);
        this.year.set(y - 1);
      } else {
        this.month.set(m - 1);
      }
      return;
    }

    if (mode === 'month') {
      // when viewing months, previous should decrement the year
      this.year.set(this.year() - 1);
      return;
    }

    // year view: shift the years grid back by 12 years
    this.year.set(this.year() - 12);
  }

  nextMonth(): void {
    const mode = this.viewMode();
    if (mode === 'day') {
      const m = this.month();
      const y = this.year();
      if (m === 11) {
        this.month.set(0);
        this.year.set(y + 1);
      } else {
        this.month.set(m + 1);
      }
      return;
    }

    if (mode === 'month') {
      // when viewing months, next should increment the year
      this.year.set(this.year() + 1);
      return;
    }

    // year view: shift the years grid forward by 12 years
    this.year.set(this.year() + 12);
  }

  onHeaderClick(): void {
    const mode = this.viewMode();
    if (mode === 'day') {
      this.viewMode.set('month');
    } else if (mode === 'month') {
      this.viewMode.set('year');
    } else {
      // if already in year view, go back to day view
      this.viewMode.set('day');
    }
  }

  selectMonth(m: number): void {
    // when selecting a month, set the month and go to day view
    this.month.set(m);
    this.viewMode.set('day');
  }

  selectYear(y: number): void {
    // when selecting a year, set it and switch to month view
    this.year.set(y);
    this.viewMode.set('month');
  }

  selectDate(d: Date): void {
    // If the clicked date belongs to a different month/year, navigate there
    if (d.getFullYear() !== this.year() || d.getMonth() !== this.month()) {
      this.year.set(d.getFullYear());
      this.month.set(d.getMonth());
    }

    this.value.set(d);
    this.valueChange.emit(d);
    this.dateSelected.emit(d);
  }

  isSelected(date: Date): boolean {
    const v = this.value();
    if (!v) return false;
    return (
      v.getFullYear() === date.getFullYear() &&
      v.getMonth() === date.getMonth() &&
      v.getDate() === date.getDate()
    );
  }

  setDisabledState(_isDisabled: boolean): void {
    void _isDisabled;
    // No internal disabled state yet; placeholder for API parity
  }
}
