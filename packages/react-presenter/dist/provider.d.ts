import { ReactNode } from 'react';
import { Constructor, H } from './types/interface';
import { IUsePresenterOptions } from './usePresenter';
interface PresenterContext<P> {
    presenter: H<P>;
    state: H<P>['state'];
}
declare type PresenterConstructor<P> = Constructor<H<P>>;
interface ProviderProps<P> {
    children: ReactNode;
    Presenter: PresenterConstructor<P>;
    autoUpdate?: IUsePresenterOptions['autoUpdate'];
}
export declare function Provider<P>({ children, Presenter, autoUpdate, }: ProviderProps<P>): JSX.Element;
export declare function usePresenterContext<P>(Presenter: PresenterConstructor<P>): PresenterContext<P>;
export {};
