import { Presenter } from '@clean-js/presenter';

interface Pagination {
  current: number;
  total: number;
  pageSize: number;
}

export interface TableState<Row = any> {
  loading: boolean;
  data: Row[];
  params: Record<any, any>;
  pagination: Pagination & Record<string, any>;
  [p: string]: any;
}

export class BaseTablePresenter<Row = any> extends Presenter<TableState<Row>> {
  constructor(state?: TableState<Row>) {
    super();
    if (state) {
      this.state = state;
    } else {
      this.state = {
        data: [] as Row[],
        loading: false,
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0,
        },
        params: {},
      };
    }
  }

  async fetchData(
    params: Partial<TableState['params']> & {
      current: number;
      pageSize: number;
    },
  ): Promise<{
    data: any[];
    current: number;
    pageSize: number;
    total: number;
  }> {
    throw Error('请实现fetchTable');
  }

  _loadingCount = 0;

  showLoading() {
    if (this._loadingCount === 0) {
      this.setState((s) => {
        s.loading = true;
      });
    }
    this._loadingCount += 1;
  }

  hideLoading() {
    this._loadingCount -= 1;
    if (this._loadingCount === 0) {
      this.setState((s) => {
        s.loading = false;
      });
    }
  }

  /**
   * 发请求，更新数据
   * @returns
   */
  updateData() {
    const params: Record<any, any> = {};
    Object.entries(this.state.params || {}).forEach(([k, v]) => {
      if (v !== undefined) {
        Object.assign(params, { [k]: v });
      }
    });
    this.showLoading();

    return this.fetchData({
      current: this.state.pagination.current || 1,
      pageSize: this.state.pagination.pageSize || 10,
      ...params,
    })
      .then((res) => {
        this.setState((s) => {
          s.pagination.current = res.current;
          s.pagination.pageSize = res.pageSize;
          s.pagination.total = res.total;
          s.data = res.data;
        });
        return res;
      })
      .finally(() => {
        this.hideLoading();
      });
  }

  /**
   * 更新参数，如果修改的参数是不是current，重置current为1
   * @param pagination
   */
  setPagination(pagination: Partial<Pagination>) {
    this.setState((s) => {
      let current = pagination.current || s.pagination.current;

      if (pagination?.pageSize) {
        if (pagination.pageSize !== s.pagination.pageSize) {
          current = 1;
        }
      }

      s.pagination = {
        ...s.pagination,
        ...pagination,
        current,
      };
    });
  }

  /**
   * 更新参数，重置当前请求页面为1
   * @param params
   */
  setParams(params: Partial<TableState['params']>) {
    const d: Partial<TableState['params']> = {};
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) {
        Object.assign(d, {
          [k]: v,
        });
      }
    });

    this.setState((s) => {
      s.params = {
        ...s.params,
        ...d,
      };

      s.pagination.current = 1;
    });
  }

  resetParams() {
    this.setState((s) => {
      s.params = {} as Record<any, any>;
    });
  }

  /**
   * 切换页面，并且更新数据
   * @param p
   */
  onPageChange(p: Pagination) {
    this.setPagination(p);

    return this.updateData();
  }
}
