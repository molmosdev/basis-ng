# basis-ng AI Reference

This document is intended for LLM agents and coding assistants that need to use basis-ng correctly without guessing APIs.

## What basis-ng provides

basis-ng is split into two packages:

- `@basis-ng/primitives`: Angular standalone components, directives, pipes, and services.
- `@basis-ng/styles`: Tailwind/CSS-based style layer for those primitives.

The source of truth for exported APIs in the repository is `libs/primitives/src/public-api.ts`.

## Installation

Install both packages when you want the styled version of the components:

```bash
npm install @basis-ng/primitives @basis-ng/styles
```

## Core usage model

Use basis-ng with these assumptions:

1. Components are Angular standalone APIs.
2. Import primitives directly into the consuming component's `imports` array.
3. The primitives package exposes behavior and structure.
4. The styles package adds the visual appearance.
5. Without the matching styles import, components are headless or minimally styled.

## Import patterns

### Angular import pattern

```ts
import { Component, signal } from '@angular/core';
import { Button, Drawer } from '@basis-ng/primitives';

@Component({
  imports: [Button, Drawer],
  template: `
    <button b-button (click)="open.set(true)">Open</button>
    <b-drawer [(isOpen)]="open">
      <div class="p-6">Content</div>
    </b-drawer>
  `,
})
export class ExampleComponent {
  readonly open = signal(false);
}
```

### Styles import pattern

Import either the whole style bundle or component-specific styles.

Global bundle:

```css
@import '@basis-ng/styles';
```

Single component:

```css
@import '@basis-ng/styles/drawer';
```

## Library conventions

Agents using basis-ng should follow these conventions:

1. Prefer existing exported primitives from `@basis-ng/primitives` instead of inventing new component names.
2. Prefer existing examples from the docs site before proposing custom APIs.
3. Use Angular signals in examples for local state.
4. Use `input()`, `output()`, and `model()` style APIs when extending the library itself.
5. Assume selectors usually start with `b-`, though some directives use attribute selectors like `b-button`.
6. Treat the styles package as optional but recommended.

## Documented components

These components currently have dedicated docs pages and should be considered the easiest entry points for examples.

| Component      | Docs route                                        | Typical style import              |
| -------------- | ------------------------------------------------- | --------------------------------- |
| Alert          | `https://basis.ng/docs/components/alert`          | `@basis-ng/styles/alert`          |
| Badge          | `https://basis.ng/docs/components/badge`          | `@basis-ng/styles/badge`          |
| Button         | `https://basis.ng/docs/components/button`         | `@basis-ng/styles/button`         |
| Card           | `https://basis.ng/docs/components/card`           | `@basis-ng/styles/card`           |
| Calendar       | `https://basis.ng/docs/components/calendar`       | `@basis-ng/styles/calendar`       |
| Checkbox       | `https://basis.ng/docs/components/checkbox`       | `@basis-ng/styles/checkbox`       |
| Dialog         | `https://basis.ng/docs/components/dialog`         | `@basis-ng/styles/dialog`         |
| Drawer         | `https://basis.ng/docs/components/drawer`         | `@basis-ng/styles/drawer`         |
| Input          | `https://basis.ng/docs/components/input`          | `@basis-ng/styles/input`          |
| Input Group    | `https://basis.ng/docs/components/input-group`    | `@basis-ng/styles/input-group`    |
| Menu           | `https://basis.ng/docs/components/menu`           | `@basis-ng/styles/menu`           |
| OTP            | `https://basis.ng/docs/components/otp`            | `@basis-ng/styles/otp`            |
| Range          | `https://basis.ng/docs/components/range`          | `@basis-ng/styles/range`          |
| Select         | `https://basis.ng/docs/components/select`         | `@basis-ng/styles/select`         |
| Spinner        | `https://basis.ng/docs/components/spinner`        | `@basis-ng/styles/spinner`        |
| Switch         | `https://basis.ng/docs/components/switch`         | `@basis-ng/styles/switch`         |
| Tabs           | `https://basis.ng/docs/components/tabs`           | `@basis-ng/styles/tabs`           |
| Textarea       | `https://basis.ng/docs/components/textarea`       | `@basis-ng/styles/textarea`       |
| Textarea Group | `https://basis.ng/docs/components/textarea-group` | `@basis-ng/styles/textarea-group` |
| Tooltip        | `https://basis.ng/docs/components/tooltip`        | `@basis-ng/styles/tooltip`        |
| Popover        | `https://basis.ng/docs/components/popover`        | `@basis-ng/styles/popover`        |
| Tree           | `https://basis.ng/docs/components/tree`           | `@basis-ng/styles/tree`           |

## Important behavior notes

### Styling

1. A primitive can work without styles, but it may look unstyled or incomplete.
2. If an agent generates usage code, it should mention the matching style import unless the consumer already imports `@basis-ng/styles` globally.

### Drawer

Current drawer behavior includes:

1. It replaces the old Sheet pattern.
2. It supports `top`, `bottom`, `left`, and `right` via the `side` input.
3. It supports `draggable`, which hides the handle and disables drag when `false`.
4. It supports `closeThreshold`.

## How an agent should choose examples

When generating code with basis-ng:

1. Start from the docs page for that component if it exists.
2. Reuse the exact exported symbol names from `@basis-ng/primitives`.
3. Reuse documented selectors and inputs from the source or docs page.
4. Avoid inventing unsupported convenience APIs.
5. Mention the style import explicitly when the consuming app may not already import the full style bundle.

## Recommended answer pattern for assistants

When an assistant suggests basis-ng usage, the safest structure is:

1. Installation line.
2. Angular import snippet.
3. Styles import snippet.
4. Minimal working example.
5. Short note about any gotcha or behavior detail.

## Public entry points for agents

1. `https://basis.ng/llms.txt`
2. `https://basis.ng/ai-reference.md`
3. `https://basis.ng/docs/components/*`
