import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Button,
  Badge,
  Card,
  CardContent,
  Popover,
  PopoverContent,
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  Tabs,
  Tab,
  Spinner,
  Input,
  Checkbox,
  ConnectedOverlay,
  OverlayOrigin,
} from '@basis-ng/primitives';
import { CardDescription, CardFooter, CardHeader, CardTitle } from 'primitives';

@Component({
  selector: 'app-home',
  imports: [
    Button,
    RouterLink,
    Badge,
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
    Popover,
    PopoverContent,
    Select,
    SelectTrigger,
    SelectContent,
    SelectValue,
    Tabs,
    Tab,
    Spinner,
    Input,
    Checkbox,
    OverlayOrigin,
    ConnectedOverlay,
    CardHeader,
    CardFooter,
  ],
  template: `
    <h1 class="font-medium text-4xl md:text-5xl xl:text-6xl text-center">
      A minimal UI toolkit for Angular
    </h1>
    <span
      class="font-display-mono md:max-w-2/3 lg:max-w-1/2 xl:max-w-3/6 text-center">
      Headless by design. Style it your way or use our pre-defined Tailwind styles for each component, 
      with easy customization via <code>@theme</code>. Build fast, accessible, and design-system-friendly apps — without the bloat.
    </span>
      <div class="text-center">
      <button b-button routerLink="/docs" class="mt-6">Get started</button>
    </div>
    <div class="grid grid-cols-1 gap-4 mt-10">
      <b-card>
        <b-card-header>
          <b-card-title>
            Payment Method
          </b-card-title>
          <b-card-description>
            All transactions are secure and encrypted
          </b-card-description>
        </b-card-header>
        <b-card-content>
          <div class="flex gap-1 flex-col">
            <label for="name" class="text-sm">Name on Card</label>
            <input type="text" b-input placeholder="John Doe" id="name" />
          </div>
          <div class="flex gap-1 flex-col mt-4">
            <label for="card" class="text-sm">Card Number</label>
            <input type="text" b-input placeholder="1234 1234 1234 1234" id="card" />
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="flex-1 flex flex-col gap-1">
              <label for="expiry" class="text-sm">Expiry Date</label>
              <input type="text" b-input placeholder="MM/YY" id="expiry" />
            </div>
            <div class="flex-1 flex flex-col gap-1">
              <label for="cvc" class="text-sm">CVC</label>
              <input type="text" b-input placeholder="CVC" id="cvc" />
            </div>
          </div>
        </b-card-content>
        <b-card-footer class="flex gap-2 mt-2">
          <button b-button class="b-variant-outlined">Cancel</button>
          <button b-button class="w-full">Pay Now</button>
        </b-card-footer>
      </b-card>
    </div>
  `,
  host: {
    class: 'flex h-[calc(100dvh-5rem)] flex-col justify-center items-center gap-1 px-8 h-20',
  },
})
/**
 * Small helper for the select's displayWith input used in the showcase.
 * Joins selected values into a comma-separated string.
 */
export class Home {
  displayWith = (values: string[]) => (values || []).join(', ');
}
