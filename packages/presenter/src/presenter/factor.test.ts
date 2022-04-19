import { Presenter } from '..';
import { PresenterFactor } from './factor';

class IndexPresenter extends Presenter<{ loading: boolean }> {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  changeLoading = () => {
    this.setState((s) => {
      s.loading = !s.loading;
    });
  };
}

describe('factor', () => {
  it('get', () => {
    const p = PresenterFactor.get<IndexPresenter>(IndexPresenter);

    expect(p).toBeInstanceOf(IndexPresenter);
    expect(p.state.loading).toBe(false);
    expect(p.changeLoading).toBeDefined();
  });

  it('get different obj', () => {
    const p1 = PresenterFactor.get<IndexPresenter>(IndexPresenter);
    const p2 = PresenterFactor.get<IndexPresenter>(IndexPresenter);

    expect(p1).not.toBe(p2);

    p1.changeLoading();
    expect(p1.state.loading).toBeTruthy();
    expect(p2.state.loading).toBeFalsy();
  });
});
