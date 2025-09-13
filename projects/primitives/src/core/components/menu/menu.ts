import { CdkMenu } from '@angular/cdk/menu';
import { Component, input } from '@angular/core';

/**
 * Represents a menu component that can optionally float.
 */
@Component({
  selector: 'b-menu',
  template: `<ng-content />`,
  hostDirectives: [CdkMenu],
  host: {
    '[class.b-size-sm]': "size() === 'sm'",
    '[class.b-size-md]': "size() === 'md'",
    '[class.b-size-lg]': "size() === 'lg'",
  },
})
export class Menu {
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}
