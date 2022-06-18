import { Presenter, injectable ,entry} from '@clean-js/presenter';

entry.init({ useDevTool: true });
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
  }
}
