import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import typescript from "@rollup/plugin-typescript";
import typescript2 from "rollup-plugin-typescript2";
import vueJsx from "@vitejs/plugin-vue-jsx";
import swc from "rollup-plugin-swc";
// https://vitejs.dev/config/
const swcPlugin = (() => {
  const plugin = swc({
    test: "ts",
    jsc: {
      parser: {
        syntax: "typescript",
        dynamicImport: true,
        decorators: true,
      },
      target: "es2021",
      transform: {
        decoratorMetadata: true,
      },
    },
  });

  const originalTransform = plugin.transform!;

  const transform = function (...args: Parameters<typeof originalTransform>) {
    if (!args[1].endsWith("html")) return originalTransform.apply(this, args);
  };

  return { ...plugin, transform };
})();
export default defineConfig({
  esbuild: false,
  plugins: [
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    vue(),
    typescript(),

    // {
    //   ...typescript(),
    //   enforce: "pre",
    // },
    // typescript2({
    //   tsconfig: "tsconfig.json",
    // }),
    // swcPlugin,
    // {
    //   ...swcPlugin,
    //   enforce: "pre",
    // },
  ],
  optimizeDeps: {
    include: [
      "reflect-metadata",
      "@clean-js/presenter",
      "@clean-js/vue-presenter",
      "@routine-js/table",
    ],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
