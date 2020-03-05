export const PAGE = 1;
export const PAGE_SIZE = 10;
export const TOTAL = 0;

export interface Pagination<T> {
  page: number;
  pageSize: number;
  total: number;
  list: T[];
}

export interface LocationModel {
  locationCode: string;
  locationName: string;
  locationLevel: number;
  parentCode: string;
  isLeaf?: boolean;
}

export interface DictModel {
  dictType: string;
  dictCode: number;
  dictValue: string;
}

export const initalPaginationValue = {
  page: 0,
  pageSize: PAGE_SIZE,
  total: TOTAL,
  list: [],
};

export interface UserTokenInfo {
  accessToken: string;
  userName: string;
  resourceKeys: string[];
}
