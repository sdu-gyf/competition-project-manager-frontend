/*
 * @作者: 李洪文
 * @公司: 山东大学
 * @文件描述: file content
 * @LastEditors: 李洪文
 * @Date: 2019-09-13 07:27:24
 * @LastEditTime: 2019-10-20 16:43:08
 */
export interface MenuResourceModel {
  id?: number;
  resourceKey: string;
  apiUrl: string;
  icon?: string;
  description: string;
  type?: number;
  children?: MenuResourceModel[];
}

export interface HomeToDo {
  deliveryDispatchNum: number;
  deliveryOnWayNum: number;
  deliveryWaitNum: number;
  pickDispatchNum: number;
  pickOnNum: number;
  pickWaitNum: number;
  recycleNum: number;
  shipperAccountNum: number;
  shipperWaitVerifyNum: number;
  unFactoryNum: number;
  carrierWaitVerifyNum: number;
  carrierAccountNum: number;
}

export const defaultHomeToDo: HomeToDo = {
  deliveryDispatchNum: 0,
  deliveryOnWayNum: 0,
  deliveryWaitNum: 0,
  pickDispatchNum: 0,
  pickOnNum: 0,
  pickWaitNum: 0,
  recycleNum: 0,
  shipperAccountNum: 0,
  shipperWaitVerifyNum: 0,
  unFactoryNum: 0,
  carrierWaitVerifyNum: 0,
  carrierAccountNum: 0,
};

export interface UserTokenInfo {
  accessToken: string;
  userName: string;
  resourceKeys: string[];
}

export interface ResourceModel {
  id: number;
  resourceKey: string;
  apiUrl: string;
  icon: string;
  type?: number;
  description: string;
  parentId: number;
  children?: ResourceModel[];
}
