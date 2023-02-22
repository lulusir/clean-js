/* eslint-disable no-shadow */
import { BaseTablePresenter } from './table.presenter';

class CustomTableP extends BaseTablePresenter {
  constructor() {
    super();
  }

  test() {
    return 'test';
  }
}

const mockFetchData: BaseTablePresenter<any>['fetchData'] = async ({
  current,
}) => ({
  current,
  data: [],
  pageSize: 10,
  total: 10,
});

describe('BaseTablePresenter', () => {
  it('showLoading', () => {
    const p = new BaseTablePresenter();
    p.showLoading();
    expect(p.state.loading).toBe(true);
  });

  it('hideLoading', () => {
    const p = new BaseTablePresenter();
    p.showLoading();
    expect(p.state.loading).toBe(true);

    p.hideLoading();
    expect(p.state.loading).toBe(false);

    p.showLoading();
    p.showLoading();
    p.hideLoading();
    expect(p.state.loading).toBe(true);
    p.hideLoading();
    expect(p.state.loading).toBe(false);
  });

  it('setPagination', async () => {
    const p = new BaseTablePresenter();

    p.setPagination({ current: 2 });
    expect(p.state.pagination.current).toBe(2);
  });

  it('a sample demo', async () => {
    const p = new BaseTablePresenter();
    p.fetchData = mockFetchData;

    expect(p.state.pagination.current).toBe(1);

    const promise = p.updateData();
    expect(p.state.loading).toBeTruthy();

    await promise;
    expect(p.state.loading).toBeFalsy();
    expect(p.state.pagination.current).toBe(1);

    p.setPagination({ current: p.state.pagination.current + 1 });
    await p.updateData();
    expect(p.state.pagination.current).toBe(2);
  });
});

describe('CustomTableP', () => {
  it('showLoading', () => {
    const p = new CustomTableP();
    p.showLoading();
    expect(p.state.loading).toBe(true);
  });
  it('test', () => {
    const p = new CustomTableP();
    const got = p.test();
    expect(got).toBe('test');
  });
});

describe('BaseTablePresenter', () => {
  let presenter: BaseTablePresenter;
  const fetchDataMock = jest.fn();

  beforeEach(() => {
    presenter = new BaseTablePresenter({
      data: [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ],
      loading: false,
      params: { name: 'John' },
      pagination: {
        current: 2,
        pageSize: 10,
        total: 20,
      },
    });
    presenter.fetchData = fetchDataMock;
  });

  describe('constructor', () => {
    it('should initialize the state correctly when no state is passed', () => {
      const presenter = new BaseTablePresenter();
      expect(presenter.state).toEqual({
        data: [],
        loading: false,
        params: {},
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0,
        },
      });
    });

    it('should use the provided state', () => {
      const state = {
        data: [{ id: 1, name: 'John' }],
        loading: true,
        params: { name: 'John' },
        pagination: {
          current: 3,
          pageSize: 5,
          total: 15,
        },
      };
      const presenter = new BaseTablePresenter(state);
      expect(presenter.state).toEqual(state);
    });
  });

  describe('fetchData', () => {
    it('should throw an error', async () => {
      const presenter = new BaseTablePresenter();
      await expect(() =>
        presenter.fetchData({ current: 1, pageSize: 1 }),
      ).rejects.toThrowError('请实现fetchTable');
    });
    it('fetchDataMock should be call', async () => {
      await presenter.fetchData({ current: 1, pageSize: 1 });
      expect(fetchDataMock).toHaveBeenCalled();
    });
  });

  describe('showLoading', () => {
    it('should set loading to true if the count is 0', () => {
      presenter.showLoading();
      expect(presenter.state.loading).toBe(true);
    });

    it('should increase the count', () => {
      presenter.showLoading();
      expect(presenter._loadingCount).toBe(1);
    });

    it('should not set loading to true if the count is greater than 0', () => {
      presenter.showLoading();
      presenter.showLoading();
      expect(presenter.state.loading).toBe(true);
      expect(presenter._loadingCount).toBe(2);
    });
  });

  describe('hideLoading', () => {
    it('should decrease the count', () => {
      presenter.showLoading();
      presenter.hideLoading();
      expect(presenter._loadingCount).toBe(0);
    });

    it('should set loading to false if the count becomes 0', () => {
      presenter.showLoading();
      presenter.hideLoading();
      expect(presenter.state.loading).toBe(false);
    });

    it('should not set loading to false if the count is still greater than 0', () => {
      presenter.showLoading();
      presenter.showLoading();
      presenter.hideLoading();
      expect(presenter.state.loading).toBe(true);
    });
  });

  describe('updateData', () => {
    it('should call fetchData with the correct parameters', async () => {
      const params = { name: 'John' };
      const expectedParams = { ...params, current: 2, pageSize: 10 };
      fetchDataMock.mockResolvedValueOnce({
        data: [{ id: 3, name: 'Jack' }],
        current: 2,
        pageSize: 10,
        total: 20,
      });

      await presenter.updateData();

      expect(fetchDataMock).toHaveBeenCalledWith(expectedParams);
    });
  });
});
