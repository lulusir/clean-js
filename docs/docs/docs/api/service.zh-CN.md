---
nav:
  title: API
  path: /api
  order: 2
---

# Service
- service 用来放置业务逻辑，建议用xxx.service.ts命名文件
- 为presenter注入服务
## usage

1. 需要在 constructor 声明需要注入的类
2. 用 injectable / singleton 装饰

```typescript | pure

// 具体的业务类
export  class NameService {
  getName() {
    return Promise.resolve('name')
  }
}
```
```typescript | pure
import { injectable, Presenter } from "@clean-js/presenter";
import { NameService } from './name.service.ts'

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
  constructor(public nameS: NameService) {
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

  getName() {
    this.showLoading()
    this.names.getName().finally(() => {
      this.hideLoading()
    })
  }
}
```

## IOC API

| 参数       | 说明                                             | 类型 | 默认值 |
| ---------- | ------------------------------------------------ | ---- | ------ |
| injectable | 标注要使用依赖注入的类，在容器会自动注入对应的类 |      |        |
| singleton  | 单例版本，生成的实例都是单例模式                 |      |        |
| inject     | 用于注入接口                                     |      |        |

[Why IOC](https://www.google.com/search?q=why+ioc)
