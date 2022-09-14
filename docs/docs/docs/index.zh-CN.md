---
hero:
  title: @clean-js
  desc: 使用clean-js织代码，实现整洁架构


---
## clean-js
一个包含状态库、IOC容器的辅助库
- 简单
- 轻量
- 方便测试
## 功能  

clean-js做了什么？

1. 提供presenter的约束，约束视图状态和更新的方式；
2. 提供视图devtool（redux-devtool/log）
3. 提供适配器，适配react/vue/...
4. 提供IOC容器，可以实现依赖注入
5. 常用的presenter模式，比如table
   
  

##  Presenter

clean-js使用类似 mvp 的方式组织前端代码，让项目更加清晰

<img src="https://lulusir.github.io/clean-js/mvp.png" width = "600"  alt="mvp" align=center />


- View，一般是 react，vue 之类的视图层，它显示数据，并将事件绑定到 Presenter

- Presenter, 提供方法和 ViewState 给到 View

- service 实现我们的业务逻辑


Todo：
1. 添加基础设施层的通用依赖接口：如 HTTP Bridge
2. 代码生成器：openapi自动生成http service
3. 丰富常用的presenter模式，snippets
4. 欢迎一起来建设