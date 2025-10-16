# basis-ng (Workspace)

Welcome to the basis-ng workspace! This workspace is designed to house the `basis-ng` library of Angular components, the `styles` library for component styles, and the `docs` application that documents these components. The `basis-ng` library is available on npm under the organization [@basis-ng](https://www.npmjs.com/org/basis-ng).

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.6.

## Projects

This workspace contains three main projects:

- `primitives`: The Angular library of components (`@basis-ng/primitives` on npm).
- `styles`: The library that provides styles for the components (`@basis-ng/styles` on npm).
- `docs`: The application that documents the components.

## Versioning

### Primitives

To update the version of the `primitives` project, run:

- Patch version:
  ```bash
  npm run publish:primitives:patch
  ```
- Minor version:
  ```bash
  npm run publish:primitives:minor
  ```
- Major version:
  ```bash
  npm run publish:primitives:major
  ```
- Pre-release version (alpha):
  ```bash
  npm run publish:primitives:alpha
  ```
- Pre-release version (beta):
  ```bash
  npm run publish:primitives:beta
  ```
- Pre-release version (release candidate):
  ```bash
  npm run publish:primitives:rc
  ```

### Styles

To update the version of the `styles` project, run:

- Patch version:
  ```bash
  npm run publish:styles:patch
  ```
- Minor version:
  ```bash
  npm run publish:styles:minor
  ```
- Major version:
  ```bash
  npm run publish:styles:major
  ```
- Pre-release version (alpha):
  ```bash
  npm run publish:styles:alpha
  ```
- Pre-release version (beta):
  ```bash
  npm run publish:styles:beta
  ```
- Pre-release version (release candidate):
  ```bash
  npm run publish:styles:rc
  ```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
