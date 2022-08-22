/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-classes-per-file */

import { renderHook, act } from '@testing-library/react-hooks';
import { Presenter, injectable, inject } from '@clean-js/presenter';
import { usePresenter } from './usePresenter';

const deepEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);
interface IViewState {
  name: string;
  obj: Record<any, any>;
  a: {
    b: {
      c: number;
    };
  };
}

class Service {
  fetch() {
    return 'data';
  }
}

@injectable()
class P extends Presenter<IViewState> {
  constructor(protected service: Service) {
    super();
    this.state = {
      name: 'lujs',
      obj: {},
      a: {
        b: {
          c: 123,
        },
      },
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

  fetchServiceName() {
    const name = this.service.fetch();
    this.setState((s) => {
      s.name = name;
    });
  }

  updateDeep() {
    this.setState((s) => {
      s.a.b.c += 1;
    });
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
      result.current.presenter.changeNameWith({
        name: 'lujs',
        obj: {},
        a: {
          b: {
            c: 123,
          },
        },
      });
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
      result.current.presenter.changeNameWith({
        name: 'lujs',
        obj: {},
        a: {
          b: {
            c: 123,
          },
        },
      });
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
          a: {
            b: {
              c: 123,
            },
          },
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
          a: {
            b: {
              c: 123,
            },
          },
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

describe('inject', () => {
  it('fetchServiceName', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;
      return usePresenter(P);
    });
    expect(count).toBe(1);

    act(() => {
      result.current.presenter.fetchServiceName();
    });
    expect(count).toBe(2);
  });
});

describe('selector and equal', () => {
  it('1: with selector, update', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;

      const res = usePresenter<P>(P, {
        selector: (s) => s.a.b.c,
      });
      return res;
    });
    expect(count).toBe(1);
    expect(result.current.presenter.state.a.b.c).toBe(123);

    result.current.presenter.updateDeep();
    expect(count).toBe(2);
    expect(result.current.presenter.state.a.b.c).toBe(124);
  });

  it('1: with selector, not update', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;

      const res = usePresenter<P>(P, {
        selector: (s) => s.a.b.c,
      });
      return res;
    });
    expect(count).toBe(1);
    expect(result.current.presenter.state.a.b.c).toBe(123);

    result.current.presenter.changeName();
    expect(count).toBe(1);
  });

  it('1: right selector, update', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;

      const res = usePresenter<P>(P, {
        selector: (s) => s.name,
      });
      return res;
    });
    expect(count).toBe(1);
    expect(result.current.presenter.state.a.b.c).toBe(123);

    result.current.presenter.changeName();
    expect(count).toBe(2);
  });

  it('2: deep equal, update', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;

      const res = usePresenter<P>(P, {
        equalityFn: deepEqual,
      });
      return res;
    });
    expect(count).toBe(1);

    result.current.presenter.changeName();
    expect(count).toBe(2);
  });

  it('2: deep equal, not update', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;

      const res = usePresenter<P>(P, {
        equalityFn: deepEqual,
      });
      return res;
    });
    expect(count).toBe(1);

    result.current.presenter.setState((s) => {
      s.obj = {};
    });
    expect(count).toBe(1);
  });

  it('2: default equal,  update,', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;

      const res = usePresenter<P>(P, {});
      return res;
    });
    expect(count).toBe(1);

    result.current.presenter.setState((s) => {
      s.obj = {};
    });
    expect(count).toBe(2);
  });

  it('3: selector and equal fn, not update', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;

      const res = usePresenter<P>(P, {
        selector: (s) => s.obj,
        equalityFn: deepEqual,
      });
      return res;
    });
    expect(count).toBe(1);

    result.current.presenter.setState((s) => {
      s.obj = {};
    });
    expect(count).toBe(1);
  });

  it('3: selector and equal fn, update', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;

      const res = usePresenter<P>(P, {
        selector: (s) => s.obj,
        equalityFn: (a, b) => a === b,
      });
      return res;
    });
    expect(count).toBe(1);

    result.current.presenter.setState((s) => {
      s.obj = {};
    });
    expect(count).toBe(2);
  });
  it('3: selector and equal fn, update', () => {
    let count = 0;
    const { result } = renderHook(() => {
      count += 1;

      const res = usePresenter<P>(P, {
        selector: (s) => s.obj,
        equalityFn: (a, b) => a === b,
      });
      return res;
    });
    expect(count).toBe(1);

    result.current.presenter.setState((s) => {
      s.name += '1';
    });
    expect(count).toBe(1);
  });
});
