import { Presenter, injectable } from '@clean-js/presenter';
import { TodoService } from './index.service';
import { Todo } from './todo.entity';

interface IViewState {
  loading: boolean;
  todos: {
    id: string;
    content: string;
    status: Todo['status'];
  }[];
  doneTodos: {
    id: string;
    content: string;
    status: Todo['status'];
  }[];
  deleteTodos: {
    id: string;
    content: string;
    status: Todo['status'];
  }[];
}

@injectable()
export class TodoPresenter extends Presenter<IViewState> {
  constructor(private service: TodoService) {
    super();
    this.state = { loading: false, todos: [], doneTodos: [], deleteTodos: [] };
  }

  async initTotoList() {
    this.showLoading();
    await this.service.initWithLen(10);
    this.hideLoading();
    this.updateTodoList();
  }

  updateTodoList() {
    this.setState((s) => {
      s.todos = this.service.defaultList();
      s.deleteTodos = this.service.deleteList();
      s.doneTodos = this.service.doneList();
    });
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

  async addTodo(content: string) {
    this.showLoading();
    await this.service.addTodo(content);
    this.hideLoading();
    this.updateTodoList();
  }

  async finish(id: string) {
    this.showLoading();
    await this.service.finish(id);
    this.hideLoading();
    this.updateTodoList();
  }

  async finishHalf() {
    this.showLoading();
    await this.service.finisHalf();
    this.hideLoading();
    this.updateTodoList();
  }
}
