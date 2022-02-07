---
nav:
  title: 快速上手
  order: 1
---

# 快速上手

## install

```
npm install @clean-js/presenter @lujs/react-mvp-adaptor --save
```

or

```
yarn add @clean-js/presenter @lujs/react-mvp-adaptor
```

## Model

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

## Presenter

```typescript
import { Presenter, injectable } from '@clean-js/presenter';
@injectable()
export class NamePresenter extends Presenter<NameModel> {
  constructor(protected readonly model: OrderModel) {
    super();
  }

  changeName() {
    this.setState('aha'); // api of set model state
    this.updateView(); // api of update view
  }
}
```

## View

```typescript | pure
const Name = () => {
  const { presenter, state } = usePresenter<NamePresenter>(NamePresenter);
  return (
    <div>
      name: {state.name}
      <button onClick={presenter.changeName}>change name</button>
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
