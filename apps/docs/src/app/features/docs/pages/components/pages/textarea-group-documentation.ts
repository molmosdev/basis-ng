import { Component, OnInit, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Alert, Badge, Button, Textarea, TextareaGroup } from '@basis-ng/primitives';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { CodeBlock } from '../shared/components/code-block';

@Component({
  selector: 'article[app-textarea-group-documentation]',
  imports: [CodeBlock, Textarea, TextareaGroup, Button, StepsButtons, Badge, Alert, FormField],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Textarea', path: '/docs/components/textarea' }"
      [next]="{ label: 'Tooltip', path: '/docs/components/tooltip' }"
    />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha — Try them out! We'd love to hear your feedback! Expect breaking
      changes!
    </b-alert>
    <h1 class="font-bold text-2xl flex gap-2 items-start">
      Textarea Group
      <span b-badge class="b-variant-secondary b-size-sm"> New </span>
    </h1>
    <div class="flex flex-col gap-4">
      <span
        >Textarea Group allows you to vertically stack one or more <code>b-textarea</code> elements
        together with additional elements such as labels, help text or buttons below the
        textarea.</span
      >
      <code-block [code]="angularImport" />
      <span>Include this to apply the styles</span>
      <code-block [code]="stylesImport" />

      <h2 class="font-semibold text-xl">Sizes</h2>
      <code-block [code]="sizesUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <b-textarea-group class="w-full">
          <label>Notes (sm)</label>
          <textarea b-textarea class="b-size-sm" rows="3" placeholder="Short note..."></textarea>
        </b-textarea-group>
        <b-textarea-group class="w-full">
          <label>Description (md)</label>
          <textarea
            b-textarea
            class="b-size-md"
            rows="4"
            placeholder="Longer description..."
          ></textarea>
        </b-textarea-group>
        <b-textarea-group class="w-full">
          <label>Message (lg)</label>
          <textarea b-textarea class="b-size-lg" rows="6" placeholder="Full message..."></textarea>
        </b-textarea-group>
      </div>

      <h2 class="font-semibold text-xl">With help text and actions</h2>
      <code-block [code]="helpUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <b-textarea-group class="w-full">
          <label>Comment</label>
          <textarea
            b-textarea
            class="b-size-md"
            rows="4"
            placeholder="Write your comment..."
          ></textarea>
          <div class="flex items-center justify-between gap-3">
            <span class="text-xs text-muted">Max 500 characters</span>
            <div class="flex gap-2">
              <button b-button class="b-variant-ghost b-size-sm">Cancel</button>
              <button b-button class="b-variant-primary b-size-sm">Post</button>
            </div>
          </div>
        </b-textarea-group>
      </div>

      <h2 class="font-semibold text-xl">Combining elements</h2>
      <code-block [code]="combinedUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <b-textarea-group class="w-full">
          <label>Phone description</label>
          <textarea b-textarea rows="3" placeholder="What happened?" class="b-size-md"></textarea>
          <div class="flex items-center justify-end gap-2">
            <button b-button class="b-variant-primary b-size-sm">Verify</button>
          </div>
        </b-textarea-group>
      </div>
      <h2 class="font-semibold text-xl">Invalid</h2>
      <code-block [code]="invalidUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <b-textarea-group class="w-full">
          <label>Comment</label>
          <textarea
            b-textarea
            [formField]="invalidForm.inputField"
            class="b-size-md"
            rows="4"
            placeholder="Invalid textarea"
          ></textarea>
          <button b-button class="b-variant-primary b-size-sm">Post</button>
        </b-textarea-group>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Textarea', path: '/docs/components/textarea' }"
      [next]="{ label: 'Tooltip', path: '/docs/components/tooltip' }"
    />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class: 'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class TextareaGroupDocumentation implements OnInit {
  angularImport = `import { TextareaGroup, TextareaComponent } from '@basis-ng/primitives' `;
  stylesImport = `@import '@basis-ng/styles/textarea-group';`;
  sizesUsage = `<b-textarea-group class="w-full">\n  <label>Notes (sm)</label>\n  <textarea b-textarea class="b-size-sm" rows="3" placeholder="Short note..."></textarea>\n</b-textarea-group>\n<b-textarea-group class="w-full">\n  <label>Description (md)</label>\n  <textarea b-textarea class="b-size-md" rows="4" placeholder="Longer description..."></textarea>\n</b-textarea-group>\n<b-textarea-group class="w-full">\n  <label>Message (lg)</label>\n  <textarea b-textarea class="b-size-lg" rows="6" placeholder="Full message..."></textarea>\n</b-textarea-group>`;
  helpUsage = `<b-textarea-group class="w-full">\n  <label>Comment</label>\n  <textarea b-textarea class="b-size-md" rows="4" placeholder="Write your comment..."></textarea>\n  <div class="flex items-center justify-between gap-3">\n    <span class="text-xs text-muted">Max 500 characters</span>\n    <div class="flex gap-2">\n      <button b-button class="b-variant-ghost b-size-sm">Cancel</button>\n      <button b-button class="b-variant-primary b-size-sm">Post</button>\n    </div>\n  </div>\n</b-textarea-group>`;
  combinedUsage = `<b-textarea-group class="w-full">\n  <label>Phone description</label>\n  <textarea b-textarea rows="3" placeholder="What happened?"></textarea>\n  <div class="flex items-center justify-end gap-2">\n    <button b-button class="b-variant-primary b-size-sm">Verify</button>\n  </div>\n</b-textarea-group>`;
  invalidUsage = `<b-textarea-group class="w-full">\n  <label>Comment</label>\n  <textarea b-textarea [formField]="invalidForm.inputField" class="b-size-md" rows="4" placeholder="Invalid textarea"></textarea>\n  <button b-button class="b-variant-primary b-size-sm">Post</button>\n</b-textarea-group>`;

  invalidForm = form(signal({ inputField: '' }), (schemaPath) => {
    required(schemaPath.inputField);
  });

  ngOnInit(): void {
    this.invalidForm.inputField().markAsTouched();
  }
}
