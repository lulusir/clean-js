---
nav:
  title: API
  path: /api
  order: 1
---

# Presenter

> 提供方法和 State 给到 View

1. 约束，只有在setState方法才能修改state，无法通过this.state.xxx=xxx修改
2. setState修改以后会触发视图层更新
3. 通过注入泛型来约束state的内容
4. 可以通过redux-devtool来查看状态更新



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

| 参数     | 说明              | 类型       | 默认值 |
| -------- | ----------------- | ---------- | ------ |
| state    | getter 返回 state | IViewState |        |
| setState | 设置state         | IViewState |        |

#### PresenterFactor

Presenter 构造工厂

返回 Presenter 的实例化，在react以外也可以获取到presenter

```
const p = PresenterFactor.get<NamePresenter>(NamePresenter);
```


## 建议
1. 文件命名使用xxx.presenter.ts
2. 考虑清楚视图需要显示的state，不要把和视图无关的内容也放置到state
3. 