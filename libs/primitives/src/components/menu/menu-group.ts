import { CdkMenuGroup } from '@angular/cdk/menu';
import { Component } from '@angular/core';

/**
 * Menu group wrapper that applies CDK menu group behavior.
 */
@Component({
  selector: 'b-menu-group',
  template: ` <ng-content /> `,
  hostDirectives: [CdkMenuGroup],
})
export class MenuGroup {}
