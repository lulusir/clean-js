---
nav:
  title: API
  path: /api
  order: 4
---

## redux-devtool

1. 安装chrome插件redux-devtool
2. 开启devtool
```typescript
import { entry } from '@clean-js/presenter';

if (isLocal) {
  entry.showDevtool() // 开启devtool
}
```
3. log
```typescript
  if (isLocal) {
    entry.showLog() // 开启log，通过console.log输出日志，可以用于小程序环境
  }
```