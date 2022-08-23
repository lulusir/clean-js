---
nav:
  title: API
  path: /api
  order: 1
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
import { usePresenter } from '@clean-js/react-presenter';

const Name = () => {
  const { presenter, state } = usePresenter(NamePresenter);
  return (
    <div>
      name: {state.name}
      <button 
        onClick={() => {
          presenter.changeName()
        }}
      >
        change name
      </button>
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
    registry?: { token: any; useClass: Constructor<any> }[];
    selector?: (s: State) => any;
    equalityFn?: (prev: State, next: State) => boolean;
  },
): {
  presenter: P;
  state: P['state'];
};
```

| 参数               | 说明                              | 类型                                         | 默认值 |
| ------------------ | --------------------------------- | -------------------------------------------- | ------ |
| options.registry   | Presenter 的注册类，用于依赖注入  | { token: any; useClass: Constructor<any> }[] |        |
| options.equalityFn   | 比较两次state，决定是否要渲染组件 | (prev: State, next: State) => boolean; |     Object.is   |
| options.selector   | 状态选择器，比如IViewState: {name: string, age: number};  selector: (s) => s.age; 那么只有age变化时，组件才会渲染   | (s: State) => any; |    s => s    |
| return.presenter   | 返回的 Presenter 实例             | Presenter                                    |        |
| return.p   | 返回的 Presenter 实例             | Presenter                                    |        |
| return.s       | 等同于 Presenter 实例 的 state          | IViewState                            |        |

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
