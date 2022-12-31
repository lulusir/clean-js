import EventEmitter from 'eventemitter3';
import produce, { freeze } from 'immer';
import { IDPool } from '../utils';
import { devtools } from '../utils/devtool';

const emitter = new EventEmitter();

interface UpdateFn<S> {
  (state: S): void;
}

export abstract class Presenter<S> {
  private _state!: S;

  private id = IDPool.getInstance().uniqueID();

  displayName = this.constructor.name;

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

    emitter.emit(this.id, this._state);
  }

  /**
   * 通知状态更新
   * @param callback
   * @returns
   */
  subscribe(callback: (state: S) => void) {
    emitter.on(this.id, callback);
    return {
      unsubscribe: () => {
        emitter.off(this.id, callback);
      },
    };
  }

  __init() {
    devtools.init(this.state, this.constructor.name);
  }

  __destroy() {
    devtools.remove(this.constructor.name);
  }
}
