import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'header',
  imports: [RouterLink],
  template: `
    <svg
      [routerLink]="['/']"
      class="logo h-7 cursor-pointer outline-none"
      viewBox="0 0 235 235"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M67 55C67 37.3269 81.3269 23 99 23V23C116.673 23 131 37.3269 131 55V55C131 72.6731 116.673 87 99 87H72C69.2386 87 67 84.7614 67 82V55Z"
        fill="currentColor" />
      <path
        d="M67 101C67 98.2386 69.2386 96 72 96H125C157.033 96 183 121.967 183 154V154C183 186.033 157.033 212 125 212H72C69.2386 212 67 209.761 67 207V101Z"
        fill="currentColor" />
    </svg>
  `,
  host: {
    class: 'h-15 px-8 flex items-center absolute top-0 left-0 right-0',
  },
})
export class Header {}
