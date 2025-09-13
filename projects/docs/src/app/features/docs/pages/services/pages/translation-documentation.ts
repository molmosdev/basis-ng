import { Component } from '@angular/core';
import { CodeBlock } from '../../components/shared/components/code-block';

@Component({
  selector: 'article[app-translation-documentation]',
  standalone: true,
  imports: [CodeBlock],
  template: `
    <h1 class="font-bold text-2xl">Translation Service</h1>
    <div class="flex flex-col gap-4">
      <span>
        This service provides a highly efficient, reactive way to manage
        multilingual content in Angular 20+ applications. Dictionaries are
        loaded from JSON files, and all state is managed with signals for
        optimal performance and seamless integration with Angular's change
        detection.
      </span>
      <h2 class="font-semibold text-xl">Angular Import</h2>
      <code-block [code]="angularImport" />
      <h2 class="font-semibold text-xl">Dictionary Structure</h2>
      <span>
        Create language JSON files in <b>public/lang</b> (e.g.
        <code>public/lang/en.json</code>). This is the default location where
        the TranslationService looks for language files.
      </span>
      <code-block [code]="dictionaryExample" [highlight]="false" />
      <h2 class="font-semibold text-xl">Service Usage</h2>
      <code-block [code]="serviceUsage" />
      <h2 class="font-semibold text-xl">Reactive Signals</h2>
      <span>
        <code>language</code> is a reactive signal that always reflects the
        current language. You only need to use this signal to know which
        language is active in your app. The dictionary is managed internally and
        does not need to be accessed directly.
      </span>
      <code-block [code]="signalsUsage" />
      <h2 class="font-semibold text-xl">TranslatePipe</h2>
      <span>
        Use the <b>TranslatePipe</b> in your templates for instant translation:
      </span>
      <code-block [code]="pipeImport" />
      <code-block [code]="pipeUsage" />
      <h2 class="font-semibold text-xl">Integration & Performance</h2>
      <span>
        The service is built with Angular signals, making it fully compatible
        with Angular 20+ and extremely efficient. Language switching and
        dictionary updates are instant and propagate throughout your app with
        minimal overhead.
      </span>
      <h2 class="font-semibold text-xl">Advanced Features</h2>
      <ul class="list-disc ml-6">
        <li>Load dictionaries dynamically via HTTP</li>
        <li>Directly set dictionaries for testing or SSR</li>
        <li>Dot notation for nested keys (<code>home.title</code>)</li>
        <li>Graceful fallback to key if translation is missing</li>
      </ul>
      <h2 class="font-semibold text-xl">Example: Switching Language</h2>
      <code-block [code]="switchLanguage" />
      <h2 class="font-semibold text-xl">Example: Custom Dictionary</h2>
      <code-block [code]="customDictionary" />
      <h2 class="font-semibold text-xl">Best Practices</h2>
      <ul class="list-disc ml-6">
        <li>
          <b>Always</b> store your language JSON files in <b>public/lang</b> so
          they are accessible via HTTP requests and detected by the
          TranslationService
        </li>
        <li>Use signals for reactive UI updates</li>
        <li>
          Use the pipe for template translations, and the service for logic
        </li>
      </ul>
    </div>
  `,
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-20',
  },
})
export class TranslationDocumentation {
  angularImport = `import { TranslationService } from '@basis-ng/primitives';`;
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
  serviceUsage = `translation = inject(TranslationService);

ngOnInit() {
  this.translation.setLanguage('es'); // Loads public/lang/es.json
  const text = this.translation.translate('home.title'); // Returns translated string
}`;
  signalsUsage = `this.translation.language(); // Current language code`;
  pipeImport = `import { TranslatePipe } from '@basis-ng/primitives';`;
  pipeUsage = `{{ 'home.title' | translate }}`;
  switchLanguage = `this.translation.setLanguage('fr'); // Loads French dictionary`;
  customDictionary = `this.translation.setDictionary({
  en: { 'greeting': 'Hello' },
  es: { 'greeting': 'Hola' }
});`;
}
