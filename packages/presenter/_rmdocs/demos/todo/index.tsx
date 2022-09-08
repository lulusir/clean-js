import React, { useEffect, useRef } from 'react';
import { Spin } from 'antd';

import { usePresenter } from '@clean-js/react-presenter';
import { TodoPresenter } from './module/todo/index.presenter';

const Index = () => {
  const refInput = useRef<HTMLInputElement>(null);
  const { presenter, state } = usePresenter<TodoPresenter>(TodoPresenter);

  useEffect(() => {
    presenter.initTotoList();
  }, []);

  return (
    <Spin spinning={state.loading}>
      {state.loading && 'loading'}
      <div style={{ paddingLeft: '40px', marginBottom: '20px' }}>
        <input type="text" ref={refInput} />
        <button
          style={{ marginLeft: '20px' }}
          type="button"
          onClick={() => {
            if (refInput.current) {
              const content = refInput.current.value;
              if (content) {
                presenter.addTodo(content);
              }
            }
          }}
        >
          add todo
        </button>
      </div>
      <button
        onClick={() => {
          presenter.finishHalf();
        }}
      >
        finish half
      </button>
      <ul>
        default List:
        {state.todos.map((v) => (
          <li key={v.id}>
            {v.content} status: {v.status}
            <button
              style={{ marginLeft: '20px' }}
              type="button"
              onClick={() => {
                presenter.finish(v.id);
              }}
            >
              finish
            </button>
          </li>
        ))}
      </ul>

      <ul>
        done List:
        {state.doneTodos.map((v) => (
          <li key={v.id}>
            {v.content} status: {v.status}
            <button
              style={{ marginLeft: '20px' }}
              type="button"
              onClick={() => {
                presenter.finish(v.id);
              }}
            >
              finish
            </button>
          </li>
        ))}
      </ul>

      <ul>
        delete List:
        {state.deleteTodos.map((v) => (
          <li key={v.id}>
            <del>
              {v.content} status: {v.status}
            </del>
          </li>
        ))}
      </ul>
    </Spin>
  );
};

export default () => <Index />;
