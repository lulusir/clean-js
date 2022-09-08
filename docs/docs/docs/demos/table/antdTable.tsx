import React, { useEffect, useState } from 'react';
import { usePresenter } from '@clean-js/react-presenter';
import {
  TablePresenter,
  AbsTableService,
  TableServiceToken,
} from '@routine-js/table';
import { Table, Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';

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
      data: [{ name: params.name ?? Math.random().toFixed(5) }],
      current: params.current,
      pageSize: params.pageSize,
      total: 100,
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  }
}

const Page = () => {
  const { presenter } = usePresenter<TablePresenter<Row, Params>>(
    TablePresenter,
    {
      registry: [{ token: TableServiceToken, useClass: MyService }],
    },
  );
  useEffect(() => {
    presenter.getTable();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
  ];

  const { pagination, data } = presenter.state;
  return (
    <div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={(values) => {
          presenter.updateTableParams(values);
          presenter.getTable();
        }}
        autoComplete="off"
      >
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            search
          </Button>

          <Button
            onClick={() => {
              presenter.resetTableParams();
              presenter.getTable();
            }}
          >
            reset
          </Button>
        </Form.Item>
      </Form>

      <Table
        loading={presenter.state.loading}
        columns={columns}
        pagination={{ ...pagination }}
        dataSource={data}
        onChange={(pagination) => {
          presenter.updateTablePagination(pagination);
          presenter.getTable();
        }}
      />
    </div>
  );
};

export default Page;
