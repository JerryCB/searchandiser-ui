import { Events } from 'groupby-api';
import { unless } from '../../utils';

export class Breadcrumbs {

  opts: any;
  update: (any) => void;

  hideQuery: boolean;
  hideRefinements: boolean;

  init() {
    this.hideQuery = unless(this.opts.hideQuery, false);
    this.hideRefinements = unless(this.opts.hideRefinements, false);

    this.opts.flux.on(Events.REFINEMENTS_CHANGED, ({ selected }) => this.update({ selected }));
    this.opts.flux.on(Events.RESULTS, ({ originalQuery }) => this.update({ originalQuery }));
    this.opts.flux.on(Events.RESET, () => this.update({ selected: [] }));
  }
}
