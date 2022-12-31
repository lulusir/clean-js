<h1 align = "center">@clean-js/presenter</h1>

<div align="center">

![NPM version](https://img.shields.io/npm/v/@clean-js/presenter.svg?style=flat)
![Gzip size](https://img.badgesize.io/https:/unpkg.com/@clean-js/presenter/dist/index.js?label=gzip%20size&compression=gzip)
![GitHub](https://img.shields.io/npm/l/@clean-js/presenter)
![Coverage line](https://raw.githubusercontent.com/lulusir/mvp/main/coverage/badge-lines.svg)

</div>

[Docs](https://lulusir.github.io/clean-js/)



<h2 align = "center"> 目的</h2>

为了进一步实现整洁架构，使用 mvp 的方式组织你的前端代码，让项目更加清晰

<img src="https://lulusir.github.io/clean-js/mvp.png" width = "600"  alt="mvp" align=center />

- ViewState，一般是要在界面上显示需要的数据，或者临时数据

- View，一般是 react，vue 之类的视图层，它显示数据，并将事件绑定到 Presenter

- Presenter, 提供方法和 ViewState 给到 View
- service 实现业务逻辑, 为Presenter提供服务

# 快速上手

## install

```
npm install @clean-js/presenter @clean-js/react-presenter --save
```

or

```
yarn add @clean-js/presenter @clean-js/react-presenter
```


## Presenter

```typescript
import { Presenter, injectable } from '@clean-js/presenter';

interface IViewState {
  loading: boolean;
  name: string;
}

@injectable()
export class NamePresenter extends Presenter<IViewState> {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: 'lujs',
    };
  }

  changeName() {
    this.setState((s) => {
      s.name += '!';
    });
  }
}
```

## View

```typescript | pure
import React from 'react';

import { usePresenter } from '@clean-js/react-presenter';
import { NamePresenter } from './presenter';

const Name = () => {
  const { presenter, state } = usePresenter(NamePresenter);
  return (
    <div>
      <p>name: {state.name}</p>
      <button
        onClick={() => {
          presenter.changeName();
        }}
      >
        hi
      </button>
    </div>
  );
};

export default Name;
```

## tsconfig.json

设置 tsconfig.json

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```
