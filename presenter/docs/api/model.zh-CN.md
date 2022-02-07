---
nav:
  title: API
  path: /api
  order: 1
---

# Model

> 声明 UI 中需要的数据，提供更新状态的方法  
> 无法使用 setState 以外的方法更新 state，如 state.xxx = xxx

## usage

1. 声明 state 的类型，注入到 Model 中
2. 需要在 constructor 初始化默认数据

```typescript
import { Model } from '@clean-js/presenter';

interface IViewState {
  loading: boolean;
  name: string
}

export class NameModel extends Model<IViewState> {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: 'lujs'
    }
}

```

## model instance api

| 参数     | 说明                 | 类型                                       | 默认值    |
| -------- | -------------------- | ------------------------------------------ | --------- |
| state    | 一般是 ui 展示的数据 | any                                        | undefined |
| setState | 更新 state 的方法    | setState(fn: (state: S): void \| S): void; | undefined |
