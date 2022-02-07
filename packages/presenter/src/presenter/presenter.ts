// import cloneDeep from 'clone';
import EventEmitter from 'eventemitter3';
import produce, { freeze } from 'immer';
import { devtools } from '../utils/devtool';

const ModelAction = {
  modelChange: 'modelChange',
};

interface UpdateFn<S> {
  (state: S): void;
}

export abstract class Presenter<S> {
  private _state!: S;

  private __emitter = new EventEmitter();

  get state(): S {
    if (this._state === undefined) {
      throw Error('place defined state');
    }
    return this._state;
  }

  protected set state(s: S) {
    if (this._state === undefined) {
      this._state = freeze(s, true);
    } else {
      throw Error('please use setState');
    }
  }

  setState(fn: UpdateFn<S> | S): void {
    let newState: S;
    if (typeof fn === 'function') {
      newState = produce(this._state, fn as unknown as UpdateFn<S>);
    } else {
      newState = freeze(fn, true);
    }

    this._state = newState;

    devtools.send(this._state, this.constructor.name);

    this.__emitter.emit(ModelAction.modelChange, this._state);
  }

  /**
   * 通知状态更新
   * @param callback
   * @returns
   */
  subscribe(callback: (state: S) => void) {
    this.__emitter.on(ModelAction.modelChange, callback);
    return {
      unsubscribe: () => {
        this.__emitter.off(ModelAction.modelChange, callback);
      },
    };
  }

  // getState(): ModelType<M>['state'] {
  //   if (!this.model) {
  //     throw Error('Please inject Model');
  //   }
  //   return this.model.state;
  // }

  // get state() {
  //   return this.getState();
  // }

  // setState: ModelType<M>['setState'] = (data) => this.model.setState(data);

  updateView() {
    throw Error('Please use adapter to bind view');
  }

  __init() {
    devtools.init(this.state, this.constructor.name);
  }

  __destroy() {
    devtools.remove(this.constructor.name);
  }

  __useAutoUpdate() {
    const { unsubscribe } = this.subscribe(() => {
      this.updateView();
    });

    return {
      unsubscribe,
    };
  }
}
