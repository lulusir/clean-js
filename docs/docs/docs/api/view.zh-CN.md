---
nav:
  title: API
  path: /api
  order: 2
group:
  title: View adaptor
  path: /view
  order: 3
---

# View adaptor

> 提供 Presenter 给到 View

# react

## usePresenter

- 使用 usePresenter hook
- 注入 Presenter 类
- 获取 presenter 实例, state 对象
- 在 presenter 使用 setState 方法可以更新 state，并且默认会更新视图

### usage

```typescript | pure
import React from 'react';

import { usePresenter } from '@clean-js/react-presenter';

import { Presenter } from '@clean-js/presenter';

interface IViewState {
  count: number;
}

class CounterPresenter extends Presenter<IViewState> {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  increment = () => {
    this.setState((s) => {
      s.count += 1;
    });
  };

  decrement = () => {
    this.setState((s) => {
      s.count -= 1;
    });
  };
}

const Counter = () => {
  const { presenter, state } = usePresenter(CounterPresenter);
  return (
    <div>
      <p>{state.count}</p>
      <button
        onClick={() => {
          presenter.increment();
        }}
      >
        increment
      </button>
      <button
        onClick={() => {
          presenter.decrement();
        }}
      >
        decrement
      </button>
    </div>
  );
};

export default Counter;

```

### Api

#### Interface

```typescript | pure
function usePresenter<P>(
  Cls: P,
  options?: {
    registry?: { token: any; useClass: Constructor<any> }[];
    equalityFn?: (prev: State, next: State) => boolean;
  },
): {
  presenter: P;
  state: P['state'];
};
```

| 参数               | 说明                              | 类型                                         | 默认值    |
| ------------------ | --------------------------------- | -------------------------------------------- | --------- |
| options.registry   | Presenter 的注册类，用于依赖注入  | { token: any; useClass: Constructor<any> }[] |           |
| options.equalityFn | 比较两次state，决定是否要渲染组件 | (prev: State, next: State) => boolean;       | Object.is |
| return.presenter   | 返回的 Presenter 实例             | Presenter                                    |           |
| return.p           | 返回的 Presenter 实例             | Presenter                                    |           |
| return.s           | 等同于 Presenter 实例 的 state    | IViewState                                   |           |

## Provider

```typescript | pure
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

const IndexPage = () => {
  return (
    <Provider Presenter={P}>
      <ComA></ComA>
      <ComB></ComB>
      <ComC></ComC>
      <ComD></ComD>
    </Provider>
  );
};
```

#### example

<code src="../demos/provider/index.tsx"></code>

# if use vue

期待中。。。
