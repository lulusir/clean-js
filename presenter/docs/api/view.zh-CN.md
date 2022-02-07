---
nav:
  title: API
  path: /api
  order: 3
---

# View adaptor

> 提供 Presenter 给到 View

# react

## usePresenter

- 使用 usePresenter hook
- 注入 Presenter 类
- 获取 presenter 实例, state 对象（model 中声明的 state）
- 在 presenter 使用 setState 方法可以更新 model 的 state，并且默认会更新视图

### usage

```typescript | pure
import { usePresenter } from '@lujs/react-mvp-adaptor';

const Name = () => {
  const { presenter, state } = usePresenter<NamePresenter>(NamePresenter);
  return (
    <div>
      name: {state.name}
      <button onClick={presenter.changeName()}>change name</button>
    </div>
  );
};

export default Name;
```

### Api

#### Interface

```typescript | pure
function usePresenter<P>(
  Cls: P,
  options?: {
    autoUpdate?: boolean;
    registry?: { token: any; useClass: Constructor<any> }[];
  },
): {
  presenter: P;
  state: Model['state'];
};
```

| 参数               | 说明                              | 类型                                         | 默认值 |
| ------------------ | --------------------------------- | -------------------------------------------- | ------ |
| options.autoUpdate | 是否在 setState 之后默认更新 view | true                                         |        |
| options.registry   | Presenter 的注册类，用于依赖注入  | { token: any; useClass: Constructor<any> }[] |        |
| return.presenter   | 返回的 Presenter 实例             | Presenter                                    |        |
| return.state       | 等同于 model 的 setState          | Model['setState']                            |        |

## Provider

```typescript
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
          presenter.updateView();
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
