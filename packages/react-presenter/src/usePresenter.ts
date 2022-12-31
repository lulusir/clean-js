import { container } from '@clean-js/presenter';
import { useEffect, useMemo } from 'react';
// import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector';
import { Constructor, H } from './types/interface';

type IViewState<P> = H<P>['state'];

type EqualityFn<State> = (a: State, b: State) => boolean;

type SelectorFn<State = unknown> = (s: State) => any;

const defaultEqualityFn: EqualityFn<any> = (a, b) => Object.is(a, b);

const defaultSelector: SelectorFn<any> = (s) => s;

export type IUsePresenterOptions<State = unknown> = {
  registry?: { token: any; useClass: Constructor<any> }[];
  selector?: SelectorFn<State>;
  equalityFn?: EqualityFn<State>;
};

export const DefaultUsePresenterOptions: IUsePresenterOptions = Object.freeze({
  registry: [],
});

const getInstance = <P>(
  Cls: Constructor<H<P>>,
  options?: IUsePresenterOptions<IViewState<P>>,
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
  options: IUsePresenterOptions<IViewState<P>> = DefaultUsePresenterOptions,
) {
  const presenter = useMemo(() => {
    const opt = {
      ...DefaultUsePresenterOptions,
      ...options,
    };
    return getInstance<P>(Cls, opt);
  }, []);

  // const state = useSyncExternalStore(
  //   (...args) => {
  //     const { unsubscribe } = presenter.subscribe(...args);
  //     return unsubscribe;
  //   },
  //   () => presenter.state,
  // );

  useSyncExternalStoreWithSelector(
    (...args) => {
      const { unsubscribe } = presenter.subscribe(...args);
      return unsubscribe;
    },
    () => presenter.state,
    () => presenter.state,
    options.selector || defaultSelector,
    options.equalityFn || defaultEqualityFn,
  );

  useEffect(() => {
    const p = presenter;
    p.__init();
    p.mount();
    return () => {
      p.unmount();
      p?.__destroy();
    };
  }, []);

  return {
    presenter,
    p: presenter,
    state: presenter.state as IViewState<P>,
    s: presenter.state as IViewState<P>,
  };
}
