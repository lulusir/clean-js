import React, { useState } from 'react';
import { usePresenter } from '@clean-js/react-presenter';
import { injectable } from '@clean-js/presenter';
import {
  TablePresenter,
  AbsTableService,
  TableServiceToken,
} from '@routine-js/table';

interface Row {
  name: string;
}
interface Params {
  name: string;
}
class MyService extends AbsTableService<Row, Params> {
  fetchTable(
    params: Partial<Params> & { current: number; pageSize: number },
  ): Promise<{
    data: Row[];
    current: number;
    pageSize: number;
    total: number;
  }> {
    const res = {
      data: [{ name: 'aloha' }],
      current: 1,
      pageSize: 1,
      total: 1,
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  }
}
@injectable()
class A {
  constructor(private s: MyService) {}
}

const Page = () => {
  const { presenter } = usePresenter<TablePresenter<Row, Params>>(
    TablePresenter,
    {
      registry: [{ token: TableServiceToken, useClass: MyService }],
    },
  );
  console.log(presenter);
  return (
    <div>
      <h1>table state</h1>
      <p>{JSON.stringify(presenter.state, null, 4)}</p>

      <button
        onClick={() => {
          presenter.getTable();
        }}
      >
        fetch table
      </button>
    </div>
  );
};

export default Page;
