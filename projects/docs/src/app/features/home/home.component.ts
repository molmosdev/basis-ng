import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@basis-ng/primitives';

@Component({
  selector: 'app-home',
  imports: [Button, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {}
