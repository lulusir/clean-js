export function uniqueID() {
  function chr4() {
    return Math.random().toString(16).slice(-4);
  }
  return `${
    chr4() + chr4()
  }-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;
}

export class IDPool {
  private static instance: IDPool;

  static getInstance() {
    if (!IDPool.instance) {
      IDPool.instance = new IDPool();
    }
    return IDPool.instance;
  }

  private _pool: string[] = [];

  uniqueID() {
    let id = uniqueID();
    while (this._pool.includes(id)) {
      id = uniqueID();
    }
    this._pool.push(id);
    return id;
  }
}
