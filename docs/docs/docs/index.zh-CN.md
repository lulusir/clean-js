---
hero:
  title: @clean-js/presenter
  desc: 使用mvp的方式组织代码，实现整洁架构
  actions:
    - text: 快速上手
      link: /getting-started

---
## 这是什么？
围绕整洁架构落地的辅助库, 包含状态库，IOC容器
## 功能  

clean-js做了什么？

1. 提供presenter的约束，约束视图状态和更新的方式；
2. 提供视图devtool（redux-devtool/log）
3. 提供适配器，适配react/vue/...
4. 提供IOC容器，可以实现依赖注入
5. 常用的presenter模式，比如table
   
Todo：
1. 添加基础设施层的通用依赖接口：如 HTTP Bridge
2. 代码生成器：openapi自动生成http service
3. 丰富常用的presenter模式
  

## 整洁架构

- 独立于框架。支持 vue react
- 可测试。 业务逻辑方便测试
- 独立于 UI。
- 依赖单向，外层依赖内层，内层不知道外层

 <img src="https://lulusir.github.io/clean-js/CleanArchitecture.jpg" width = "600"  alt="整洁架构" align=center />

来源于 Bob 大叔的一篇[文章](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)



## 分层

<img src="https://lulusir.github.io/clean-js/clean-js.png" width = "600"  alt="clean" align=center />  

- Infrastructures 基础设施层： 一般是Http工具，native功能（jsBridge）等提供基础能力的层级
- Service: 具体的业务逻辑，也就是Bob大叔提到的Use case和Entity, 因为大多数前端应用都比较简单，有需要的话可以在进一步细分
- Presenter：提供方法和 State 给到 View，提供视图层需要的方法和数据
- Adaptor : 绑定Presenter到具体的视图框架（React/Vue/...）


##  Presenter

clean-js使用类似 mvp 的方式组织前端代码，让项目更加清晰

<img src="https://lulusir.github.io/clean-js/mvp.png" width = "600"  alt="mvp" align=center />


- View，一般是 react，vue 之类的视图层，它显示数据，并将事件绑定到 Presenter

- Presenter, 提供方法和 ViewState 给到 View

- service 实现我们的业务逻辑