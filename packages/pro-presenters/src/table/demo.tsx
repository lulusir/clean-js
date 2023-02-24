import React from 'react';
import { usePresenter } from '@clean-js/react-presenter';
import { BaseTablePresenter } from './table.presenter';

export const demo = () => {
  const { presenter, state } = usePresenter(BaseTablePresenter);

  useEffect(() => {
    presenter.setup(() => ({
      data: [],
      current: 1,
      pageSize: 1,
      total: 1,
    }));
  }, []);

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
