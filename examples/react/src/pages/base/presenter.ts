import { Presenter, injectable } from '@clean-js/presenter';

interface IViewState {
  loading: boolean;
  name: string;
}

@injectable()
export class NamePresenter extends Presenter<IViewState> {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: 'lujs',
    };
  }

  changeName() {
    this.setState((s) => {
      s.name += '!';
    }); // api of set model state
    this.updateView(); // api of update view
  }
}
