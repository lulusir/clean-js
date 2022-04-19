// @ts-nocheck
import React from 'react';
import { dynamic } from 'dumi';
import rawCode1 from '!!dumi-raw-code-loader!/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/demos/provider/index.tsx?dumi-raw-code';
import rawCode2 from '!!dumi-raw-code-loader!/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/demos/name/index.tsx?dumi-raw-code';
import rawCode3 from '!!dumi-raw-code-loader!/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/demos/name/presenter.ts?dumi-raw-code';
import rawCode4 from '!!dumi-raw-code-loader!/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/demos/todo/index.tsx?dumi-raw-code';
import rawCode5 from '!!dumi-raw-code-loader!/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/demos/todo/module/todo/index.presenter.ts?dumi-raw-code';
import rawCode6 from '!!dumi-raw-code-loader!/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/demos/todo/module/todo/index.service.ts?dumi-raw-code';
import rawCode7 from '!!dumi-raw-code-loader!/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/demos/todo/module/todo/todo.entity.ts?dumi-raw-code';
import rawCode8 from '!!dumi-raw-code-loader!/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/demos/table/index.tsx?dumi-raw-code';
import rawCode9 from '!!dumi-raw-code-loader!/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/demos/table/antdTable.tsx?dumi-raw-code';
import rawCode10 from '!!dumi-raw-code-loader!/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/demos/upload-image/index.tsx?dumi-raw-code';

export default {
  'docs-provider': {
    component: (require('/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/demos/provider/index.tsx')).default,
    previewerProps: {"sources":{"_":{"tsx":rawCode1}},"dependencies":{"react":{"version":"16.14.0"},"@clean-js/presenter":{"version":"0.0.8"},"@clean-js/react-presenter":{"version":"0.0.8"}},"identifier":"docs-provider"},
  },
  'docs-name': {
    component: (require('/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/demos/name/index.tsx')).default,
    previewerProps: {"sources":{"_":{"tsx":rawCode2},"presenter.ts":{"import":"./presenter","content":rawCode3}},"dependencies":{"react":{"version":"16.14.0"},"@clean-js/react-presenter":{"version":"0.0.8"},"@clean-js/presenter":{"version":"0.0.8"}},"identifier":"docs-name"},
  },
  'docs-todo': {
    component: (require('/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/demos/todo/index.tsx')).default,
    previewerProps: {"sources":{"_":{"tsx":rawCode4},"module/todo/index.presenter.ts":{"import":"./module/todo/index.presenter","content":rawCode5},"module/todo/index.service.ts":{"import":"./index.service","content":rawCode6},"module/todo/todo.entity.ts":{"import":"./todo.entity","content":rawCode7}},"dependencies":{"react":{"version":"16.14.0"},"antd":{"version":"4.16.13","css":"antd/dist/antd.css"},"@clean-js/react-presenter":{"version":"0.0.8"},"react-dom":{"version":">=16.9.0"},"@clean-js/presenter":{"version":"0.0.8"}},"identifier":"docs-todo"},
  },
  'docs-table': {
    component: (require('/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/demos/table/index.tsx')).default,
    previewerProps: {"sources":{"_":{"tsx":rawCode8}},"dependencies":{"react":{"version":"16.14.0"},"@clean-js/react-presenter":{"version":"0.0.8"},"@clean-js/presenter":{"version":"^0.0.5"},"@routine-js/table":{"version":"0.0.10"}},"identifier":"docs-table"},
  },
  'table-antdtable': {
    component: (require('/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/demos/table/antdTable.tsx')).default,
    previewerProps: {"sources":{"_":{"tsx":rawCode9}},"dependencies":{"react":{"version":">=16.9.0"},"@clean-js/react-presenter":{"version":"0.0.8"},"@routine-js/table":{"version":"0.0.10"},"antd":{"version":"4.16.13","css":"antd/dist/antd.css"},"@clean-js/presenter":{"version":"^0.0.5"},"react-dom":{"version":">=16.9.0"}},"identifier":"table-antdtable"},
  },
  'docs-upload-image': {
    component: (require('/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/demos/upload-image/index.tsx')).default,
    previewerProps: {"sources":{"_":{"tsx":rawCode10}},"dependencies":{"react":{"version":"16.14.0"},"@routine-js/upload-image":{"version":"0.0.13"},"@clean-js/react-presenter":{"version":"^0.0.4"},"@lujs/middleware":{"version":">=0.0.4"},"@clean-js/presenter":{"version":"^0.0.4"},"dayjs":{"version":">=1.10.7"}},"identifier":"docs-upload-image"},
  },
};
