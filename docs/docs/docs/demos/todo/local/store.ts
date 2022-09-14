import { Todo } from './todo.entity';

const sleep = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

export interface Store {
  getList(): Promise<Todo[]>;

  saveList(todos: Todo[]): Promise<void>;
}

export class LocalStore implements Store {
  static key = 'todo';

  async getList(): Promise<Todo[]> {
    await sleep();
    const v = localStorage.getItem(LocalStore.key);
    if (v) {
      const list = JSON.parse(v) as Todo[];
      return list;
    }
    return [];
  }

  async saveList(todos: Todo[]): Promise<void> {
    await sleep();

    const v = JSON.stringify(todos);
    localStorage.setItem(LocalStore.key, v);
    return undefined;
  }
}

export class HttpStore implements Store {
  static key = 'todo';

  async getList(): Promise<Todo[]> {
    await sleep();

    // 这里模拟HTTP接口返回数据
    return [
      {
        content: 'content',
        id: 0,
        status: 'default',
      },
    ];
  }

  async saveList(todos: Todo[]): Promise<void> {
    await sleep();
    // 这里模拟HTTP接口保存数据
    return undefined;
  }
}
