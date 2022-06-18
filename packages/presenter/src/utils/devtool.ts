import { entry } from '../entry/entry';

const colors = {
  prevState: '#FFC18F',
  nextState: '#FFD666',
};
class Devtool {
  name = '@clean-js/presenter';

  store: Record<any, any> = {};

  instance: any = null;

  showLog: boolean = false;

  connect() {
    // console.log(config.useDevTool, 'extension');
    // eslint-disable-next-line no-underscore-dangle
    const extension = (window as any)?.__REDUX_DEVTOOLS_EXTENSION__;

    if (!extension) {
      console.warn('place install redux devtool');
      return;
    }

    if (!entry.useDevTool) {
      return;
    }

    this.instance = extension.connect({ name: this.name });
  }

  init(state: any, modelName: string) {
    if (!entry.useDevTool) {
      return;
    }

    if (this.instance === null) {
      return;
    }

    this.store[modelName] = state;
    this.instance.send(
      {
        type: `[${modelName}]:initState`,
        updatedAt: new Date().toLocaleString(),
      },
      this.store,
    );
  }

  logPrev(state: any, color: string) {
    const styles = `color: ${color}; font-weight: bold`;

    console.log('%c PrevState    ', styles, state);
  }

  logNext(state: any, color: string) {
    const styles = `color: ${color}; font-weight: bold`;

    console.log('%c NextState    ', styles, state);
  }

  log(state: any, modelName: string) {
    console.group('[Model]: ', modelName);
    this.logPrev(this.store[modelName], colors.prevState);
    this.logNext(state, colors.nextState);
    console.groupEnd();
  }

  send(state: any, modelName: string) {
    if (this.showLog) {
      this.log(state, modelName);
    }

    this.store[modelName] = state;

    if (!entry.useDevTool) {
      return;
    }

    // console.log(this.instance, state, modelName, 'ins');
    if (this.instance === null) {
      return;
    }

    this.instance.send(
      {
        type: `[${modelName}]:setState`,
        updatedAt: new Date().toLocaleString(),
      },
      this.store,
    );
  }

  remove(modelName: string) {
    if (!entry.useDevTool) {
      return;
    }

    if (this.instance === null) {
      return;
    }

    delete this.store[modelName];

    this.instance.send(
      {
        type: `[${modelName}]:removeModel`,
        updatedAt: new Date().toLocaleString(),
      },
      this.store,
    );
  }
}

export const devtools = new Devtool();
