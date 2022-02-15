---
hero:
  title: @clean-js/presenter
  desc: 使用mvp的方式组织代码，实现整洁架构
  actions:
    - text: 快速上手
      link: /getting-started

---

## 整洁架构

- 独立于框架。支持 vue react
- 可测试。 业务逻辑方便测试
- 独立于 UI。
- 依赖单向，外层依赖内层，内层不知道外层

 <img src="https://lulusir.github.io/mvp-docs/CleanArchitecture.jpg" width = "600"  alt="整洁架构" align=center />

来源于 Bob 大叔的一篇[文章](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## 目的

为了进一步实现整洁架构，使用 mvp 的方式组织你的前端代码，让项目更加清晰

<img src="https://lulusir.github.io/mvp-docs/mvp.png" width = "600"  alt="mvp" align=center />


- View，一般是 react，vue 之类的视图层，它显示数据，并将事件绑定到 Presenter

- Presenter, 提供方法和 ViewState 给到 View

- service 实现我们的业务逻辑
