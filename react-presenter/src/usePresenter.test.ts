/* eslint-disable max-classes-per-file */

import { renderHook, act } from '@testing-library/react-hooks';
import { Model, Presenter, injectable, inject } from '@clean-js/presenter';
import { usePresenter } from './usePresenter';

class M extends Model<{ name: string; obj: Record<any, any> }> {
  constructor() {
    super();
    this.state = {
      name: 'lujs',
      obj: {},
    };
  }
}

@injectable()
class P extends Presenter<M> {
  constructor(private model: M) {
    super();
  }

  changeName() {
    this.model.setState((s) => {
      s.name += '!';
    });
  }

  changeNameSameValue() {
    this.model.setState((s) => {
      s.name = 'lujs';
    });
  }

  changeNameSameValueObj() {
    this.model.setState((s) => {
      s.obj = {};
    });
  }

  changeNameWith(obj: M['state']) {
    this.model.setState(obj);
  }
}

describe('should increment counter', () => {
  it('updateView, when no change', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P, { autoUpdate: false });
    });
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.updateView();
    });
    expect(count).toBe(1);
  });

  it('change state, but not updateView, will not render', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P, { autoUpdate: false });
    });
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeName();
    });
    expect(count).toBe(1);
  });

  it('updateView， when state change', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P, { autoUpdate: false });
    });
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeName();
      result.current.presenter.updateView();
    });
    expect(count).toBe(2);
  });

  it('updateView， when state change, same value', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P, { autoUpdate: false });
    });
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeNameSameValue();
      result.current.presenter.updateView();
    });
    expect(count).toBe(1);
  });

  it('updateView， when state change, same value, reference type', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P, { autoUpdate: false });
    });
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeNameSameValueObj();
      result.current.presenter.updateView();
    });
    expect(count).toBe(2);
  });

  it('set the same  state， reference type', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P, { autoUpdate: false });
    });
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeNameWith({ name: 'lujs', obj: {} });
      result.current.presenter.updateView();
    });
    expect(count).toBe(2);
  });

  it('state', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P, { autoUpdate: false });
    });
    expect(result.current.state.name === 'lujs').toBeTruthy();
  });

  it('state can not assign', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P, { autoUpdate: false });
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
  it('updateView, when no change', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter<P>(P);
    });
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.updateView();
    });
    expect(count).toBe(1);
  });

  it('change state, but not updateView, will not render', () => {
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
    class A extends Presenter<M> {
      constructor(@inject(token) public b: B, private model: M) {
        super();
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
    class A extends Presenter<M> {
      constructor(@inject(token) public b: B, private model: M) {
        super();
      }

      changeName() {
        this.model.setState((s) => {
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
