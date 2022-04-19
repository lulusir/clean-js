/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-classes-per-file */

import { renderHook, act } from '@testing-library/react-hooks';
import { Presenter, injectable, inject } from '@clean-js/presenter';
import { usePresenter } from './usePresenter';

interface IViewState {
  name: string;
  obj: Record<any, any>;
}

@injectable()
class P extends Presenter<IViewState> {
  constructor() {
    super();
    this.state = {
      name: 'lujs',
      obj: {},
    };
  }

  changeName() {
    this.setState((s) => {
      s.name += '!';
    });
  }

  changeNameSameValue() {
    this.setState((s) => {
      s.name = 'lujs';
    });
  }

  changeNameSameValueObj() {
    this.setState((s) => {
      s.obj = {};
    });
  }

  changeNameWith(obj: IViewState) {
    this.setState(obj);
  }
}

describe('should increment counter', () => {
  it('updateView, when no change', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P);
    });
    expect(count).toBe(1);
    // act(() => {
    //   result.current.presenter.updateView();
    // });
    expect(count).toBe(1);
  });

  it('change state, will  render', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P);
    });
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeName();
    });
    expect(count).toBe(2);
    expect(result.current.state.name).toBe('lujs!');
  });

  it('updateView， when state change', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P);
    });
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeName();
    });
    expect(count).toBe(2);
  });

  it('updateView， when state change, same value', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P);
    });
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeNameSameValue();
    });
    expect(count).toBe(1);
  });

  it('updateView， when state change, same value, reference type', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P);
    });
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeNameSameValueObj();
    });
    expect(count).toBe(2);
  });

  it('set the same  state， reference type', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P);
    });
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeNameWith({ name: 'lujs', obj: {} });
    });
    expect(count).toBe(2);
  });

  it('state', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P);
    });
    expect(result.current.state.name === 'lujs').toBeTruthy();
  });

  it('state can not assign', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P);
    });

    const assign = () => {
      result.current.state.name = '';
    };
    expect(assign).toThrow();
    expect(result.current.state.name === 'lujs').toBeTruthy();
    expect(count).toBe(1);
  });
});

describe('auto update, should increment counter', () => {
  it('change state, will  render, in for loop', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P);
    });
    expect(count).toBe(1);
    act(() => {
      for (let i = 0; i < 10000; i++) {
        result.current.presenter.changeName();
      }
    });
    expect(count).toBe(2);
  });

  it('change state, will  render', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P);
    });
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeName();
    });
    expect(count).toBe(2);
  });

  it('updateView， when state change', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P);
    });
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeName();
    });
    expect(count).toBe(2);
  });

  it('updateView， when state change, same value', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P);
    });
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeNameSameValue();
    });
    expect(count).toBe(1);
  });

  it('updateView， when state change, same value, reference type', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P);
    });
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeNameSameValueObj();
    });
    expect(count).toBe(2);
  });

  it('set the same  state， reference type', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P);
    });
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeNameWith({ name: 'lujs', obj: {} });
    });
    expect(count).toBe(2);
  });

  it('state', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P);
    });
    expect(result.current.state.name === 'lujs').toBeTruthy();
  });

  it('state can not assign', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P);
    });

    const assign = () => {
      result.current.state.name = '';
    };
    expect(assign).toThrow();
    expect(result.current.state.name === 'lujs').toBeTruthy();
    expect(count).toBe(1);
  });
});

describe('registry', () => {
  it('base', () => {
    interface B {}
    class B1 implements B {}
    const token = 'token';

    @injectable()
    class A extends Presenter<IViewState> {
      constructor(@inject(token) public b: B) {
        super();
        this.state = {
          name: 'lujs',
          obj: {},
        };
      }

      _() {
        console.log(this.b);
      }
    }

    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<A>(A, { registry: [{ token, useClass: B1 }] });
    });

    const assign = () => {
      result.current.state.name = '';
    };
    expect(assign).toThrow();
    expect(result.current.state.name === 'lujs').toBeTruthy();
    expect(count).toBe(1);
    expect(result.current.presenter.b).toBeInstanceOf(B1);
  });

  it('update', () => {
    interface B {}
    class B1 implements B {}
    const token = 'token';

    @injectable()
    class A extends Presenter<IViewState> {
      constructor(@inject(token) public b: B) {
        super();
        this.state = {
          name: 'lujs',
          obj: {},
        };
      }

      changeName() {
        this.setState((s) => {
          s.name += '!';
        });
      }

      _() {
        console.log(this.b);
      }
    }

    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<A>(A, { registry: [{ token, useClass: B1 }] });
    });

    const assign = () => {
      result.current.state.name = '';
    };
    expect(assign).toThrow();
    expect(result.current.state.name === 'lujs').toBeTruthy();
    expect(count).toBe(1);
    expect(result.current.presenter.b).toBeInstanceOf(B1);

    act(() => {
      result.current.presenter.changeName();
    });
    expect(count).toBe(2);
  });
});
