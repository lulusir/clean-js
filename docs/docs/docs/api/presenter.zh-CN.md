---
nav:
  title: API
  path: /api
  order: 2
---

# Presenter

> 提供方法和 State 给到 View

## usage


```typescript | pure
import { injectable, Presenter } from "@clean-js/presenter";

interface IViewState {
  loading: boolean;
}

const defaultState: () => IViewState = () => {
  return {
    loading: false,
  };
};

@injectable()
export class IndexPresenter extends Presenter<IViewState> {
  constructor() {
    super();
    this.state = defaultState();
  }

  showLoading() {
    this.setState((s) => {
      s.loading = true;
    });
  }
  
  hideLoading() {
    this.setState((s) => {
      s.loading = false;
    });
  }
}

```

## Method

| 参数       | 说明                         | 类型                | 默认值 |
| ---------- | ---------------------------- | ------------------- | ------ |
| state      | getter 返回 state | IViewState              |        |
| setState   |  设置state   | IViewState   |        |

#### PresenterFactor

Presenter 构造工厂

返回 Presenter 的实例化

```
const p = PresenterFactor.get<NamePresenter>(NamePresenter);
```
