import { observable } from 'mobx';

import { Pagination, initalPaginationValue } from '@/interfaces/common';
import { TeamModel } from '@/interfaces/team';

export class TeamStore {
  // 正在获取数据状态
  @observable
  public loading: boolean;

  // Team分页列表数据
  @observable
  public pageData: Pagination<TeamModel> = initalPaginationValue;

}
