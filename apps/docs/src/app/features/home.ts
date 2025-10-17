import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  InputGroup,
} from '@basis-ng/primitives';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowLeft,
  lucideArrowRight,
  lucideAudioLines,
  lucideInfo,
  lucideLoader,
  lucideLoader2,
  lucidePlus,
  lucideSearch,
} from '@ng-icons/lucide';

@Component({
  selector: 'app-home',
  imports: [
    Button,
    RouterLink,
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
    Input,
    CardFooter,
    InputGroup,
    NgIcon,
    Badge,
    ButtonGroup,
  ],
  template: `
    <h1 class="font-medium text-4xl md:text-5xl xl:text-6xl text-center">
      A minimal UI toolkit for Angular
    </h1>
    <span class="font-display-mono md:max-w-2/3 lg:max-w-1/2 xl:max-w-3/6 text-center">
      Headless by design. Style it your way or use our pre-defined Tailwind styles for each
      component, with easy customization via <code>&#64;theme</code>. Build fast, accessible, and
      design-system-friendly apps — without the bloat.
    </span>
    <div class="text-center">
      <button b-button routerLink="/docs" class="mt-6">Get started</button>
    </div>
    <div
      class="grid items-start grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 w-full max-w-400"
    >
      <b-card>
        <b-card-header>
          <b-card-title> Payment Method </b-card-title>
          <b-card-description> All transactions are secure and encrypted </b-card-description>
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
          <div class="flex gap-4 mt-4">
            <div class="flex flex-col gap-1 flex-1 min-w-0">
              <label for="expiry" class="text-sm">Expiry Date</label>
              <input type="text" b-input placeholder="MM/YY" id="expiry" />
            </div>
            <div class="flex flex-col gap-1 flex-1 min-w-0">
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
      <div class="flex flex-col gap-4">
        <b-input-group>
          <ng-icon name="lucideSearch" size="16" />
          <input b-input placeholder="Search..." />
        </b-input-group>
        <div class="flex gap-2">
          <span b-badge class="b-variant-secondary b-size-sm">
            <ng-icon name="lucideLoader2" size="12" class="animate-spin" />
            Updating
          </span>
          <span b-badge class="b-variant-outlined b-size-sm">
            <ng-icon name="lucideLoader" size="12" class="animate-spin" />
            Syncing
          </span>
        </div>
        <b-input-group>
          <span>https://</span>
          <input b-input placeholder="basis.ng" />
          <button b-button class="b-variant-ghost b-size-sm b-squared">
            <ng-icon name="lucideInfo" size="12" />
          </button>
        </b-input-group>
        <div class="flex gap-2">
          <button b-button class="b-variant-outlined b-squared">
            <ng-icon name="lucidePlus" size="18" />
          </button>
          <b-input-group class="flex-1">
            <input b-input placeholder="Send a message..." />
            <button b-button class="b-variant-ghost b-size-sm b-squared">
              <ng-icon name="lucideAudioLines" size="12" />
            </button>
          </b-input-group>
        </div>
        <span class="text-sm font-medium">Volume</span>
        <input type="range" b-range min="0" max="100" value="50" />
      </div>
      <div class="flex gap-4">
        <b-button-group>
          <button b-button class="b-variant-outlined">1</button>
          <button b-button class="b-variant-outlined">2</button>
          <button b-button class="b-variant-outlined">3</button>
        </b-button-group>
        <b-button-group>
          <button b-button class="b-variant-outlined b-squared">
            <ng-icon name="lucideArrowLeft" size="18" />
          </button>
          <button b-button class="b-variant-outlined b-squared">
            <ng-icon name="lucideArrowRight" size="18" />
          </button>
        </b-button-group>
      </div>
    </div>
  `,
  providers: [
    provideIcons({
      lucideSearch,
      lucideLoader,
      lucideLoader2,
      lucideArrowRight,
      lucideArrowLeft,
      lucideInfo,
      lucidePlus,
      lucideAudioLines,
    }),
  ],
  host: {
    class:
      'pt-30 pb-8 sm:h-[calc(100dvh-5rem)] flex flex-col justify-center items-center gap-1 px-8',
  },
})
export class Home {
  displayWith = (values: string[]) => (values || []).join(', ');
  showPassword = false;
}
