---
nav:
  title: API
  path: /api
  order: 2
group:
  title: Dependency injection
  path: /di
  order: 2
---
# Dependency injection
## IOC and DI
IOC(控制翻转)是一种设计模式,目的为了更好的解耦，实现依赖倒置，DI（依赖注入）可以理解为IOC的一种实现方式

比如我有这个服务类NameService，需要在NamePresenter中使用,则需要在NamePresenter实例化 NameService，这样两个类就耦合在一起,最直观的例子就是在我们写单元测试的时候很难去mock NameService这个服务
```typescript | pure
export class NameService {
  getName() {
    // 假设从http请求获取名称
    return Promise.resolve('name')
  }
}

class NamePresenter {
    constructor() {
        this.nameService = new NameService()
    }
}
```

如果用IOC实现的话，就不需要在NamePresenter中实例化NameService了,至于初始化那个NameService完全由container控制

```typescript | pure
export class NameService {
  getName() {
    // 假设从http请求获取名称
    return Promise.resolve('name')
  }
}

class NamePresenter {
    constructor(@inject('service') public nameService: NameService) {}
}
```
这样我们写单元测试的时候,就可以随意切换NameService，比如下面的代码MockService是我们用来mock NameService的服务
```typescript
it('test', () => {
    container.register('service', { useClass: MockService });
    const presenter = container.resolve(NamePresenter);
    
    // presenter的nameService就会别切换为MockService
     
});
```




## usage
在我们的Presenter中要如何使用呢？

1. 需要在 constructor 声明需要注入的类
2. 用 injectable / singleton 装饰
3. injectable会自动注入依赖的类实例
4. singleton会自动注入依赖的类实例，同时初始化为一个单例对象，如果需要全局使用这个状态的话，可以用singleton装饰器；比如有一个全局的UserPresenter状态管理器，在各个页面都要用到

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



[Why IOC](https://www.google.com/search?q=why+ioc)


## Dependency injection API

| 参数       | 说明                                             | 类型 | 默认值 |
| ---------- | ------------------------------------------------ | ---- | ------ |
| injectable | 标注要使用依赖注入的类，在容器会自动注入对应的类 |      |        |
| singleton  | 单例版本，生成的实例都是单例模式                 |      |        |
| inject     | 用于注入接口                                     |      |        |

