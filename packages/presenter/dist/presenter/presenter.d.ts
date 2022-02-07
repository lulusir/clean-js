interface UpdateFn<S> {
    (state: S): void;
}
export declare abstract class Presenter<S> {
    private _state;
    private __emitter;
    get state(): S;
    protected set state(s: S);
    setState(fn: UpdateFn<S> | S): void;
    subscribe(callback: (state: S) => void): {
        unsubscribe: () => void;
    };
    updateView(): void;
    __init(): void;
    __destroy(): void;
    __useAutoUpdate(): {
        unsubscribe: () => void;
    };
}
export {};
