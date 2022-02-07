import { devtools } from '../utils/devtool';

class Entry {
  useDevTool = false;

  init({ useDevTool }: { useDevTool: boolean }) {
    this.useDevTool = useDevTool;
    devtools.connect();
  }
}

export const entry = new Entry();
