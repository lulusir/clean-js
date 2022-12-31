import { Todo } from './todo.entity';

// 用一个变量来维护id
let autoId = 0;

const delay = <T>(cb: () => T, time = 1) =>
  new Promise<{
    code: number;
    data: T;
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        data: cb(),
        code: 200,
      });
    }, time * 1000);
  });

// 接下来来实现Todo的增删改查
// 分别定义实现addTodo

export class TodoService {
  constructor() {}

  getList() {}

  // 模拟后端操作
  add(content: string) {
    return delay(() => {
      autoId += 1;
      return {
        content,
        id: autoId,
      };
    });
  }

  // 完成一条todo
  finish(id: number) {
    return delay(() => 'success');
  }

  delete(id: number) {}

  // init() {
  //   this.add('Todo 0');
  // }

  // initWithLen(len: number) {
  //   return Promise.all(
  //     Array(len)
  //       .fill('')
  //       .map((_, i) => this.add(`Todo ${i}`)),
  //   );
  // }
}
