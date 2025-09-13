import { Component } from '@angular/core';
import { CodeBlock } from './components/shared/components/code-block';
import { StepsButtons } from './shared/components/steps-buttons';

@Component({
  selector: 'app-installation',
  imports: [CodeBlock, StepsButtons],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Introduction', path: '/docs/introduction' }"
      [next]="{ label: 'Theming', path: '/docs/theming' }"
    />
    <h1 class="font-bold text-2xl">Installation</h1>
    <div class="flex flex-col gap-4">
      <h2 class="font-semibold text-xl">1. Install Basis NG Primitives</h2>
      <p> First, install <b>@basis-ng/primitives</b> to add the headless UI components to your project: </p>
      <code-block [highlight]="false" [code]="'npm install @basis-ng/primitives'" />
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="font-semibold text-xl">2. (Optional) Add Prebuilt Styles with Tailwind</h2>
      <p>
        If you want to use prebuilt styles for the headless components from <b>@basis-ng/primitives</b>, you can install <b>@basis-ng/styles</b> and set up Tailwind CSS. The following steps will guide you through the process:
      </p>
      <code-block [highlight]="false" [code]="'npm install @basis-ng/styles'" />
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="font-semibold text-xl">3. Install Tailwind CSS</h2>
      <p>
        Open a terminal in your Angular project's root directory and run the following command to install Tailwind CSS and its peer dependencies:
      </p>
      <code-block [highlight]="false" [code]="'npm install tailwindcss @tailwindcss/postcss postcss'" />
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="font-semibold text-xl">4. Configure PostCSS Plugins</h2>
      <p>
        Add a <b>.postcssrc.json</b> file in the root of your project and include the <b>@tailwindcss/postcss</b> plugin in your PostCSS configuration:
      </p>
      <code-block [code]="postcssConfig" />
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="font-semibold text-xl">5. Import Tailwind CSS</h2>
      <p>
        Add an <b>@import</b> to <b>./src/styles.css</b> to import Tailwind CSS:
      </p>
      <code-block [code]="'@import tailwindcss;'" />
      <p>
        If you're using SCSS, add <b>@use</b> to <b>./src/styles.scss</b>:
      </p>
      <code-block [code]="'@use tailwindcss;'" />
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Introduction', path: '/docs/introduction' }"
      [next]="{ label: 'Theming', path: '/docs/theming' }"
    />
  `,
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-20',
  },
})
export class Installation {
  postcssConfig = `{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}`;
}
