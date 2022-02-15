import React from 'react';

import { usePresenter } from '@clean-js/react-presenter';
import { NamePresenter } from './presenter';

const Name = () => {
  const { presenter, state } = usePresenter<NamePresenter>(NamePresenter);
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
