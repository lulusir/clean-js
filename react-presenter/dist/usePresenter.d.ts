import { Constructor, H } from './types/interface';
export declare type IUsePresenterOptions = {
    autoUpdate?: boolean;
    registry?: {
        token: any;
        useClass: Constructor<any>;
    }[];
};
export declare const DefaultUsePresenterOptions: IUsePresenterOptions;
export declare function usePresenter<P>(Cls: Constructor<H<P>>, options?: IUsePresenterOptions): {
    presenter: H<P>;
    state: ReturnType<H<P>["getState"]>;
};
