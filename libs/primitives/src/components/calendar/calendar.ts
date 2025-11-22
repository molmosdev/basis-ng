import { Grid, GridCell, GridCellWidget, GridRow } from '@angular/aria/grid';
import { Component, computed, input, model, output, signal, viewChildren } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

/**
 * A minimal calendar component that displays a month grid and emits selected dates.
 * Selector and CSS follow the project's conventions.
 */
@Component({
  selector: 'b-calendar',
  imports: [Grid, GridRow, GridCell, GridCellWidget],
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

    @switch (viewMode()) {
      @case ('day') {
        <table class="b-calendar-table" ngGrid (keydown)="onKeyDown($event)">
          <thead>
            <tr>
              @for (d of visibleWeekdays(); track d) {
                <th scope="col" class="b-calendar-weekday">{{ d }}</th>
              }
            </tr>
          </thead>

          <tbody>
            @for (row of dayRows(); track row[0]!.date.toDateString()) {
              <tr ngGridRow>
                @for (cell of row; track cell.date.toDateString()) {
                  <td ngGridCell>
                    <button
                      type="button"
                      class="b-calendar-cell"
                      ngGridCellWidget
                      [class.b-active]="isSelected(cell.date)"
                      [attr.aria-pressed]="isSelected(cell.date) ? 'true' : null"
                      [attr.aria-current]="isSelected(cell.date) ? 'date' : null"
                      [attr.data-day]="cell.date.getDate()"
                      (click)="selectDate(cell.date)"
                      [attr.data-outside]="cell.outside ? '' : null"
                    >
                      {{ cell.date.getDate() }}
                    </button>
                  </td>
                }
              </tr>
            }
          </tbody>
        </table>
      }
      @case ('month') {
        <table
          class="b-calendar-table b-calendar-grid--months"
          ngGrid
          (keydown)="onKeyDown($event)"
        >
          <tbody>
            @for (row of monthRows(); track row[0]!) {
              <tr ngGridRow>
                @for (m of row; track m) {
                  <td ngGridCell>
                    <button
                      type="button"
                      class="b-calendar-cell"
                      ngGridCellWidget
                      (click)="selectMonth(monthsLabels().indexOf(m))"
                    >
                      {{ m }}
                    </button>
                  </td>
                }
              </tr>
            }
          </tbody>
        </table>
      }
      @case ('year') {
        <table class="b-calendar-table b-calendar-grid--years" ngGrid (keydown)="onKeyDown($event)">
          <tbody>
            @for (row of yearRows(); track row[0]!) {
              <tr ngGridRow>
                @for (y of row; track y) {
                  <td ngGridCell>
                    <button
                      type="button"
                      class="b-calendar-cell"
                      ngGridCellWidget
                      (click)="selectYear(y)"
                    >
                      {{ y }}
                    </button>
                  </td>
                }
              </tr>
            }
          </tbody>
        </table>
      }
    }
  `,
})
export class Calendar implements FormValueControl<Date | null> {
  readonly today = new Date();
  readonly month = signal<number>(this.today.getMonth());
  readonly year = signal<number>(this.today.getFullYear());
  readonly value = model<Date | null>(null);
  readonly valueChange = output<Date | null>();
  readonly dateSelected = output<Date>();
  readonly weekdays = input<string[]>(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']);
  readonly weekStart = input<number>(0);

  /** Weekday labels rotated according to `weekStart` */
  visibleWeekdays = computed(() => {
    const w = this.weekdays();
    const start = ((this.weekStart() % 7) + 7) % 7; // normalize
    if (!w || w.length !== 7) return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    return w.slice(start).concat(w.slice(0, start));
  });
  readonly viewMode = signal<'day' | 'month' | 'year'>('day');

  monthLabel = computed(() => {
    return this.monthsLabels()[this.month()];
  });

  /** Input to override month labels (12 entries). Defaults to English short names. */
  readonly months = input<string[]>([
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]);

  /** Final months array used in template: prefers `months` input when provided */
  monthsLabels = computed(() => {
    const custom = this.months();
    if (custom && custom.length === 12) return custom as string[];
    // fallback to English short names if input is invalid
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  });

  private readonly _cellWidgets = viewChildren(GridCellWidget);

  readonly dayRows = computed(() => {
    const cells = this.calendarGrid();
    const rows: { date: Date; outside: boolean }[][] = [];
    for (let r = 0; r < 6; r++) {
      rows.push(cells.slice(r * 7, r * 7 + 7));
    }
    return rows;
  });

  readonly dayRowIndexes = computed(() => [0, 1, 2, 3, 4, 5]);

  readonly monthRows = computed(() => {
    const m = this.monthsLabels();
    const rows: string[][] = [];
    for (let r = 0; r < 4; r++) rows.push(m.slice(r * 3, r * 3 + 3));
    return rows;
  });

  readonly monthRowIndexes = computed(() => [0, 1, 2, 3]);

  readonly yearRows = computed(() => {
    const y = this.yearsGrid();
    const rows: number[][] = [];
    for (let r = 0; r < 4; r++) rows.push(y.slice(r * 3, r * 3 + 3));
    return rows;
  });

  readonly yearRowIndexes = computed(() => [0, 1, 2, 3]);

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

    // JS getDay: 0..6 (Sun..Sat). startOffset is number of days from `weekStart` to firstOfMonth
    const startOffset = (firstOfMonth.getDay() - this.weekStart() + 7) % 7;

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
    this.focusSelectedAfterNavigation();
  }

  selectYear(y: number): void {
    // when selecting a year, set it and switch to month view
    this.year.set(y);
    this.viewMode.set('month');
    this.focusSelectedAfterNavigation();
  }

  selectDate(d: Date): void {
    // If the clicked date belongs to a different month/year, navigate there
    if (d.getFullYear() !== this.year() || d.getMonth() !== this.month()) {
      this.year.set(d.getFullYear());
      this.month.set(d.getMonth());
    }

    const current = this.value();
    if (
      current &&
      current.getFullYear() === d.getFullYear() &&
      current.getMonth() === d.getMonth() &&
      current.getDate() === d.getDate()
    ) {
      // clicking the already-selected date toggles it off
      this.value.set(null);
      this.valueChange.emit(null);
      // do not emit dateSelected when deselecting
      this.focusSelectedAfterNavigation();
      return;
    }

    this.value.set(d);
    this.valueChange.emit(d);
    this.dateSelected.emit(d);
    this.focusSelectedAfterNavigation();
  }

  // keyboard helpers for ngGrid
  onKeyDown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    // Only handle keyboard navigation in day view here
    if (this.viewMode() !== 'day') return;

    // Map arrow keys to cell index deltas
    const key = event.key;
    if (key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'ArrowUp' && key !== 'ArrowDown')
      return;

    event.preventDefault();

    const widgets = this._cellWidgets();
    // find currently focused widget index
    const focusedEl = target.closest('button');
    let focusedIndex = widgets.findIndex((w) => w.element === focusedEl);
    if (focusedIndex === -1) {
      // fallback: try to match by day number and current month/year
      const dayAttr =
        target.getAttribute('data-day') || target.closest('[data-day]')?.getAttribute('data-day');
      const dayNum = dayAttr ? Number(dayAttr) : NaN;
      if (!isNaN(dayNum)) {
        const cells = this.calendarGrid();
        focusedIndex = cells.findIndex(
          (c) =>
            c.date.getDate() === dayNum &&
            c.date.getMonth() === this.month() &&
            c.date.getFullYear() === this.year(),
        );
      }
    }
    if (focusedIndex === -1) return;

    const cells = this.calendarGrid();

    // compute row/col for focusedIndex (6 rows x 7 cols)
    const cols = 7;
    const row = Math.floor(focusedIndex / cols);
    const col = focusedIndex % cols;

    // left/right: move by 1 cell preserving natural wrap behavior
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      const idx = Math.max(
        0,
        Math.min(cells.length - 1, focusedIndex + (key === 'ArrowLeft' ? -1 : 1)),
      );
      this.focusCell(idx);
      return;
    }

    // up/down: move by one row preserving column
    const targetRow = Math.max(0, Math.min(5, row + (key === 'ArrowUp' ? -1 : 1)));
    let candidateIndex = targetRow * cols + col;
    candidateIndex = Math.max(0, Math.min(cells.length - 1, candidateIndex));

    const candidate = cells[candidateIndex];
    if (!candidate) return;

    const candidateMonth = candidate.date.getMonth();
    const candidateYear = candidate.date.getFullYear();

    if (candidateMonth !== this.month() || candidateYear !== this.year()) {
      // Move to candidate's month/year and focus the cell in the same column if possible
      const desiredCol = col;
      this.year.set(candidateYear);
      this.month.set(candidateMonth);
      setTimeout(() => {
        const newCells = this.calendarGrid();
        // Prefer same date number in desired column; otherwise fallback to same column first row
        const matchIndex = newCells.findIndex(
          (c, i) => i % cols === desiredCol && c.date.getDate() === candidate.date.getDate(),
        );
        if (matchIndex >= 0) {
          this._cellWidgets()[matchIndex]?.element.focus();
          return;
        }
        const fallback = newCells.findIndex((_, i) => i % cols === desiredCol);
        if (fallback >= 0) this._cellWidgets()[fallback]?.element.focus();
      });
      return;
    }

    // same month -> focus candidate
    this._cellWidgets()[candidateIndex]?.element.focus();
  }

  /** Centralized focus logic for cell widgets */
  private focusCell(index: number): void {
    const cells = this.calendarGrid();
    const candidate = cells[index];
    if (!candidate) return;
    const candidateMonth = candidate.date.getMonth();
    const candidateYear = candidate.date.getFullYear();
    if (candidateMonth !== this.month() || candidateYear !== this.year()) {
      this.year.set(candidateYear);
      this.month.set(candidateMonth);
      setTimeout(() => {
        const newCells = this.calendarGrid();
        const targetIndex = newCells.findIndex(
          (c) =>
            c.date.getFullYear() === candidateYear &&
            c.date.getMonth() === candidateMonth &&
            c.date.getDate() === candidate.date.getDate(),
        );
        if (targetIndex >= 0) this._cellWidgets()[targetIndex]?.element.focus();
      });
      return;
    }
    this._cellWidgets()[index]?.element.focus();
  }

  /** Focus the currently selected date cell after navigation/selection changes */
  private focusSelectedAfterNavigation(): void {
    setTimeout(() => {
      const v = this.value();
      if (!v) return;
      const cells = this.calendarGrid();
      const idx = cells.findIndex(
        (c) =>
          c.date.getFullYear() === v.getFullYear() &&
          c.date.getMonth() === v.getMonth() &&
          c.date.getDate() === v.getDate(),
      );
      if (idx >= 0) this._cellWidgets()[idx]?.element.focus();
    });
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
}
