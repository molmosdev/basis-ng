import { Component, signal } from '@angular/core';

interface ComponentButton {
  name: string;
  description: string;
  href: string;
}

@Component({
  selector: 'app-components',
  template: ``,
  host: {
    class: 'min-h-dvh flex flex-col',
  },
})
export class Components {
  readonly components = signal<ComponentButton[]>([]);
}
