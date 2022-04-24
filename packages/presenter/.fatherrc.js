import commonjs from '@rollup/plugin-commonjs';
export default {
  esm: "rollup",
  cjs: "rollup",
  externalsExclude: [
    '@lujs/di',
    'eventemitter3',
    'immer',
    'reflect-metadata',
    'nanoid',
  ],
  // 增加这个配置
  extraRollupPlugins: [commonjs()],
}
