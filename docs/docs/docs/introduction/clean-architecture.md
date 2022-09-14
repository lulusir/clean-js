---
nav:
  title: 介绍
  path: /introduction
  order: 1
group:
  path: /clean
  title: 整洁架构
  order: 2
---

## 整洁架构

- 独立于框架。支持 vue react
- 可测试。 业务逻辑方便测试
- 独立于 UI。
- 依赖单向，外层依赖内层，内层不知道外层

 <img src="https://lulusir.github.io/clean-js/CleanArchitecture.jpg" width = "600"  alt="整洁架构" align=center />

来源于 Bob 大叔的一篇[文章](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)



## 推荐分层架构

<img src="https://lulusir.github.io/clean-js/clean-js.png" width = "600"  alt="clean" align=center />  

- Infrastructures 基础设施层： 一般是Http工具，native功能（jsBridge）等提供基础能力的层级
- Service: 具体的业务逻辑，也就是Bob大叔提到的Use case和Entity, 因为大多数前端应用都比较简单，有需要的话可以在进一步细分
- Presenter：提供方法和 State 给到 View，提供视图层需要的方法和数据
- Adaptor : 绑定Presenter到具体的视图框架（React/Vue/...）


