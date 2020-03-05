/*
 * @文件描述:  公共数据的Store
 * @公司: thundersdata
 * @作者: 李洪文
 * @Date: 2019-05-31 09:09:27
 * @LastEditTime : 2019-12-23 11:29:45
 * @LastEditors  : Please set LastEditors
 */
import { observable } from 'mobx';

export class PublicStore {
  @observable
  public selectedKeys: string[];

  @observable
  public openKeys: string[];
}
