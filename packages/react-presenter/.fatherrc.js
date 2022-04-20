import commonjs from '@rollup/plugin-commonjs';
export default {
  esm: "rollup",
  cjs: "rollup",
  externalsExclude: [
  ],
  // 增加这个配置
  extraRollupPlugins: [commonjs()],
}
