import { container } from '@clean-js/presenter';
import { useEffect, useRef, useState } from 'react';
import { Constructor, H } from './types/interface';

type IViewState<P> = ReturnType<H<P>['getState']>;

export type IUsePresenterOptions = {
  autoUpdate?: boolean;
  registry?: { token: any; useClass: Constructor<any> }[];
};

export const DefaultUsePresenterOptions: IUsePresenterOptions = Object.freeze({
  autoUpdate: true,
  registry: [],
});

const getInstance = <P>(
  Cls: Constructor<H<P>>,
  options?: { registry?: { token: any; useClass: Constructor<any> }[] },
) => {
  if (options?.registry?.length) {
    options.registry.forEach((v) => {
      container.register(v.token, { useClass: v.useClass });
    });
  }
  return container.resolve(Cls);
};

export function usePresenter<P>(
  Cls: Constructor<H<P>>,
  options = DefaultUsePresenterOptions,
) {
  const opt = {
    ...DefaultUsePresenterOptions,
    ...options,
  };

  const ref = useRef(getInstance<P>(Cls, opt));

  const [state, setState] = useState<IViewState<P>>(ref.current.state);

  useEffect(() => {
    const p = ref.current;
    const oldUpdateView = p.updateView;
    p.updateView = () => {
      setState((s) => {
        const n = p.state;
        return n;
      });
    };
    p.__init();
    let unsubscribe: () => void | undefined;
    if (opt.autoUpdate) {
      unsubscribe = p.__useAutoUpdate().unsubscribe;
    }

    return () => {
      p.updateView = oldUpdateView;
      p?.__destroy();
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const presenter = ref.current;
  // const state = presenter.getState() as ReturnType<H<P>['getState']>;

  return {
    presenter,
    state,
  };
}
