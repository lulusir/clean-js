/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import { Presenter, injectable, inject } from '@clean-js/presenter';
import { usePresenter } from './usePresenter';

interface IViewState {
  name: string;
  obj: Record<any, any>;
}

@injectable()
class P extends Presenter<IViewState> {
  constructor() {
    super();
    this.state = {
      name: 'lujs',
      obj: {},
    };
  }

  changeName() {
    console.log('change');
    this.setState((s) => {
      s.name += '!';
    });
  }

  changeNameSameValue() {
    this.setState((s) => {
      s.name = 'lujs';
    });
  }

  changeNameSameValueObj() {
    this.setState((s) => {
      s.obj = {};
    });
  }

  changeNameWith(obj: IViewState) {
    this.setState(obj);
  }
}
describe('UsePresenter', () => {
  it('updateView, when no change', async () => {
    const Component = defineComponent({
      setup() {
        const { presenter } = usePresenter<P>(P, { autoUpdate: false });
        return { presenter };
      },
      template: `
      <button @click="presenter.changeName()">changeName</button>
      <span>{{ presenter.state.name }}</span>
      <button @click="presenter.changeNameSameValue()">changeNameSameValue</button>
      `,
    });

    const wrapper = mount(Component);

    expect(wrapper.text()).toContain('lujs');
    expect(wrapper.text()).not.toContain('lujs!');

    wrapper.findAll('button')[0].trigger('click');
    await nextTick();
    expect(wrapper.text()).toContain('lujs!');
  });
});
