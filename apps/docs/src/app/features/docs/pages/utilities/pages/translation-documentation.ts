import { Component } from '@angular/core';
import { CodeBlock } from '../../components/shared/components/code-block';
import { StepsButtons } from '../../shared/components/steps-buttons';

@Component({
  selector: 'article[app-translation-documentation]',
  standalone: true,
  imports: [CodeBlock, StepsButtons],
  template: `
    <app-steps-buttons [previous]="{ label: 'Tree', path: '/docs/components/tree' }" />
    <h1 class="font-bold text-2xl">Translation</h1>
    <div class="flex flex-col gap-4">
      <span>
        This service provides a highly efficient, reactive way to manage multilingual content in
        Angular 20+ applications. Dictionaries are loaded from JSON files, and all state is managed
        with signals for optimal performance and seamless integration with Angular's change
        detection.
      </span>
      <code-block [code]="angularImport" />
      <span>Include this to apply predefined styles. The service is headless without it.</span>
      <code-block [code]="pipeImport" />
      <h2 class="font-semibold text-xl">Signals</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-900 dark:bg-neutral-900 mb-4"
      >
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-neutral-900">
            <tr>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Signal
              </th>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                language
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                string
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Methods</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-900 mb-6"
      >
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-neutral-900">
            <tr>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Method
              </th>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Signature
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                setLanguage
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                (lang: string) =&gt; void
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                setDictionary
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                (dict: object) =&gt; void
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                translate
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                (key: string) =&gt; string
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Dictionary Structure</h2>
      <span>
        Create language JSON files in
        <b>public/lang</b>
        (e.g.
        <code>public/lang/en.json</code>
        ). This is the default location where the TranslationManager looks for language files.
      </span>
      <code-block [code]="dictionaryExample" [highlight]="false" />
      <h2 class="font-semibold text-xl">Basic Usage</h2>
      <code-block [code]="serviceUsage" />
      <h2 class="font-semibold text-xl">Reactive Signals</h2>
      <code-block [code]="signalsUsage" />
      <h2 class="font-semibold text-xl">TranslatePipe</h2>
      <code-block [code]="pipeUsage" [highlight]="false" />
      <h2 class="font-semibold text-xl">Advanced Features</h2>
      <ul class="list-disc ml-6">
        <li>Load dictionaries dynamically via HTTP</li>
        <li>Directly set dictionaries for testing or SSR</li>
        <li>
          Dot notation for nested keys (
          <code>home.title</code>
          )
        </li>
        <li>Graceful fallback to key if translation is missing</li>
      </ul>
      <h2 class="font-semibold text-xl">Examples</h2>
      <h3 class="font-semibold text-lg">Switching Language</h3>
      <code-block [code]="switchLanguage" />
      <h3 class="font-semibold text-lg">Custom Dictionary</h3>
      <code-block [code]="customDictionary" />
      <h2 class="font-semibold text-xl">Best Practices</h2>
      <ul class="list-disc ml-6">
        <li>
          <b>Always</b>
          store your language JSON files in
          <b>public/lang</b>
          so they are accessible via HTTP requests and detected by the TranslationManager
        </li>
        <li>Use signals for reactive UI updates</li>
        <li>Use the pipe for template translations, and the service for logic</li>
      </ul>
    </div>
    <app-steps-buttons [previous]="{ label: 'Tree', path: '/docs/components/tree' }" />
  `,
  host: {
    class: 'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class TranslationDocumentation {
  angularImport = `import { TranslationManager } from '@basis-ng/primitives' ;`;
  dictionaryExample = `{
  "home": {
    "title": "Welcome Home",
    "subtitle": "Your dashboard"
  },
  "button": {
    "save": "Save",
    "cancel": "Cancel"
  }
}`;
  serviceUsage = `translation = inject(TranslationManager);

ngOnInit() {
  this.translation.setLanguage('es'); // Loads public/lang/es.json
  const text = this.translation.translate('home.title'); // Returns translated string
}`;
  signalsUsage = `this.translation.language(); // Current language code`;
  pipeImport = `import { TranslatePipe } from '@basis-ng/primitives' ;`;
  pipeUsage = `{{ 'home.title' | translate }}`;
  switchLanguage = `this.translation.setLanguage('fr'); // Loads French dictionary`;
  customDictionary = `this.translation.setDictionary({
  en: { 'greeting': 'Hello' },
  es: { 'greeting': 'Hola' }
});`;
}
