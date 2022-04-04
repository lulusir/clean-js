import { withModifiers, defineComponent, ref } from "vue";
import { injectable, container, Presenter } from "@clean-js/presenter";
import { usePresenter } from "./lib/index";
import {
  TablePresenter,
  AbsTableService,
  TableServiceToken,
} from "@routine-js/table";

// const injectable1 = () =>
//   (target: any) => {
//     const paramTypes = Reflect.getMetadata("design:paramtypes", target) || [];

//     console.log(paramTypes, "paramTypesparamTypes");
//   };

// class MyService1 { }

// @injectable()
// export class NamePresenter1 {
//   constructor(public service: MyService1) { }
// }



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


export const App = defineComponent({
  setup() {
    const { presenter } = usePresenter<TablePresenter<Row, Params>>(
      TablePresenter,
      {
        registry: [{ token: TableServiceToken, useClass: MyService }],
      }
    );

    const count = ref(0);

    console.log(presenter, 'presenter')

    const inc = () => {
      count.value++;
    };

    return () => (
      <div onClick={withModifiers(inc, ["self"])}>{count.value}</div>
    );
  },
});