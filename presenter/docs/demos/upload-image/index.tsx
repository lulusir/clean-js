import React, { useState } from 'react';

import {
  UploadImagePresenter,
  SelectImageServiceToken,
  UploadServiceToken,
  AbsUploadService,
  AbsSelectImageService,
  SelectFnFactor,
  SelectImageMiddlewareFactor,
} from '@lujs/upload-image';
import { usePresenter } from '@lujs/react-mvp-adaptor';

class MyUploadService extends AbsUploadService {
  upload(file) {
    // 自定义上传功能
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url: 'xxxurl',
          name: 'xxx.png',
          thumbUrl: 'xxx',
        });
      }, 1000);
    });
  }
}

export class MySelectImageService extends AbsSelectImageService {
  constructor() {
    super();
    // 选图中间件，检查图片大小
    this.useMiddleware(
      SelectImageMiddlewareFactor.checkSize({ max: 100 * 1024 }),
    ); // 限制最大为100k
  }

  select() {
    // 自定义选图功能， 使用浏览器的input来选择图片
    const browserInputSelect = SelectFnFactor.buildBrowserInputSelect({
      accept: 'image/*',
    });
    return browserInputSelect();
  }
}

const Page = () => {
  const { presenter, state } = usePresenter<UploadImagePresenter>(
    UploadImagePresenter,
    {
      registry: [
        {
          token: UploadServiceToken,
          useClass: MyUploadService,
        },
        {
          token: SelectImageServiceToken,
          useClass: MySelectImageService,
        },
      ],
    },
  );

  const [err, setErr] = React.useState(null);
  return (
    <div>
      <h2>fileList</h2>
      <div>{state.fileList.map((v) => v.file.name)}</div>
      <h2>upload info</h2>
      <ul>
        <li>name: {state.fileList[0]?.name}</li>
        <li>url: {state.fileList[0]?.url}</li>
        <li>thumbUrl: {state.fileList[0]?.thumbUrl}</li>
      </ul>
      <h2>Error</h2>
      <div>current error :{err?.message}</div>
      <div>
        <button
          onClick={() => {
            presenter.selectImage().catch((e) => {
              setErr(e);
            });
          }}
        >
          selectImage
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            presenter.uploadFile();
          }}
        >
          upload
        </button>
      </div>
    </div>
  );
};

export default Page;
