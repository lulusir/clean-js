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
import { Presenter, injectable } from '@clean-js/presenter';

interface IViewState {
  loading: boolean;
  name: string
}

@injectable()
export class NamePresenter extends Presenter<IViewState> {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: 'lujs'
    }
  }

  changeName() {
    this.setState('aha'); // api of set model state
  }
}
```

## Method

| 参数       | 说明                         | 类型                | 默认值 |
| ---------- | ---------------------------- | ------------------- | ------ |
| getState   | 返回 state        | () : Model['state'] |        |
| updateView | 更新 view 的方法，一般不需要用，由框架自动调用             | () : void           |        |
| state      | getter 返回 state | getter              |        |
| setState   |  设置state   | Model['setState']   |        |

#### PresenterFactor

Presenter 构造工厂

返回 Presenter 的实例化

```
const p = PresenterFactor.get<NamePresenter>(NamePresenter);
```
