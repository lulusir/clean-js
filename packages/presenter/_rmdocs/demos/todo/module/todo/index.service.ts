import { injectable } from '@clean-js/presenter';
import { Todo } from './todo.entity';

const delay = (cb: () => void, time = 1) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(cb());
    }, time * 1000);
  });

export class TodoService {
  list: Todo[] = [];

  addTodo(content: string) {
    return delay(() => {
      const todo = new Todo(content);
      this.list.push(todo);
    });
  }

  init() {
    this.addTodo('todo 1');
  }

  initWithLen(len: number) {
    return Promise.all(
      Array(len)
        .fill('')
        .map((_, i) => this.addTodo(`todo ${i}`)),
    );
  }

  finish(id: string) {
    return delay(() => {
      this.list.forEach((v) => {
        if (v.id === id) {
          v.finish();
        }
      });
    });
  }

  finisHalf() {
    const p: Promise<any>[] = [];
    this.defaultList().forEach((v, i) => {
      if (i % 2 === 0) {
        p.push(this.finish(v.id));
      }
    });
    return Promise.all(p);
  }

  defaultList() {
    return this.list.filter((v) => v.status === 'default').map(this.convert);
  }

  doneList() {
    return this.list.filter((v) => v.status === 'done').map(this.convert);
  }

  deleteList() {
    return this.list.filter((v) => v.status === 'delete').map(this.convert);
  }

  convert(todo: Todo) {
    return {
      content: todo.content,
      id: todo.id,
      status: todo.status,
    };
  }
}
