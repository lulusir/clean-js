// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/lujunsheng/myOwnX/clean-js/common/temp/node_modules/.pnpm/registry.npmmirror.com+@umijs+runtime@3.5.23_react@16.14.0/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('../dumi/layout').default],
    "component": ((props) => {
        const React = require('react');
        const { default: getDemoRenderArgs } = require('/Users/lujunsheng/myOwnX/clean-js/common/temp/node_modules/.pnpm/registry.npmmirror.com+@umijs+preset-dumi@1.1.40_f59c656d5e1cd36fcdf290a5d0b587cd/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/es/builtins/Previewer.js');
        const { usePrefersColor, context } = require('dumi/theme');

        
      const { demos } = React.useContext(context);
      const [renderArgs, setRenderArgs] = React.useState([]);

      // update render args when props changed
      React.useLayoutEffect(() => {
        setRenderArgs(getDemoRenderArgs(props, demos));
      }, [props.match.params.uuid, props.location.query.wrapper, props.location.query.capture]);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
        })
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('../dumi/layout').default, require('/Users/lujunsheng/myOwnX/clean-js/common/temp/node_modules/.pnpm/registry.npmmirror.com+@umijs+preset-dumi@1.1.40_f59c656d5e1cd36fcdf290a5d0b587cd/node_modules/dumi-theme-default/es/layout.js').default],
    "routes": [
      {
        "path": "/getting-started",
        "component": require('/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/getting-started.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/getting-started.zh-CN.md",
          "updatedTime": 1644508076000,
          "nav": {
            "title": "快速上手",
            "order": 1,
            "path": "/getting-started"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "快速上手",
              "heading": "快速上手"
            },
            {
              "depth": 2,
              "value": "install",
              "heading": "install"
            },
            {
              "depth": 2,
              "value": "Presenter",
              "heading": "presenter"
            },
            {
              "depth": 2,
              "value": "View",
              "heading": "view"
            },
            {
              "depth": 2,
              "value": "tsconfig.json",
              "heading": "tsconfigjson"
            }
          ],
          "title": "快速上手",
          "locale": "zh-CN"
        },
        "title": "快速上手 - @clean-js/presenter"
      },
      {
        "path": "/",
        "component": require('/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.zh-CN.md",
          "updatedTime": 1662607364000,
          "slugs": [
            {
              "depth": 2,
              "value": "整洁架构",
              "heading": "整洁架构"
            },
            {
              "depth": 2,
              "value": "目的",
              "heading": "目的"
            },
            {
              "depth": 2,
              "value": "分层",
              "heading": "分层"
            }
          ],
          "title": "整洁架构",
          "locale": "zh-CN"
        },
        "title": "整洁架构 - @clean-js/presenter"
      },
      {
        "path": "/api/ioc",
        "component": require('/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/api/ioc.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/api/ioc.zh-CN.md",
          "updatedTime": 1661160631000,
          "nav": {
            "title": "API",
            "path": "/api",
            "order": 3
          },
          "slugs": [
            {
              "depth": 1,
              "value": "IOC",
              "heading": "ioc"
            },
            {
              "depth": 2,
              "value": "usage",
              "heading": "usage"
            },
            {
              "depth": 2,
              "value": "model instance api",
              "heading": "model-instance-api"
            }
          ],
          "title": "IOC",
          "locale": "zh-CN"
        },
        "title": "IOC - @clean-js/presenter"
      },
      {
        "path": "/api/presenter",
        "component": require('/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/api/presenter.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/api/presenter.zh-CN.md",
          "updatedTime": 1661160631000,
          "nav": {
            "title": "API",
            "path": "/api",
            "order": 2
          },
          "slugs": [
            {
              "depth": 1,
              "value": "Presenter",
              "heading": "presenter"
            },
            {
              "depth": 2,
              "value": "usage",
              "heading": "usage"
            },
            {
              "depth": 2,
              "value": "Method",
              "heading": "method"
            },
            {
              "depth": 4,
              "value": "PresenterFactor",
              "heading": "presenterfactor"
            }
          ],
          "title": "Presenter",
          "locale": "zh-CN"
        },
        "title": "Presenter - @clean-js/presenter"
      },
      {
        "path": "/api/view",
        "component": require('/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/api/view.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/api/view.zh-CN.md",
          "updatedTime": 1661218756000,
          "nav": {
            "title": "API",
            "path": "/api",
            "order": 1
          },
          "slugs": [
            {
              "depth": 1,
              "value": "View adaptor",
              "heading": "view-adaptor"
            },
            {
              "depth": 1,
              "value": "react",
              "heading": "react"
            },
            {
              "depth": 2,
              "value": "usePresenter",
              "heading": "usepresenter"
            },
            {
              "depth": 3,
              "value": "usage",
              "heading": "usage"
            },
            {
              "depth": 3,
              "value": "Api",
              "heading": "api"
            },
            {
              "depth": 4,
              "value": "Interface",
              "heading": "interface"
            },
            {
              "depth": 2,
              "value": "Provider",
              "heading": "provider"
            },
            {
              "depth": 4,
              "value": "example",
              "heading": "example"
            },
            {
              "depth": 1,
              "value": "if use vue",
              "heading": "if-use-vue"
            }
          ],
          "title": "View adaptor",
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "View adaptor - @clean-js/presenter"
      },
      {
        "path": "/demos/name",
        "component": require('/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/demos/name.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/demos/name.zh-CN.md",
          "updatedTime": 1644936018000,
          "nav": {
            "title": "示例",
            "order": 1,
            "path": "/demos"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "Name",
              "heading": "name"
            }
          ],
          "title": "Name",
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "Name - @clean-js/presenter"
      },
      {
        "path": "/demos/todo",
        "component": require('/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/demos/todo.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/demos/todo.zh-CN.md",
          "updatedTime": 1644936018000,
          "nav": {
            "title": "示例",
            "order": 1,
            "path": "/demos"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "TodoList",
              "heading": "todolist"
            }
          ],
          "title": "TodoList",
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "TodoList - @clean-js/presenter"
      },
      {
        "path": "/ecosystem/table",
        "component": require('/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/ecosystem/table.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/ecosystem/table.md",
          "updatedTime": 1644508076000,
          "slugs": [
            {
              "depth": 1,
              "value": "@routine-js/table",
              "heading": "routine-jstable"
            },
            {
              "depth": 2,
              "value": "场景",
              "heading": "场景"
            },
            {
              "depth": 2,
              "value": "usage",
              "heading": "usage"
            },
            {
              "depth": 3,
              "value": "example",
              "heading": "example"
            },
            {
              "depth": 4,
              "value": "Full example",
              "heading": "full-example"
            },
            {
              "depth": 3,
              "value": "泛型描述",
              "heading": "泛型描述"
            },
            {
              "depth": 3,
              "value": "",
              "heading": ""
            },
            {
              "depth": 2,
              "value": "api",
              "heading": "api"
            }
          ],
          "title": "@routine-js/table",
          "hasPreviewer": true,
          "nav": {
            "path": "/ecosystem",
            "title": "Ecosystem"
          }
        },
        "title": "@routine-js/table - @clean-js/presenter"
      },
      {
        "path": "/ecosystem/upload-image",
        "component": require('/Users/lujunsheng/myOwnX/clean-js/docs/docs/docs/ecosystem/upload-image.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/ecosystem/upload-image.md",
          "updatedTime": 1644508076000,
          "nav": {
            "title": "Ecosystem",
            "path": "/ecosystem",
            "order": 4
          },
          "slugs": [
            {
              "depth": 1,
              "value": "@routine-js/upload-image",
              "heading": "routine-jsupload-image"
            },
            {
              "depth": 2,
              "value": "install",
              "heading": "install"
            },
            {
              "depth": 2,
              "value": "usage",
              "heading": "usage"
            },
            {
              "depth": 3,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "example",
              "heading": "example"
            },
            {
              "depth": 3,
              "value": "Select Service",
              "heading": "select-service"
            },
            {
              "depth": 4,
              "value": "浏览器选图",
              "heading": "浏览器选图"
            },
            {
              "depth": 5,
              "value": "interface",
              "heading": "interface"
            },
            {
              "depth": 4,
              "value": "微信选图",
              "heading": "微信选图"
            },
            {
              "depth": 4,
              "value": "选图中间件",
              "heading": "选图中间件"
            },
            {
              "depth": 5,
              "value": "已提供的中间件",
              "heading": "已提供的中间件"
            },
            {
              "depth": 3,
              "value": "Upload Service",
              "heading": "upload-service"
            },
            {
              "depth": 4,
              "value": "提供默认的上传服务",
              "heading": "提供默认的上传服务"
            }
          ],
          "title": "@routine-js/upload-image",
          "hasPreviewer": true
        },
        "title": "@routine-js/upload-image - @clean-js/presenter"
      },
      {
        "path": "/api",
        "meta": {
          "order": 3
        },
        "exact": true,
        "redirect": "/api/ioc"
      },
      {
        "path": "/demos",
        "meta": {
          "order": 1
        },
        "exact": true,
        "redirect": "/demos/name"
      },
      {
        "path": "/ecosystem",
        "meta": {},
        "exact": true,
        "redirect": "/ecosystem/table"
      }
    ],
    "title": "@clean-js/presenter",
    "component": (props) => props.children
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
