---
nav:
  title: 介绍
  path: /introduction
  order: 1
group:
  path: /getting-started
  title: 快速上手
  order: 1
---

## 快速上手

## install

```
npm install @clean-js/presenter @clean-js/react-presenter --save
```

or

```
yarn add @clean-js/presenter @clean-js/react-presenter
```



## Presenter

```typescript | pure
interface IViewState {
  loading: boolean;
  name: string
}

@injectable()
export class NamePresenter extends Presenter<IViewState> {
  constructor(protected readonly model: OrderModel) {
    super();
    this.state = {
      loading: false,
      name: 'lujs'
    }
  }

  changeName() {
    this.setState('aha'); // api of set model state
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
