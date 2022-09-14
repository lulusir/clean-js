import { Presenter, injectable } from '@clean-js/presenter';
import { Todo } from './todo.entity';
/**
 * 定义页面需要展示的内容
 * loading
 * 三种类型的Todos
 */

interface IViewState {
  data: Todo[];
}

export class TodoPresenter extends Presenter<IViewState> {
  constructor() {
    super();
    this.state = { data: [] };
  }

  // 添加一个todo，
  add(content: string) {
    this.setState((s) => {
      s.data.push({ content, id: Math.random(), status: 'default' });
    });
  }

  initTotoList() {
    for (let i = 0; i < 3; i++) {
      const content = `content ${i}`;
      this.add(content);
    }
  }

  finish(id: number) {
    this.setState((s) => {
      const t = s.data.find((v) => v.id === id);
      if (t) {
        if (t.status === 'default') {
          t.status = 'done';
        } else if (t.status === 'done') {
          t.status = 'delete';
        }
      }
    });
  }

  /**
   * 打个响指 完成一半
   */
  snapFingers() {
    this.defaultList().forEach((v, i) => {
      if (i % 2 === 0) {
        this.finish(v.id);
      }
    });
  }

  defaultList() {
    return this.state.data.filter((v) => v.status === 'default');
  }

  doneList() {
    return this.state.data.filter((v) => v.status === 'done');
  }

  deleteList() {
    return this.state.data.filter((v) => v.status === 'delete');
  }
}
