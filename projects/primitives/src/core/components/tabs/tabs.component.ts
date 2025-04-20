import {
  Component,
  contentChildren,
  effect,
  HostListener,
  model,
  output,
  signal,
} from '@angular/core';
import { Tab } from './components/tab/tab.component';

@Component({
  selector: 'b-tabs',
  templateUrl: './tabs.component.html',
})
export class Tabs {
  readonly tabs = contentChildren(Tab);
  readonly selectedIndex = signal<number>(-1);
  readonly selectedValue = model<string | null>(null);
  readonly highlightedIndex = signal<number>(-1);
  changesEmitter = output<string>();
  lastSelectedValue: string | null = null;

  constructor() {
    effect(() => {
      this.handleTabSelection();
      this.handleExternalSelectedValue();
      this.handleScrollToSelectedTab();
    });
  }

  /**
   * Handle the selection of a tab.
   */
  handleTabSelection(): void {
    this.tabs().forEach((tab, index) => {
      tab.selectEmitter.subscribe(tabEmitted => {
        this.selectTab(tabEmitted, index);
        this.highlightTab(index);
        this.handleTabStates();
        this.changesEmitter.emit(tab.value());
      });
    });
  }

  /**
   * Select a tab.
   * @param {Tab} tab - The tab to select.
   * @param {number} index - The index of the tab.
   */
  selectTab(tab: Tab, index: number): void {
    this.selectedValue.set(tab.value());
    this.lastSelectedValue = tab.value();
    this.selectedIndex.set(index);
  }

  /**
   * Highlight a tab.
   * @param {number} index - The index of the tab to highlight.
   */
  highlightTab(index: number) {
    this.highlightedIndex.set(index);
  }

  /**
   * Handle the states of the tabs.
   */
  handleTabStates(): void {
    this.tabs().forEach((tab, index) => {
      tab.selected.set(index === this.selectedIndex());
      tab.highlighted.set(index === this.highlightedIndex());
    });
  }

  /**
   * Handle the external selected value.
   */
  handleExternalSelectedValue(): void {
    if (this.lastSelectedValue !== this.selectedValue()) {
      const selectedOptionIndex = this.tabs().findIndex(
        tab => tab.value() === this.selectedValue()
      );
      if (selectedOptionIndex !== -1) {
        this.selectTab(this.tabs()[selectedOptionIndex], selectedOptionIndex);
        this.highlightTab(selectedOptionIndex);
        this.handleTabStates();
      }
    }
  }

  /**
   * Scroll to the selected tab.
   */
  handleScrollToSelectedTab() {
    if (this.selectedIndex() !== -1) {
      this.scrollToTab(this.selectedIndex(), 'smooth');
    }
  }

  /**
   * Handle keyboard events for navigation and selection.
   * @param {KeyboardEvent} event - The keyboard event.
   */
  @HostListener('keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        this.focusOption('next');
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.focusOption('previous');
        break;
      case 'Enter':
        event.preventDefault();
        this.selectFocusedTab();
        break;
    }
  }

  /**
   * Focus on the next or previous tab.
   * @param {'next' | 'previous'} direction - The direction to move the focus.
   */
  focusOption(direction: 'next' | 'previous') {
    let index = this.highlightedIndex();
    const increment = direction === 'next' ? 1 : -1;

    index += increment;
    while (
      index >= 0 &&
      index < this.tabs().length &&
      this.tabs()[index].disabled()
    ) {
      index += increment;
    }

    if (index >= 0 && index < this.tabs().length) {
      this.highlightTab(index);
      this.handleTabStates();
      this.scrollToTab(this.highlightedIndex(), 'smooth');
    }
  }

  /**
   * Select the currently focused tab.
   */
  selectFocusedTab() {
    this.selectTab(
      this.tabs()[this.highlightedIndex()],
      this.highlightedIndex()
    );
    this.handleTabStates();
  }

  /**
   * Scroll to a specific tab.
   * @param {number} index - The index of the tab to scroll to.
   * @param {string} behavior - The scroll behavior ('instant' or 'smooth').
   */
  scrollToTab(index: number, behavior: string): void {
    const tabsElements = this.tabs();
    if (tabsElements[index].el.nativeElement) {
      tabsElements[index].el.nativeElement.scrollIntoView({
        block: 'nearest',
        behavior: behavior,
      });
    }
  }
}
