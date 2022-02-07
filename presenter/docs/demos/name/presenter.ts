import { Presenter, injectable } from '@clean-js/presenter';
import { NameModel } from './model';

@injectable()
export class NamePresenter extends Presenter<NameModel> {
  constructor(protected model: NameModel) {
    super();
  }

  changeName() {
    this.model.setState((s) => {
      s.name += '!';
    }); // api of set model state
    this.updateView(); // api of update view
  }
}
