/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */

import { usePresenter } from '@lujs/react-mvp-adaptor';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Presenter } from '..';

interface IViewState {
  loading: boolean;
}

class IndexPresenter extends Presenter<IViewState> {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  changeLoading = () => {
    this.setState((s) => {
      s.loading = !s.loading;
    });
  };
}

const IndexPage = () => {
  // @ts-ignore
  const { presenter, state } = usePresenter<IndexPresenter>(IndexPresenter);
  return (
    <div>
      <p data-testid="p"> {state.loading && 'loading'}</p>
      {/* @ts-ignore */}
      <button data-testid="change" onClick={presenter.changeLoading}>
        change
      </button>
    </div>
  );
};

it('test react render', () => {
  render(<IndexPage />);

  expect(screen.getByTestId('p')).not.toHaveTextContent('loading');
  userEvent.click(screen.getByTestId('change'));
  expect(screen.getByTestId('p')).toHaveTextContent('loading');
});
