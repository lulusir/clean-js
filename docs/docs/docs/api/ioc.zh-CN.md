---
nav:
  title: API
  path: /api
  order: 3
---

# IOC

> 使用 IOC 容器实现依赖注入

[Why IOC](https://www.google.com/search?q=why+ioc)

## usage

1. 需要在 constructor 声明需要注入的类
2. 用 injectable / singleton 装饰

```typescript | pure
import { Presenter, injectable, inject } from '@clean-js/presenter';

@injectable()
export class NamePresenter extends Presenter<NameModel> {
  constructor(protected model: NameModel, @inject('someService' service: IService)) {
    super();
  }

  changeName() {
    this.model.setState('aha'); // api of set model state
    this.updateView(); // api of update view
  }
}
```

## model instance api

| 参数       | 说明                                             | 类型 | 默认值 |
| ---------- | ------------------------------------------------ | ---- | ------ |
| injectable | 标注要使用依赖注入的类，在容器会自动注入对应的类 |      |        |
| singleton  | 单例版本，所注入的类都是单例模式                 |      |        |
| inject     | 用于注入接口                                     |      |        |
