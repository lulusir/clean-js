declare class Devtool {
    name: string;
    store: Record<any, any>;
    instance: any;
    connect(): void;
    init(state: any, modelName: string): void;
    send(state: any, modelName: string): void;
    remove(modelName: string): void;
}
export declare const devtools: Devtool;
export {};
