<script  lang="ts">
import "reflect-metadata";
import { container, Presenter } from "@clean-js/presenter";
import { usePresenter } from "./lib/index";
import {
  TablePresenter,
  AbsTableService,
  TableServiceToken,
} from "@routine-js/table";

container.debug("lujs");

const injectable =
  <T>() =>
  (target: any) => {
    const paramTypes = Reflect.getMetadata("design:paramtypes", target) || [];

    console.log(paramTypes, "paramTypesparamTypes");
  };

class MyService {}

@injectable()
export class NamePresenter {
  constructor(public service: MyService) {}
}
const paramTypes =
  Reflect.getMetadata("design:paramtypes", NamePresenter) || [];
console.log(paramTypes, "paramTypes123");

interface Row {
  name: string;
}
interface Params {
  name: string;
}
class MyService extends AbsTableService<Row, Params> {
  fetchTable(
    params: Partial<Params> & { current: number; pageSize: number }
  ): Promise<{
    data: Row[];
    current: number;
    pageSize: number;
    total: number;
  }> {
    const res = {
      data: [{ name: "aloha" }],
      current: 1,
      pageSize: 1,
      total: 1,
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  }
}

// interface IViewState {
//   loading: boolean;
//   name: string;
// }

// const injectable =
//   <T>() =>
//   (target: any) => {
//     const paramTypes = Reflect.getMetadata("design:paramtypes", target) || [];

//     console.log(paramTypes, "paramTypesparamTypes");
//   };

// @injectable()
// export class NamePresenter extends Presenter<IViewState> {
//   constructor(public service: MyService) {
//     super();
//     this.state = {
//       loading: false,
//       name: "lujs",
//     };
//   }

//   changeName() {
//     this.setState((s) => {
//       s.name += "!";
//     }); // api of set model state
//     this.updateView(); // api of update view
//   }
// }

export default {
  // props: {
  //   collectionName: String,
  // },
  // setup(props) {
  //   // const { presenter } = usePresenter(NamePresenter);
  //   const { presenter } = usePresenter<TablePresenter<Row, Params>>(
  //     TablePresenter,
  //     {
  //       registry: [{ token: TableServiceToken, useClass: MyService }],
  //     }
  //   );
  //   // 暴露给 template
  //   return {
  //     presenter,
  //   };
  // },
  // methods: {
  //   click1() {
  //     // presenter.changeName();
  //     // pr
  //     // this.presenter.getTable();
  //   },
  // },
};
</script>

<template>
  <div>
    <h1>table state</h1>
    <!-- <p>{{ JSON.stringify(presenter.state, null, 4) }}</p>

    <button @click="presenter.fetchTable()">fetch table</button> -->
    <!--  -->

    <!-- <p>name: {{ presenter.state.name }}</p>
    <button @click="presenter.changeName()">hi</button> -->
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
