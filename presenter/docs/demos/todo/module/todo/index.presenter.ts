import { Presenter, injectable, entry } from '@clean-js/presenter';
import { TodoModel } from './index.model';
import { TodoService } from './index.service';

entry.init({ useDevTool: true });
@injectable()
export class TodoPresenter extends Presenter<TodoModel> {
  constructor(protected model: TodoModel, private service: TodoService) {
    super();
  }

  async initTotoList() {
    this.switchLoading();
    await this.service.initWithLen(10);
    this.switchLoading();
    this.updateTodoList();
  }

  updateTodoList() {
    this.model.setState((s) => {
      s.todos = this.service.defaultList();
      s.deleteTodos = this.service.deleteList();
      s.doneTodos = this.service.doneList();
    });

    this.updateView();
  }

  switchLoading() {
    this.model.setState((s) => {
      s.loading = !s.loading;
    });
    this.updateView();
  }

  async addTodo(content: string) {
    this.switchLoading();
    await this.service.addTodo(content);
    this.switchLoading();
    this.updateTodoList();
  }

  async finish(id: string) {
    this.switchLoading();
    await this.service.finish(id);
    this.switchLoading();
    this.updateTodoList();
  }

  async finishHalf() {
    this.switchLoading();
    await this.service.finisHalf();
    this.switchLoading();
    this.updateTodoList();
  }
}
