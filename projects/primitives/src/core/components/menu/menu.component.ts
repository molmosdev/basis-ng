import { CdkMenu } from '@angular/cdk/menu';
import { Component } from '@angular/core';

/**
 * Represents a menu component that can optionally float.
 */
@Component({
  selector: 'b-menu',
  imports: [],
  template: `<ng-content />`,
  hostDirectives: [CdkMenu],
})
export class Menu {}
