import { entry } from './entry';
import { devtools } from '../utils/devtool';

jest.mock('../utils/devtool');
devtools.connect = jest.fn();
describe('entry', () => {
  it('init', () => {
    expect(entry.useDevTool).toBe(false);
  });
  it('init', () => {
    entry.init({ useDevTool: true });
    expect(entry.useDevTool).toBe(true);
    expect(devtools.connect).toBeCalled();
  });
});
