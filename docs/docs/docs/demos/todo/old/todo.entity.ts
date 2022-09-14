// 每个Todo都有自己的内容、状态、id

export class Todo {
  status: 'done' | 'default' | 'delete' = 'default';

  constructor(public content: string, public id: number) {}

  finish() {
    if (this.status === 'default') {
      this.status = 'done';
    } else if (this.status === 'done') {
      this.status = 'delete';
    }
  }

  setContent(s: string) {
    this.content = s;
  }
}
