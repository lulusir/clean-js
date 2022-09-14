/* eslint-disable no-new */
import { injectable } from '@clean-js/presenter';
import { HttpStore, LocalStore, Store } from './store';
import { Todo } from './todo.entity';

@injectable()
export class TodoService {
  constructor(public store: LocalStore) {}

  getList() {
    return this.store.getList();
  }

  saveList(todos: Todo[]) {
    return this.store.saveList(todos);
  }
}
