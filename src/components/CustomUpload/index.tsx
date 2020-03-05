/*
 * @Description: 自定义上传组件
 * @Company: thundersdata
 * @Author: luhengchang
 * @Date: 2019-06-07 11:45:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-12-05 15:38:04
 */
import * as React from 'react';
import { Upload, Icon, message } from 'antd';
import { compose, withState } from 'recompose';
import styles from './index.scss';
import user from '@/utils/user';
import { BACKEND_URL } from '@/services/common';
const uploadUrl = `${BACKEND_URL}/image/search`;
interface CustomUploadProps {
  disabled: boolean;

  imageUrl: string | undefined;
  changeImageUrl: (imageUrl: string | undefined) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const CustomUpload: React.SFC<CustomUploadProps> = ({
  loading,
  setLoading,
  imageUrl,
  changeImageUrl,
  disabled,
}) => (
  <Upload
    listType="picture-card"
    className={styles.avatarUploader}
    disabled={disabled}
    showUploadList={false}
    action={uploadUrl}
    accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
    data={{ access_token: user.getToken() }}
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
    onChange={({ file }) => {
      const { status } = file;
      if (status === 'uploading') {
        setLoading(true);
        return;
      }

      if (status === 'done') {
        changeImageUrl(file.response.data);
        return;
      }
    }}
  >
    {imageUrl ? (
      <img src={imageUrl} alt="avatar" />
    ) : (
      <div>
        <p className="ant-upload-drag-icon">
          <Icon type={loading ? 'loading' : 'inbox'} />
        </p>
        <p className="ant-upload-text">点击上传</p>
      </div>
    )}
  </Upload>
);

export default compose<
  {},
  {
    imageUrl: string | undefined;
    uploadUrl: string;
    disabled?: boolean;
    changeImageUrl?: (imageUrl: string | undefined) => void;
  }
>(withState('loading', 'setLoading', false))(CustomUpload);
