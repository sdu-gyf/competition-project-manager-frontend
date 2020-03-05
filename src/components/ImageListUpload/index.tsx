/*
 * @文件描述: 多图片上传组件
 * @公司: 山东大学
 * @作者: 李洪文
 * @LastEditors: 李洪文
 * @Date: 2019-06-01 11:42:58
 * @LastEditTime: 2019-10-12 11:14:34
 */
import * as React from 'react';
import { PageBasicPropsModel } from '@/interfaces/component';
import styles from './index.scss';
import { Upload, Icon, Modal, message } from 'antd';
import { compose, withState } from 'recompose';
import { observer, inject } from 'mobx-react';
import { UploadFile } from 'antd/lib/upload/interface';
import user from '@/utils/user';
import { UPLOAD_PUBLIC_URL } from '@/services/common';

export interface ImpageListUploadProps extends PageBasicPropsModel {
  // 是否只读。如果只读，无法修改
  readOnly?: boolean;
  // 文件编号列表
  idList: string[];
  // 保存文件列表
  changeIdList: (idList: string[]) => void;

  // 下面是withState注入的内部属性
  // 是否显示图片预览对话框
  previewVisible: boolean;
  setPreviewVisible: (previewVisible: boolean) => void;

  // 当前预览的图片地址
  previewImage: string;
  setPreviewImage: (previewImage: string) => void;

  fileList: UploadFile[];
  setFileList: (fileList: UploadFile[]) => void;
}

@inject('vehicleInsuranceService')
@observer
class ImageListUpload extends React.Component<ImpageListUploadProps> {
  form: any;
  handleRemove = (file: UploadFile) => {
    return new Promise<boolean>(resolve => {
      Modal.confirm({
        centered: true,
        title: `您确定要删除该保单图片吗？`,
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          const list = this.props.idList.filter(item => item !== file.url);
          this.props.changeIdList(list);
          resolve(true);
        },
        onCancel: () => {
          resolve(false);
        },
      });
    });
  };
  handlePreview = async (file: UploadFile) => {
    this.props.setPreviewVisible(true);
    this.props.setPreviewImage(file.url!);
  };

  public componentDidUpdate(prevProps: ImpageListUploadProps) {
    const { idList } = this.props;
    if (idList === prevProps.idList) {
      return;
    }

    this.props.setFileList(
      idList.map((url, index) => {
        return {
          uid: `${index + 1}`,
          name: 'image.png',
          type: '',
          size: 1024,
          status: 'done',
          url,
        };
      }),
    );
  }

  public render() {
    const { previewVisible, previewImage, readOnly, fileList } = this.props;

    return (
      <>
        <Upload
          listType="picture-card"
          className={styles.imageUploader}
          fileList={fileList}
          data={{ access_token: user.getToken() }}
          action={UPLOAD_PUBLIC_URL}
          accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
          onPreview={this.handlePreview}
          onRemove={this.handleRemove}
          beforeUpload={file => {
            return new Promise((resolve, reject) => {
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isLt2M) {
                message.error('Image must smaller than 2MB!');
                reject(false);
              }
              resolve();
            });
          }}
          onChange={({ fileList: list }) => {
            const ids: string[] = [];
            let done = false;
            list.forEach(file => {
              if (file.url) {
                ids.push(file.url);
              } else if (file.response && file.response.data) {
                ids.push(file.response.data);
                done = true;
              }
            });
            this.props.setFileList([...list]);
            if (done) {
              this.props.changeIdList(ids);
            }
          }}
        >
          {!readOnly ? (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">点击上传</div>
            </div>
          ) : null}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={() => this.props.setPreviewVisible(false)}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default compose<
  {},
  {
    readOnly?: boolean;
    idList: string[];
    changeIdList: (idList: string[]) => void;
  }
>(
  withState('previewVisible', 'setPreviewVisible', false),
  withState('previewImage', 'setPreviewImage', undefined),
  withState('fileList', 'setFileList', []),
)(ImageListUpload);
