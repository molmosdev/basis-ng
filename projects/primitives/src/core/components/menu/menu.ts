import { CdkMenu } from '@angular/cdk/menu';
import { Component } from '@angular/core';

@Component({
  selector: 'b-menu',
  template: `
    <ng-content />
  `,
  hostDirectives: [CdkMenu],
})
export class Menu {}
