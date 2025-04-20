import { Component } from '@angular/core';
import { Alert } from '@basis-ng/primitives';

@Component({
  selector: 'article[app-label-documentation]',
  template: `
    <b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
  `,
  imports: [Alert],
})
export default class LabelDocumentationComponent {}
