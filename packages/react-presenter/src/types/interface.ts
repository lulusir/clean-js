import { Presenter } from '@clean-js/presenter';

export interface Constructor<T> {
  new (...args: any[]): T;
}

export type H<P> = P extends Presenter<any> ? P : Presenter<any>;
