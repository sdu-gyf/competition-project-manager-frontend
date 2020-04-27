import { action } from 'mobx';
import HttpClient from '../utils/HttpClient';
import { BACKEND_URL, messageFail } from './common';
import { Pagination, initalPaginationValue } from '@/interfaces/common';
import {
  TeamModel,
  TeamEditModel,
  TeamSearchProps,
} from '@/interfaces/team';

import { TeamStore } from '@/stores/team.store';

export class TeamService {
  public store: TeamStore;
  private http: HttpClient;

  public constructor() {
    this.http = new HttpClient();
    this.store = new TeamStore();
  }

  @action
  public async fetchPageData(searchProps: TeamSearchProps): Promise<boolean> {
    this.store.loading = true;
    this.store.pageData = initalPaginationValue;
    try {
      const result = await this.http.get<Pagination<TeamModel>>(
        `${BACKEND_URL}/team/list`,
        {
          params:{
            teamName:searchProps.teamName||null,
            province:searchProps.province||null,
            contact:searchProps.contact||null,
            page:searchProps.page,
            pageSize:searchProps.pageSize,
            status:searchProps.status||null
          }
        }
      );
      this.store.loading = false;
      if (result.success) {
        this.store.pageData = result.data;
        return true;
      } else {
        messageFail(result.message);
        return false;
      }
    } catch (error) {
      this.store.loading = false;
      messageFail();
      return false;
    }
  }

  @action
  public async update(data: TeamEditModel): Promise<boolean> {
    this.store.loading = true;
    try {
      const result = await this.http.postJSON<String>( `${BACKEND_URL}/team/update`,data);
      this.store.loading = false;
      if (result.success) {
        return true;
      } else {
        messageFail(result.message);
        return false;
      }
    } catch (e) {
      messageFail();
      return false;
    }
  }

  @action
  public async add(data: TeamEditModel): Promise<boolean> {
    this.store.loading = true;
    try {
      const result = await this.http.postJSON<String>(`${BACKEND_URL}/team/add`,data);
      this.store.loading = false;
      if (result.success) {
        return true;
      } else {
        messageFail(result.message);
        return false;
      }
    } catch (e) {
      messageFail();
      return false;
    }
  }

  @action
  public async delete(codeList: string[]): Promise<boolean> {
    this.store.loading = true;
    try {
      const result = await this.http.postJSON<String>(`${BACKEND_URL}/team/delete`, codeList);
      this.store.loading = false;
      if (result.success) {
        return true;
      } else {
        messageFail(result.message);
        return false;
      }
    } catch (e) {
      messageFail();
      return false;
    }
  }

}
