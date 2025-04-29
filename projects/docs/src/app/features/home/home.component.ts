import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@basis-ng/primitives';
import { NavigationService } from '../../core/components/navigation/navigation.service';

@Component({
  selector: 'app-home',
  imports: [Button, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent implements OnInit {
  /**
   * Service to handle navigation logic.
   */
  navigationService = inject(NavigationService);

  /**
   * Lifecycle hook that is called after the component has been initialized.
   */
  ngOnInit(): void {
    this.navigationService.isHomePath.set(true);
  }
}
