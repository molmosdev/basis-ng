import { CdkMenuGroup } from '@angular/cdk/menu';
import { Component } from '@angular/core';

/**
 * Represents a group of menu items.
 */
@Component({
  selector: 'b-menu-group',
  imports: [],
  template: `<ng-content />`,
  hostDirectives: [CdkMenuGroup],
})
export class MenuGroupComponent {}
