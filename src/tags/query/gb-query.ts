import '../sayt/gb-sayt.tag';
import { FluxTag } from '../tag';
import { Events } from 'groupby-api';
import { unless, updateLocation, parseQueryFromLocation } from '../../utils';
import { mount } from '../sayt/query-wrapper';
import queryString = require('query-string');

const ENTER_KEY = 13;

export interface Query extends FluxTag { }

export class Query {

  root: HTMLInputElement;

  parentOpts: any;
  queryParam: string;
  searchUrl: string;
  staticSearch: string;

  init() {
    this.parentOpts = this.opts.passthrough || this.opts;
    const saytEnabled = unless(this.parentOpts.sayt, true);
    const autoSearch = unless(this.parentOpts.autoSearch, true);
    this.queryParam = this.parentOpts.queryParam || 'q';
    this.searchUrl = this.parentOpts.searchUrl || 'search';
    this.staticSearch = unless(this.parentOpts.staticSearch, false);

    const inputValue = () => this.root.value;

    const queryFromUrl = parseQueryFromLocation(this.queryParam, this.parentOpts.queryConfig);

    const setLocation = () => {
      // Better way to do this is with browser history rewrites
      if (window.location.pathname !== this.searchUrl) {
        updateLocation(this.searchUrl, this.queryParam, this.root.value, this.parentOpts.flux.query.raw.refinements);
      } else {
        this.parentOpts.flux.reset(this.root.value);
      }
    };

    if (saytEnabled) mount(<Riot.Tag.Instance & any>this);
    if (autoSearch) {
      this.on('before-mount', () => this.listenForInput(inputValue));
    } else if (this.staticSearch) {
      this.on('before-mount', () => this.listenForEnter(setLocation));
    } else {
      this.on('before-mount', () => this.listenForSubmit(inputValue));
    }

    this.parentOpts.flux.on(Events.REWRITE_QUERY, (query: string) => this.root.value = query);
    if (queryFromUrl) {
      this.parentOpts.flux.query = queryFromUrl;
      this.parentOpts.flux.search(queryFromUrl.raw.query);
    }
  }

  listenForInput(value: () => string) {
    this.root.addEventListener('input', () => this.parentOpts.flux.reset(value()));
  }

  listenForSubmit(value: () => string) {
    this.listenForEnter(() => this.parentOpts.flux.reset(value()));
  }

  listenForEnter(cb: () => void) {
    this.root.addEventListener('keydown', (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case ENTER_KEY:
          return cb();
      }
    });
  }
}
