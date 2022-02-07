import React, { useRef } from 'react';

import { Model, Presenter, injectable } from '@clean-js/presenter';
import { Provider, usePresenterContext } from '@lujs/react-mvp-adaptor';

class M extends Model<{ name: string; obj: Record<any, any> }> {
  constructor() {
    super();
    this.state = {
      name: 'lujs',
      obj: {},
    };
  }
}

@injectable()
class P extends Presenter<M> {
  constructor(private model: M) {
    super();
  }

  changeName() {
    this.model.setState((s) => {
      s.name += '!';
    });
  }

  changeNameSameValue() {
    this.model.setState((s) => {
      s.name = 'lujs';
    });
  }

  changeNameSameValueObj() {
    this.model.setState((s) => {
      s.obj = {};
    });
  }

  changeNameWith(obj: M['state']) {
    this.model.setState(obj);
  }
}

const ComA = () => {
  const { state } = usePresenterContext(P);
  return (
    <div>
      <div data-testid="name">{state.name}</div>
    </div>
  );
};

const ComB = () => {
  const { presenter } = usePresenterContext(P);
  return (
    <div>
      <button
        data-testid="change"
        onClick={() => {
          presenter.changeName();
          presenter.updateView();
        }}
      >
        change name
      </button>
    </div>
  );
};

const ComC = () => {
  const ref = useRef(0);
  ref.current += 1;
  return <div data-testid="ComC-count">{ref.current}</div>;
};

const ComD = () => {
  const ref = useRef(0);
  ref.current += 1;
  usePresenterContext(P);
  return <div data-testid="ComD-count">{ref.current}</div>;
};

const IndexPage = () => (
  <Provider Presenter={P}>
    <ComA></ComA>
    <ComB></ComB>
    <ComC></ComC>
    <ComD></ComD>
  </Provider>
);

export default IndexPage;
