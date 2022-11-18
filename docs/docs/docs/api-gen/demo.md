---
nav:
  title: Api-gen
  path: /api-gen
  order: 3
group:
  title: demo
  path: /demo
  order: 2
---

## axios
使用配置
```typescript
export default {
  type: 'axios',
  url: 'http://yapi.smart-xwork.cn/api/open/plugin/export-full?type=json&pid=186904&status=all&token=59ecff7d43926c3be48f893deba401407f0d819c6c24a99b307a78c0877bc7d2',
}

```
会生成下方代码

```typescript
/**
 * 该文件自动生产，请勿修改
 * The file is produced automatically, do not modify it
 */
import { AxiosInstance } from 'axios';

function replaceUrlPath(url: string, pathParams: { [key: string]: any } = {}) {
  return url.replace(/\{([^}]+)\}/g, (_, key) => pathParams[key]);
}

const proxy = new Proxy(
  {},
  {
    get() {
      throw Error(`
        Please set request
        
        import { Req } from '@/clean-js/http.service';
        function initCleanJsApi() {
          Req.set(request);
        }`);
    },
  },
);

export class Req {
  static get request(): AxiosInstance {
    return Req._instance;
  }

  static _instance = proxy as AxiosInstance;

  static set(req: AxiosInstance) {
    Req._instance = req;
  }
}
export interface ResponseGetApiUserId {
  field_1: string;
  field_2: number;
  field_3: {
    field_4: number;
  };
}
export interface ResponsePostApiUser {
  field_3: string;
  field_4: number[];
}

/** Yapi link: http://yapi.smart-xwork.cn/project/186904/interface/api/2571880 */
export function getApiUserId(parameter: {
  params: {
    username: string;
  };
  path: {
    id: string;
  };
}) {
  return Req.request<ResponseGetApiUserId>({
    url: replaceUrlPath('/api/user/{id}', parameter?.path),
    method: 'get',
    params: parameter.params,
  });
}
export interface PostApiUserBody {
  field_1: string;
  field_2: number;
}

/** Yapi link: http://yapi.smart-xwork.cn/project/186904/interface/api/2572197 */
export function postApiUser(parameter: { body: PostApiUserBody }) {
  return Req.request<ResponsePostApiUser>({
    url: '/api/user',
    method: 'post',
    data: parameter.body,
  });
}

```

## umi3

使用配置
```typescript
export default {
  type: 'umi3',
  url: 'http://yapi.smart-xwork.cn/api/open/plugin/export-full?type=json&pid=186904&status=all&token=59ecff7d43926c3be48f893deba401407f0d819c6c24a99b307a78c0877bc7d2',
}
```
会生成下方代码
```typescript
/**
 * 该文件自动生产，请勿修改
 * The file is produced automatically, do not modify it
 */
import {
  RequestOptionsInit,
  RequestOptionsWithoutResponse,
  RequestOptionsWithResponse,
  RequestResponse,
} from 'umi-request';

interface RequestMethodInUmi<R = false> {
  <T = any>(
    url: string,
    options: RequestOptionsWithResponse & { skipErrorHandler?: boolean },
  ): Promise<RequestResponse<T>>;
  <T = any>(
    url: string,
    options: RequestOptionsWithoutResponse & { skipErrorHandler?: boolean },
  ): Promise<T>;
  <T = any>(
    url: string,
    options?: RequestOptionsInit & { skipErrorHandler?: boolean },
  ): R extends true ? Promise<RequestResponse<T>> : Promise<T>;
}

function replaceUrlPath(url: string, pathParams: { [key: string]: any } = {}) {
  return url.replace(/\{([^}]+)\}/g, (_, key) => pathParams[key]);
}

const proxy = new Proxy(
  {},
  {
    get() {
      throw Error(`
      Please set request
      
      import { Req } from '@/clean-js/http.service';
      function initCleanJsApi() {
        Req.set(request);
      }`);
    },
  },
);

export class Req {
  static get request(): RequestMethodInUmi {
    return Req._instance;
  }

  static _instance = proxy as RequestMethodInUmi;

  static set(req: RequestMethodInUmi) {
    Req._instance = req;
  }
}
export interface ResponseGetApiUserId {
  field_1: string;
  field_2: number;
  field_3: {
    field_4: number;
  };
}
export interface ResponsePostApiUser {
  field_3: string;
  field_4: number[];
}

/** Yapi link: http://yapi.smart-xwork.cn/project/186904/interface/api/2571880 */
export function getApiUserId(parameter: {
  params: {
    username: string;
  };
  path: {
    id: string;
  };
}) {
  return Req.request<ResponseGetApiUserId>(
    replaceUrlPath('/api/user/{id}', parameter?.path),
    {
      method: 'get',
      params: parameter.params,
    },
  );
}
export interface PostApiUserBody {
  field_1: string;
  field_2: number;
}

/** Yapi link: http://yapi.smart-xwork.cn/project/186904/interface/api/2572197 */
export function postApiUser(parameter: { body: PostApiUserBody }) {
  return Req.request<ResponsePostApiUser>('/api/user', {
    method: 'post',
    data: parameter.body,
  });
}

```
