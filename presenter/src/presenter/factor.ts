import { Constructor } from '../types/interface';
import { container } from '..';

export class PresenterFactor {
  static get<P>(p: Constructor<P>) {
    return container.resolve<P>(p);
  }
}
