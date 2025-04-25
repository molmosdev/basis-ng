import { Component } from '@angular/core';
import { Button, Input } from '@basis-ng/primitives';

@Component({
  selector: 'article[app-introduction]',
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css',
  imports: [Input, Button],
})
export default class IntroductionComponent {}
