/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */

export class IDPool {
  private static instance: IDPool;

  static getInstance() {
    if (!IDPool.instance) {
      IDPool.instance = new IDPool();
    }
    return IDPool.instance;
  }

  private _id = 0;

  uniqueID() {
    this._id += 1;
    return this._id.toString();
  }
}
