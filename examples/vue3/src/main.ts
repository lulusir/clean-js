// import { createApp } from "vue";
import "reflect-metadata";
import * as Vue from "vue";
// import App from "./App.vue";
import { App } from "./App.tsx";

// 在ts文件中可以获取到元信息，在.vue文件中无法获取

Vue.createApp(App).mount("#app");

// const injectable =
//   <T>() =>
//   (target: any) => {
//     const paramTypes = Reflect.getMetadata("design:paramtypes", target) || [];

//     console.log(paramTypes, "paramTypesparamTypes");
//   };

// class MyService {}

// @injectable()
// export class NamePresenter {
//   constructor(public service: MyService) {}
// }
// const paramTypes =
//   Reflect.getMetadata("design:paramtypes", NamePresenter) || [];
// console.log(paramTypes, "paramTypes123");
