import { booleanAttribute, Directive, input } from '@angular/core';

/**
 * A loading directive that overlays a skeleton shimmer on the host element while preserving size.
 */
@Directive({
  selector: '[bSkeleton]',
  host: {
    '[attr.aria-busy]': 'loading()',
    '[class.b-skeleton]': 'true',
    '[class.b-loading]': 'loading()',
  },
})
export class Skeleton {
  /**
   * Whether the host should display the skeleton state.
   */
  readonly loading = input(true, { alias: 'bSkeleton', transform: booleanAttribute });
}
