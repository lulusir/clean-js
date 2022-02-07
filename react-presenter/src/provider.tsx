import React, { ReactNode, useContext, useMemo } from 'react';
import { Constructor, H } from './types/interface';
import {
  DefaultUsePresenterOptions,
  IUsePresenterOptions,
  usePresenter,
} from './usePresenter';

/**
 * 每一个Presenter 只能有一个context
 */

interface PresenterContext<P> {
  presenter: H<P>;
  state: ReturnType<H<P>['getState']>;
}

type PresenterConstructor<P> = Constructor<H<P>>;

const contextMap = new WeakMap<
  PresenterConstructor<any>,
  React.Context<PresenterContext<any>>
>();

function getContext<P>(cls: PresenterConstructor<P>) {
  type ReturnCtx = React.Context<PresenterContext<P>>;
  const m = contextMap;

  let ctx: ReturnCtx | null;
  if (m.has(cls)) {
    ctx = m.get(cls) as ReturnCtx;
  } else {
    ctx = React.createContext<PresenterContext<P>>(null as any);
    m.set(cls, ctx);
  }

  return ctx;
}

interface ProviderProps<P> {
  children: ReactNode;
  Presenter: PresenterConstructor<P>;
  autoUpdate?: IUsePresenterOptions['autoUpdate'];
}

export function Provider<P>({
  children,
  Presenter,
  autoUpdate = DefaultUsePresenterOptions.autoUpdate,
}: ProviderProps<P>) {
  const ctxValue = usePresenter(Presenter, { autoUpdate });
  const context = useMemo(() => getContext(Presenter), [Presenter]);
  return <context.Provider value={ctxValue}>{children}</context.Provider>;
}

export function usePresenterContext<P>(Presenter: PresenterConstructor<P>) {
  const context = useMemo(() => getContext<P>(Presenter), [Presenter]);
  const ctx = useContext(context);
  return ctx;
}
