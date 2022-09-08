import { devtools } from '../utils/devtool';

class Entry {
  useDevTool = false;

  init({ useDevTool }: { useDevTool: boolean }) {
    this.useDevTool = useDevTool;
    devtools.connect();
  }

  showDevtool() {
    this.useDevTool = true;
    devtools.connect();
  }

  showLog() {
    devtools.showLog = true;
  }
}

export const entry = new Entry();
