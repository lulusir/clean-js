export interface Todo {
  status: 'done' | 'default' | 'delete';

  id: number;

  content: string;
}
