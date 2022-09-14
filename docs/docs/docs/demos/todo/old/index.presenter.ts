import { Presenter, injectable } from '@clean-js/presenter';
import { List } from 'antd';
import { TodoService } from './index.service';
import { Todo } from './todo.entity';
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
    this.state = { loading: false, data: [] };
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
  async add(content: string) {
    this.showLoading();
    const { data } = await this.service.add(content);
    this.setState((s) => {
      s.data.push(new Todo(data.content, data.id));
    });
    this.hideLoading();
  }

  async initTotoList() {
    this.showLoading();
    await this.service.initWithLen(10);
    this.hideLoading();
  }

  async finish(id: number) {
    this.showLoading();
    const { data } = await this.service.finish(id);
    if (data === 'success') {
      this.setState((s) => {
        s.data.find((v) => v.id === id)?.finish();
      });
    }
    this.hideLoading();
  }

  async snapFingers() {
    this.defaultList().forEach((v, i) => {
      if (i % 2 === 0) {
        v.finish();
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
