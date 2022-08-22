/* eslint-disable max-classes-per-file */

import { injectable, Presenter } from '@clean-js/presenter';
import { render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import React, { ReactNode, useRef } from 'react';
import { Provider, usePresenterContext } from './provider';

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

describe('provider', () => {
  it('updateView', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider Presenter={P}>{children}</Provider>
    );
    let count = 0;
    const { result } = renderHook(
      () => {
        count += 1;
        const { presenter, state } = usePresenterContext<P>(P);
        return {
          presenter,
          state,
        };
      },
      { wrapper },
    );
    expect(count).toBe(1);
  });

  it('change state in for loop, only update one time', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider Presenter={P}>{children}</Provider>
    );
    let count = 0;
    const { result } = renderHook(
      () => {
        count += 1;
        const { presenter, state } = usePresenterContext<P>(P);
        return {
          presenter,
          state,
        };
      },
      { wrapper },
    );
    expect(count).toBe(1);
    act(() => {
      for (let i = 0; i < 10000; i++) {
        result.current.presenter.changeName();
      }
    });
    expect(count).toBe(2);
  });

  it('updateView， when state change', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider Presenter={P}>{children}</Provider>
    );
    let count = 0;
    const { result } = renderHook(
      () => {
        count += 1;
        const { presenter, state } = usePresenterContext<P>(P);
        return {
          presenter,
          state,
        };
      },
      { wrapper },
    );
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeName();
    });
    expect(count).toBe(2);
  });

  it('set the same state', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider Presenter={P}>{children}</Provider>
    );
    let count = 0;
    const { result } = renderHook(
      () => {
        count += 1;
        const { presenter, state } = usePresenterContext<P>(P);
        return {
          presenter,
          state,
        };
      },
      { wrapper },
    );
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeNameSameValue();
    });
    expect(count).toBe(1);
  });

  it('set the same state', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider Presenter={P}>{children}</Provider>
    );
    let count = 0;
    const { result } = renderHook(
      () => {
        count += 1;
        const { presenter, state } = usePresenterContext<P>(P);
        return {
          presenter,
          state,
        };
      },
      { wrapper },
    );
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeNameSameValueObj();
    });
    expect(count).toBe(2);
  });

  it('set the same state', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider Presenter={P}>{children}</Provider>
    );
    let count = 0;
    const { result } = renderHook(
      () => {
        count += 1;
        const { presenter, state } = usePresenterContext<P>(P);
        return {
          presenter,
          state,
        };
      },
      { wrapper },
    );
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeNameWith({ name: 'lujs', obj: {} });
    });
    expect(count).toBe(2);
  });

  it('state', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider Presenter={P}>{children}</Provider>
    );
    let count = 0;
    const { result } = renderHook(
      () => {
        count += 1;
        const { presenter, state } = usePresenterContext<P>(P);
        return {
          presenter,
          state,
        };
      },
      { wrapper },
    );
    expect(count).toBe(1);
    expect(result.current.state.name === 'lujs').toBeTruthy();
  });

  it('state can not assign', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider Presenter={P}>{children}</Provider>
    );
    let count = 0;
    const { result } = renderHook(
      () => {
        count += 1;
        const { presenter, state } = usePresenterContext<P>(P);
        return {
          presenter,
          state,
        };
      },
      { wrapper },
    );

    const assign = () => {
      result.current.state.name = '';
    };
    expect(assign).toThrow();
    expect(result.current.state.name === 'lujs').toBeTruthy();
    expect(count).toBe(1);
  });

  it('usePresenterContext will return same state', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider Presenter={P}>{children}</Provider>
    );
    let count = 0;
    const { result } = renderHook(
      () => {
        count += 1;
        const { presenter: p1, state: s1 } = usePresenterContext<P>(P);
        const { presenter: p2, state: s2 } = usePresenterContext<P>(P);
        return {
          p1,
          p2,
          s1,
          s2,
        };
      },
      { wrapper },
    );
    const { s1, s2 } = result.current;
    expect(s1 === s2).toBeTruthy();
    expect(count).toBe(1);
    act(() => {
      // result.current.p1.updateView();
    });
    expect(count).toBe(1);
  });
});

describe('provider, use auto update', () => {
  it('updateView', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider Presenter={P}>{children}</Provider>
    );
    let count = 0;
    const { result } = renderHook(
      () => {
        count += 1;
        const { presenter, state } = usePresenterContext<P>(P);
        return {
          presenter,
          state,
        };
      },
      { wrapper },
    );
    expect(count).toBe(1);
    act(() => {});
    expect(count).toBe(1);
  });

  it('change state, but not updateView, will not render', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider Presenter={P}>{children}</Provider>
    );
    let count = 0;
    const { result } = renderHook(
      () => {
        count += 1;
        const { presenter, state } = usePresenterContext<P>(P);
        return {
          presenter,
          state,
        };
      },
      { wrapper },
    );
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeName();
    });
    expect(count).toBe(2);
  });

  it('updateView， when state change', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider Presenter={P}>{children}</Provider>
    );
    let count = 0;
    const { result } = renderHook(
      () => {
        count += 1;
        const { presenter, state } = usePresenterContext<P>(P);
        return {
          presenter,
          state,
        };
      },
      { wrapper },
    );
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeName();
    });
    expect(count).toBe(2);
  });

  it('set the same state', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider Presenter={P}>{children}</Provider>
    );
    let count = 0;
    const { result } = renderHook(
      () => {
        count += 1;
        const { presenter, state } = usePresenterContext<P>(P);
        return {
          presenter,
          state,
        };
      },
      { wrapper },
    );
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeNameSameValue();
    });
    expect(count).toBe(1);
  });

  it('set the same state', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider Presenter={P}>{children}</Provider>
    );
    let count = 0;
    const { result } = renderHook(
      () => {
        count += 1;
        const { presenter, state } = usePresenterContext<P>(P);
        return {
          presenter,
          state,
        };
      },
      { wrapper },
    );
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeNameSameValueObj();
    });
    expect(count).toBe(2);
  });

  it('set the same state', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider Presenter={P}>{children}</Provider>
    );
    let count = 0;
    const { result } = renderHook(
      () => {
        count += 1;
        const { presenter, state } = usePresenterContext<P>(P);
        return {
          presenter,
          state,
        };
      },
      { wrapper },
    );
    expect(count).toBe(1);
    act(() => {
      result.current.presenter.changeNameWith({ name: 'lujs', obj: {} });
    });
    expect(count).toBe(2);
  });

  it('state', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider Presenter={P}>{children}</Provider>
    );
    let count = 0;
    const { result } = renderHook(
      () => {
        count += 1;
        const { presenter, state } = usePresenterContext<P>(P);
        return {
          presenter,
          state,
        };
      },
      { wrapper },
    );
    expect(count).toBe(1);
    expect(result.current.state.name === 'lujs').toBeTruthy();
  });

  it('state can not assign', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider Presenter={P}>{children}</Provider>
    );
    let count = 0;
    const { result } = renderHook(
      () => {
        count += 1;
        const { presenter, state } = usePresenterContext<P>(P);
        return {
          presenter,
          state,
        };
      },
      { wrapper },
    );

    const assign = () => {
      result.current.state.name = '';
    };
    expect(assign).toThrow();
    expect(result.current.state.name === 'lujs').toBeTruthy();
    expect(count).toBe(1);
  });

  it('usePresenterContext will return same state', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider Presenter={P}>{children}</Provider>
    );
    let count = 0;
    const { result } = renderHook(
      () => {
        count += 1;
        const { presenter: p1, state: s1 } = usePresenterContext<P>(P);
        const { presenter: p2, state: s2 } = usePresenterContext<P>(P);
        return {
          p1,
          p2,
          s1,
          s2,
        };
      },
      { wrapper },
    );
    const { s1, s2 } = result.current;
    expect(s1 === s2).toBeTruthy();
    expect(count).toBe(1);
    act(() => {
      // result.current.p1.updateView();
    });
    expect(count).toBe(1);
  });
});

describe('Component', () => {
  const ComA = () => {
    const { state } = usePresenterContext(P);
    return (
      <div>
        <div data-testid="name">{state.name}</div>
      </div>
    );
  };

  const ComB = () => {
    const { presenter } = usePresenterContext(P);
    return (
      <div>
        <button
          data-testid="change"
          onClick={() => {
            presenter.changeName();
            // presenter.updateView();
          }}
        >
          change name
        </button>
      </div>
    );
  };

  const ComC = () => {
    const ref = useRef(0);
    ref.current += 1;
    return <div data-testid="ComC-count">{ref.current}</div>;
  };

  const ComD = () => {
    const ref = useRef(0);
    ref.current += 1;
    usePresenterContext(P);
    return <div data-testid="ComD-count">{ref.current}</div>;
  };

  const IndexPage = () => {
    console.log('render IndexPage');
    return (
      <Provider Presenter={P}>
        <ComA></ComA>
        <ComB></ComB>
        <ComC></ComC>
        <ComD></ComD>
      </Provider>
    );
  };

  it('Partial update', () => {
    render(<IndexPage />);

    expect(screen.getByTestId('name').innerHTML).toBe('lujs');
    expect(screen.getByTestId('ComC-count').innerHTML).toBe('1');
    expect(screen.getByTestId('ComD-count').innerHTML).toBe('1');
    userEvent.click(screen.getByTestId('change'));
    expect(screen.getByTestId('name').innerHTML).toBe('lujs!');
    expect(screen.getByTestId('ComD-count').innerHTML).toBe('2');
  });
});

describe('Component, use auto update', () => {
  const ComA = () => {
    const { state } = usePresenterContext(P);
    return (
      <div>
        <div data-testid="name">{state.name}</div>
      </div>
    );
  };

  const ComB = () => {
    const { presenter } = usePresenterContext(P);
    return (
      <div>
        <button
          data-testid="change"
          onClick={() => {
            presenter.changeName();
          }}
        >
          change name
        </button>
      </div>
    );
  };

  const ComC = () => {
    const ref = useRef(0);
    ref.current += 1;
    return <div data-testid="ComC-count">{ref.current}</div>;
  };

  const ComD = () => {
    const ref = useRef(0);
    ref.current += 1;
    usePresenterContext(P);
    return <div data-testid="ComD-count">{ref.current}</div>;
  };

  const IndexPage = () => (
    <Provider Presenter={P}>
      <ComA></ComA>
      <ComB></ComB>
      <ComC></ComC>
      <ComD></ComD>
    </Provider>
  );

  it('Partial update', () => {
    render(<IndexPage />);

    expect(screen.getByTestId('name').innerHTML).toBe('lujs');
    expect(screen.getByTestId('ComC-count').innerHTML).toBe('1');
    expect(screen.getByTestId('ComD-count').innerHTML).toBe('1');
    userEvent.click(screen.getByTestId('change'));
    expect(screen.getByTestId('name').innerHTML).toBe('lujs!');
    expect(screen.getByTestId('ComC-count').innerHTML).toBe('1');
    expect(screen.getByTestId('ComD-count').innerHTML).toBe('2');
  });
});
