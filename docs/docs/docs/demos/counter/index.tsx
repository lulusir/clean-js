import React from 'react';

import { usePresenter } from '@clean-js/react-presenter';

import { Presenter } from '@clean-js/presenter';

interface IViewState {
  count: number;
}

class CounterPresenter extends Presenter<IViewState> {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  increment = () => {
    this.setState((s) => {
      s.count += 1;
    });
  };

  decrement = () => {
    this.setState((s) => {
      s.count -= 1;
    });
  };
}

const Counter = () => {
  const { presenter, state } = usePresenter(CounterPresenter);
  return (
    <div>
      <p>{state.count}</p>
      <button
        onClick={() => {
          presenter.increment();
        }}
      >
        increment
      </button>
      <button
        onClick={() => {
          presenter.decrement();
        }}
      >
        decrement
      </button>
    </div>
  );
};

export default Counter;
