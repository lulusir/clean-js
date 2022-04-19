/* eslint-disable max-classes-per-file */
import 'reflect-metadata';
import { Presenter } from './presenter';
import { devtools } from '../utils/devtool';

jest.mock('../utils/devtool');

devtools.init = jest.fn((state: any, name: string) => ({
  state,
  name,
}));

devtools.remove = jest.fn((name: string) => ({
  name,
}));
type MockInit = jest.Mock<
  {
    state: any;
    name: string;
  },
  [state: any, name: string]
>;

type MockRemove = jest.Mock<
  {
    name: string;
  },
  [name: string]
>;
interface IViewState {
  a: {
    b: {
      c: number[];
    };
  };
}
const defaultState: IViewState = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

class TestP extends Presenter<IViewState> {
  constructor() {
    super();
    this.state = {
      a: {
        b: {
          c: [1, 2, 3],
        },
      },
    };
  }
}

describe('Presenter', () => {
  it('init', () => {
    const p = new TestP();
    expect(p.state).toBeDefined();
    expect(p.subscribe).toBeDefined();
    expect(p.__init).toBeDefined();
    expect(p.__destroy).toBeDefined();
  });

  it('state', () => {
    const p = new TestP();
    expect(p.state).toBeDefined();
    expect(p.state).toEqual(defaultState);
    expect(p.subscribe).toBeDefined();
    expect(p.__init).toBeDefined();
    expect(p.__destroy).toBeDefined();
  });

  it('set state, fn', () => {
    const p = new TestP();

    p.setState((s) => {
      s.a.b.c.push(4);
    });
    expect(p.state.a.b.c).toEqual([1, 2, 3, 4]);
    expect(p.subscribe).toBeDefined();
    expect(p.__init).toBeDefined();
    expect(p.__destroy).toBeDefined();
  });

  it('set state', () => {
    const p = new TestP();

    p.setState({
      a: {
        b: {
          c: [1, 2, 3, 4],
        },
      },
    });
    expect(p.state.a.b.c).toEqual([1, 2, 3, 4]);
    expect(p.subscribe).toBeDefined();
    expect(p.__init).toBeDefined();
    expect(p.__destroy).toBeDefined();
  });

  it('set state throw error,when not init', () => {
    class TestP1 extends Presenter<IViewState> {
      constructor() {
        super();
      }
    }

    expect(() => {
      const p = new TestP1();
      const s = p.state;
    }).toThrow();
  });

  it('set state throw error', () => {
    const p = new TestP();

    expect(() => {
      // @ts-ignore
      p.state = {
        a: {
          b: {
            c: [1, 2, 3, 4],
          },
        },
      };
    }).toThrow();
  });

  // it('updateView', () => {
  //   const p = new TestP();
  //   expect(p.updateView).toThrowError();
  // });

  it('subscribe', () => {
    const p = new TestP();
    let count = 0;
    p.subscribe(() => {
      count += 1;
    });

    p.setState((s) => {
      s.a.b.c.push(1);
    });

    expect(count).toBe(1);
  });

  it('unsubscribe', () => {
    const p = new TestP();
    let count = 0;
    const { unsubscribe } = p.subscribe(() => {
      count += 1;
    });

    p.setState((s) => {
      s.a.b.c.push(1);
    });

    expect(count).toBe(1);

    unsubscribe();

    p.setState((s) => {
      s.a.b.c.push(1);
    });
    expect(count).toBe(1);
  });

  it('__init', () => {
    const p = new TestP();
    p.__init();

    expect(devtools.init).toBeCalled();
    expect((devtools.init as MockInit).mock.calls[0][0]).toBe(p.state);
    expect((devtools.init as MockInit).mock.calls[0][1]).toBe(TestP.name);
  });

  it('__destroy', () => {
    const p = new TestP();
    p.__destroy();

    expect(devtools.remove).toBeCalled();
    expect((devtools.remove as MockRemove).mock.calls[0][0]).toBe(TestP.name);
  });
});
