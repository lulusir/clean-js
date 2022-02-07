import { Model } from '@clean-js/presenter';
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

export class TodoModel extends Model<IViewState> {
  constructor() {
    super();
    this.state = { loading: false, todos: [], doneTodos: [], deleteTodos: [] };
  }
}
