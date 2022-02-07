import { devtools } from './devtool';
import { entry } from '../entry/entry';

const mockExtension = {
  connect: jest.fn(() => ({
    send: jest.fn(),
  })),
};

describe('not install redux devtool', () => {
  beforeEach(() => {
    entry.useDevTool = false;
  });

  it('connect ', () => {
    expect(devtools.connect()).toBeUndefined();
    expect(devtools.instance).toBeNull();
  });
});

describe('entry not use devtool', () => {
  beforeEach(() => {
    entry.useDevTool = false;
    Object.defineProperty(window, '__REDUX_DEVTOOLS_EXTENSION__', {
      writable: true,
      value: mockExtension,
    });
  });
  it('connect ', () => {
    expect(devtools.connect()).toBeUndefined();
    expect(devtools.instance).toBeNull();
  });

  it('init', () => {
    expect(devtools.init('state', 'name')).toBeUndefined();
  });
  it('send', () => {
    expect(devtools.send('state', 'name')).toBeUndefined();
  });
  it('remove', () => {
    expect(devtools.remove('name')).toBeUndefined();
  });
});

describe('install redux devtool', () => {
  beforeEach(() => {
    entry.useDevTool = true;
    Object.defineProperty(window, '__REDUX_DEVTOOLS_EXTENSION__', {
      writable: true,
      value: mockExtension,
    });
  });

  it('connect', () => {
    expect(devtools.connect()).toBeUndefined();
    expect(devtools.instance).toBeDefined();
  });

  it('init', () => {
    devtools.connect();

    devtools.init('state', 'name');
    expect(
      devtools.instance.send.mock.calls[0][0]?.type.includes('name'),
    ).toBeTruthy();
    expect(devtools.instance.send.mock.calls[0][1]).toBe(devtools.store);
  });

  it('send', () => {
    devtools.connect();

    devtools.send('state', 'name');
    expect(
      devtools.instance.send.mock.calls[0][0]?.type.includes('name'),
    ).toBeTruthy();
    expect(devtools.instance.send.mock.calls[0][1]).toBe(devtools.store);
  });

  it('remove', () => {
    devtools.connect();

    devtools.remove('name');
    expect(
      devtools.instance.send.mock.calls[0][0]?.type.includes('name'),
    ).toBeTruthy();
    expect(devtools.instance.send.mock.calls[0][1]).toBe(devtools.store);
  });
});
