import { CdkMenu } from '@angular/cdk/menu';
import { Component } from '@angular/core';

/**
 * Root menu container that applies CDK menu behavior.
 */
@Component({
  selector: 'b-menu',
  template: ` <ng-content /> `,
  hostDirectives: [CdkMenu],
})
export class Menu {}
