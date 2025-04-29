import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../../core/components/navigation/navigation.component';

@Component({
  selector: 'app-documentation',
  imports: [NavigationComponent, RouterOutlet],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.css',
})
export default class DocumentationComponent {}
