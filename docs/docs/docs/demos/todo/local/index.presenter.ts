import { Presenter, injectable } from '@clean-js/presenter';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
/**
 * 定义页面需要展示的内容
 * loading
 * 三种类型的Todos
 */

interface IViewState {
  loading: boolean;
  data: Todo[];
}

@injectable()
export class TodoPresenter extends Presenter<IViewState> {
  constructor(public service: TodoService) {
    super();
    this.state = { data: [], loading: false };
  }

  showLoading() {
    this.setState((s) => {
      s.loading = true;
    });
  }

  hideLoading() {
    this.setState((s) => {
      s.loading = false;
    });
  }

  // 添加一个todo，
  add(content: string) {
    this.setState((s) => {
      s.data.push({ content, id: Math.random(), status: 'default' });
    });

    this.save();
  }

  async save() {
    this.showLoading();

    await this.service.saveList(this.state.data);

    this.hideLoading();
  }

  async initTotoList() {
    this.showLoading();

    const list = await this.service.getList();
    this.setState((s) => {
      s.data = list;
    });

    this.hideLoading();
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

    this.save();
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

    this.save();
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
