import React, { useEffect, useRef } from 'react';
import { Spin, List, Button, Space } from 'antd';
import { usePresenter } from '@clean-js/react-presenter';
import { TodoPresenter } from './index.presenter';

const Index = () => {
  const refInput = useRef<HTMLInputElement>(null);
  const { presenter } = usePresenter(TodoPresenter);

  useEffect(() => {
    presenter.initTotoList();
  }, []);

  return (
    <Spin spinning={false}>
      <div style={{ marginBottom: '20px' }}>
        <input type="text" ref={refInput} />
        <Button
          style={{ marginLeft: '20px' }}
          onClick={() => {
            if (refInput.current) {
              const content = refInput.current.value;
              if (content) {
                presenter.add(content);
              }
            }
          }}
        >
          add todo
        </Button>
        <Button
          style={{ marginLeft: '20px' }}
          onClick={() => {
            presenter.snapFingers();
          }}
        >
          Snap your Fingers
        </Button>
      </div>

      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <List
          size="small"
          header={'Todo list'}
          bordered
          dataSource={presenter.defaultList()}
          renderItem={(item) => (
            <List.Item>
              {item.content}
              <Button
                style={{ marginLeft: '20px' }}
                onClick={() => {
                  presenter.finish(item.id);
                }}
              >
                finish
              </Button>
            </List.Item>
          )}
        />
        <List
          size="small"
          header={'Done list'}
          bordered
          dataSource={presenter.doneList()}
          renderItem={(item) => (
            <List.Item>
              {item.content}
              <Button
                danger
                style={{ marginLeft: '20px' }}
                onClick={() => {
                  presenter.finish(item.id);
                }}
              >
                delete
              </Button>
            </List.Item>
          )}
        />
        <List
          size="small"
          header={'Delete list'}
          bordered
          dataSource={presenter.deleteList()}
          renderItem={(item) => (
            <List.Item>
              <del>{item.content}</del>
            </List.Item>
          )}
        />
      </Space>
    </Spin>
  );
};

export default () => <Index />;
