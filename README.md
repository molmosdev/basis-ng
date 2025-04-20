# basis-ng (Workspace)

Welcome to the basis-ng workspace! This workspace is designed to house the `basis-ng` library of Angular components and the `docs` application that documents these components. The `basis-ng` library is available on npm under the organization [@basis-ng](https://www.npmjs.com/org/basis-ng).

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.5.

## Projects

This workspace contains two main projects:

- `primitives`: The Angular library of components (`@basis-ng/primitives` on npm).
- `docs`: The application that documents the components.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the `primitives` project, run:

```bash
npm run build:primitives
```

To build the `docs` project, run:

```bash
npm run build:docs
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Versioning

To update the version of the `primitives` project, run:

```bash
npm run patch
npm run minor
npm run major
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
