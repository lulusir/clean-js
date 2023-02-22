---
nav:
  title: API
  path: /api
  order: 2
group:
  title: Presenter
  path: /presenter
  order: 1
---

# Presenter

> 提供方法和 State 给到 View

1. 约束，只有在setState方法才能修改state，无法通过this.state.xxx=xxx修改
2. setState修改以后会触发视图层更新，基于immer，在setSatate可以用immer的语法来修改状态
3. 通过注入泛型来约束state的内容
4. 可以通过redux-devtool来查看状态更新
  



## usage
- 通过setState更新数据，触发视图更新
```typescript | pure
import {  Presenter } from "@clean-js/presenter";

interface IViewState {
  loading: boolean;
}

const defaultState: () => IViewState = () => {
  return {
    loading: false,
  };
};

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

| 参数     | 说明                                                         | 类型       | 默认值 |
| -------- | ------------------------------------------------------------ | ---------- | ------ |
| state    | getter 返回 state                                            | IViewState |        |
| setState | 设置state，基于immer，在setSatate可以用immer的语法来修改状态 | IViewState |        |

## 生命周期
考虑了很久，还是决定不在Presenter添加生命周期的概念，Presenter只是一个单纯的状态和方法提供者。至于何时调用方法，应该写在组件里面，由调用者决定

#### PresenterFactor

Presenter 构造工厂

返回 Presenter 的实例化，在react以外也可以获取到presenter

```
const p = PresenterFactor.get<NamePresenter>(NamePresenter);
```


## 建议
1. 文件命名使用xxx.presenter.ts
2. 考虑清楚视图需要显示的state，不要把和视图无关的内容也放置到state
