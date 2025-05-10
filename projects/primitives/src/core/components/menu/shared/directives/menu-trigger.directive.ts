import { CdkMenuTrigger } from '@angular/cdk/menu';
import { Directive, inject, input, OnInit } from '@angular/core';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { Position } from '../../../../../shared/types/position.type';

@Directive({
  selector: '[menuTriggerFor]',
  hostDirectives: [
    {
      directive: CdkMenuTrigger,
      inputs: ['cdkMenuTriggerFor: menuTriggerFor'],
    },
  ],
})
export class MenuTriggerDirective implements OnInit {
  trigger = inject(CdkMenuTrigger);
  readonly menuTriggerPosition = input<Position>('right-top');
  readonly submenu = input(false);

  ngOnInit(): void {
    this.setPosition();
  }

  setPosition(): void {
    const positionMap: Record<Position, ConnectedPosition> = {
      'top-left': {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetY: !this.submenu() ? -5 : undefined,
      },
      'top-center': {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: !this.submenu() ? -5 : undefined,
      },
      'top-right': {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
        offsetY: !this.submenu() ? -5 : undefined,
      },
      'bottom-left': {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetY: !this.submenu() ? 5 : undefined,
      },
      'bottom-center': {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetY: !this.submenu() ? 5 : undefined,
      },
      'bottom-right': {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
        offsetY: !this.submenu() ? 5 : undefined,
      },
      'left-top': {
        originX: 'start',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'top',
        offsetX: !this.submenu() ? -5 : undefined,
      },
      'left-center': {
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center',
        offsetX: !this.submenu() ? -5 : undefined,
      },
      'left-bottom': {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'bottom',
        offsetX: !this.submenu() ? -5 : undefined,
      },
      'right-top': {
        originX: 'end',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top',
        offsetX: !this.submenu() ? 5 : undefined,
      },
      'right-center': {
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center',
        offsetX: !this.submenu() ? 5 : undefined,
      },
      'right-bottom': {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetX: !this.submenu() ? 5 : undefined,
      },
    };

    const connectedPosition = positionMap[this.menuTriggerPosition()];
    this.trigger.menuPosition = [connectedPosition];
  }
}
