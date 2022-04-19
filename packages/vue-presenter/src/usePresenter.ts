import { container } from '@clean-js/presenter';
import { onMounted, onUnmounted, reactive } from 'vue';
import { Constructor, H } from './types/interface';

export type IUsePresenterOptions = {
  autoUpdate?: boolean;
  registry?: { token: any; useClass: Constructor<any> }[];
};

export const DefaultUsePresenterOptions: IUsePresenterOptions = Object.freeze({
  autoUpdate: true,
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
  const opt = {
    ...DefaultUsePresenterOptions,
    ...options,
  };

  const refPresenter = reactive(getInstance<P>(Cls, opt));

  onMounted(() => {
    refPresenter.__init();
  });

  onUnmounted(() => {
    refPresenter.__destroy();
  });

  return {
    presenter: refPresenter,
  };
}
