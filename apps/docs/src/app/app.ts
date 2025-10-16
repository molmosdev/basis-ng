import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/components/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <header></header>
    <router-outlet />
  `,
})
export class App {
  title = 'Basis';
}
