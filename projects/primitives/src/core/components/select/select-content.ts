import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';
import {
  Component,
  computed,
  contentChildren,
  ElementRef,
  inject,
  model,
  output,
  OnInit,
} from '@angular/core';
import { ConnectedOverlay } from '../../directives/connected-overlay';

@Component({
  selector: 'ul[b-select-content]',
  imports: [],
  template: `
    <ng-content />
  `,
  hostDirectives: [
    {
      directive: CdkListbox,
      inputs: ['cdkListboxMultiple: multiple'],
      outputs: ['cdkListboxValueChange'],
    },
  ],
  host: {
    '(cdkListboxValueChange)': 'changeValueEmitter.emit($event.value)',
    '[animate.enter]': '"b-select-content-entering-" + this.direction()',
    '[animate.leave]': '"b-select-content-leaving-" + this.direction()',
  },
})
export class SelectContent implements OnInit {
  el = inject(ElementRef);
  listBox = inject(CdkListbox);
  readonly options = contentChildren(CdkOption);
  readonly listKeyManager = computed(() =>
    new ActiveDescendantKeyManager(this.options()).withWrap().withVerticalOrientation(),
  );
  changeValueEmitter = output<string[]>();
  readonly multiple = model<boolean>(false);
  overlay = inject(ConnectedOverlay);
  readonly direction = computed(() => this.overlay.direction());

  ngOnInit(): void {
    this.listBox.useActiveDescendant = true;
  }
}
