import React from 'react';
import { usePresenter } from '@clean-js/react-presenter';
import { BaseTablePresenter } from './table.presenter';

export const demo = () => {
  const { presenter, state } = usePresenter(BaseTablePresenter);
  return (
    <Table
      loading={state.loading}
      columns={state.columns}
      pagination={state.pagination}
      dataSource={state.data}
      onChange={(p) => {
        presenter.onPageChange?.(p);
      }}
    />
  );
};
