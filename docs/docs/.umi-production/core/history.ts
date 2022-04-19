// @ts-nocheck
import { createBrowserHistory, History } from '/Users/lujunsheng/myOwnX/clean-js/common/temp/node_modules/.pnpm/@umijs+runtime@3.5.23_react@16.14.0/node_modules/@umijs/runtime';

let options = {
  "basename": "/clean-js/"
};
if ((<any>window).routerBase) {
  options.basename = (<any>window).routerBase;
}

// remove initial history because of ssr
let history: History = process.env.__IS_SERVER ? null : createBrowserHistory(options);
export const createHistory = (hotReload = false) => {
  if (!hotReload) {
    history = createBrowserHistory(options);
  }

  return history;
};

export { history };
