import { container } from '@clean-js/presenter';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { Constructor, H } from './types/interface';

// type IViewState<P> = ReturnType<H<P>['state']>;

export type IUsePresenterOptions = {
  registry?: { token: any; useClass: Constructor<any> }[];
};

export const DefaultUsePresenterOptions: IUsePresenterOptions = Object.freeze({
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
  const opt = useMemo(
    () => ({
      ...DefaultUsePresenterOptions,
      ...options,
    }),
    [options],
  );

  const presenter = useMemo(() => getInstance<P>(Cls, opt), [Cls, opt]);

  const state = useSyncExternalStore(
    (...args) => {
      const { unsubscribe } = presenter.subscribe(...args);
      return unsubscribe;
    },
    () => presenter.state,
  );

  useEffect(() => {
    const p = presenter;
    p.__init();
    return () => {
      p?.__destroy();
    };
  }, []);

  return {
    presenter,
    state,
  };
}
